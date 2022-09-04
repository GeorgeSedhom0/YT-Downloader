import ytpl from "ytpl";
import ytdl from "ytdl-core";

interface video {
  url: string;
  title: string;
}

const makeValidName = (name: string) => {
  return name.replace(/[^a-zA-Z0-9 ]/g, "_");
};

const getVideos = async (url: string) => {
  if (ytpl.validateID(url)) {
    const playlist = (await ytpl(url)).items;
    return playlist.map((video) => {
      return { url: video.shortUrl, title: makeValidName(video.title) };
    });
  } else {
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
