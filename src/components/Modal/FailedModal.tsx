import { FaXmark, FaCircleXmark } from "react-icons/fa6";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: React.ReactNode;
}

export const FailedModal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    content,
}) => {
    return (
        isOpen && (
            <div
                className={`fixed inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-indigo-500 bg-opacity-50`}
            >
                <div className="bg-red-300 min-h-fit p-4 rounded-lg text-black w-5/6 md:w-4/6 lg:w-2/6">
                    <div className="w-full flex justify-end">
                        <button onClick={onClose}>
                            <FaCircleXmark className="w-7 h-7 text-red-600 transition duration-200 active:scale-[0.95]" />
                        </button>
                    </div>
                    <div className="flex items-center my-4 justify-around font-semibold text-red-600">
                        {content}
                        <FaXmark className="w-7 h-7 " />
                    </div>
                </div>
            </div>
        )
    );
};
