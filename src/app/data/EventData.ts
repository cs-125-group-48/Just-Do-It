// class to store data about event for the user's schedule

export class EventData {
    public title:string;
    public startTime:string;
    public endTime:string;
    public type:string;

    setEvent(title:string, startTime:string, endTime:string, type:string) {
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
        this.type = type;
    }
}