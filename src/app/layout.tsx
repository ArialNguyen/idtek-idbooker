import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/app/globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { ReduxProvider } from "@/context/ReduxProvider";
import SessionsProvider from "@/context/SessionProvider";
import { auth } from "@/auth";
import { getMessages } from "next-intl/server";
import Header from "@/components/custom/Header";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children, params
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const session = await auth()
  const messages = await getMessages()
  return (
    <html lang={params.lang}>
      <ReduxProvider>
        <SessionsProvider session={session}>
          <NextIntlClientProvider messages={messages} locale={params.lang}>
            <body className={inter.className}>
              {children}
            </body>
            <Toaster />
          </NextIntlClientProvider>
        </SessionsProvider>
      </ReduxProvider>
    </html>
  );
}

// {/* @ts-expect-error Async Server Component */}
// <Footer/>
