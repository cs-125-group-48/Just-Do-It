// Class that stores user profile data that is collected from the survey page

export class ProfileData {
	name:string;
	birthdate:string;
	weight:string;
	height:string;
	fitnessLevel:string;

	constructor() {
		this.name = "Unknown"
	}

	updateProfile(name:string, birthdate:string, weight:string, height:string, fitnessLevel:string) {
		this.name = name;
		this.birthdate = birthdate;
		this.weight = weight;
		this.height = height;
		this.fitnessLevel = fitnessLevel;
	}
}
