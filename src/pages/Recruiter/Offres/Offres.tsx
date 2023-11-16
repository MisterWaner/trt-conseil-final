import { useState, useEffect } from "react";
import AuthWrapper from "../../../components/Wrapper/AuthWrapper";
import { OffersMadeInTable } from "../../../components/Table/TablesInRecruiter";
import Modal from "../../../components/Modal/Modal";
import AddOfferForm from "../../../components/Forms/AddOfferForm";
import Cookies from "js-cookie";

export default function Offres() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeForm, setActiveForm] = useState<string | null>(null);
    const [id, setId] = useState<string>("");

    useEffect(() => {
        const idCookie = Cookies.get("id");
        if (idCookie) {
            setId(idCookie);
        }
    }, []);

    const openModal = (formType: string) => {
        setActiveForm(formType);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const renderForm = () => {
        if (activeForm === "addOffer") {
            return <AddOfferForm id={id} />;
        }
    };

    return (
        <AuthWrapper>
            <div className="flex flex-col h-full w-full">
                <h1 className="font-medium text-center text-xl md:text-3xl">
                    Nos Offres
                </h1>
                <section className="mt-9 overflow-x-auto">
                    <OffersMadeInTable id={id} />
                </section>
                <section className="mt-5">
                    <button
                        onClick={() => openModal("addOffer")}
                        className="flex justify-center w-full mt-2 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer lg:mt-0 lg:h-fit lg:w-1/6"
                    >
                        Ajouter une offre
                    </button>
                </section>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                content={renderForm()}
            />
        </AuthWrapper>
    );
}
