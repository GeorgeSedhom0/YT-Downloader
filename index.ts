import ytdl from "ytdl-core";
import fs from "fs";
import ytlist from "./node_modules/youtube-playlist/index";

console.log(ytlist);

const download = async (url: string) => {
  try {
    const videoName = (await ytdl.getBasicInfo(url)).videoDetails.title;
    const vid = videoName.replace(/[^a-z0-9]/gi, "_");
    console.log(vid);
    ytdl(url, { filter: "audioonly" }).pipe(
      fs.createWriteStream(`vids/${vid}.mp4`)
    );
  } catch (err) {
    console.log(err);
  }
};

download(
  "https://www.youtube.com/watch?v=Tbb-uPCU8zg&list=RDTbb-uPCU8zg&start_radio=1"
);
