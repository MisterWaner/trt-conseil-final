import { z } from "zod";

export const ResumeSchema = z.object({
    resume: z.object({
        name: z.string().min(1, { message: "Le nom du fichier est obligatoire" }),
        size: z.number().max((5*1024*1024), { message: "Le fichier est trop volumineux" }),
        type: z.string().includes("pdf", { message: "Le fichier doit être au format PDF" }),
    }),
});

export type ResumeSchema = z.infer<typeof ResumeSchema>;