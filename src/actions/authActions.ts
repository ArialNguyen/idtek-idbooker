'use server'
import { signIn, signOut } from "@/auth";
import { db } from "@/lib/db";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { RegisterSchema } from "@/schemas";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcryptjs"
import { getUserByEmail } from "@/data/user";

export const LoginAction = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {

    const validatedField = LoginSchema.safeParse(values)

    if (!validatedField.success) {
        return { error: "Invalid Credentials." }
    }

    const user = await getUserByEmail(validatedField.data.email)

    const { email, password } = validatedField.data

    try {
        await signIn("credentials", {
            email, password, redirectTo: callbackUrl ||
             DEFAULT_LOGIN_REDIRECT, redirect: false
        })  
        // console.log(user);
        return { success: "Login successfully" }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials." }
                default:
                    return { error: "Something went wrong!" }
            }
        }
        throw error
    }
    
}

export const RegisterAction = async (values: z.infer<typeof RegisterSchema>) => {

    const validatedField = RegisterSchema.safeParse(values)

    if (!validatedField.success) {
        return { error: "Invalid Credentials." }
    }

    const { email, password, phone, name, role} = validatedField.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existUser = await db.user.findUnique({
    where: {
            email
        }
    })
    if (existUser) return {error: "Email already in use!"}
    
    await db.user.create({
        data: {
            email, password: hashedPassword, phone, name, role
        }
    })
    // Send Verification token email
    return {success: "User created!"}
}

export const logoutAction = async () => {
    await signOut({ redirect: false })
}