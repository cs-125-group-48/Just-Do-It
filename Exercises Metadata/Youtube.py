import json
import time

from urllib.request import Request, urlopen
from urllib.parse import urlencode


class YoutubeAPI:
    BASE_URL = "https://youtube.googleapis.com/youtube/v3"

    def __init__(self, api_key):
        self.api_key = api_key

    def build_url(self, query, max_res):
        query_params = [
            ('key', self.api_key), ('part', 'snippet'),
            ('type', 'video'), ('maxResults', str(max_res)),
            ('q', query)
        ]

        url = self.BASE_URL + "/search?" + urlencode(query_params)

        return url

    def get_results(self, query, max_res):
        time.sleep(2)
        url = self.build_url(query, max_res)
        resp = None

        try:
            req = Request(url)
            resp = urlopen(req)
            json_txt = resp.read().decode(encoding = "utf-8")
            return json.loads(json_txt)

        finally:
            if resp != None:
                resp.close()