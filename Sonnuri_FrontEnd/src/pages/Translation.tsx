import { BsCameraVideoFill } from 'react-icons/bs';
import {
    VideoCard,
    DefaultVideoBox,
    CameraBoxWord,
    LearningVideo,
} from '../components';
import { getTranslateResult } from '../api/translation';
import { useState } from 'react';


const Translation = () => {
    // 실시간 수신 (서버에서 처리된 이미지 프레임 수신)
    const [translatedWord, setTranslatedWord] = useState(null);

    const [confidence, setConfidence] = useState(0);
    const [predictedWord, setPredictedWord] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [isCameraActive, setIsCameraActive] = useState(true);


    const translateVideo = async () => {
        if (!predictedWord) return;

        setIsCameraActive(false);

        try {
            const respone = await getTranslateResult(predictedWord);
            setTranslatedWord(respone.asl);
            setVideoUrl(`http://localhost:8000${respone.video_url}`);
        } catch (err) {
            console.error("번역 영상 불러오기 실패:", err);
        }
    };

    const resetTranslate = async () => {
        setIsCameraActive(true);
        setPredictedWord('')
        setTranslatedWord(null)
        setVideoUrl("")
    }

    return (
        <div className='flex flex-col justify-center items-center p-[50px] gap-[50px]'>
            <header className='flex flex-col items-start gap-5 w-[1180px]'>
                <h2 className='text-[36px] font-bold'>수어 번역기</h2>
                <p className='text-[18px]'>
                    번역할 수어를 촬영하고 번역 결과를 확인하세요
                </p>
            </header>
            <div className='flex gap-[30px] items-end'>
                <div className='flex flex-col items-start gap-4'>
                    <VideoCard
                        title="번역할 수어"
                        onActionClick={translateVideo}
                        word={predictedWord}
                        buttonLabel='번역하기'
                    >
                        <CameraBoxWord
                            isActive={isCameraActive}
                            onPredict={(word, conf) => {
                                setPredictedWord(word);
                                setConfidence(conf);
                            }} />
                    </VideoCard>

                </div>

                <VideoCard
                    title={'번역된 수어'}
                    onActionClick={resetTranslate}
                    word={translatedWord ?? '번역하기를 누르세요'}
                    buttonLabel='다시하기'
                >
                    {
                        videoUrl == "" ?
                            <DefaultVideoBox title={''} content={<BsCameraVideoFill color='gray' size={30} />} /> :
                            <LearningVideo videoUrl={videoUrl} />
                    }
                </VideoCard>
            </div>
        </div>
    );
};
export default Translation;
