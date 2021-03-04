// Class that stores information about a workout/exercise (from the collected meta data)
import { generate } from 'shortid';
import { VideoData } from 'src/app/data/VideoData';

export class WorkoutData {
    // public name:string;
    public id:string;
    public name:string; // name of workout
    public type:string; // type of workout ex: Arms, Legs, etc
    public description:string; // description of workout
    public videos:Array<VideoData>; // list of youtube links to workouts

    constructor(name:string, type:string, description:string, videos:any[]) {
        this.videos = [];
		this.setWorkout(name, type, description, videos)
    }

    setWorkout(name:string, type:string, description:string, videos:any[]) {
        this.id = generate();
        this.name = name;
        this.type = type;
        this.description = description;
        videos.forEach( item => { // creating array of videos 
            let video = new VideoData(item["title"], item["url"]);
            this.videos.push(video);
        })
    }
}