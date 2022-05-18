declare type TodoList = {
    name: string;
    description: string;
    done: boolean;
    updatedAt: string;
    createdAt: string;
    completedAt: string;
}[];
export declare const write: (todoItem: Partial<TodoList[number]>, length?: number) => Promise<void>;
export {};
