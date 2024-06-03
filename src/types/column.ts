export type columnId = string | "Default" | "ToDo" | "InProgress" | "Done";

export interface Column {
    title: string
    id: columnId | number
}