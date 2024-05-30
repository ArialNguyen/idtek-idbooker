'use client'
import React, { useTransition, useState } from 'react'
import * as z from "zod"
import { useForm } from 'react-hook-form'

import { LoginSchema } from '@/schemas'
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
import { useSearchParams } from 'next/navigation'
import { LoginAction } from '@/actions/auth'
import Social from '@/components/custom/auth/Social'

export default function LoginForm({ closeModal }: { closeModal: () => void }) {
  // Get params in url
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  const [isPending, startTrasition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
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
        closeModal()
      })
    })
  }

  return (
    <div>
      <Form {...form}>
        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
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
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button className='w-full'
            disabled={isPending}
            type='submit'
            onSubmit={form.handleSubmit(onSubmit)}
          >Submit</Button>
        </form>
      </Form>
      <Social />
      
    </div>

  )
}
