import isValidUrl from "../utils/isValidUrl";
import Divider from "@mui/material/Divider";
import LoadingButton from "@mui/lab/LoadingButton";
import Tooltip from "@mui/material/Tooltip";
import { useState, useEffect } from "react";
import { MenuItem, Select } from "@mui/material";

interface Video {
  title: string;
  url: string;
  state: string;
  time: string;
  formats: string[];
  selectedFormat: string;
}

const Videos: React.FC<{
  urls: string[];
  setUrls: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ urls, setUrls }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  let disableButton = false;

  for (let i = 0; i < urls.length; i++) {
    if (!isValidUrl(urls[i])) {
      disableButton = true;
    }
  }

  const getVideos = async () => {
    setLoading(true);
    if (disableButton) return;
    if (urls.length === 0) return;

    const videos: Video[] = [];
    const response = await fetch(`http://localhost:3000/getinfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ urls: urls }),
    });
    const data = await response.json();

    data.forEach((video: Video) => {
      video.state = "Pending";
      video.time = "0";
      video.selectedFormat = "Auto (Best Audio)";
    });

    videos.push(...data);

    setLoading(false);
    setVideos(videos);
  };

  const download = async () => {
    if (disableButton) return;
    if (urls.length === 0) return;
    setLoading(true);

    const getProgress = async () => {
      const response = await fetch(`http://localhost:3000/progress`);
      const data = await response.json();
      setVideos(data.progress);
    };

    // send All the videos to the backend

    const res = await fetch(`http://localhost:3000/setFormats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videos: videos }),
    });
    const theData = await res.json();
    console.log(theData);

    const progressInterval = setInterval(getProgress, 5000);
    const response = await fetch(`http://localhost:3000/download`);
    const data = await response.json();

    clearInterval(progressInterval);

    setLoading(false);
    // console.log(data);
    setVideos(data.progress);
  };

  return (
    <div>
      <Tooltip
        title={
          disableButton ? "Please enter a valid URL" : "Download the videos"
        }
      >
        <span>
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={getVideos}
            disabled={disableButton || loading}
          >
            Detect Videos
          </LoadingButton>
        </span>
      </Tooltip>
      {videos.length > 0 && (
        <>
          <h4>Videos Detected</h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "10px",
              maxHeight: "50vh",
              overflow: "auto",
              border: "5px solid #444",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            {videos.map((video, index) => (
              <div key={index}>
                <h5>Title: {video.title}</h5>
                <p>Link: {video.url}</p>
                <p>State: {video.state}</p>
                <p>Time: {video.time}</p>
                <Select
                  value={videos[index].selectedFormat}
                  onChange={(e) => {
                    const newVideos = [...videos];
                    newVideos[index].selectedFormat = e.target.value as string;
                    setVideos(newVideos);
                  }}
                >
                  <MenuItem value={"Auto (Best Audio)"}>
                    Auto (Best Audio)
                  </MenuItem>
                  {video.formats &&
                    video.formats.map((format, index) => (
                      <MenuItem key={index} value={format}>
                        {format}
                      </MenuItem>
                    ))}
                </Select>
                <Divider />
              </div>
            ))}
          </div>
        </>
      )}
      <LoadingButton
        loading={loading}
        variant="contained"
        disabled={videos.length === 0 || loading}
        onClick={download}
      >
        Download
      </LoadingButton>
    </div>
  );
};

export default Videos;
