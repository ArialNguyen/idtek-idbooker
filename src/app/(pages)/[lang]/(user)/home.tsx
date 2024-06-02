'use client'
import Tabs from '@/components/custom/tab/Tabs'
import Task from '@/components/custom/task'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import React from 'react'
import { IoMdAdd } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { Button } from '@/components/ui/button'
import { BsViewList } from "react-icons/bs";
import { MdOutlineViewKanban } from "react-icons/md";
import { GiSettingsKnobs } from "react-icons/gi";


type Props = {}

export default function HomePage({ }: Props) {
  const t = useTranslations()
  const handleTabClick = (title: String) => {

  }
  const session = useSession()
  const user = session.data!!.user!!

  const openTableTask = () => {
    console.log("aaaa");
  }
  return (
    <div className='flex flex-col'>
      <div className='p-4 pt-1 pb-0 border-2 border-solid border-t-0 bg-white text-xs gap-y-2'>
        <div className='flex my-2'>
          <div className='w-7/12  flex items-center'>
            <span className='text-neutral-500	text-sm	'>Project </span>
            <span className='font-extrabold '>/Project Deatails</span>
          </div>
          <div className='w-5/12  flex justify-end items-center'>
            <div className={`w-8 flex justify-center items-center text-white border-2 p-1.5 mr-2 rounded-full hover:drop-shadow-2xl`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className='fill-yellow-500'><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
            </div>
            <div className={`w-8 flex justify-center items-center text-white border-2 p-1.5 mr-2 rounded-full hover:drop-shadow-2xl`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='fill-gray-500'>
                <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" /></svg>
            </div>
            <div >
              <Button size={"xs"} className='mr-2 bg-sky-600 hover:bg-sky-700 text-white'
                onClick={() => { openTableTask() }}
              >
                <div className={`w-3.5 flex justify-center items-center text-white mr-2 `}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className='fill-white	 '>
                    <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></svg>
                </div>
                <span className='text-xs font-semibold '>Add Task</span>
              </Button>
              <Button size={"xs"} variant="white" className='border-2 border-solid	border-blue-500'>
                <div className={`w-3.5 flex justify-center items-center text-white mr-2 rounded-full hover:drop-shadow-2xl`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className='fill-blue-500'>
                    <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></svg>
                </div>
                <span className='text-sky-500 font-extrabold '>Share</span>
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className='flex content-center	gap-2'>
            <h1 className='text-lg font-extrabold '>Food delivery Web/App Design</h1>
            <Badge variant="green">In Progress</Badge>
          </div>
          <div className='w-fit p-0.5 flex items-center border-2 rounded-full'>
            <div className={`w-8 flex justify-center items-center text-white rounded-full hover:drop-shadow-2xl`}>
              <img className='rounded-full' src={user.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png"} alt="" />
            </div>
            <div className='h-fit m-2 text-sky-500 font-extrabold'>PM</div>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <div >
            <Tabs>
              <Tabs.Item
                title='Overview'
                onTabClick={() => handleTabClick('Opening')}
                totals={20}
                render={<Item title='Overview' bgColor="bg-sky-500" number={20} ></Item>}
              />
              <Tabs.Item
                title='Task'
                onTabClick={() => handleTabClick('Pending')}
                totals={20}
                render={<Item title='Task' bgColor="bg-red-500" number={20}></Item>}
              />
              <Tabs.Item
                title='Discussion'
                onTabClick={() => handleTabClick('Stopped')}
                totals={20}
                render={<Item title='Discussion ' bgColor="bg-amber-500	" number={20}></Item>}
              />
              <Tabs.Item title='Files'
                totals={20}
                render={<Item title='Files' bgColor="bg-lime-500" number={20}></Item>}

              />
              <Tabs.Item
                title='Timeline'
                onTabClick={() => handleTabClick("")}
                totals={20}
                render={<Item title='Timeline' bgColor="bg-green-500" number={20}></Item>}

              />
              <Tabs.Item
                title='Reports'
                onTabClick={() => handleTabClick("")}
                totals={20}
                render={<Item title='Reports' bgColor="bg-teal-500" number={20}></Item>}

              />
              <Tabs.Item
                title='More'
                onTabClick={() => handleTabClick("")}
                totals={20}
                render={<Item title='More' bgColor="bg-purple-500" number={20}></Item>}

              />
            </Tabs>
          </div>
          <div>
            <Button size={"xs"} variant="white" className='mr-3 border-2 border-solid	border-gray-200'>
              <BsViewList color='gray' className='w-6' />
              <span className='text-slate-500 font-semibold text-xs'>List View</span>
            </Button>
            <Button size={"xs"} variant="white" className='mr-3 border-2 border-solid	border-gray-200'>
              <MdOutlineViewKanban color='blue' className='w-5' />
              <span className='text-blue-500 font-semibold text-xs'>KanBan View</span>
            </Button>
            <Button size={"xs"} variant="white" className='border-2 border-solid	border-gray-200'>
              <GiSettingsKnobs color='gray' className='w-6'/>
              <span className='text-slate-500 font-semibold text-xs'>Filters</span>
            </Button>
          </div>
        </div>
      </div>
      <div className='bg-gray-100 h-[400px] flex p-3 gap-x-5'>
        <TaskColumn index={0} title='My Tasks' />
        <TaskColumn index={1} title='To Do' />
        <TaskColumn index={2} title='In Progress' />
        <TaskColumn index={3} title='Done' />
      </div>
    </div>
  )
}

interface ItemProps {
  title: string;
  bgColor: string
  number: number
}

function Item({ title, bgColor, number }: ItemProps) {
  return (
    <div className={cn(`w-full h-full gap-x-2 flex items-center justify-center bg-white border-2 border-white border-b-blue-500	text-blue-500`)}>
      <div className="font-semibold">{title}</div>
      <div className={`${bgColor} p-0.5 text-white text-xs rounded`}>{number}</div>
    </div>
  )
}

const TaskColumnColors = [
  { dotColor: "bg-blue-500", textColor: "text-blue-500", bgTextColor: "bg-blue-100" },
  { dotColor: "bg-fuchsia-800", textColor: "text-fuchsia-600", bgTextColor: "bg-fuchsia-100" },
  { dotColor: "bg-pink-500", textColor: "text-pink-500", bgTextColor: "bg-pink-200" },
  { dotColor: "bg-green-500", textColor: "text-green-500", bgTextColor: "bg-green-200" }
]

interface TaskColumnProps {
  title: string
  index: number
}
function TaskColumn({ title, index }: TaskColumnProps) {
  const session = useSession()
  const user = session.data!!.user!!
  const { dotColor, textColor, bgTextColor } = TaskColumnColors[index]

  return (
    <div className='basis-1/4 flex flex-col gap-y-3'>
      <div className='flex mb-3 justify-between'>
        <div className='gap-x-3 flex items-center'>
          <div className={`rounded-full w-2 h-2 ${dotColor}`} />
          <b className='ml-[-5px] text-xs'>{title}</b>
          <span className={`text-xs ${textColor} ${bgTextColor} pl-1 pr-1 font-semibold`}>10</span>
        </div>
        <div className='flex gap-x-2 items-center'>
          <span className='p-1 cursor-pointer rounded-full bg-white'><IoMdAdd color='blue' /></span>
          <BsThreeDots className='cursor-pointer' />
        </div>
      </div>
      <Task level='High' title='App wireframe design using figma' userCreated={{ image: user.image as string, id: user.id }} createdAt='01 Jan, 2023' />
      <Task level='Low' title='App wireframe design using figma' userCreated={{ image: user.image as string, id: user.id }} createdAt='01 Jan, 2023' />
    </div>
  )
}
