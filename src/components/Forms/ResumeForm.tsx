/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { SuccessModal } from "../../components/Modal/SuccessModal";
import { FailedModal } from "../../components/Modal/FailedModal";
import { uploadResume } from "../../lib/services/postDatas";

type Props = {
    id: string | undefined;
    closeModal: () => void;
};

export default function ResumeForm({ id, closeModal }: Props) {
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadedFileUrl, setUploadedFileUrl] = useState<string>("");
    const userId = id;

    const handleChange = (event: any) => {
        setUploadedFileUrl(event.target.files[0]);
    };

    const onSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.target);
            const response = await uploadResume(formData);
            console.log(response.data);

            if (response.status === 200) {
                setUploadedFileUrl(response.data.fileUrl);
                console.log(uploadedFileUrl);
                setIsSuccess(true);
                setMessage("Les informations ont bien été modifiées");
            } else {
                setIsSuccess(false);
                setMessage("Une erreur est survenue, veuillez réessayer");
                console.log(
                    "Une erreur est survenue lors de la mise à jour du mot de passe",
                    response.status
                );
            }
        } catch (error) {
            console.error(error, "Une erreur est survenue");
            setIsSuccess(false);
            setMessage(`Une erreur est survenue`);
        }
        setIsModalOpen(true);
        setTimeout(() => {
            setIsModalOpen(false);
            closeModal();
        }, 3000);
    };

    return (
        <>
            <form
                encType="multipart/form-data"
                method="POST"
                onSubmit={onSubmit}
                className="flex flex-col w-full items-center"
            >
                <input type="hidden" name="userId" value={userId} />
                <div className="flex flex-col mb-4 w-4/6">
                    <label htmlFor="resume">CV</label>

                    <input
                        name="resume"
                        onChange={handleChange}
                        accept=".pdf"
                        type="file"
                        id="resume"
                        className="bg-indigo-300/50 p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                </div>
                <div className="flex flex-col mb-4 w-4/6">
                    <button
                        type="submit"
                        className="flex justify-center w-full mt-2 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer"
                    >
                        Valider
                    </button>
                </div>
            </form>
            {isSuccess ? (
                <SuccessModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    content={message}
                />
            ) : (
                <FailedModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    content={message}
                />
            )}
        </>
    );
}
