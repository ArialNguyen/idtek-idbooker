'use client'

import { Badge } from "@/components/ui/badge"
import clsx from "clsx"
import { FaRegSquareCheck } from "react-icons/fa6";


interface TaskProps {
    title: string,
    level: "Low" | "Medium" | "High"
    userCreated: {
        id: string
        image: string
    },
    createdAt: string
}
export default function Task({title, level, userCreated, createdAt}: TaskProps) {
    return (
        <div className="flex truncate text-xs flex-col bg-white gap-y-1 p-1 rounded">
            <div className="items-center font-semibold flex gap-x-1">
                <FaRegSquareCheck color="gray"/>
                {title}
            </div>

            <Badge className="w-fit rounded-none text-xs" variant={clsx({
                "low": level === "Low",
                "medium": level === "Medium",
                "high": level === 'High'
            }) as any }>{level}</Badge>

            <div className="flex items-center gap-x-2 mt-1">
                <img className="rounded-full w-7 h-7" src={userCreated.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png"} />
                <p>{createdAt}</p>
            </div>
        </div>
    )
}