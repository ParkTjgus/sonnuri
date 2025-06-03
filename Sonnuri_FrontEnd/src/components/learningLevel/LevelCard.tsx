import { baseColorMap, iconMap, type LevelType, pointColorMap } from '../../constants/levelConstants.tsx'

interface LevelCardProps {
    level: LevelType
    title: string
    description: string
    onActionClick?: () => void
    isClicked: boolean
}

const LevelCard = ({
                       title,
                       level,
                       description,
                       isClicked,
                       onActionClick,
                   }: LevelCardProps) => {
    const icon = iconMap[level]
    const baseColor = baseColorMap[level]
    const pointColor = pointColorMap[level]

    return (
        <article
            className="w-[405px] flex flex-col gap-[46px] p-[24px] border border-[#F3F4F6] rounded-[16px] shadow-lg">
            <header className="flex gap-[16px] items-center">
                <div
                    className="w-[48px] h-[48px] rounded-[12px] flex items-center justify-center"
                    style={{ backgroundColor: baseColor, color: pointColor }}
                >
                    {icon}
                </div>
                <div className="flex flex-col">
                    <h4 className="text-[20px] font-semibold">{title}</h4>
                    <h6 className="text-[14px] text-gray-500">{level}</h6>
                </div>
            </header>

            <p className="text-[16px] max-w-[300px]">{description}</p>

            <button
                className={`flex justify-center p-[10px] rounded-[12px] ${
                    isClicked ? 'text-white' : 'text-gray-500'
                }`}
                style={{
                    backgroundColor: isClicked ? pointColor : '#E5E7EB',
                }}
                onClick={onActionClick}
            >
                학습하기
            </button>
        </article>
    )
}

export default LevelCard
