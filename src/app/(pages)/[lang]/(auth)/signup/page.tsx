'use client'
import React, { useState, useTransition } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from '@/navigation';
import UserType from '@/types/user';
import { RegisterSchema } from '@/schemas';
import { RegisterAction } from '@/actions/authActions';
import FormError from '@/components/custom/form-error';
import FormSuccess from '@/components/custom/form-sucess';

type Props = {

}

export default function page({ }: Props) {
    const t = useTranslations();
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const router = useRouter()
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })
    const [isPending, startTrasition] = useTransition()
    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("")
        startTrasition(async () => {
            RegisterAction(values).then((value) => {
                setError(value.error)
                setSuccess(value.success)
                // if (value.success) router.push(`/account/verify?userId=${user.id}&email=${user.email}`)
                if (value.success) router.push(`/signin?email=${values.email}`)
            })
        })
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4 mt-8">
                    <FormField control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{`${t('signup.inputs.name.label')} :`}</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder={t('signup.inputs.name.placeholder')} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{`${t('signup.inputs.email.label')} :`}</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder={t('signup.inputs.email.placeholder')} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField control={form.control}
                        name='phone'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{`${t('signup.inputs.phone.label')} :`}</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder={t('signup.inputs.phone.placeholder')} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <div className='flex gap-x-2'>
                        <FormField control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{`${t("signup.inputs.password.label")} :`}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type='password'
                                            placeholder={t("signup.inputs.password.placeholder")} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField control={form.control}
                            name='confirmPassword'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{`${t("signup.inputs.confirmPassword.label")} :`}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type='password'
                                            placeholder={t("signup.inputs.confirmPassword.placeholder")} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        className="mt-4"
                        color="emerald"
                        size="lg"
                        type="submit"
                        disabled={isPending}
                    >
                        {t('signup.buttons.submit')}
                    </Button>
                    <div className="mx-auto mt-2">
                        <span className="text-black">{t('signup.signin')}</span>{' '}
                        <Link
                            href="/signin"
                            className="font-semibold cursor-pointer text-emerald-500 hover:text-emerald-700"
                        >
                            {t("signup.buttons.signin")}
                        </Link>
                    </div>
                </div>
            </form>
        </Form>
    )
}