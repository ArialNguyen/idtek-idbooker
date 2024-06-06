'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { IoTimeOutline } from "react-icons/io5";
import { TbCircleDashed } from "react-icons/tb";
import Dropdown from '@/components/ui/Dropdown';
import { TiArrowForwardOutline } from "react-icons/ti";

import { Badge } from '@/components/ui/badge'
import { TaskType } from '@/types/task';
import { TaskColumnColors, columnData } from '@/app/(pages)/[lang]/(user)/home';
import { toast } from 'sonner';
import { SiLevelsdotfyi } from "react-icons/si";
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import { ColumnId } from '@/types/column';


type ComponentProps = {
    action: "Update" | "AddWithColumn" | "AddNew"
    task?: TaskType,
    columnId?: ColumnId
    show: boolean
    handleDoneClick: (task: TaskType) => void
    onCloseTab: () => void
}
type CriteriaProps = {
    title: string,
    level: string,
    status: ColumnId,
    createdAt: string
}


export default function AddAndUpdateTask({ action, show = false, task, columnId, handleDoneClick, onCloseTab }: ComponentProps) {
    if (!show) return <div></div>
    const session = useSession();
    const user = session.data!!.user
    // const [status, setStatus] = useState<React.JSX.Element>(<Badge variant="green">In Progress</Badge>)

    let defautlValues = {
        title: '',
        level: 'Low',
        status: 'Default',
        createdAt: getDate()
    }

    if (action == "AddNew") {
        if (columnId) defautlValues.status = columnId!!
    }else {
        task ? defautlValues = {
            title: task.title,
            level: task.level,
            status: task.status as string,
            createdAt: task.createdAt
        } : undefined
    }

    const [criteria, setCriteria] = useState<CriteriaProps>(defautlValues)

    useEffect(() => {
        if (!show) {
            // if (criteria.title) {
            //     setCriteria({
            //         title: '',
            //         level: 'Low',
            //         status: 'Default',
            //         createdAt: getDate()
            //     })
            // }
        }
    }, [show])

    function handleDone() {
        if (!criteria.title) {
            return toast.error("Please enter title information!!!")
        }
        console.log("criteria: ", criteria);
        
        handleDoneClick({
            ...criteria,
            id: (action == "Update") ? task!!.id : uuidv4(),
            userCreated: {
                userId: user.id,
                image: user.image || ""
            }
        } as TaskType)
    }
    return (
        <div className={`h-[calc(100vh+20px)] bg-white absolute top-0 right-0 transition-all duration-[1500ms] ease-linear overflow-hidden
          ${show ? 'w-6/12 opacity-1 shadow-xl' : 'w-[20px] opacity-0'}`
        } >
            <div className={`w-full ${show ? ' opacity-1 p-4' : 'opacity-0'} flex justify-between items-center `}>
                <TiArrowForwardOutline className='hover:cursor-pointer w-4 h-4' onClick={onCloseTab} />
                <Badge onClick={handleDone} className='bg-green-600 hover:bg-green-400 text-white hover:cursor-pointer'>Done</Badge>
            </div>
            <div className={`w-full flex flex-wrap justify-center content-start gap-y-2 
             ${show ? 'opacity-1' : 'opacity-0'} 
        `}>
                <div className='w-10/12 h-fit py-2  flex gap-2'>
                    <div>
                        <img src='https://www.notion.so/icons/clipping_lightgray.svg?mode=light' className='w-[36px] h-[36px]' />
                    </div>
                    <input className="text-2xl	font-bold outline-none" value={criteria.title} onChange={(event) => {
                        setCriteria({ ...criteria, title: event.target.value })
                    }} name='Task' placeholder='Untitled' />
                </div>
                <div className='w-10/12 h-fit py-2'>
                    <div className='w-full flex gap-2'>
                        <div className='w-3/12 flex items-center gap-4 p-2 rounded-sm	 hover:bg-stone-200'>
                            <SiLevelsdotfyi color='gray' />
                            <span className='text-stone-400 text-sm	'>Level</span>
                        </div>
                        <div className='w-7/12 flex items-center'>
                            <Dropdown
                                render={
                                    <Badge className="w-fit text-xs" variant={clsx({
                                        "low": criteria.level === "Low",
                                        "medium": criteria.level === "Medium",
                                        "high": criteria.level === 'High'
                                    }) as any}>{criteria.level}</Badge>
                                }
                                type="hover"
                                position="bottomLeft"
                                width='w-fit'
                            >
                                <Dropdown.Item onItemClick={() => setCriteria({ ...criteria, level: "Low" })}>
                                    <Badge className="w-fit  text-xs" variant={"low"}>Low</Badge>

                                </Dropdown.Item>
                                <Dropdown.Item onItemClick={() => setCriteria({ ...criteria, level: "Medium" })}>
                                    <Badge className="w-fit  text-xs" variant={"medium"}>Medium</Badge>

                                </Dropdown.Item>
                                <Dropdown.Item onItemClick={() => setCriteria({ ...criteria, level: "High" })}>
                                    <Badge className="w-fit  text-xs" variant={"high"}>High</Badge>

                                </Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>
                    <div className='w-full flex gap-2'>
                        <div className='w-3/12 flex items-center gap-4 p-2 rounded-sm	 hover:bg-stone-200'>
                            <IoTimeOutline color='gray' />
                            <span className='text-stone-400 text-sm	'>Date</span>
                        </div>
                        <div className='w-7/12  p-2 flex items-center rounded-sm hover:bg-stone-200'>
                            {criteria.createdAt}
                        </div>
                    </div>
                    <div className='w-full flex gap-2'>
                        <div className='w-3/12 flex items-center gap-4 p-2 rounded-sm	 hover:bg-stone-200'>
                            <TbCircleDashed color='gray' />
                            <span className='text-stone-400 text-sm	'>Status</span>
                        </div>
                        <div className='w-7/12 flex items-center'>
                            {columnId && (
                                <Badge className={`${Object.keys(TaskColumnColors[0]).map((key) => {
                                    return (key == "columnId" || key == "dotColor") ? '' : TaskColumnColors.find((item) => item.columnId == columnId)!![key as "textColor" || "bgTextColor"]
                                }).join(" ")}`}>{columnId}</Badge>
                            )}
                            {!columnId && (
                                <Dropdown
                                    render={
                                        <Badge className={`${Object.keys(TaskColumnColors[0]).map((key) => {
                                            return (key == "columnId" || key == "dotColor") ? '' : TaskColumnColors.find((item) => item.columnId == criteria.status)!![key as "textColor" || "bgTextColor"]
                                        }).join(" ")}`}>{criteria.status}</Badge>
                                    }
                                    type="hover"
                                    position="bottomLeft"
                                    width='w-fit'
                                >
                                    {TaskColumnColors.map((item, index) => {
                                        return (
                                            <Dropdown.Item onItemClick={() => {
                                                setCriteria({ ...criteria, status: item.columnId })
                                            }}>
                                                <Badge className={`${item.textColor} ${item.bgTextColor} text-nowrap`}>
                                                    {(columnData[index].title === "My Tasks") ? "Default" : columnData[index].title}
                                                </Badge>
                                            </Dropdown.Item>)
                                    })}
                                </Dropdown>
                            )}
                        </div>
                    </div>
                </div>
                <div className='w-10/12 overflow-hidden py-3.5 border-1 border-solid border-y-2 border-slate-100 flex items-center gap-2 '>
                    <div className={`w-8 bg-slate-200 flex justify-center items-center text-white border-2 rounded-full hover:drop-shadow-2xl`}>
                        <img className='rounded-full' src={session.data?.user.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png"} alt="" />
                    </div>
                    <input className="outline-none" placeholder='Add a comment' />
                </div>
            </div>
        </div>
    )
}

function getDate() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes().toString();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) + " " + strTime;
}
