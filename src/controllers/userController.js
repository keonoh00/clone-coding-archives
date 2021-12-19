import userDB from "../models/user";

export const createAccount = (req, res) => {
  return res.render("createAccount", { pageTitle: "Create Account" });
};

export const postAccount = async (req, res) => {
  const { name, email, password, password2, location } = req.body;
  if (password !== password2) {
    return res.render("createAccount", {
      pageTitle: "Create Account",
      errorMessage: "Passwords Confirmation Does Not Match",
    });
  }
  const exists = await userDB.exists({ email });
  if (exists) {
    return res.status(400).render("createAccount", {
      pageTitle: "Create Account",
      errorMessage: "This email is already taken",
    });
  }
  await userDB.create({
    name,
    email,
    password,
    location,
  });
  console.log(email, password);
  return res.redirect("/login");
};

export const login = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const exist = await userDB.exists({ email });
  // Check User in the Database
  if (!exist) {
    return res
      .status(404)
      .render("login", { pageTitle: "Login", errorMessage: "Email Does Not Exist" });
  }
  // Check Password
  const user = await userDB.findOne({ email });
  const match = await userDB.checkPassword(password, user.password);
  if (!match) {
    return res
      .status(404)
      .render("login", { pageTitle: "Login", errorMessage: "Invalid Password" });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect(`/user/${user.name}`);
};

export const logout = (req, res) => {
  res.locals.loggedIn = false;
  res.locals.user = {};
  return res.redirect("/");
};

export const editUser = (req, res) => {
  return res.send("Edit Profile");
};

export const deleteUser = (req, res) => {
  return res.send("Delete User");
};

export const dashboard = async (req, res) => {
  if (!req.session.user) {
    return res.status(404).send("No Session User");
  }
  const originalUrl = req.originalUrl.split("/");
  const reqName = originalUrl.pop();
  const { email, password } = req.session.user;
  const DBauth = await userDB.findOne({ email });
  if (password !== DBauth.password || reqName !== DBauth.name) {
    return res.status(404).send("Wrong Approach");
  }
  return res.send(`dashboard ${req.session.user.name}`);
  const localUser = res.locals.user;
  const localEmail = localUser.email;
  const DBuser = await userDB.findOne({ localEmail });
  if (user && Boolean(DBuser.password == localUser.password)) {
  }
  console.log("You are here");
  return res.redirect("/");
};
