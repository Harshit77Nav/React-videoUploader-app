import React, { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import loader from "./loader.gif";
import "./uploader.css";

function Uploader() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [videoURL, setVideoURL] = useState();
  const [dropzone, setDropzone] = useState(true);

  const api_endpoint =
    "https://fpraxslqag.execute-api.eu-north-1.amazonaws.com/default/getUploaderURL";

  const handleSubmit = async (files) => {
    setDropzone(false);
    setLoading(true);
    let videofile = files[0];

    // getting url for upload
    const response = await axios({
      url: api_endpoint,
      method: "GET",
    });

    // const onUploadProgress = (event) => {
    //   const percentage = Math.round((100 * event.loaded) / event.total);
    //   setBar(percentage);
    //   console.log(percentage);
    // };

    // let formData = new FormData();
    // formData.append("file", videofile['file']);

    //  const result = await axios.put(response.data.uploadURL, videofile['file'], {
    //   headers: {
    //     "Content-Type": "singlepart/form-data",
    //   },
    //   onUploadProgress,
    // })
    // .then((res)=>{
    //   console.log(res);
    // })

    const result = await fetch(response.data.uploadURL, {
      method: "PUT",
      body: videofile["file"],
    });

    if (result) {
      setVideoURL(result.url.split("?")[0]);
      setShow(true);
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <h1>React Video Uploader App</h1>
    <div className="container">
      <div>{loading && 
          <div>
            <h2>Uploading please wait..</h2>
            <img className="loader" src={loader} alt=""/>
          </div>  }
      </div>
      <div>
        {show && (
          <div className="videobox">
            <video controls autoPlay width={"800px"} height={"400px"}>
              <source src={videoURL} type="video/mp4" />
            </video>
          </div>
        )}
      </div>
        {dropzone && (
          <div className="dropzone">
           <h2>You Can Upload a Video File</h2>
            <Dropzone
              onSubmit={handleSubmit}
              maxFiles={1}
              multiple={false}
              canCancel={false}
              accept="video/mp4"
              inputContent="Drop A File or Click to select"
              styles={{
                dropzone: { width: 800, height: 200 },
                dropzoneActive: { borderColor: "green" },
              }}
            />
          </div>)
          }
        
    </div>
    </div>
  );
}

export default Uploader;
