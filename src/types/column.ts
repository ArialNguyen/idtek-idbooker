export type ColumnId = string | "Default" | "ToDo" | "InProgress" | "Done";

export interface Column {
    title: string
    id: ColumnId | number
}