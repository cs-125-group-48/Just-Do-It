import Youtube
import YoutubeSecrets

from collections import defaultdict
import json

metadata = defaultdict(list)

WORKOUT_CATEGORIES = {8: "Arms", 9: "Legs", 10: "Abdominals", 11: "Chest", 12: "Back", 13: "Shoulders", 14: "Calves"}

def extractYoutubeData(exercise, bases, youtube_data):
    if youtube_data:
        rank = 0 # Might not need since data is ordered already by Youtube.

        # Add category as first element, and workout description as second element.
        for base in bases:
            if base["pk"] == exercise["fields"]["exercise_base"] and exercise["fields"]["name"] not in metadata:
                category = WORKOUT_CATEGORIES[base["fields"]["category"]]
                workout_description = exercise["fields"]["description"]
                metadata[exercise["fields"]["name"]].append(category)
                metadata[exercise["fields"]["name"]].append(workout_description)
                break

        # IMPLEMENT: Add other info like exact muscles and equipment needed.
        for item in youtube_data["items"]:
            video = dict()
            video["url"] = "https://www.youtube.com/watch?v=" + item["id"]["videoId"]
            video["title"] = item["snippet"]["title"]
            video["youtube_description"] = item["snippet"]["description"]
            video["thumbnails"] = item["snippet"]["thumbnails"]

            metadata[exercise["fields"]["name"]].append(video)

def write_data_to_disk(file_name, mode):
    with open(file_name, mode) as file:
        json.dump(metadata, file)

def get_next_exercise(file_name, mode):
    with open(file_name, mode) as file:
        exercises = json.load(file)

        for exercise in exercises:
            yield exercise

def main():
    youtubeAPI = Youtube.YoutubeAPI(YoutubeSecrets.API_KEY)

    base_file = open("ExerciseBase.txt")
    bases = json.load(base_file)

    for exercise in get_next_exercise("WorkoutExercises.txt", "r"):
        if exercise["model"] == "exercises.exercise" and exercise["fields"]["language"] == 2 and exercise["pk"] >= 626:
            exercise_tutorial = f"{exercise['fields']['name']} exercise tutorial"
            try:
                youtube_data = youtubeAPI.get_results(exercise_tutorial, 15)
                extractYoutubeData(exercise, bases, youtube_data)
            except Exception as e:
                print(exercise["fields"]["name"])

    base_file.close()
    # FIXME: Should I write to disk every so often, then merge?
    write_data_to_disk("Metadata2.txt", "w")

if __name__ == "__main__":
    main()