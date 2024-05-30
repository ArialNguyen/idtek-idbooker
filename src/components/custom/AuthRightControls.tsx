'use client'
import Dropdown from "@/components/ui/Dropdown"
import NavLink from "@/components/custom/NavLink"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import { IconBaseProps, IconType } from "react-icons"
import { BsBoxArrowRight } from "react-icons/bs"

import {
    FaBell,
    FaRegUser,
    FaArrowRightFromBracket,
    FaGear,
    FaBars,
    FaMagnifyingGlass,
    FaRegAddressCard,
    FaHeadphones,
} from 'react-icons/fa6'
import { useState } from "react"
import Modal from "@/components/custom/modal/Modal"
import useModal from "@/hooks/useModal"
import { UserSessionType } from "@/types/user"

export default function AuthRightControls({
    t,
    auth,
    logout,
}: {
    t: any
    auth: UserSessionType
    logout: () => void
}): JSX.Element {
    function FaAddressCard(props: IconBaseProps): Element {
        throw new Error("Function not implemented.")
    }
    const { modal, openModal, closeModal } = useModal()
    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <NavLink
                            href="/jobseeker/notifications"
                            className={navLinkCls}
                        >
                            <FaBell className="w-5 h-5" />
                        </NavLink>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{t('header.notifications')}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Dropdown
                render={
                    <img
                        src={auth.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/72px-User_icon_2.svg.png"}
                        className="w-10 h-10 border rounded-full"
                    />
                }
                type="hover"
                position="bottomRight"
            >
                <Dropdown.Header>
                    <div className="text-lg font-bold text-emerald-400">{auth?.name}</div>
                    <div className="text-sm font-semibold">{auth?.email}</div>
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item to="/profile/dashboard" icon={FaRegUser as IconType}>
                    {t('header.user.dropdown.history')}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item icon={FaArrowRightFromBracket as IconType}>
                    <div
                        className="w-full cursor-pointer"
                        onClick={() => openModal('logout-modal')}
                    >
                        {t('header.user.dropdown.logout')}
                    </div>{' '}
                </Dropdown.Item>
            </Dropdown>

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
                                logout()
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
        </>
    )
}

const navLinkCls = ({ isActive }: { isActive: boolean }) => {
    return `flex p-2 transition hover:text-emerald-500 ${isActive ? 'text-emerald-500' : ''
        }`
}
