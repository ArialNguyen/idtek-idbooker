'use client'
import NavLink from '@/components/custom/NavLink'
import Dropdown from '@/components/ui/Dropdown'
import { Button } from '@/components/ui/button'
import { Link, usePathname } from '@/navigation'
import { FaSearch } from 'react-icons/fa'

import React from 'react'
import {
  FaGear,
  FaHeart,
  FaSuitcase,
  FaListCheck,
  FaFile,
  FaStar,
  FaClipboard,
} from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { useTranslations } from 'next-intl'
import LanguageSelector from '@/components/custom/LanguageSelector'
import AuthRightControls from '@/components/custom/AuthRightControls'
import { useSession } from 'next-auth/react'
import Modal from '@/components/custom/modal/Modal'
import useModal from '@/hooks/useModal'
import LoginForm from '@/app/(auth)/signIn/LoginForm'

type Props = {}

export default function Header({ }: Props) {
  const t = useTranslations()
  const { modal, openModal, closeModal } = useModal()

  const session = useSession()
  const user = session.data?.user


  const handleLogout = () => {

  }

  return (
    <header className="fixed z-50 flex items-center justify-between w-full h-20 px-4 bg-white shadow sm:px-8 hover:shadow-lg">
      <div className="flex items-center gap-10">
        <NavLink href="." className="flex items-center">
          <img src={'/idbooker.png'} className="h-10" />
        </NavLink>

      </div>
      <div className="flex items-end gap-2 sm:gap-4">
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
  let callBackUrl = usePathname()

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
        <Button>
          {t('header.unSignIn.button.signUp')}
        </Button>
      </Link>
      <Modal
        id="login-modal"
        show={modal === 'login-modal'}
        onClose={closeModal}
        // size="xl"
      >
        {/* <Modal.Header>{t('header.modal.login.tittle')}</Modal.Header> */}
        <Modal.Body >
          <LoginForm closeModal={closeModal} />
        </Modal.Body>
      </Modal>
    </>
  )
}

const navLinkCls = ({ isActive }: { isActive: boolean }) => {
  return `flex p-2 transition hover:text-emerald-500 ${isActive ? 'text-emerald-500' : ''
    }`
}