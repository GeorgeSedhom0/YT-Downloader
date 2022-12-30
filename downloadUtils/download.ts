import fs from "fs";
import ytdl from "ytdl-core";

const download = async (url: string, title: string) => {
  console.log(`Downloading ${title}...`);
  const download = new Promise((resolve, reject) => {
    ytdl.getInfo(url).then((info) => {
      const format = ytdl.chooseFormat(info.formats, {
        quality: "highestaudio",
      });
      ytdl(url, { format: format })
        .pipe(fs.createWriteStream(`audios/${title}.${format.container}`))
        .on("finish", () => {
          console.log(`Downloaded ${title}`);
          resolve(`${title}.${format.container}`);
        })
        .on("error", () => {
          reject(`Could Not Download ${title}`);
        });
    });
  });
  return await download;
};

export default download;
