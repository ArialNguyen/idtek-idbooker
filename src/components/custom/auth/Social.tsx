'use client'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import React from 'react'
import {FaGithub} from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
export default function Social() {

  const onClick =  (provider: "google" | "github") => {
    signIn(provider, {
      redirect: false
    })
  }
  return (
    <div className='flex items-center gap-x-2 w-full mt-5'>
        <Button variant="outline" className='w-full' onClick={() => onClick("google")}>
            <FcGoogle className='h-5 w-5'/>
        </Button>
        <Button variant="outline" className='w-full'  onClick={() => onClick("github")}>
            <FaGithub className='h-5 w-5'/>
        </Button>
    </div>
  )
}
