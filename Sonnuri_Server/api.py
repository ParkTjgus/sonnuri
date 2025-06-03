# api.py

from fastapi import APIRouter, WebSocket, WebSocketDisconnect, UploadFile, File
from fastapi.responses import JSONResponse
from typing import List, Dict
import os, json, shutil, random, asyncio, cv2, numpy as np

router = APIRouter()

STATIC_DIR = "static"
UPLOADS_DIR = "uploads"
SIGN_DICT_PATH = os.path.join(STATIC_DIR, "data", "sign_dictionary.json")
TRANS_DICT_PATH = os.path.join(STATIC_DIR, "data", "translate_dictionary.json")

# Load dictionary
def load_sign_dictionary():
    try:
        with open(SIGN_DICT_PATH, encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return []
    
def load_translation_dictionary():
    try:
        with open(TRANS_DICT_PATH, encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

sign_dictionary = load_sign_dictionary()
translation_dictionary = load_translation_dictionary()


# ---------------------- 1. 학습하기 ----------------------
@router.get("/learn")
def get_learning_words():
    """랜덤 자모 반환 (객관식 제공용)"""
    
    # 찾을 word 목록
    target_words = {"ㅂ", "얼마", "ㅏ", "아니요"}

    filtered = [item for item in sign_dictionary if item["word"] in target_words]
    return filtered


# 1-2. ---------------- 실시간 형식
@router.websocket("/stream/learn")
async def websocket_learn(websocket: WebSocket):
    """학습 모드: 실시간 영상 프레임 받아서 정확도 계산"""
    await websocket.accept()
    frame_buffer = []
    SEQ_LENGTH = 10  # 프레임 개수 기준
    try:
        while True:
            frame = await websocket.receive_bytes()
            frame_buffer.append(frame)

            if len(frame_buffer) == SEQ_LENGTH:
                # 10개 프레임 모였을 때 AI 분석
                # TODO: 실제 AI 분석 함수로 처리
                #processed_result = process_frame_batch(frame_buffer)
                frame_buffer = []  # 버퍼 비우기

                # 임시 정확도 및 제스처 판단 (예시)
                result = {
                    "gesture": "ㄱ",  # 실제 모델 결과
                    "confidence": round(random.uniform(0.85, 0.98), 3)
                }

                await websocket.send_text(json.dumps(result))
    except WebSocketDisconnect:
        print("웹소켓 연결 종료 (학습)")


# ---------------------- 2. 학습 테스트하기 ----------------------

@router.get("/test/random")
def get_random_test_word():
    """랜덤 자모 반환 (객관식 제공용)"""
    random_word = random.choice(sign_dictionary)
    return {"id": random_word["id"], "word": random_word["word"], "video_url": random_word["video_url"]}

@router.post("/test/submit")
def check_test_answer(word_id: int, selected: str):
    """정답 체크"""
    word = next((w for w in sign_dictionary if w["id"] == word_id), None)
    if not word:
        return JSONResponse(status_code=404, content={"detail": "단어를 찾을 수 없습니다."})
    is_correct = word["word"] == selected
    return {"correct": is_correct, "answer": word["word"]}


# ---------------- 3. 번역
@router.get("/translate/{char}")
def get_translated_result(char: str):
    """누적 자모 → 단어 반환 및 외부 API 번역 결과 전달"""
    item = next((item for item in translation_dictionary if item["word"] == char), None)
    return item


# ---------------------- 4. 웹소켓 (실시간 영상 처리) ----------------------

receive_clients = set()
send_clients = set()

def draw_heart(img, center, size=50, color=(0, 0, 255), thickness=-1):
    x, y = center
    radius = size // 3
    cv2.circle(img, (x - radius, y - radius), radius, color, thickness)
    cv2.circle(img, (x + radius, y - radius), radius, color, thickness)
    pts = np.array([
        [x - size, y - radius],
        [x + size, y - radius],
        [x, y + size]
    ])
    cv2.fillPoly(img, [pts], color)

def process_frame(frame_bytes: bytes) -> bytes:
    # 바이트 → OpenCV 이미지
    np_arr = np.frombuffer(frame_bytes, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    # 예: 하트 표시
    draw_heart(img, center=(img.shape[1] // 2, img.shape[0] // 2))

    # 다시 OpenCV 이미지 → 바이트 (JPEG 인코딩)
    _, buffer = cv2.imencode('.jpg', img)
    return buffer.tobytes()
    
    # # 받은 프레임을 처리하는 로직 -> AI 구현

    # return frame_bytes  # 가공 없이 그대로 반환

@router.websocket("/stream/receive")
async def websocket_receive(websocket: WebSocket):
    await websocket.accept()
    receive_clients.add(websocket)
    try:
        while True:
            frame = await websocket.receive_bytes()
            print("📸 Frame received")  # 로그 추가

            processed_frame = process_frame(frame)  # 처리된 프레임

            # 모든 send 클라이언트에 처리된 프레임 전송
            disconnected = []
            for client in send_clients:
                try:
                    await client.send_bytes(processed_frame)
                except Exception:
                    disconnected.append(client)
            for dc in disconnected:
                send_clients.remove(dc)
    except WebSocketDisconnect:
        receive_clients.remove(websocket)


@router.websocket("/stream/send")
async def websocket_send(websocket: WebSocket):
    await websocket.accept()
    send_clients.add(websocket)
    try:
        while True:
            # 송신 클라이언트가 연결 유지용으로 텍스트 메시지 보내주거나
            # 그냥 연결 유지만 할 수도 있음
            await asyncio.sleep(10)
    except WebSocketDisconnect:
        send_clients.remove(websocket)


@router.websocket("/stream/predict")
async def websocket_predict(websocket: WebSocket):
    await websocket.accept()

    from tensorflow.keras.models import Sequential
    from tensorflow.keras.layers import LSTM, Dense
    import mediapipe as mp
    import numpy as np

    # 모델 초기화
    actions = np.array(['None', '계산', '고맙다', '괜찮다', '기다리다', '나', '네', '다음',
                    '달다', '더', '도착', '돈', '또', '맵다', '먼저', '무엇', '물', '물음',
                    '부탁', '사람', '수저', '시간', '아니요', '어디', '얼마', '예약', '오다',
                    '우리', '음식', '이거', '인기', '있다', '자리', '접시', '제일', '조금',
                    '주문', '주세요', '짜다', '책', '추천', '화장실', '확인'])

    model = Sequential()
    model.add(LSTM(64, return_sequences=True, activation='relu', input_shape=(30, 126)))
    model.add(LSTM(128, return_sequences=True, activation='relu'))
    model.add(LSTM(64, return_sequences=False, activation='relu'))
    model.add(Dense(64, activation='relu'))
    model.add(Dense(32, activation='relu'))
    model.add(Dense(actions.shape[0], activation='softmax'))
    model.load_weights('./ai/word_model.h5')

    mp_holistic = mp.solutions.holistic
    holistic = mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5)

    sequence = []
    threshold = 0.75

    def extract_keypoints(results):
        lh = np.array([[res.x*3, res.y*3, res.z*3] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21*3)
        rh = np.array([[res.x*3, res.y*3, res.z*3] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21*3)
        return np.concatenate([lh, rh])

    try:
        while True:
            frame_bytes = await websocket.receive_bytes()

            # 바이트 → 이미지
            np_arr = np.frombuffer(frame_bytes, np.uint8)
            image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

            # Mediapipe 처리
            image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            results = holistic.process(image_rgb)
            keypoints = extract_keypoints(results)
            sequence.append(keypoints)
            if len(sequence) > 30:
                sequence.pop(0)

            if len(sequence) == 30:
                input_seq = np.expand_dims(sequence, axis=0)
                res = model.predict(input_seq)[0]
                predicted_word = ""
                if res[np.argmax(res)] > threshold:
                    predicted_word = actions[np.argmax(res)]
                await websocket.send_text(json.dumps({
                    "word": predicted_word,
                    "confidence": round(float(np.max(res)), 3)
                }))
    except WebSocketDisconnect:
        print("웹소켓 연결 종료 (predict)")
    finally:
        holistic.close()


import tensorflow as tf
import platform
from ai.modules.utils import Vector_Normalization
import ai.modules.holistic_module as hm


@router.websocket("/stream/jamo")
async def websocket_jamo_predict(websocket: WebSocket):
    """자모 실시간 인식 WebSocket"""
    await websocket.accept()

    # 환경 및 모델 초기화
    actions = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
               'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ',
               'ㅐ', 'ㅒ', 'ㅔ', 'ㅖ', 'ㅢ', 'ㅚ', 'ㅟ']
    seq_length = 10
    seq = []
    action_seq = []
    last_action = None

    # TFLite 모델 로딩
    interpreter = tf.lite.Interpreter(model_path="./ai/jamo_model.tflite")
    interpreter.allocate_tensors()
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    # Mediapipe
    detector = hm.HolisticDetector(min_detection_confidence=0.3)

    try:
        while True:
            frame_bytes = await websocket.receive_bytes()
            np_arr = np.frombuffer(frame_bytes, np.uint8)
            img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

            img = detector.findHolistic(img, draw=False)
            _, right_hand_lmList = detector.findRighthandLandmark(img)

            if right_hand_lmList is not None:
                joint = np.array([[lm.x, lm.y] for lm in right_hand_lmList.landmark])
                vector, angle_label = Vector_Normalization(joint)
                d = np.concatenate([vector.flatten(), angle_label.flatten()])
                seq.append(d)

                if len(seq) < seq_length:
                    continue

                input_data = np.expand_dims(np.array(seq[-seq_length:], dtype=np.float32), axis=0)
                interpreter.set_tensor(input_details[0]['index'], input_data)
                interpreter.invoke()

                y_pred = interpreter.get_tensor(output_details[0]['index'])
                i_pred = int(np.argmax(y_pred[0]))
                conf = y_pred[0][i_pred]

                if conf < 0.9:
                    continue

                action = actions[i_pred]
                action_seq.append(action)

                if len(action_seq) < 3:
                    continue

                this_action = "?"
                if action_seq[-1] == action_seq[-2] == action_seq[-3]:
                    this_action = action
                    if last_action != this_action:
                        last_action = this_action

                await websocket.send_text(json.dumps({
                    "word": this_action,
                    "confidence": round(float(conf), 3)
                }))
    except WebSocketDisconnect:
        print("웹소켓 연결 종료 (jamo)")
