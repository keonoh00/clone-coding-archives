export const localsMiddleware = (req, res, next) => {
  // This middleware is for storing session value to locals for pug rendering
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.user = req.session.user;
  next();
};

export const useronlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return res.status(404).send("Unauthorzied: You Must Login");
  }
  next();
};

export const publiconlyMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return res.redirect("/user/dashboard");
  }
  next();
};
