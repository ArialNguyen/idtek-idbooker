'use client'
import Tabs from '@/components/custom/tab/Tabs'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import React from 'react'

type Props = {}

export default function HomePage({ }: Props) {
  const t = useTranslations()
  const handleTabClick = (title: String) => {

  }
  return (
    <div>
      <div className='border-solid border-2 p-1 flex justify-start items-center'>
        <div className='p-2 '>
          <Tabs>
            <Tabs.Item
              title='Overview'
              onTabClick={() => handleTabClick('Opening')}
              totals={20}
              render={<Item title='Overview' bgColor="bg-sky-500" textColor="text-sky-500" boderColor="border-b-sky-500" number={20} ></Item>}
            />
            <Tabs.Item
              title='Task'
              onTabClick={() => handleTabClick('Pending')}
              totals={20}
              render={<Item title='Task' bgColor="bg-red-500" textColor="text-red-500" boderColor="border-b-red-500" number={20}></Item>}
            />
            <Tabs.Item
              title='Discussion'
              onTabClick={() => handleTabClick('Stopped')}
              totals={20}
              render={<Item title='Discussion ' bgColor="bg-amber-500	" textColor="text-amber-500" boderColor="border-b-amber-500" number={20}></Item>}
            />
            <Tabs.Item title='Files'
              totals={20}
              render={<Item title='Files' bgColor="bg-lime-500" textColor="text-lime-500" boderColor="border-b-lime-500" number={20}></Item>}

            />
            <Tabs.Item
              title='Timeline'
              onTabClick={() => handleTabClick("")}
              totals={20}
              render={<Item title='Timeline' bgColor="bg-green-500" textColor="text-green-500" boderColor="border-b-green-500" number={20}></Item>}

            />
            <Tabs.Item
              title='Reports'
              onTabClick={() => handleTabClick("")}
              totals={20}
              render={<Item title='Reports' bgColor="bg-teal-500" textColor="text-teal-500" boderColor="border-b-teal-500" number={20}></Item>}

            />
            <Tabs.Item
              title='More'
              onTabClick={() => handleTabClick("")}
              totals={20}
              render={<Item title='More' bgColor="bg-purple-500" textColor="text-purple-500" boderColor="border-b-purple-500" number={20}></Item>}

            />
          </Tabs>
        </div>

      </div>

    </div>
  )
}

interface ItemProps {
  title: string;
  textColor: string
  boderColor: string
  bgColor: string
  number: number
}

function Item({title, textColor, boderColor, bgColor, number}: ItemProps) {
  return (
    <div className={cn(`w-full h-full flex items-center justify-end  bg-white border border-white ${boderColor}	${textColor}`)}>
      <div className="w-12/12 p-1">{title}</div>
      <div className={`w-12/12 p-1  ${bgColor} text-white rounded-sm`}>{number}</div>
    </div>
  )
}