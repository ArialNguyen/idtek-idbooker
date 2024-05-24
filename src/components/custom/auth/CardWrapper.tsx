import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import React from 'react'
import {} from '@radix-ui/react-icons'
import Link from 'next/link'
import Head from '@/components/custom/auth/Head'
import Social from '@/components/custom/auth/Social'
interface CardWrapperProps{
    children: React.ReactNode
    headerLabel: string
    backButtonLabel: string
    backButtonHref: string
    showSocial?: boolean
}

export default function CardWrapper({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial = true
}: CardWrapperProps) {
  return (
    <Card className='w-full h-fit shadow-md '>
        <CardHeader>
            <Head label={headerLabel}/>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        {showSocial && (
            <CardFooter>
                <Social/>
            </CardFooter>
        )}
        <CardFooter>
            <Button variant="link" 
            className='font-normal w-full'
            size="sm"
            asChild
            >
                <Link href={backButtonHref}>
                    {backButtonLabel}
                </Link>
            </Button>
        </CardFooter>
    </Card>
  )
}
