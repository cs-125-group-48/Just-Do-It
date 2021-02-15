import Youtube
import YoutubeSecrets

from collections import defaultdict
import json

metadata = defaultdict(list)

def extractYoutubeData(exercise, data):
    if data:
        rank = 0 # Might not need since data is ordered already by Youtube.
        for item in data["items"]:
            video = dict()
            video["url"] = "https://www.youtube.com/watch?v=" + item["id"]["videoId"]
            video["title"] = item["snippet"]["title"]
            video["youtube_description"] = item["snippet"]["description"]
            video["thumbnails"] = item["snippet"]["thumbnails"]
            video["workout_description"] = exercise["fields"]["description"]

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

    for exercise in get_next_exercise("WorkoutExercises.txt", "r"):
        if exercise["model"] == "exercises.exercise" and exercise["fields"]["language"] == 2:
            exercise_tutorial = f"{exercise['fields']['name']} exercise tutorial"
            try:
                data = youtubeAPI.get_results(exercise_tutorial, 15)
            except Exception as e:
                print(e)
            extractYoutubeData(exercise, data)

    # FIXME: Should I write to disk every so often, then merge?
    write_data_to_disk("Metadata.txt", "w")

if __name__ == "__main__":
    main()