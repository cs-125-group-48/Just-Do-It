// Class that stores information about a workout video

import { generate } from 'shortid';

export class VideoData {
    // public name:string;
    public id:string;
    public name:string;
    public url:string;
    public description:string;

    constructor(name:string, url:string) {
		this.setVideo(name, url);
    }
    setVideo(name:string, url:string) {
        this.id = generate();
        this.name = name;
        this.url = url;
    }
}