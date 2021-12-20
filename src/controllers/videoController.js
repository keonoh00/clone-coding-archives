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
    const trendingVideos = await videoDB.find({}).sort({ createdAt: "desc" });
    return res.render("home", { pageTitle: "Home", trendingVideos });
  } catch (error) {
    return res.status(404).render("404", { error });
  }
};

export const uploadVideo = (req, res) => {
  return res.render("video/upload", { pageTitle: "Upload Your Video" });
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
    return res
      .status(400)
      .render("video/upload", { pageTitle: "Upload Your Video", errorMessage: error._message });
  }
};

export const watchVideos = async (req, res) => {
  const { id } = req.params;
  const video = await videoDB.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "404: No Video Found" });
  }
  return res.render("video/watch", {
    pageTitle: video.title,
    video,
  });
};

export const editVideos = async (req, res) => {
  const { id } = req.params;
  const video = await videoDB.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "404: No Video Found" });
  }
  return res.render("video/edit", {
    pageTitle: `Edit: ${video.title}`,
    video,
  });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await videoDB.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "404: No Video Found" });
  }
  await videoDB.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: videoDB.formatHashtags(hashtags),
  });
  return res.redirect(`/video/${id}`);
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await videoDB.findByIdAndDelete({ _id: id });
  return res.redirect("/");
};

export const searchVideos = async (req, res) => {
  const { keyword } = req.query;
  let searchResult = [];
  if (keyword) {
    //search for video
    searchResult = await videoDB.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    });
  }
  return res.render("search", { pageTitle: `Search - ${keyword}`, searchResult });
};
