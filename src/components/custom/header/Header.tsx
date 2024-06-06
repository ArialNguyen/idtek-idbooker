'use client'
import { logoutAction } from '@/actions/authActions'
import LanguageSelector from '@/components/custom/LanguageSelector'
import Modal from '@/components/custom/modal/Modal'
import Dropdown from '@/components/ui/Dropdown'
import { Button } from '@/components/ui/button'
import useModal from '@/hooks/useModal'
import { usePathname } from '@/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import React, { useTransition } from 'react'
import { IconType } from 'react-icons'
import { BsBoxArrowRight } from 'react-icons/bs'
import { FaArrowRightFromBracket } from 'react-icons/fa6'

type Props = {}

export default function Header({ }: Props) {
    const session = useSession()
    const t = useTranslations()
    const { modal, openModal, closeModal } = useModal()
    const [isPending, startTrasition] = useTransition()
    const pathname = usePathname()
    const handleSignOut = () => {
        startTrasition(async () => {
            await logoutAction()
            window.location.href = pathname
        })
    }
    return (
        <div className='h-[100%] w-[82%]'>
            <div className='border-solid border-2 p-1 pb-0.5 flex justify-center items-center'>
                <div className='w-8/12 '>
                    <div className='w-4/12 gap-x-1 p-1 bg-white border-solid border-2 border-stone-200 rounded-lg flex justify-center items-center'>
                        <div className='basis-1/5 flex justify-end p-0.5 items-end text-white rounded-full '>
                            <svg className="w-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" className="text-xs w-full outline-none" placeholder="Search" />
                    </div>
                </div>
                <div className='w-4/12 flex justify-end	items-center'>
                    <div className='w-2/12 '>
                        <div className={`w-8 bg-sky-500 flex justify-center items-center text-white border-2 p-2 rounded-full hover:drop-shadow-2xl`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-full h-full text-gray-500 dark:text-gray-400">
                                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                            </svg>
                        </div>
                    </div>
                    <div className='w-2/12 '>
                        <LanguageSelector />
                    </div>
                    <div className='w-2/12'>
                        <div className={`w-8 bg-slate-200 flex justify-center items-center text-white border-2 p-2 rounded-full hover:drop-shadow-2xl`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-full h-full text-gray-500 dark:text-gray-400">
                                <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" /></svg>
                        </div>
                    </div>
                    <div className='w-2/12'>
                        <Dropdown
                            render={
                                <div className={`w-10 bg-slate-200 flex justify-center items-center text-white border-2 rounded-full hover:drop-shadow-2xl`}>
                                    <img className='rounded-full' src={session.data?.user.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png"} alt="" />
                                </div>
                            }
                            type="hover"
                            position="bottomRight"
                        >
                            <Dropdown.Item icon={FaArrowRightFromBracket as IconType}>
                                <div
                                    className="w-fit cursor-pointer"
                                    onClick={() => openModal('logout-modal')}
                                >
                                    {t('header.user.dropdown.logout')}
                                </div>{' '}
                            </Dropdown.Item>
                        </Dropdown>

                    </div>
                    <div className='w-4/12 -ml-3 mr-4 truncate'>
                        <h1 className='font-extrabold'>
                            {session.data?.user.name}
                        </h1>
                        <p className='text-xs text-gray-500'>
                            {session.data?.user.role}
                        </p>
                    </div>
                </div>
            </div>
            {/* Logout */}
            <Modal
                id="logout-modal"
                show={modal === 'logout-modal'}
                size="md"
                popup
                onClose={closeModal}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <BsBoxArrowRight className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            {t('header.modal.logout.title')}
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button onClick={() => {
                                handleSignOut()
                                closeModal()
                            }}>
                                {t('header.modal.logout.button.logout')}
                            </Button>
                            <Button variant="red" onClick={closeModal}>
                                {t('header.modal.logout.button.cancel')}
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}