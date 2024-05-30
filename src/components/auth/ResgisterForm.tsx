'use client'
import React, { useTransition, useState } from 'react'
import * as z from "zod"
import { useForm } from 'react-hook-form'

import { RegisterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FormSuccess from '@/components/custom/form-sucess'
import FormError from '@/components/custom/form-error'
import { RegisterAction } from '@/actions/auth'

export default function RegisterForm({ closeModal }: { closeModal: () => void }) {
    const [isPending, startTrasition] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("")
        setSuccess("")
        startTrasition(() => {
            RegisterAction(values).then(value => {4
                setError(value.error)
                setSuccess(value.success)
            })
        })
    }

    return (
        <div>
            <Form {...form}>
                <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder='Enter name' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder='Enter email' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField control={form.control}
                        name='phone'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder='Enter Phone' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type='password'
                                        disabled={isPending}
                                        placeholder='Enter Password' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name='confirmPassword'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type='password'
                                        disabled={isPending}
                                        placeholder='Enter Confirm Password' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormSuccess message={success} />
                    <FormError message={error} />
                    <Button className='w-full'
                        disabled={isPending}
                        type='submit'
                        onSubmit={form.handleSubmit(onSubmit)}
                    >Submit</Button>
                </form>
            </Form>
        </div>

    )
}
