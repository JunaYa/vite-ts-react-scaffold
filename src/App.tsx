import React, { useState } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import './App.css';
import dayjs from 'dayjs';

function App() {
  const [videoSrc, setVideoSrc] = useState('');
  const [message, setMessage] = useState('Click Start to transcode');
  const [fileVideo, setFileVideo] = useState<File | null>(null);
  const [fileWatermark, setFileWaterMark] = useState<File | null>(null);


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files?.item(0))
    setFileVideo(e.target.files?.item(0) || null);
  }

  const onChangeWatermark = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileWaterMark(e.target.files?.item(0) || null);
  }

  const getFileInfo = (file: File) => {
    return {
      name: file.name,
      type: file.type,
      newname: 'test.mp4',
      sufix: file.type.split('/')[1],
      size: file.size,
      lastModified: file.lastModified,
    }
  }

  const ffmpeg = createFFmpeg();
  const doTranscode = async () => {
    if (!fileVideo || !fileWatermark) {
      setMessage('Please select a file');  
      return
    }
    setMessage('Loading ffmpeg-core.js');
    await ffmpeg.load();
    setMessage('Start transcoding');
    const videoInfo = getFileInfo(fileVideo);
    ffmpeg.FS('writeFile', videoInfo.name, await fetchFile(fileVideo));
    ffmpeg.FS('writeFile', 'watermark.png', await fetchFile(fileWatermark));
    console.log('watermark start', dayjs().format('YYYY-MM-DD HH:mm:ss'))
    await ffmpeg.run('-i', videoInfo.name, '-i', 'watermark.png', '-filter_complex', 'overlay', '-max_muxing_queue_size', '9999', videoInfo.newname);
    console.log('watermark end', dayjs().format('YYYY-MM-DD HH:mm:ss'))
    setMessage('Complete transcoding');
    console.log('readFile start', dayjs().format('YYYY-MM-DD HH:mm:ss'))
    const data = ffmpeg.FS('readFile', videoInfo.newname);
    console.log('readFile end', dayjs().format('YYYY-MM-DD HH:mm:ss'))
    setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
  };
  
  return (
    <div className="App">
      <input type="file" onChange={onChange} />
      <input type="file" onChange={onChangeWatermark} />
      <video src={videoSrc} controls></video><br/>
      <button onClick={doTranscode}>Start</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
