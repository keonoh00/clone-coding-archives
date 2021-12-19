export const localsMiddleware = (req, res, next) => {
  // This middleware is for storing session value to locals for pug rendering
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.user = req.session.user;
  next();
};
