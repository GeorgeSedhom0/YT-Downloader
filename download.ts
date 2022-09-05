import fs from "fs";
import ytdl from "ytdl-core";

const download = async (url: string, title: string) => {
  console.log(`Downloading ${title}...`);
  const download = new Promise((resolve, reject) => {
    ytdl(url, { filter: "audioonly" })
      .pipe(fs.createWriteStream(`audios/${title}.mp3`))
      .on("finish", () => {
        resolve(`Downloaded ${title}`);
      })
      .on("error", () => {
        reject(`Could Not Download ${title}`);
      });
  });
  return await download;
};

export default download;
