import res from "express/lib/response";
import videoDB from "../models/video";

/*
Call Back Style
videoDB.find({}, (error, videos) => {
  if (error) {
    return res.render("server-error");
  }
  return res.render("home", { pageTitle: "Home", videos });
});

Promise Style
try {
  const videos = await videoDB.find({});
  return res.render("home", { pageTitle: "Home", trendingVideos: [] });
} catch (error) {
  return res.render("server-error", { error });
}
*/

export const home = async (req, res) => {
  try {
    const trendingVideos = await videoDB.find({});
    return res.render("home", { pageTitle: "Home", trendingVideos });
  } catch (error) {
    return res.render("server-error", { error });
  }
};

export const uploadVideo = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Your Video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await videoDB.create({
      title,
      description,
      hashtags: videoDB.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("upload", { pageTitle: "Upload Your Video", errorMessage: error._message });
  }
};

export const watchVideos = async (req, res) => {
  const { id } = req.params;
  const video = await videoDB.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "404: No Video Found" });
  }
  return res.render("watch", {
    pageTitle: video.title,
    video,
  });
};

export const editVideos = async (req, res) => {
  const { id } = req.params;
  const video = await videoDB.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "404: No Video Found" });
  }
  return res.render("edit", {
    pageTitle: `Edit: ${video.title}`,
    video,
  });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await videoDB.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "404: No Video Found" });
  }
  await videoDB.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: videoDB.formatHashtags(hashtags),
  });
  return res.redirect(`/video/${id}`);
};

export const searchVideos = (req, res) => {
  return res.send("Searching...");
};

export const deleteVideo = (req, res) => {
  return res.send(`Delete Video with ID: ${req.params.id}`);
};
