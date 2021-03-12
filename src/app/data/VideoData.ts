// Class that stores information about a workout video

import { generate } from 'shortid';

export class VideoData {
    // public name:string;
    public id:string;
    public name:string;
    public url:string;
    public description:string;
    public difficulty:number;

    constructor(name:string, url:string) {
		this.setVideo(name, url);
    this.difficulty = 5; // default difficulty
    }
    setVideo(name:string, url:string) {
        this.id = generate();
        this.name = name;
        this.url = url;
    }
}