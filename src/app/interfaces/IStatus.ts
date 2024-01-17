export interface IStatus {
    value: number;
    name: string;
}

export const catStatus: IStatus[] = [
    { name: 'Process', value: 1 },
    { name: 'Stopped', value: 2 },
    { name: 'Done', value: 3 }
]