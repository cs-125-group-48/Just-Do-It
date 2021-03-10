// class to store data about event for the user's schedule

export class EventData {
    public title:string;
    public startTime:Date;
    public endTime:Date;
    public type:string;
    public workoutid:string;
    public completed:boolean;
    public id;

    static id = 0; // temp way to create id maybe change later
    _id = ++EventData.id; // increment class id

    constructor(title:string, startTime:Date, endTime:Date, type:string, workoutid:string) {
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
        this.type = type;
        this.workoutid = workoutid;
        this.completed = false;
        this.id = this._id;
    }
}