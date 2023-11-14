import { z } from "zod";

export const RegisterSchema = z
    .object({
        email: z
            .string()
            .min(1, { message: "Veuillez renseigner votre adresse email" })
            .email({ message: "Votre adresse email est invalide" })
            .toLowerCase()
            .trim(),
        password: z
            .string()
            .min(1, {
                message: "Veuillez renseigner votre mot de passe",
            })
            .max(20, {
                message: "Votre mot de passe doit faire 20 caractères maximum",
            })
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
                {
                    message:
                        "Votre mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial et doit faire 8 caractères minimum et 20 caractères maximum",
                }
            )
            .trim(),
        confirmation: z
            .string()
            .min(1, {
                message: "Veuillez renseigner votre mot de passe",
            })
            .max(20, {
                message: "Votre mot de passe doit faire 20 caractères maximum",
            })
            .trim()
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
                {
                    message:
                        "Votre mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial et doit faire 8 caractères minimum et 20 caractères maximum",
                }
            ),
        roleId: z.string().min(1, { message: "Veuillez renseigner votre rôle" }),
    })
    .refine((data) => data.password === data.confirmation, {
        message: "Le mot de passe et la confirmation ne correspondent pas",
        path: ["confirmation"],
    });

export const LoginUserSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Veuillez renseigner votre adresse email" })
        .email({ message: "Votre adresse email est invalide" })
        .toLowerCase()
        .trim(),
    password: z
        .string()
        .min(1, {
            message: "Veuillez renseigner votre mot de passe",
        })
        .max(20, {
            message: "Votre mot de passe doit faire 20 caractères maximum",
        })
        .trim()
        .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
            {
                message:
                    "Votre mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial et doit faire 8 caractères minimum et 20 caractères maximum",
            }
        ),
});

export const UpdateUserSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Veuillez renseigner votre adresse email" })
        .email({ message: "Votre adresse email est invalide" })
        .toLowerCase()
        .trim(),
    firstname: z
        .string()
        .min(2, {
            message: "Votre prénom doit contenir au minimum 2 caractères",
        })
        .max(50, {
            message: "Votre prénom doit contenir au maximum 50 caractères",
        })
        .trim(),
    lastname: z
        .string()
        .min(2, {
            message: "Votre nom doit contenir au minimum 2 caractères",
        })
        .max(50, {
            message: "Votre nom doit contenir au maximum 50 caractères",
        }),
    societyName: z
        .string()
        .min(3, {
            message:
                "Le nom de votre entreprise doit contenir au minimum 3 caractères",
        })
        .max(100, {
            message:
                "Le nom de votre société doit contenir au maximum 100 caractères",
        })
        .trim(),
    address: z
        .string()
        .min(3, {
            message: "Votre adresse doit contenir au minimum 3 caractères",
        })
        .max(100, {
            message: "Votre adresse doit contenir au maximum 100 caractères",
        })
        .trim(),
});

export const UpdatePasswordSchema = z
    .object({
        currentPassword: z
            .string()
            .min(1, {
                message: "Veuillez renseigner votre mot de passe actuel",
            })
            .max(20, {
                message: "Votre mot de passe doit faire 20 caractères maximum",
            })
            .trim()
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
                {
                    message:
                        "Votre mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial et doit faire 8 caractères minimum et 20 caractères maximum",
                }
            ),
        newPassword: z
            .string({})
            .min(1, {
                message: "Veuillez renseigner votre nouveau mot de passe",
            })
            .max(20, {
                message: "Votre mot de passe doit faire 20 caractères maximum",
            })
            .trim()
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
                {
                    message:
                        "Votre mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial et doit faire 8 caractères minimum et 20 caractères maximum",
                }
            ),
        confirmation: z
            .string()
            .min(1, {
                message: "Veuillez confirmer votre mot de passe",
            })
            .max(20, {
                message: "Votre mot de passe doit faire 20 caractères maximum",
            })
            .trim()
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
                {
                    message:
                        "Votre mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial et doit faire 8 caractères minimum et 20 caractères maximum",
                }
            ),
    })
    .refine((data) => data.newPassword === data.confirmation, {
        message: "Le mot de passe et la confirmation ne correspondent pas",
        path: ["confirmation"],
    });

export type RegisterSchema = z.infer<typeof RegisterSchema>;
export type LoginUserSchema = z.infer<typeof LoginUserSchema>;
export type UpdateUserSchema = z.infer<typeof UpdateUserSchema>;
export type UpdatePasswordSchema = z.infer<typeof UpdatePasswordSchema>;
