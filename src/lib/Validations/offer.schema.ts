import { z } from "zod";

export const OfferSchema = z.object({
    title: z.string().min(1, { message: "Le titre est obligatoire" }),
    salary: z
        .number()
        .or(z.string())
        .pipe(z.coerce.number()),
    place: z.string().min(1, { message: "Le lieu est obligatoire" }),
    schedules: z.string().min(1, { message: "Les horaires sont obligatoires" }),
    contractType: z
        .string()
        .min(1, { message: "Le type de contrat est obligatoire" }),
    userId: z.string().min(1, { message: "L'utilisateur est obligatoire" }),
});

export type OfferSchema = z.infer<typeof OfferSchema>;
