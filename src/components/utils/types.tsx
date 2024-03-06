
export interface basicHabitObject  {
    [property:string]:string
}
export interface DateRange  {
    startDate: Date,
    endDate: Date,
    key: string,
};

export type PositiveMeasure = {
    percentage: number;
    habitValue: number;
    habitResult: number;
    habitExpectedResult: number;
};

export type Habit = {
    id: string;
    name: string;
    type: string;
    category: string;
    target: basicHabitObject;
    habitDate: {
        startDate: string;
        endDate: string;
        key: string;
    };
    currentDate: string;
    expectedResults: basicHabitObject[];
    identity: basicHabitObject;
    actionSystem: basicHabitObject;
    positiveMeasure: PositiveMeasure;
    place: string;
    habitRange: habitRange
};

export interface habitRange{
    current: number;
    total: number;
}
