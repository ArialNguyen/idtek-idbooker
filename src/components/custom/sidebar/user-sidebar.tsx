'use client'
import React from 'react'
import {
    FaAddressCard,
    FaCheck,
    FaIdCard,
    FaPalette,
    FaPenToSquare,
    FaRegBell,
    FaSliders,
    FaUserCheck,
    FaUserTie,
    FaUsersViewfinder,
} from 'react-icons/fa6'
import { IconType } from "react-icons";
import Sidebar from '@/components/custom/sidebar/Sidebar';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';

type Props = {}

export default function UserSidebar({ }: Props) {
    const t = useTranslations()
    return (
        <Sidebar>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item to="#" end icon={FaPalette as IconType} number={undefined}>
                        {t('sidebar.user.dashboard')}
                    </Sidebar.Item>
                    <Sidebar.Item to="/" icon={FaAddressCard as IconType} number={2}>
                        {t('sidebar.user.project')}
                    </Sidebar.Item>
                    <Sidebar.Item to="#" icon={FaIdCard as IconType} number={undefined}>
                        {t('sidebar.user.calendar')}
                    </Sidebar.Item>
                    <Sidebar.Item
                        to="#"
                        icon={FaPenToSquare as IconType} number={undefined}
                    >
                        {t('sidebar.user.feed')}
                    </Sidebar.Item>
                    <Sidebar.Item to="#" icon={FaCheck as IconType} number={undefined}>
                        {t('sidebar.user.message')}
                    </Sidebar.Item>
                    <Sidebar.Item to="#" icon={FaRegBell as IconType} number={undefined}>
                        {t('sidebar.user.goals')}
                    </Sidebar.Item>
                    <Sidebar.Item to="#" icon={FaSliders as IconType} number={undefined}>
                        {t('sidebar.user.members')}
                    </Sidebar.Item>
                    <Sidebar.Item to="#" icon={FaSliders as IconType} number={undefined}>
                        {t('sidebar.user.settings')}
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}