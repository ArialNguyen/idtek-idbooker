import { Metadata } from 'next';
import React from 'react'

type BookingPageProps = {
    
}

export const metadata: Metadata = {
  title: "Booking Website",
  description: "WebPage for Booking Schedule",
};


export default function page({}: BookingPageProps) {
  return (
    <div className='h-screen'>page</div>
  )
}