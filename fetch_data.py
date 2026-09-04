import os
import json
import requests


def main():
    github_url = "https://raw.githubusercontent.com/hiob-project/hiob-data/main/json_dumps/"
    json_dumps = os.path.join("src", "lib", "data")


    os.makedirs(json_dumps, exist_ok=True)
    file_list = ["verses.json", "passages.json", "midrash.json", "reception.json"]
    for x in file_list:
        url = f"{github_url}{x}"
        data = requests.get(url).json()
        save_path = os.path.join(json_dumps, x)
        print(f"downloading {url} and saving it to {save_path}")
        with open(save_path, "w", encoding="utf-8") as fp:
            json.dump(data, fp, ensure_ascii=False)


if __name__ == "__main__":
    main()
