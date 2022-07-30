export type Weater = 'sunny' | 'rainhy' | 'cloudy' | 'windy' | 'stormy';
export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface Diary {
    id: number,
    date: string,
    weather: Weater,
    visibility: Visibility,
    comment: string
}