'use client'

import { Badge } from "@/components/ui/badge"
import { TaskType } from "@/types/task";
import clsx from "clsx"

import { FaRegSquareCheck } from "react-icons/fa6";
import { TbTruckLoading } from "react-icons/tb";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface TaskProps {
    task: TaskType
    className?: string
}

export default function Task({ task, className }: TaskProps) {

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
    });
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };
    if (isDragging) { // The Static Task
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="bg-transparent border-dashed border-2 border-slate-400 p-5 rounded flex items-center justify-center">
                <TbTruckLoading color="gray" className="w-12 h-12"/>
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cn("flex truncate text-xs flex-col bg-white gap-y-1 p-2 rounded", className)}>
            <div className="items-center font-semibold flex gap-x-1">
                <FaRegSquareCheck color="gray" />
                {task.title}
            </div>

            <Badge className="w-fit rounded-none text-xs" variant={clsx({
                "low": task.level === "Low",
                "medium": task.level === "Medium",
                "high": task.level === 'High'
            }) as any}>{task.level}</Badge>

            <div className="flex items-center gap-x-2 mt-1">
                <img className="rounded-full w-7 h-7" src={task.userCreated.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png"} />
                <p>{task.createdAt}</p>
            </div>
        </div>
    )
}