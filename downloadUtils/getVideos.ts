import ytpl from "ytpl";
import ytdl from "ytdl-core";

export interface video {
  url: string;
  title: string;
}

const makeValidName = (name: string) => {
  return name.replace(/[^a-zA-Z0-9 ]/g, "_");
};

const getVideos = async (url: string): Promise<video[]> => {
  if (!ytdl.validateURL(url)) throw new Error("Invalid URL");

  if (ytpl.validateID(url)) {
    console.log("Playlist");
    const playlist = (await ytpl(url)).items;
    return playlist.map((video) => {
      return { url: video.shortUrl, title: makeValidName(video.title) };
    });
  } else {
    console.log("Single Video");
    return [
      {
        url: url,
        title: makeValidName(
          await ytdl.getBasicInfo(url).then((info) => info.videoDetails.title)
        ),
      },
    ];
  }
};

export default getVideos;
