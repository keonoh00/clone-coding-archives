export const trendingVideos = (req, res) => {
    return res.send("Trending Videos on Home");
};

export const watchVideos = (req, res) => {
    return res.send(`Watch Video: ${req.params.id}`);
};

export const editVideos = (req, res) => {
    return res.send(`Edit Video with ID: ${req.params.id}`);
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