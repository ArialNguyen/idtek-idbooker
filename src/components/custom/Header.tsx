'use client'
import NavLink from '@/components/custom/NavLink'
import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'

import React, { useTransition } from 'react'
import { useTranslations } from 'next-intl'
import LanguageSelector from '@/components/custom/LanguageSelector'
import AuthRightControls from '@/components/custom/AuthRightControls'
import { useSession } from 'next-auth/react'
import Modal from '@/components/custom/modal/Modal'
import useModal from '@/hooks/useModal'
import LoginForm from '@/components/auth/LoginForm'
import RegisterForm from '@/components/auth/ResgisterForm'
import { logoutAction } from '@/actions/auth'
import { usePathname } from '@/navigation'

type Props = {}

export default function Header({ }: Props) {
  const t = useTranslations()

  const session = useSession()
  const user = session.data?.user
  const [isPending, startTrasition] = useTransition()

  const pathname = usePathname()
  const handleLogout = () => {
    startTrasition(async () => {
      await logoutAction()
      window.location.href = pathname
    })
  }

  return (
    <header className="fixed z-50 flex items-center justify-between w-full h-20 px-4 bg-white shadow sm:px-8 hover:shadow-lg">
      <div className="flex items-center gap-10">
        <NavLink href="." className="flex items-center">
          <img src={'/idbooker.png'} className="h-10" />
        </NavLink>

      </div>
      <div className="flex justify-center items-center gap-2 sm:gap-4">
        <LanguageSelector />
        {user ? (
          <AuthRightControls t={t} logout={handleLogout} auth={user} />
        ) : (
          <NoAuthRightControls t={t} />
        )}
      </div>

    </header>
  )
}

function NoAuthRightControls({
  t,
}: {
  t: any
}): JSX.Element {

  const { modal, openModal, closeModal } = useModal()
  return (
    <>
      <Button
        variant="empty"
        onClick={() => openModal('login-modal')}
        className="border border-emerald-500 text-emerald-500 hover:bg-slate-100"
      >
        {t('header.unSignIn.button.signIN')}
      </Button>
      <Link href="/signup">
        <Button onClick={() => openModal('signup-modal')}>
          {t('header.unSignIn.button.signUp')}
        </Button>
      </Link>
      <Modal
        id="login-modal"
        show={modal === 'login-modal'}
        onClose={closeModal}
      // size="xl"
      >
        <Modal.Header className='text-center'>Login</Modal.Header>
        <Modal.Body > 
          <LoginForm closeModal={closeModal} />
          <Button variant="link"
            className='font-normal w-full hover:cursor-auto mt-2'
            size="sm"
            asChild
            onClick={() => {
              closeModal()
              openModal("signup-modal")
            }}
          >
            <p>Or register new account Signup</p>
          </Button>
        </Modal.Body>
    
      </Modal>
      <Modal
        id="signup-modal"
        show={modal === 'signup-modal'}
        onClose={closeModal}
        size="2xl"
      >
        <Modal.Header>{t('header.modal.header.register')}</Modal.Header>
        <Modal.Body >
          <RegisterForm closeModal={closeModal} />
          <Button variant="link"
            className='font-normal w-full mt-2'
            size="sm"
            asChild
            onClick={() => {
              closeModal()
              openModal("login-modal")
            }}
          >
            <p>Already have an account?</p>
          </Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

const navLinkCls = ({ isActive }: { isActive: boolean }) => {
  return `flex p-2 transition hover:text-emerald-500 ${isActive ? 'text-emerald-500' : ''
    }`
}