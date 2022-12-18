import fs from "fs";
import getVideos from "./downloadUtils/getVideos";
import { video } from "./downloadUtils/getVideos";
import download from "./downloadUtils/download";
// import express and create a server
import express from "express";

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.json());

// default route to serve static html file

app.use(express.static("front-end"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

fs.existsSync("audios") ? null : fs.mkdirSync("audios");

let YTUrls: string[] = [];

let progress = "";

let time = Date.now();

const downloadAll = async (url: string) => {
  try {
    const videos = await getVideos(url);

    for (const video of videos) {
      let timeElapsed = Date.now() - time;
      timeElapsed = Math.floor(timeElapsed / 1000);
      const timeElapsedString =
        timeElapsed > 60
          ? `${Math.floor(timeElapsed / 60)} minutes`
          : `${timeElapsed} seconds`;
      progress += `Downloading ${video.title}... Time Passed: ${timeElapsedString}\n`;

      const result = await download(video.url, video.title);

      let timeElapsed2 = Date.now() - time;
      timeElapsed2 = Math.floor(timeElapsed2 / 1000);
      const timeElapsedString2 =
        timeElapsed2 > 60
          ? `${Math.floor(timeElapsed2 / 60)} minutes`
          : `${timeElapsed2} seconds`;

      progress += `Downloadded ${result} Time Passed: ${timeElapsedString2}\n`;
    }
  } catch (err) {
    console.log("download failed", err);
  }
};

app.post("/getinfo", async (req, res) => {
  const urls = req.body.urls;
  const videos: video[] = [];
  for (const url of urls) {
    const video = await getVideos(url);
    videos.push(...video);
  }
  YTUrls = urls;
  res.send(videos);
});

app.get("/download", async (req, res) => {
  // reset time to 0
  time = Date.now();

  for (const url of YTUrls) {
    await downloadAll(url);
  }

  let timeElapsed = Date.now() - time;
  timeElapsed = Math.floor(timeElapsed / 1000);
  const timeElapsedString =
    timeElapsed > 60
      ? `${Math.floor(timeElapsed / 60)} minutes`
      : `${timeElapsed} seconds`;

  const finalProgress = `${progress} ALL DONE!! Time Passed: ${timeElapsedString}`;
  res.send({ progress: finalProgress });
  progress = "";
});

app.get("/progress", (req, res) => {
  res.send({ progress });
});
