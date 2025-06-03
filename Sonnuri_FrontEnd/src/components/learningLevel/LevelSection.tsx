import { LevelCard } from '../index.tsx'
import type { LevelType } from '../../constants/levelConstants.tsx' // LevelCard 임포트는 그대로 유지

interface LevelSectionProps {
    selectLevel: LevelType | null
    select: (level: LevelType) => void // select 함수는 levelType을 인자로 받아야 하므로 타입을 명확히 정의
}

const Levels = {
    Beginner: {
        title: '초급',
        description: '수어 기초 단어',
    },
    Intermediate: {
        title: '중급',
        description: '수어 일상 표현 & 단어',
    },
    Advanced: {
        title: '고급',
        description: '수어 고급 표현 & 단어',
    },
}

const LevelSection = ({ selectLevel, select }: LevelSectionProps) => {
    return (
        <div className="flex max-lg:flex-col gap-[32px]">
            {Object.keys(Levels).map((levelKey) => {
                // levelKey를 'LevelType'으로 타입 캐스팅
                const level = levelKey as LevelType
                const { title, description } = Levels[level]

                return (
                    <LevelCard
                        key={level}
                        title={title}
                        description={description}
                        level={level}
                        isClicked={selectLevel === level} // 상태 관리 부분
                        onActionClick={() => select(level)} // 선택된 level을 넘김
                    />
                )
            })}
        </div>
    )
}

export default LevelSection // 컴포넌트를 올바르게 export 합니다.
