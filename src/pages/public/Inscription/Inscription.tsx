import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PublicWrapper from "../../../components/Wrapper/PublicWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Axios from "../../../lib/axios";
import { RegisterSchema } from "../../../lib/Validations/user.schema";
import Modal from "../../../components/Modal/Modal";

export default function Inscription() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(RegisterSchema),
        mode: "onSubmit",
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [modalContent, setModalContent] = useState({
        title: "",
        message: "",
    });

    const registerUser = async (data: unknown) => {
        console.log(data);

        try {
            const response = await Axios.post("auth/register", data);
            console.log(response.data);

            if (response.status === 201) {
                setModalContent({
                    title: "Inscription réussie",
                    message: "Vous pouvez maintenant vous connecter",
                });
                reset();
                setIsModalOpen(true);
                setTimeout(() => {
                    setIsModalOpen(false);
                    navigate("/login");
                }, 3000);
            } else {
                setModalContent({
                    title: "Erreur",
                    message: "Une erreur est survenue, veuillez réessayer",
                });
                setIsModalOpen(true);
                setTimeout(() => {
                    setIsModalOpen(false);
                }, 3000);
            }
        } catch (error) {
            console.log("Une erreur est survenue", error);
        }
    };

    return (
        <PublicWrapper>
            <section className="flex flex-col justify-center items-center h-full">
                <h3 className="font-medium white-shadow text-3xl">
                    Inscription
                </h3>
                <form
                    onSubmit={handleSubmit(registerUser)}
                    className="flex flex-col items-center justify-between form rounded-md p-10 mt-4"
                >
                    <div className="flex flex-col mb-4 w-full">
                        <label className="font-bold" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="rounded-md p-3"
                            {...register("email")}
                        />
                        {errors.email ? (
                            <p className="text-center error-msg">
                                {errors.email?.message}
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <label className="font-bold" htmlFor="password">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="rounded-md p-3"
                            {...register("password")}
                        />
                        {errors.password ? (
                            <p className="text-center error-msg">
                                {errors.password?.message}
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <label className="font-bold" htmlFor="confirmation">
                            Confirmation du mot de passe
                        </label>
                        <input
                            type="password"
                            id="confirmation"
                            className="rounded-md p-3"
                            {...register("confirmation")}
                        />
                        {errors.confirmation ? (
                            <p className="text-center error-msg">
                                {errors.confirmation?.message}
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <label htmlFor="roleId" className="font-bold">
                            Qui êtes vous ?
                        </label>
                        <select
                            id="roleId"
                            className="rounded-md p-3"
                            {...register("roleId")}
                        >
                            <option value="">--Choisir--</option>
                            <option value="3">Recruteur</option>
                            <option value="4" >Candidat</option>
                        </select>
                        {errors.roleId ? (
                            <p className="text-center error-msg">
                                {errors.roleId?.message}
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="w-full flex justify-between gap-2">
                        <div className="flex justify-center w-full mt-4 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer">
                            <Link to="/" type="submit">
                                Annuler
                            </Link>
                        </div>
                        <div className="flex justify-center w-full mt-4 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer">
                            <button type="submit">Valider</button>
                        </div>
                    </div>
                </form>
            </section>
            <Modal
                onClose={() => setIsModalOpen(false)}
                isOpen={isModalOpen}
                content={modalContent.message}
            />
        </PublicWrapper>
    );
}
