import { auth } from '@/auth';
import { Metadata } from 'next';
import React from 'react'

type BookingPageProps = {
    
}

export const metadata: Metadata = {
  title: "Booking Website",
  description: "WebPage for Booking Schedule",
};


export default async function page({}: BookingPageProps) {
  const session = await auth()

  return (
    <div className='h-screen'>{JSON.stringify(session)}</div>
  )
}