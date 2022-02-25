const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");

const handleSubmit = async (event) => {
  event.preventDefault();
  const videoID = videoContainer.dataset.videoid;
  const text = textarea.value;
  const body = JSON.stringify({ text });
  console.log(textarea.value);
  await fetch(`/api/videos/${videoID}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  textarea.value = "";
};

form.addEventListener("submit", handleSubmit);
