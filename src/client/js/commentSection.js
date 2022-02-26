// Need this to used async await in frontend
import regeneratorRuntime from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");

const handleSubmit = async (event) => {
  event.preventDefault();
  const videoID = videoContainer.dataset.videoid;
  const text = textarea.value;
  const body = JSON.stringify({ text });
  const response = await fetch(`/api/videos/${videoID}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  console.log(response);
  textarea.value = "";
  window.location.reload();
};

form.addEventListener("submit", handleSubmit);
