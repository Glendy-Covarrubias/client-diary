/*export type Weater = 'sunny' | 'rainhy' | 'cloudy' | 'windy' | 'stormy';
export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface Diary {
    id: number,
    date: string,
    weather: Weater,
    visibility: Visibility,
    comment: string
}*/

export interface Diary {
    id: number,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    priority: number,
    status: any,
    description: string,
    ownerId: number
}

export class DataDiary {
    constructor(
        public id: number,
        public name: string,
        public priority: number,
        public status: any,
        public description: string,
        public ownerId: number
    ) {
    }
}