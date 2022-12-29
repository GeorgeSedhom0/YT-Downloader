import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./App.css";
import { Input } from "@mui/material";

const isValidUrl = (url: string) => {
  // validate youtube url
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "(www.)?" + // www
      "(youtube.com|youtu.be)" // domain name
  );
  return !!pattern.test(url);
};

function App() {
  const [numberOfVideos, setNumberOfVideos] = useState(0);
  const [urls, setUrls] = useState([""]);

  return (
    <div className="App">
      <h1>Welcome to YouTube Downloader</h1>
      <h2>
        Enter the URL of the video or playlist you want to download for now you
        can only download audios
      </h2>
      <h3>You can add more than one URL using the button below</h3>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {urls.map((url, index) => (
          <div key={index}>
            <Input
              type="text"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => {
                const newUrls = [...urls];
                newUrls[index] = e.target.value;
                setUrls(newUrls);
              }}
            />
          </div>
        ))}

        <button
          onClick={() => {
            const newUrls = [...urls];
            newUrls.push("");
            setUrls(newUrls);
          }}
        >
          <AddIcon />
        </button>
        <button
          onClick={() => {
            const newUrls = [...urls];
            newUrls.splice(0, 1);
            setUrls(newUrls);
          }}
        >
          <RemoveIcon />
        </button>
      </div>
    </div>
  );
}

export default App;
