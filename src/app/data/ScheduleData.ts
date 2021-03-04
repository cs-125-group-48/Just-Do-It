// class to store data about user schedule

export class ScheduleData {
    public daysFree;
    public startTime:string;
    public endTime:string;
    public focus;
    public endDate:string;

    constructor(daysFree, startTime:string, endTime:string, focus, endDate:string) {
        this.daysFree = daysFree;
        this.startTime = startTime;
        this.endTime = endTime;
        this.focus = focus;
        this.endDate = endDate;
    }
}