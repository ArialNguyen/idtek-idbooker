import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string({
        invalid_type_error: "Must be a string"
    }).email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required."
    })
    //.refine()
})

export const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    email: z.string({
        invalid_type_error: "Must be a string"
    }).email({
        message: "Email is required"
    }),
    phone: z.string().min(10, {
        message: "Phone is required."
    }),
    role: z.string().optional().default("Customer"),
    password: z.string().min(1, {
        message: "Password is required."
    }),
    confirmPassword: z.string().min(1, {
        message: "Password is required."
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});