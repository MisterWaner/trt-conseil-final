import { useState, useEffect } from "react";
import { FaUserTie } from "react-icons/fa6";
import { User } from "../../lib/types/types";
import { useParams } from "react-router-dom";
import Axios from "../../lib/axios";
import Cookies from "js-cookie";
import AuthWrapper from "../../components/Wrapper/AuthWrapper";
import Modal from "../../components/Modal/Modal";
import RecruiterInfoForm from "../../components/Forms/RecruiterInfoForm";
import ModifyPasswordForm from "../../components/Forms/ModifyPasswordForm";

export default function Recruiter() {
    const [isModal, setIsModal] = useState(false);
    const [activeForm, setActiveForm] = useState<string | null>(null);
    const [cookies, setCookies] = useState({
        id: "",
        email: "",
    });
    const [user, setUser] = useState<User>();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const idCookie = Cookies.get("id");
        const emailCookie = Cookies.get("email");
        if (idCookie || emailCookie) {
            setCookies({
                id: idCookie ? idCookie : "",
                email: emailCookie ? emailCookie : "",
            });
        }
        async function getUser() {
            try {
                const response = await Axios.get(`/recruiters/${id}`, {
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
        setIsModal(true);
    };

    const closeModal = () => {
        setIsModal(false);
    };

    const renderForm = () => {
        if (activeForm === "recruiterInfo") {
            return <RecruiterInfoForm id={cookies.id} closeModal={closeModal}/>;
        } else if (activeForm === "modifyPassword") {
            return <ModifyPasswordForm id={cookies.id} closeModal={closeModal}/>;
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
                            <FaUserTie
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
                                {user?.firstname ? user.firstname : "Prénom"} {user?.lastname ? user.lastname : "Nom"}
                            </p>
                            <p className="font-medium text-xl md:text-2xl">
                                {cookies.email ? cookies.email : "Email"}
                            </p>
                            <p className="font-medium text-xl md:text-2xl">
                                {user?.societyName ? user.societyName : "Nom de la société"}
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
                                    onClick={() => openModal("recruiterInfo")}
                                    className="flex justify-center w-full mt-2 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer"
                                >
                                    Modifier
                                </button>
                            </li>
                        </ul>
                    </article>
                </section>
            </div>
            <Modal
                isOpen={isModal}
                onClose={closeModal}
                content={renderForm()}
            />
        </AuthWrapper>
    );
}
