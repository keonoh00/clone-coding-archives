import res from "express/lib/response";
import videoDB from "../models/video";
import userDB from "../models/user";
import commentDB from "../models/comment";

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
    const trendingVideos = await videoDB
      .find({})
      .populate("owner")
      .sort({ createdAt: "desc" });

    return res.render("home", { pageTitle: "Home", trendingVideos });
  } catch (error) {
    return res.status(404).render("404", { error });
  }
};

export const uploadVideo = (req, res) => {
  if (!req.session.user) {
    req.flash("notification", "Login to Upload");
    return res.status(403).redirect("/login");
  }
  return res.render("video/upload", { pageTitle: "Upload Your Video" });
};

export const postUpload = async (req, res) => {
  const { video, thumb } = req.files;
  const { _id } = req.session.user;
  const { title, description, hashtags } = req.body;
  if (!req.session.user) {
    req.flash("notification", "Login to Upload");
    return res.status(403).redirect("/login");
  }
  if (!video) {
    res.render("404", {
      pageTitle: "400: Server Error",
      errorMessage: "Server Problem Occured",
    });
  }
  try {
    const newVideo = await videoDB.create({
      title,
      description,
      hashtags: videoDB.formatHashtags(hashtags),
      thumbUrl: thumb[0].path,
      videoUrl: video[0].path,
      owner: _id,
    });
    const user = await userDB.findById(_id);
    user.createdVideos.push(newVideo);
    user.save();
    return res.redirect("/");
  } catch (error) {
    req.flash("notification", error._message);
    return res.status(400).redirect("/video/upload");
  }
};

export const watchVideos = async (req, res) => {
  const { id } = req.params;
  const video = await videoDB
    .findById(id)
    .populate("owner")
    .populate("comments");
  if (!video) {
    return res.status(404).render("404", { pageTitle: "404: No Video Found" });
  }
  return res.render("video/watch", {
    pageTitle: video.title,
    video,
    loggedInUserID: req.session.user ? req.session.user._id : "",
  });
};

export const editVideos = async (req, res) => {
  const { id } = req.params;
  const video = await videoDB.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "404: No Video Found" });
  }
  if (
    !req.session.user ||
    String(video.owner) !== String(req.session.user._id)
  ) {
    return res.status(403).redirect(``);
  }
  return res.render("video/edit", {
    pageTitle: `Edit: ${video.title}`,
    video,
  });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const { video, thumb } = req.files;
  // const video = await videoDB.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "404: No Video Found" });
  }
  if (
    !req.session.user ||
    String(video.owner) !== String(req.session.user._id)
  ) {
    req.flash("notification", "You are not Autorized");
    return res.status(403).redirect(`video/${id}`);
  }
  if (videoFile) {
    await videoDB.findByIdAndUpdate(id, {
      title,
      description,
      videoUrl: video[0].path,
      hashtags: videoDB.formatHashtags(hashtags),
    });
  } else {
    await videoDB.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: videoDB.formatHashtags(hashtags),
    });
  }
  return res.redirect(`/video/${id}`);
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const video = videoDB.findById(id);
  if (
    !req.session.user ||
    String(video.owner) !== String(req.session.user._id)
  ) {
    req.flash("notification", "You are not Autorized");
    return res.status(403).redirect(`video/${id}`);
  }
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
  return res.render("search", {
    pageTitle: `Search - ${keyword}`,
    searchResult,
  });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await videoDB.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const registerComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;
  const video = await videoDB.findById(id);
  if (!video) {
    res.flash("notification", "Cannot find video");
    return res.sendStatus(404);
  }
  console.log(text);
  const comment = await commentDB.create({
    text,
    video: id,
    owner: user._id,
  });
  video.comments.push(comment._id);
  video.save();
  return res.sendStatus(201);
};
