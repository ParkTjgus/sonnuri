interface VideoCardProps {
    title: string,
    onActionClick: () => void
    children: any
    word: string
    buttonLabel: string
}

const VideoCard = ({ title, onActionClick, children, word, buttonLabel }: VideoCardProps) => {
    return (

        <article
            className="w-full flex flex-col gap-[46px] p-[24px] border border-[#F3F4F6] rounded-[16px] shadow-lg">
            <header className="flex gap-[16px] items-center">
                <div
                    className="w-[48px] h-[48px] rounded-[12px] flex items-center justify-center"
                >
                </div>
                <div className="flex w-full justify-between">
                    <h4 className="text-[20px] font-semibold">{title}</h4>
                    <button
                        className={`flex justify-center p-[10px] rounded-[12px] bg-gray-300`}
                        onClick={onActionClick}
                    >
                        {buttonLabel}
                    </button>
                </div>
            </header>
            {children}
            <div
                className="w-[560px] h-[196px] bg-blue-100 shadow-xl
                rounded-[20px] border border-blue-200 flex
                justify-center items-center text-center text-5xl">
                {word}
            </div>
        </article>)
}
export default VideoCard