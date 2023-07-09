export class Interval {
    constructor(public readonly durationInSeconds: number, public readonly amount: number) {}
}

const MINUTE = new Interval(60, 1);
const HOUR = new Interval(60 * 60, 1);
export const INTERVALS = [
    { name: 'last_15_minutes', interval: new Interval(MINUTE.durationInSeconds, 15) },
    { name: 'last_1_hour', interval: new Interval(MINUTE.durationInSeconds * 5, 12) },
    { name: 'last_4_hours', interval: new Interval(MINUTE.durationInSeconds * 15, 16) },
    { name: 'last_12_hours', interval: new Interval(HOUR.durationInSeconds, 12) },
];
