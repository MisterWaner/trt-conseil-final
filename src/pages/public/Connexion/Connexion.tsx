import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../../../components/Modal/Modal";
import Axios from "../../../lib/axios";
import Cookies from "js-cookie";
import { LoginUserSchema } from "../../../lib/Validations/user.schema";
import PublicWrapper from "../../../components/Wrapper/PublicWrapper";

export default function Connexion() {
    const navigate = useNavigate();
    const [role, setRole] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [modalContent, setModalContent] = useState({
        title: "",
        message: "",
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginUserSchema>({
        resolver: zodResolver(LoginUserSchema),
        mode: "onSubmit",
    });

    //Check if user is already logged in
    useEffect(() => {
        const storedToken = Cookies.get("token");

        //If token is user is already logged in, redirect to the right page
        if (storedToken) {
            const storedRoleId = Cookies.get("roleId") as string;
            setRole(storedRoleId);

            if (storedRoleId === "1") {
                navigate("/admin");
            } else if (storedRoleId === "2") {
                navigate("/consultant");
            } else if (storedRoleId === "3") {
                navigate("/recruiter");
            } else if (storedRoleId === "4") {
                navigate("/candidat");
            }
        }
    }, [navigate]);

    //Handle form submit
    const loginUser = async (data: unknown) => {
        try {
            const response = await Axios.post("auth/login", data);
            
            if (response.status === 200) {
                const { token, id, roleId, email, isApproved } = response.data;

                if (isApproved === true) {
                    Cookies.set("token", token, {
                        secure: true,
                        sameSite: "None",
                        expires: 1,
                    });
                    Cookies.set("id", id, {
                        secure: true,
                        sameSite: "None",
                        expires: 1,
                    });
                    Cookies.set("roleId", roleId, {
                        secure: true,
                        sameSite: "None",
                        expires: 1,
                    });
                    Cookies.set("email", email, {
                        secure: true,
                        sameSite: "None",
                        expires: 1,
                    });

                    if (roleId === 1) {
                        navigate("/admin");
                    } else if (roleId === 2) {
                        navigate("/consultant");
                    } else if (roleId === 3) {
                        navigate("/recruiter");
                    } else if (roleId === 4) {
                        navigate("/candidat");
                    }
                } else {
                    setModalContent({
                        title: "Compte non approuvé",
                        message:
                            "Votre compte n'a pas encore été approuvé par un consultant, veuillez réessayer plus tard",
                    });
                    setIsModalOpen(true);
                    setTimeout(() => {
                        setIsModalOpen(false);
                        navigate("/");
                    }, 3000);
                }
            } else {
                console.error(response, "Échec de l'authentification");
            }
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
        }
    };
    return (
        <>
            {role === "1"
                ? navigate("/admin")
                : role === "2"
                ? navigate("/consultant")
                : role === "3"
                ? navigate("/recruiter")
                : role === "4"
                ? navigate("/candidat")
                : ""}
            <PublicWrapper>
                <section className="flex flex-col justify-center items-center h-full">
                    <h3 className="font-medium white-shadow text-3xl">
                        Connexion
                    </h3>
                    <form
                        onSubmit={handleSubmit(loginUser)}
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
                                aria-invalid={errors.email ? "true" : "false"}
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
                                required
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
                        <div className="flex justify-center w-full mt-4 border border-black px-3 py-1 bg-black rounded-md font-bold text-white custom-btn cursor-pointer">
                            <button type="submit">Se connecter</button>
                        </div>
                    </form>
                </section>
                <Modal
                    onClose={() => setIsModalOpen(false)}
                    isOpen={isModalOpen}
                    content={modalContent.message}
                />
            </PublicWrapper>
        </>
    );
}
