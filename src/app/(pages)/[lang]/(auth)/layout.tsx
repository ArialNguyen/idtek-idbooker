import '@/app/globals.css';
import { headers } from 'next/headers';
import { Inter } from 'next/font/google';
import AuthenticateLayout from '@/components/custom/layout/AuthenticateLayout';

type LayoutSize = 'xs' | 'sm' | 'md' | 'lg'

type Props = Readonly<{
    children: React.ReactNode;
    params: { lang: string };
}>;

const SignInLayout = {
    welcome: 'signin.user.title',
    introduction: 'signin.user.introduction',
    intendedFor: 'signin.user.intended',
    padding: 'pt-10',
    backgroundImage: '/user-auth.jpg',
    layoutSize: 'sm',
    verify: false
}
const SignUpLayout = {
    welcome: 'signup.user.title',
    introduction: 'signin.user.introduction',
    intendedFor: 'signup.user.intended',
    padding: 'pt-10',
    backgroundImage: '/user-auth.jpg',
    layoutSize: 'sm',
    verify: false
}

export default async function RootLayout({ children, params }: Props) {

    const header = headers()
    const pathname = header.get("x-pathname")
    const { welcome, introduction, intendedFor, padding, backgroundImage, layoutSize } =
        (pathname!!.includes("signin")) ? SignInLayout : SignUpLayout

    return (
        <AuthenticateLayout
            welcome={welcome}
            introduction={introduction}
            intendedFor={intendedFor}
            padding={padding}
            backgroundImage={backgroundImage}
            layoutSize={layoutSize as LayoutSize}
        >
            {children}
        </AuthenticateLayout>
    )
}