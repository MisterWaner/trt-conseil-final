import { useState, useEffect } from "react";
import { FaUserNinja } from "react-icons/fa6";
import { User } from "../../lib/types/types";
import Axios from "../../lib/axios";
import Cookies from "js-cookie";
import Modal from "../../components/Modal/Modal";
import PersonalInfoForm from "../../components/Forms/PersonalInfoForm";
import ModifyPasswordForm from "../../components/Forms/ModifyPasswordForm";
import AuthWrapper from "../../components/Wrapper/AuthWrapper";

export default function Candidat() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeForm, setActiveForm] = useState<string | null>(null);
    const [id, setId] = useState<string>("");
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const idCookie = Cookies.get("id");
        if (idCookie) {
            setId(idCookie);
        }
        async function getUser() {
            try {
                const response = await Axios.get(`/candidats/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                });
                if (response.status === 200) {
                    console.log(response.data);
                } else {
                    console.error(response, "Une erreur est survenue");
                }
                setUser(response.data);
                
            } catch (error) {
                console.error(error, "Une erreur est survenue");
            }
        }
        getUser();
    }, [id]);

    const openModal = (formType: string) => {
        setActiveForm(formType);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const renderForm = () => {
        if (activeForm === "personalInfo") {
            return <PersonalInfoForm id={id} closeModal={closeModal} />;
        } else if (activeForm === "modifyPassword") {
            return <ModifyPasswordForm id={id} closeModal={closeModal} />;
        }
    };



    return (
        <AuthWrapper>
            <div className="flex flex-col h-full w-full">
                <h1 className="font-medium text-center text-xl md:text-3xl">
                    Mon compte
                </h1>
                <section className="mt-10 flex flex-col items-center lg:flex-row lg:justify-around">
                    <article className="flex flex-col items-center md:items-start justify-center">
                        <div className="w-[200px] h-[200px] flex flex-col items-center justify-center bg-white rounded-full border border-black md:w-[300px] md:h-[300px]">
                            <FaUserNinja
                                alt="avatar"
                                className="w-[100px] h-[100px] md:w-[200px] md:h-[200px]"
                            />
                            <div className="mt-3 flex justify-center items-center w-full border border-black px-3 py-2 bg-black rounded-md font-bold text-white custom-btn">
                                <button className="w-full text-center">
                                    Changer d&apos;avatar
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col w-[200px] items-center justify-center mt-5 md:w-[300px]">
                            <p className="font-medium text-xl md:text-2xl">
                                {user?.firstname} {user?.lastname}
                            </p>
                            <p className="font-medium text-xl md:text-2xl">
                                {user?.email}
                            </p>
                        </div>
                    </article>
                    <article className="mt-5 flex flex-col">
                        <h2 className="text-lg underline underline-offset-2 text-center lg:text-start lg:text-xl">
                            Gestion du compte
                        </h2>
                        <ul className="mt-3 flex flex-col">
                            <li className="flex flex-col lg:flex-row lg:items-center">
                                <p className="lg:mr-5">
                                    Informations de connexion :{" "}
                                </p>
                                <button
                                    onClick={() => openModal("modifyPassword")}
                                    className="flex justify-center w-full mt-2 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer lg:mt-0 lg:h-fit"
                                >
                                    Modifier
                                </button>
                            </li>
                            <li className="flex flex-col lg:flex-row lg:items-center mt-5">
                                <p className="lg:mr-5">
                                    Informations personnelles :{" "}
                                </p>
                                <button
                                    onClick={() => openModal("personalInfo")}
                                    className="flex justify-center w-full mt-2 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer"
                                >
                                    Modifier
                                </button>
                            </li>
                        </ul>
                    </article>
                </section>
                <section className="mt-10 flex flex-col lg:ml-16 xl:ml-56">
                    <h2 className="text-lg underline underline-offset-2 text-center lg:text-start lg:text-xl">
                        Ajouter mon CV
                    </h2>
                    <article className="w-5/6 mx-auto md:w-4/6 lg:w-3/6 xl:w-2/6 lg:mx-0">
                        <form action="" className="flex flex-col">
                            <div className="flex flex-col mb-4">
                                <input
                                    type="file"
                                    name="resume"
                                    id="resume"
                                    className="mt-5 bg-indigo-300/50 focus:ring focus:ring-indigo-300 rounded-md"

                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <button
                                    type="submit"
                                    className="flex justify-center w-full mt-2 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </article>
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
