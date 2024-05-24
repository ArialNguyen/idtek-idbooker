import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import React from 'react'

const font = Poppins({
    subsets: ["latin"],
    weight: ["400"]
})


interface HeaderProps {
    label: string
}

export default function Head({
    label
}: HeaderProps) {
    return (
        <div className={cn("flex gap-y-4 flex-col items-center justify-center ", font.className)}>
            <h1 className='text-3xl font-semibold'>Auth</h1>
            <p>
                {label}
            </p>
        </div>

    )
}
