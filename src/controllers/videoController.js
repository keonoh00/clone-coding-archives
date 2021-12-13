export const trendingVideos = (req, res) => {
    return res.render("home", { pageTitle: "Home" });
};

export const watchVideos = (req, res) => {
    return res.render("watch", { pageTitle: "Watch" });
};

export const editVideos = (req, res) => {
    return res.render("edit", { pageTitle: "Edit" });
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