'use client'

import { Badge } from '@/components/ui/badge'
import { TaskType } from '@/types/task'
import clsx from 'clsx'

import { FaRegSquareCheck } from 'react-icons/fa6'
import { TbTruckLoading } from 'react-icons/tb'
import { BsTrash } from 'react-icons/bs'
import { HiInformationCircle } from 'react-icons/hi2'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'

interface TaskProps {
    task: TaskType
    onDetailClick?: () => void
    onDeleteClick?: () => void
    className?: string
}

export default function ListTask({
    task,
    onDetailClick,
    onDeleteClick,
    className
}: TaskProps) {
    const [isHover, setIsHover] = useState<boolean>(false)

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: task.id,
        data: {
            type: 'Task',
            task
        }
    })
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }
    if (isDragging) {
        // The Static Task
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="bg-transparent border-dashed border-2 border-slate-400 p-5 rounded flex items-center justify-center"
            >
                <TbTruckLoading color="gray" className="w-12 h-12" />
            </div>
        )
    }

    return (
        <TableRow
            className="truncate text-xs flex-col bg-white gap-y-1 p-2 rounded hover:cursor-default"
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onMouseEnter={() => {
                setIsHover(true)
            }}
            onMouseLeave={() => {
                setIsHover(false)
            }}
        >
            <TableCell className="flex">
                {/* Show Task name */}
                {isHover && (
                    <BsTrash
                        onClick={onDeleteClick}
                        className="w-4 h-4 hover:text-red-500 hover:cursor-pointer mr-2"
                    />
                )}
                {isHover && (
                    <HiInformationCircle
                        onClick={onDetailClick}
                        className="w-4 h-4 hover:text-blue-400 hover:cursor-pointer mr-2"
                    />
                )}
                <div className="flex justify-between">
                    <div className="items-center font-semibold flex gap-x-1">
                        <FaRegSquareCheck color="gray" />
                        {task.title}
                    </div>
                </div>
            </TableCell>
            <TableCell>
                {/* Show Due Date */}
                <div className="flex justify-between items-center mt-1">
                    <div className="flex gap-x-2">
                        <img
                            className="rounded-full w-7 h-7"
                            src={
                                task.userCreated.image ||
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png'
                            }
                        />
                        <p>{task.createdAt}</p>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                {/* SHow Low/Medium/High */}
                <Badge
                    className="w-fit rounded-none text-xs"
                    variant={
                        clsx({
                            low: task.level === 'Low',
                            medium: task.level === 'Medium',
                            high: task.level === 'High'
                        }) as any
                    }
                >
                    {task.level}
                </Badge>
            </TableCell>
            {/* <TableCell className="text-right">$250.00</TableCell> */}
        </TableRow>
    )
}
