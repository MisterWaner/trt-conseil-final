/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaUserNinja } from "react-icons/fa6";
import { User } from "../../lib/types/types";
import Axios from "../../lib/axios";
import Modal from "../../components/Modal/Modal";
import PersonalInfoForm from "../../components/Forms/PersonalInfoForm";
import ModifyPasswordForm from "../../components/Forms/ModifyPasswordForm";
import ResumeForm from "../../components/Forms/ResumeForm";
import AuthWrapper from "../../components/Wrapper/AuthWrapper";

export default function Candidat() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeForm, setActiveForm] = useState<string | null>(null);
    const [user, setUser] = useState<User>();
    const [resumePath, setResumePath] = useState<string>("");

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        async function getUser() {
            try {
                const response = await Axios.get(`/candidats/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
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
        async function getResume() {
            try {
                const response = await Axios.get(`/candidats/${id}/resume`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                        "Content-Type": "application/json",
                    },
                });
                if (response.status === 200) {
                    console.log(response.data);
                } else {
                    console.error(response, "Une erreur est survenue");
                }
                setResumePath(response.data.path);
            } catch (error) {
                console.error(error, "Une erreur est survenue");
            }
        }
        getResume();
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
        } else if (activeForm === "resume") {
            return <ResumeForm id={id} closeModal={closeModal} />;
        }
    };

    return (
        <AuthWrapper>
            <div className="flex flex-col h-full w-full">
                <h1 className="font-medium text-center text-xl md:text-3xl">
                    Mon compte
                </h1>
                <section className="w-full mx-auto mt-10 grid grid-cols-1 lg:grid-cols-2">
                    <article className="flex flex-col items-center md:items-center justify-center">
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
                        <div className="flex flex-col items-center justify-center mt-5 md:w-[300px]">
                            <p className="font-medium text-xl ">
                                {user?.firstname} {user?.lastname}
                            </p>
                            <p className="font-medium text-xl">{user?.email}</p>
                        </div>
                    </article>
                    <article className="mt-5 flex flex-col justify-center items-center">
                        <h2 className="text-lg underline underline-offset-2 text-center lg:text-start lg:text-xl">
                            Gestion du compte
                        </h2>
                        <ul className="mt-3 md:w-5/6 flex flex-col">
                            <li className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <p className="lg:mr-5 text-sm md:text-base">
                                    Informations de connexion :{" "}
                                </p>
                                <button
                                    onClick={() => openModal("modifyPassword")}
                                    className="flex justify-center w-full mt-2 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer md:w-2/4 md:mt-0 md:h-fit"
                                >
                                    Modifier
                                </button>
                            </li>
                            <li className="flex flex-col md:flex-row md:items-center md:justify-between mt-5">
                                <p className="lg:mr-5 text-sm md:text-base">
                                    Informations personnelles :{" "}
                                </p>
                                <button
                                    onClick={() => openModal("personalInfo")}
                                    className="flex justify-center w-full mt-2 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer md:w-2/4 md:mt-0 md:h-fit"
                                >
                                    Modifier
                                </button>
                            </li>
                            <li className="flex flex-col md:flex-row md:items-center md:justify-between mt-5">
                                <p className=" text-sm md:text-base ">
                                    Informations professionnelles :{" "}
                                </p>
                                <button
                                    onClick={() => openModal("resume")}
                                    className="flex justify-center w-full mt-2 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer md:w-2/4 md:mt-0 md:h-fit"
                                >
                                    CV
                                </button>
                            </li>
                        </ul>
                    </article>
                </section>
                <section className="w-full mx-auto mt-10 grid grid-cols-1">
                    <article className="flex flex-col justify-center items-center">
                        <h2 className="text-lg underline underline-offset-2 text-center lg:text-start lg:text-xl">
                            Mon CV
                        </h2>
                        <div className="flex flex-col items-center justify-center mt-5 md:w-[300px]">
                            <p className="font-medium text-xl ">
                                {resumePath}
                            </p>
                        </div>
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
