import { useLevelSelection } from '../hooks/useLevelSelection.tsx'
import { LevelSection, StageSection } from '../components'


const LearningLevel = () => {
    const { selectLevel, select } = useLevelSelection()

    return (
        <div className="flex items-center justify-center">
            <div
                className="flex flex-col justify-center w-fit items-center p-[20px] gap-[50px]">
                <header className="flex flex-col items-center">
                    <h2 className="text-[36px] font-bold">단계에 맞춰 학습하세요</h2>
                    <p>자신에게 맞는 레벨을 고르세요</p>
                </header>
                <div className="flex flex-row md:flex-col justify-center w-fit gap-[10px]">
                    <LevelSection selectLevel={selectLevel} select={select} />
                    <StageSection selectLevel={selectLevel} />
                </div>

            </div>
        </div>

    )
}

export default LearningLevel
