import Inputs from "../componants/Inputs";
import Videos from "../componants/Videos";
import { useState } from "react";

const Home = () => {
  const [urls, setUrls] = useState([""]);
  return (
    <div className="App">
      <Inputs urls={urls} setUrls={setUrls} />
      <Videos />
    </div>
  );
};

export default Home;
