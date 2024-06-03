import { columnId } from "@/types/column"

export interface TaskType {
    id: string | number
    title: string,
    level: "Low" | "Medium" | "High"
    userCreated: {
        userId: string
        image: string
    },
    status: columnId | number
    createdAt: string
}

