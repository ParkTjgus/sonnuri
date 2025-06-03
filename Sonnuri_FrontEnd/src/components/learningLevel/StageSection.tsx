import { baseColorMap, type LevelType, pointColorMap } from '../../constants/levelConstants.tsx'
import { FaHandsHelping, FaComments, FaBrain } from 'react-icons/fa'
import { StageCard } from '../index.tsx'


const learning = {
    Beginner: [
        {
            stage: 1,
            name: 'beginner 인사하기',
            description: 'Basic greetings and introductions',
            icon: <FaHandsHelping size={30} />,
        },
        {
            stage: 2,
            name: 'beginner 인사하기',
            description: 'Basic greetings and introductions',
            icon: <FaHandsHelping size={30} />,
        },
        {
            stage: 3,
            name: 'beginner 인사하기',
            description: 'Basic greetings and introductions',
            icon: <FaHandsHelping size={30} />,
        },
    ],
    Intermediate: [
        {
            stage: 1,
            name: 'intermediate 인사하기',
            description: 'Basic greetings and introductions',
            icon: <FaComments size={30} />,
        },
        {
            stage: 2,
            name: 'intermediate 인사하기',
            description: 'Basic greetings and introductions',
            icon: <FaComments size={30} />,
        },
        {
            stage: 3,
            name: 'intermediate 인사하기',
            description: 'Basic greetings and introductions',
            icon: <FaComments size={30} />,
        },
    ],
    Advanced: [
        {
            stage: 1,
            name: 'advanced 인사하기',
            description: 'Basic greetings and introductions',
            icon: <FaBrain size={30} />,
        },
        {
            stage: 2,
            name: 'advanced 인사하기',
            description: 'Basic greetings and introductions',
            icon: <FaBrain size={30} />,
        },
        {
            stage: 3,
            name: 'advanced 인사하기',
            description: 'Basic greetings and introductions',
            icon: <FaBrain size={30} />,
        },
    ],
}


interface StageSectionProps {
    selectLevel: LevelType | null
}

const StageSection = ({
                          selectLevel,
                      }: StageSectionProps) => {
    return (
        <article
            className="flex border w-full border-[#F3F4F6] flex-col
            gap-[24px] p-[32px] rounded-[16px] shadow-lg"
        >
            <header className="flex gap-[16px] items-center">
                <div className="flex flex-col">
                    <p className="text-[20px] font-semibold">{selectLevel}</p>
                </div>
            </header>
            {
                selectLevel && learning[selectLevel].map(stage => {
                    return <StageCard icon={stage.icon}
                                      title={stage.name}
                                      stage={stage.stage}
                                      description={stage.description}
                                      baseColor={baseColorMap[selectLevel]}
                                      pointColor={pointColorMap[selectLevel]} />
                })
            }
        </article>
    )
}

export default StageSection
