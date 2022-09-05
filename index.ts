import fs from "fs";
import getVideos from "./getVideos";
import download from "./download";

fs.existsSync("audios") ? null : fs.mkdirSync("audios");

const urls = [
  "https://www.youtube.com/watch?v=VLMo0rthnoo&list=PLogBXxHVJONBiVt5ZZ231QaoN4XSimF6P",
];

const downloadAll = async (url: string) => {
  try {
    const videos = await getVideos(url);
    for (const video of videos) {
      const result = await download(video.url, video.title);
      console.log(result);
    }
  } catch (err) {
    console.log("download failed", err);
  }
};

urls.forEach((url) => downloadAll(url));
