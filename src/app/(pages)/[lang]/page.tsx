
import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import React from 'react'

type BookingPageProps = {

}

export const metadata: Metadata = {
    title: "Booking Website",
    description: "WebPage for Booking Schedule",
};


export default async function page({ }: BookingPageProps) {
    const session = await auth()

    return (
        <div>
            <div className='pt-20 h-screen'>DATA: {JSON.stringify(session)}</div>
        </div>
    )
}