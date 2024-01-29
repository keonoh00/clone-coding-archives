import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
// Button to press for start recording
// By pressing the video able to access to the camera
// Button to stop recording --> after 5 seconds recording stops
// After recording, users can download the video file and upload the video
const recBtn = document.getElementById("recBtn");
const recPreview = document.getElementById("recPreview");
let stream;
let recorder;
let videoFile;

// For initiating preview camera
const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { width: 480, height: 480 },
  });
  recPreview.srcObject = stream;
  recPreview.play();
};

init();

const handleDownload = async (event) => {
  recBtn.removeEventListener("click", handleDownload);
  recBtn.disable = true;
  recBtn.innerText = "Downloading...";

  // File Obj
  const files = {
    webm: "temp.webm",
    mp4: "Recording.mp4",
    thumb: "thumbnail.jpg",
  };

  // Downloading function --> repetitive
  const downloadFunc = (output, blobProp) => {
    const downloadingFile = ffmpeg.FS("readFile", output);
    const fileBlob = new Blob([downloadingFile.buffer], blobProp);
    const fileURL = URL.createObjectURL(fileBlob);
    const fileDownload = document.createElement("a");
    fileDownload.href = fileURL;
    fileDownload.download = output;
    document.body.appendChild(fileDownload);
    fileDownload.click();
    URL.revokeObjectURL(fileURL);
    ffmpeg.FS("unlink", output);
  };

  // Use ffmpeg with web assembly and make the browser to convert extension of the video
  // Transcoding video for compatibility and file size choice for the user
  const ffmpeg = createFFmpeg({
    log: true,
  });
  await ffmpeg.load();

  // Creating mp4 file from webm
  ffmpeg.FS("writeFile", files.webm, await fetchFile(videoFile));
  await ffmpeg.run("-i", files.webm, "-r", "30", files.mp4);
  downloadFunc(files.mp4, { type: "video/mp4" });

  // Creating Thumbnail at 00:00:00 --> Video may be shorter than 1 sec
  await ffmpeg.run(
    "-i",
    files.webm,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    files.thumb
  );
  downloadFunc(files.thumb, { type: "image/jpg" });

  ffmpeg.FS("unlink", files.webm);

  URL.revokeObjectURL(videoFile);

  recBtn.innerText = "Record Again";
  recBtn.disable = false;
  recBtn.addEventListener("click", handleStartRec);
};

const handleStopRec = (event) => {
  recBtn.innerText = "Download Recording";
  recBtn.removeEventListener("click", handleStopRec);
  recBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStartRec = (event) => {
  recBtn.innerText = "Stop Recording";
  recBtn.removeEventListener("click", handleStartRec);
  recBtn.addEventListener("click", handleStopRec);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    recPreview.srcObject = null;
    recPreview.src = videoFile;
    recPreview.loop = true;
    recPreview.play();
  };
  recorder.start();
};

recBtn.addEventListener("click", handleStartRec);
