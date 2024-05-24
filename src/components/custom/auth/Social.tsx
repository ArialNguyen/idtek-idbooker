import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import {FaGithub} from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
export default function Social() {

  const searchParams = useSearchParams()
  
  return (
    <div className='flex items-center gap-x-2 w-full mt-5'>
        <Button variant="outline" className='w-full'>
            <FcGoogle className='h-5 w-5'/>
        </Button>
        <Button variant="outline" className='w-full'>
            <FaGithub className='h-5 w-5'/>
        </Button>
    </div>
  )
}
