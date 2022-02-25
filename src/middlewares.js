import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  // This middleware is for storing session value to locals for pug rendering
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.user = req.session.user;
  next();
};

export const useronlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    req.flash("notification", "Login to Upload");
    return res.status(404).redirect("/login");
  }
  next();
};

export const publiconlyMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return res.redirect("/user/dashboard");
  }
  next();
};

export const uploadProfilePhoto = multer({
  dest: "uploads/profilePhoto/",
  limits: {
    fileSize: 3000000,
  },
});

export const uploadVideoFile = multer({
  dest: "uploads/video/",
  limits: {
    fileSize: 100000000,
  },
});
