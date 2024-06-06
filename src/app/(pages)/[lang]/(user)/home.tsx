'use client'
import { createPortal } from 'react-dom';
import Tabs from '@/components/custom/tab/Tabs'
import Task from '@/components/custom/task'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import React, { ReactNode, useMemo, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { Button } from '@/components/ui/button'
import { BsViewList } from "react-icons/bs";
import { MdOutlineViewKanban } from "react-icons/md";
import { GiSettingsKnobs } from "react-icons/gi";
import { TaskType } from '@/types/task'
import { Column, ColumnId } from '@/types/column'
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable'
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import useTaskTab from '@/hooks/useTaskTab';
import AddAndUpdateTask from '@/components/custom/add-update-task';
import { v4 } from 'uuid';

type Props = {}

interface ItemProps {
  title: string;
  bgColor: string
  number: number
}

interface TaskColumnProps {
  handleUpdateTasks: (tasks: TaskType[]) => void
  column: Column
  style: any
  tasksInCol: TaskType[]
}

interface CriteriaProps {
  view: "kanban" | "list"
}

export default function HomePage({ }: Props) {

  const [criteria, setCriteria] = useState<CriteriaProps>({
    view: "kanban"
  })
  const [tabSelected, setTabSelected] = useState<string>("task")

  const [columns, setColumns] = useState<Column[]>(columnData);
  
  const [tasks, setTasks] = useState<TaskType[]>(tasksData)

  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  const [previousTask, setPreviousTask] = useState<TaskType | null>(null)

  const [taskClicked, setTaskClicked] = useState<TaskType | undefined>(undefined)

  const [addTaskColumnClicked, setaddTaskColumnClicked] = useState<ColumnId | undefined>(undefined)

  const columnsId = useMemo(() => { return columns.map(col => col.id) }, [columns])

  const { task: taskTab, openTaskTab, closeTaskTab } = useTaskTab()

  const handleTabClick = (tabTitle: string) => {
    setTabSelected(tabTitle)
  }

  const handleUpdateTasksInColumn = (tasks: TaskType[]) => {
    setTasks(tasks)
  }
  const session = useSession()

  const user = session.data!!.user!!

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Task") {
      setPreviousTask({ ...event.active.data.current.task })
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.data.current?.type !== over?.data.current?.type) { // Move Task to another column

    } else {
      const currentTask = over!!.data.current!!.task as TaskType
      if (previousTask!!.status !== currentTask.status) { // Move Task to another Position in another Column

      } else { // Swap Task or Do nothing in one Column

      }
    }

    setActiveTask(null)
  }

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTimeout(() => setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].status != tasks[overIndex].status) {
          // Fix introduced after video recording
          // setPreviousTask(tasks[activeIndex])
          tasks[activeIndex].status = tasks[overIndex].status;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }
        return arrayMove(tasks, activeIndex, overIndex);
      }), 0)
    }
    // Im dropping a Task over a column
    const isOverAColumn = over.data.current?.type === "Column";
    if (isActiveATask && isOverAColumn) {
      setTimeout(() => setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        // setPreviousTask(tasks[activeIndex])
        tasks[activeIndex].status = overId;
        return arrayMove(tasks, activeIndex, activeIndex);
      }), 0)
    }
  }

  const TaskColumn = ({ column, style, tasksInCol }: TaskColumnProps) => {
    const { dotColor, textColor, bgTextColor } = style

    const taskIds = useMemo(() => {
      return tasksInCol.map(task => task.id)
    }, [tasksInCol])

    const {
      setNodeRef,
    } = useSortable({
      id: column.id,
      data: {
        type: "Column",
        column,
      },
    });

    return (
      <div ref={setNodeRef} style={style} className='basis-1/4 flex flex-col gap-y-3'>
        <div className='flex mb-3 justify-between'>
          <div className='gap-x-3 flex items-center'>
            <div className={`rounded-full w-2 h-2 ${dotColor}`} />
            <b className='ml-[-5px] text-xs'>{column.title}</b>
            <span className={`text-xs ${textColor} ${bgTextColor} pl-1 pr-1 font-semibold`}>10</span>
          </div>
          <div className='flex gap-x-2 items-center'>
            <span onClick={() => {
              if (taskTab == "AddNew") return closeTaskTab()
              setaddTaskColumnClicked(column.id as string)
              openTaskTab("AddNew")
            }} className='p-1 cursor-pointer rounded-full bg-white'><IoMdAdd color='blue' /></span>
            <BsThreeDots className='cursor-pointer' />
          </div>
        </div>
        <SortableContext items={taskIds}>
          {tasksInCol.map((task, index) => (
            <Task
              className='hover:bg-slate-50'
              onDeleteClick={() => {
                const tasksTmp = [...tasks]
                tasksTmp.splice(tasksTmp.findIndex(t => t.id == task.id), 1)
                setTasks(tasksTmp)
              }}
              onDetailClick={() => {
                if (taskTab == "Update") return closeTaskTab()
                setTaskClicked(task)
                openTaskTab("Update")
              }} key={index} task={task} />
          ))}
        </SortableContext>

        <div onClick={() => {
          if (taskTab == "AddNew") return closeTaskTab()
          setaddTaskColumnClicked(column.id as string)
          openTaskTab("AddNew")
        }} className='flex justify-center items-center gap-x-2 text-xs text-blue-500 cursor-pointer p-2 bg-white rounded-md font-semibold hover:bg-sky-100'>
          <IoMdAdd color='blue' className='w-5' />
          <p>Add New Task</p>
        </div>
      </div>
    )
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
                onClick={() => openTaskTab("AddNew")}
              >
                <div className={`w-3.5 flex justify-center items-center text-white mr-2 `} >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className='fill-white	 '>
                    <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></svg>
                </div>
                <span className='text-xs font-semibold ' >Add Task</span>
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
                onTabClick={() => handleTabClick('overview')}
                totals={20}
                render={<Item title='Overview' bgColor="bg-sky-500" number={20} ></Item>}
              />
              <Tabs.Item
                title='Task'
                active={true}
                onTabClick={() => handleTabClick('task')}
                totals={20}
                render={<Item title='Task' bgColor="bg-red-500" number={20}></Item>}
              />
              <Tabs.Item
                title='Discussion'
                onTabClick={() => handleTabClick('discussion')}
                totals={20}
                render={<Item title='Discussion ' bgColor="bg-amber-500	" number={20}></Item>}
              />
              <Tabs.Item title='Files'
                totals={20}
                render={<Item title='Files' bgColor="bg-lime-500" number={20}></Item>}
                onTabClick={() => handleTabClick('file')}
              />
              <Tabs.Item
                title='Timeline'
                onTabClick={() => handleTabClick("timeline")}
                totals={20}
                render={<Item title='Timeline' bgColor="bg-green-500" number={20}></Item>}

              />
              <Tabs.Item
                title='Reports'
                onTabClick={() => handleTabClick("reports")}
                totals={20}
                render={<Item title='Reports' bgColor="bg-teal-500" number={20}></Item>}

              />
              <Tabs.Item
                title='More'
                onTabClick={() => handleTabClick("more")}
                totals={20}
                render={<Item title='More' bgColor="bg-purple-500" number={20}></Item>}

              />
            </Tabs>
          </div>
          <div>
            <Button onClick={() => {
              setCriteria({ ...criteria, view: "list" })
            }} size={"xs"} variant="white" className='mr-3 border-2 border-solid	border-gray-200'>
              <BsViewList color={`${(criteria.view == "list") ? "blue" : "gray"}`} className='w-6' />
              <span className={`${(criteria.view == "list") ? "text-blue-500" : "text-slate-500"}  font-semibold text-xs`}>List View</span>
            </Button>
            <Button onClick={() => {
              setCriteria({ ...criteria, view: "kanban" })
            }} size={"xs"} variant="white" className='mr-3 border-2 border-solid	border-gray-200'>
              <MdOutlineViewKanban color={`${(criteria.view == "kanban") ? "blue" : "gray"}`} className='w-5' />
              <span className={`${(criteria.view == "kanban") ? "text-blue-500" : "text-slate-500"}  font-semibold text-xs`}>KanBan View</span> 
            </Button>
            <Button size={"xs"} variant="white" className='border-2 border-solid	border-gray-200'>
              <GiSettingsKnobs className='w-6' />
              <span className='text-slate-500 font-semibold text-xs'>Filters</span>
            </Button>
          </div>
        </div>
      </div>
      <AddAndUpdateTask key={v4()} action='AddNew' columnId={addTaskColumnClicked} show={taskTab == "AddNew"} onCloseTab={closeTaskTab} handleDoneClick={(task: TaskType) => {
        setTasks([...tasks, task])
        closeTaskTab()
      }} />
      <AddAndUpdateTask key={v4()} action='Update' task={taskClicked} show={taskTab == 'Update'} onCloseTab={closeTaskTab} handleDoneClick={(task: TaskType) => {
        // tasks[tasks.findIndex(t => t.id == task.id)] = {...task}
        // let idx = tasks.findIndex(t => t.id == task.id)
        const tasksTmp = [...tasks]
        tasksTmp[tasksTmp.findIndex(t => t.id == task.id)] = { ...task }
        closeTaskTab()
      }} />
      <div id='content' className='bg-gray-100 min-h-screen flex p-3 gap-x-5'>
        {tabSelected == "task" && criteria.view == "kanban" && (
          <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
          >

            <SortableContext items={columnsId}>
              {
                columns.map((col, index) => (
                  <TaskColumn
                    key={index}
                    style={TaskColumnColors.find(
                      (color) => color.columnId == col.id
                    )}
                    tasksInCol={tasks.filter(task => task.status === col.id)}
                    handleUpdateTasks={handleUpdateTasksInColumn}
                    column={col} />
                ))
              }
            </SortableContext>

            {createPortal(
              <DragOverlay>
                {activeTask && (
                  <Task
                    className="-rotate-12"
                    task={activeTask}
                  />
                )}
              </DragOverlay>,
              document.body // Need to change the target container to only content page
            )}
          </DndContext>
        )}
        {tabSelected == "task" && criteria.view == "list" && (
          <p>Write List VIew here</p>
        )}
      </div>
    </div >
  )
}


function Item({ title, bgColor, number }: ItemProps) {
  return (
    <div className={cn(`w-full h-full gap-x-2 flex items-center justify-center bg-white border-2 border-white border-b-blue-500	text-blue-500`)}>
      <div className="font-semibold">{title}</div>
      <div className={`${bgColor} p-0.5 text-white text-xs rounded`}>{number}</div>
    </div>
  )
}

export const TaskColumnColors = [
  { columnId: "Default", dotColor: "bg-blue-500", textColor: "text-blue-500", bgTextColor: "bg-blue-100" },
  { columnId: "ToDo", dotColor: "bg-fuchsia-800", textColor: "text-fuchsia-600", bgTextColor: "bg-fuchsia-100" },
  { columnId: "InProgress", dotColor: "bg-pink-500", textColor: "text-pink-500", bgTextColor: "bg-pink-200" },
  { columnId: "Done", dotColor: "bg-green-500", textColor: "text-green-500", bgTextColor: "bg-green-200" }
]



export const columnData: Column[] = [
  { id: "Default", "title": "My Tasks" },
  { id: "ToDo", "title": "To Do" },
  { id: "InProgress", "title": "In Progress" },
  { id: "Done", "title": "Done" },
]

const tasksData: TaskType[] = [
  {
    id: "1",
    title: "Task 1",
    level: "Low",
    userCreated: {
      userId: "Hưng nguyễn",
      image: "https://avatars.githubusercontent.com/u/87338733?v=4"
    },
    status: "Default",
    createdAt: "01 Jan, 2023"
  },
  {
    id: "2",
    title: "Task 2",
    level: "Medium",
    userCreated: {
      userId: "Hưng nguyễn",
      image: "https://avatars.githubusercontent.com/u/87338733?v=4"
    },
    status: "ToDo",
    createdAt: "01 Jan, 2023"
  },
  {
    id: "3",
    title: "Task 3",
    level: "High",
    userCreated: {
      userId: "Hưng nguyễn",
      image: "https://avatars.githubusercontent.com/u/87338733?v=4"
    },
    status: "InProgress",
    createdAt: "01 Jan, 2023"
  },
  {
    id: "4",
    title: "Task 4",
    level: "Medium",
    userCreated: {
      userId: "Hưng nguyễn",
      image: "https://avatars.githubusercontent.com/u/87338733?v=4"
    },
    status: "Default",
    createdAt: "01 Jan, 2023"
  },
  {
    id: "5",
    title: "Task 5",
    level: "High",
    userCreated: {
      userId: "Hưng nguyễn",
      image: "https://avatars.githubusercontent.com/u/87338733?v=4"
    },
    status: "Default",
    createdAt: "01 Jan, 2023"
  }
]

