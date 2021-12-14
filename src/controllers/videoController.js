const fakeUserObj = {
  username: "devUser",
  loggedIn: false,
};

const fakeVideos = [
  {
    title: "Vid #1",
    rating: 5,
    comments: 2,
    created: "2 minutes ago",
    views: 1,
    id: 1,
  },
  {
    title: "Vid #2",
    rating: 3.2,
    comments: 2,
    created: "2 minutes ago",
    views: 8459,
    id: 2,
  },
  {
    title: "Vid #3",
    rating: 1.4,
    comments: 2,
    created: "2 minutes ago",
    views: 30,
    id: 3,
  },
  {
    title: "Vid #4",
    rating: 2,
    comments: 2,
    created: "2 minutes ago",
    views: 10094,
    id: 4,
  },
  {
    title: "Vid #5",
    rating: 3.2,
    comments: 2,
    created: "2 minutes ago",
    views: 248439,
    id: 5,
  },
  {
    title: "Vid #6",
    rating: 5,
    comments: 2,
    created: "2 minutes ago",
    views: 234329,
    id: 6,
  },
];

export const trendingVideos = (req, res) => {
  return res.render("home", {
    pageTitle: "Home",
    user: fakeUserObj,
    trendingVideos: fakeVideos,
  });
};

export const watchVideos = (req, res) => {
  const { id } = req.params;
  const video = fakeVideos[id - 1];
  return res.render("watch", {
    pageTitle: video.title,
    user: fakeUserObj,
    video,
  });
};

export const editVideos = (req, res) => {
  const { id } = req.params;
  const video = fakeVideos[id - 1];
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, user: fakeUserObj, video });
};

export const postEdit = (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  return res.redirect(`/video/${id}`);
};

export const searchVideos = (req, res) => {
  return res.send("Searching...");
};

export const uploadVideo = (req, res) => {
  return res.send("Upload Video");
};

export const deleteVideo = (req, res) => {
  return res.send(`Delete Video with ID: ${req.params.id}`);
};
