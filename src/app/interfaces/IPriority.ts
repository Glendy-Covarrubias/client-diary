export interface IPriority {
    value: number;
    name: string;
}

export const catPriority: IPriority[] = [
    { name: 'High', value: 1 },
    { name: 'Half', value: 2 },
    { name: 'low', value: 3 }
]