import ytpl from "ytpl";
import ytdl from "ytdl-core";

export interface video {
  url: string;
  title: string;
  formats: string[];
}

const makeValidName = (name: string) => {
  return name.replace(/[^a-zA-Z0-9 ]/g, "_");
};

const getVideos = async (url: string): Promise<video[]> => {
  if (!ytdl.validateURL(url)) throw new Error("Invalid URL");

  if (ytpl.validateID(url)) {
    console.log("Playlist");
    let playlist = (await ytpl(url)).items;
    const playListData: video[] = [];
    for (let i = 0; i < playlist.length; i++) {
      const info = await ytdl.getInfo(playlist[i].shortUrl);
      playListData[i] = {
        url: playlist[i].shortUrl,
        title: makeValidName(info.videoDetails.title),
        formats: info.formats.map((format) => {
          if (format.width && format.height) {
            return `${format.container} ${format.width || "0"}X${
              format.height || "0"
            }`;
          } else {
            return `Unknown`;
          }
        }),
      };
    }
    return playListData;
  } else {
    console.log("Single Video");
    const info = await ytdl.getInfo(url);
    console.log(info.formats);
    return [
      {
        url: url,
        title: makeValidName(
          await ytdl.getBasicInfo(url).then((info) => info.videoDetails.title)
        ),
        formats: info.formats.map(
          (format) =>
            `${format.container} ${format.width || "0"}X${format.height || "0"}`
        ),
      },
    ];
  }
};

export default getVideos;
