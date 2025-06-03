import type {ReactNode} from 'react'
import {FaArrowRightLong} from 'react-icons/fa6'

type AllowedColor = 'blue' | 'purple'

interface FeatureCardProps {
    icon: ReactNode
    title: string
    description: string
    actionLabel: string
    onActionClick?: () => void
    bgColor: AllowedColor
    textColor: AllowedColor
}

// 색상 매핑
const bgColorMap: Record<AllowedColor, string> = {
    blue: 'bg-[#DBEAFE]',
    purple: 'bg-[#EDE9FE]',
}

const textColorMap: Record<AllowedColor, string> = {
    blue: 'text-[#2563EB]',
    purple: 'text-[#7C3AED]',
}

const FeatureCard = ({
                         icon,
                         title,
                         description,
                         actionLabel,
                         onActionClick,
                         bgColor,
                         textColor,
                     }: FeatureCardProps) => {
    return (
        <article className="w-[500px] flex border border-[#F3F4F6] flex-col gap-[20px] p-[33px] rounded-[12px] shadow-lg">
            <header
                className={`w-[48px] h-[48px] rounded-[12px] flex items-center justify-center ${bgColorMap[bgColor]} ${textColorMap[textColor]}`}
            >
                {icon}
            </header>

            <h4 className="text-[20px] font-semibold">{title}</h4>

            <section>
                <p className="text-[16px] max-w-[320px]">{description}</p>
            </section>

            <footer className={`flex gap-[13px] items-center ${textColorMap[textColor]}`}>
                <button onClick={onActionClick}>{actionLabel}</button>
                <FaArrowRightLong/>
            </footer>
        </article>
    )
}
export default FeatureCard
