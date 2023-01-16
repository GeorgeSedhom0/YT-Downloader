import fs from "fs";
import ytdl from "ytdl-core";

const download = async (url: string, title: string, format: string) => {
  console.log(`Downloading ${title}...`);
  const download = new Promise((resolve, reject) => {
    ytdl.getInfo(url).then((info) => {
      let requiredFormat: ytdl.videoFormat;
      if (format === "Auto (Best Audio)") {
        requiredFormat = ytdl.chooseFormat(info.formats, {
          quality: "highestaudio",
        });
      } else {
        const requiredContainer = format.split(" ")[0];
        const requiredWidth = parseInt(format.split(" ")[1].split("X")[0]);
        const requiredHeight = parseInt(format.split(" ")[1].split("X")[1]);
        console.log(requiredContainer, requiredWidth, requiredHeight);

        requiredFormat =
          info.formats.find(
            (format) =>
              format.container === requiredContainer &&
              format.width === requiredWidth &&
              format.height === requiredHeight
          ) ||
          ytdl.chooseFormat(info.formats, {
            quality: "lowestvideo",
          });
      }

      ytdl(url, { format: requiredFormat })
        .pipe(
          fs.createWriteStream(`audios/${title}.${requiredFormat.container}`)
        )
        .on("finish", () => {
          console.log(`Downloaded ${title}`);
          resolve(`${title}.${requiredFormat.container}`);
        })
        .on("error", () => {
          reject(`Could Not Download ${title}`);
        });
    });
  });
  return await download;
};

export default download;
