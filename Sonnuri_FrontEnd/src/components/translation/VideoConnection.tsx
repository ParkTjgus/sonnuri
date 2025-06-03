import { BsCameraVideoFill } from 'react-icons/bs'

interface VideoConnectionProps {
    isActive: boolean
    setActive: (b: boolean) => void
}

const VideoConnection = ({ isActive, setActive }: VideoConnectionProps) => {
    return (
        <div>
            <div className="flex justify-between items-center w-[600px] border p-[17px]">
                <div className="flex items-center gap-[12px]">
                    <BsCameraVideoFill color="gray" size={20} />
                    <h2>Live Camera Mode</h2>
                </div>
                <div className="flex items-center ">
                    <button
                        onClick={() => setActive(!isActive)}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                            isActive ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                    >
                        <div
                            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                                isActive ? 'translate-x-6' : 'translate-x-0'
                            }`}
                        />
                    </button>

                </div>

            </div>
            <div className="flex flex-col gap-[5px]">

            </div>

        </div>)
}
export default VideoConnection