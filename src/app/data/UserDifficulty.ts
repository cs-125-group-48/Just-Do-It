export class UserDifficulty {
    public armsDifficulty;
    public legsDifficulty;
    public abdominalsDifficulty;
    public chestDifficulty;
    public backDifficulty;
    public shouldersDifficulty;
    public calvesDifficulty;



    constructor(fitnessLevel) {
        var d : number = 0.0;
        switch(fitnessLevel){
            case "7":{ //"Highly Active"
                d = 7;
                break;
            }
            case "5":{ // "Regularly Active"
                d = 5.0;
                break;
            }
            case "1":{ // "Rarely Active"
                d = 3;
                break;
            }
        }

        this.armsDifficulty = d;
        this.legsDifficulty = d;
        this.abdominalsDifficulty = d;
        this.chestDifficulty = d;
        this.backDifficulty = d;
        this.shouldersDifficulty = d;
        this.calvesDifficulty = d;
    }
}