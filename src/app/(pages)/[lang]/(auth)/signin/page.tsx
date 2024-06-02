'use client'
import { LoginAction } from '@/actions/authActions';
import Social from '@/components/custom/auth/Social';
import FormError from '@/components/custom/form-error';
import FormSuccess from '@/components/custom/form-sucess';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/navigation';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';


export default function Signin({ params }: { params: { lang: string } }) {
    const t = useTranslations()

    // Get params in url
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl")
    const emailAfterSignUp = searchParams.get("email")
    const [isPending, startTrasition] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const router = useRouter()
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: (emailAfterSignUp) ? emailAfterSignUp : "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")
        startTrasition(() => {
            LoginAction(values, callbackUrl).then((value) => {
                setError(value.error)
                setSuccess(value.success)
                if (value.success) router.push("/")
            })
        })
    }
    return (
        <div>
            <div>
                <Form {...form}>
                    <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('signin.inputs.email.label')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder={t('signin.inputs.email.placeholder')} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('signin.inputs.password.label')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='password'
                                            disabled={isPending}
                                            placeholder={t('signin.inputs.password.placeholder')} />
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
                        >{t('signin.buttons.submit')}</Button>
                    </form>
                </Form>
                <Social />
            </div>
            <div className="mt-4 text-center">
                <span className="text-black">{t("signin.signup.label")}</span>{' '}
                <Link
                    href="/signup"
                    className="font-semibold cursor-pointer text-emerald-500 hover:text-emerald-700"
                >
                    {t("signin.buttons.signup")}
                </Link>
            </div>
        </div>
    )
}