import ytdl from "ytdl-core";
import fs from "fs";
import getVideos from "./getVideos";

fs.existsSync("audios") ? null : fs.mkdirSync("audios");

const urls = [
  "https://www.youtube.com/watch?v=qRaysF60hOc&list=PL9SbZPwhBPI3zM8vDi0XtI4gizNxgn1qQ",
];
const download = async (url: string) => {
  try {
    const videos = await getVideos(url);
    videos.forEach(async (video) => {
      console.log(`Downloading ${video.title}...`);
      ytdl(video.url, { filter: "audioonly" }).pipe(
        fs.createWriteStream(`audios/${video.title}.mp3`)
      );
      console.log(`Done`);
    });
  } catch (err) {
    console.log("download failed", err);
  }
};

urls.forEach((url) => download(url));
