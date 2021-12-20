import userDB from "../models/user";
import fetch from "node-fetch";
require("dotenv").config();

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
  if (!user.password) {
    return res
      .status(404)
      .render("login", { pageTitle: "Login", errorMessage: "Use Github to Login" });
  }
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
  req.session.destroy();
  return res.redirect("/");
};

export const dashboard = async (req, res) => {
  if (!req.session.user) {
    return res.status(404).send("No Session User");
  }
  const originalUrl = req.originalUrl.split("/");
  const reqName = originalUrl.pop();
  const { email, password } = req.session.user;
  const DBauth = await userDB.findOne({ email });
  if (req.session.github && decodeURI(reqName) !== DBauth.name) {
    // if login with github only name matches then proceed
    return res.send(`dashboard ${req.session.user.name}`);
  } else if (password !== DBauth.password || decodeURI(reqName) !== DBauth.name) {
    // if password does not match and name do not match then wrong approach
    return res.status(404).send("Wrong Approach");
  }
  return res.send(`dashboard ${req.session.user.name}`);
};

export const startGithubLogin = (req, res) => {
  const config = {
    client_id: process.env.GITHUB_CLIENTID,
    allow_signup: false,
    scope: "user:email read:user",
  };
  const params = new URLSearchParams(config).toString();
  const redirectURL = `https://github.com/login/oauth/authorize?${params}`;
  return res.redirect(redirectURL);
};

export const githubCallback = async (req, res) => {
  const config = {
    client_id: process.env.GITHUB_CLIENTID,
    client_secret: process.env.GITHUB_CLIENTSECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const redirectURL = `https://github.com/login/oauth/access_token?${params}`;
  const tokenJSON = await (
    await fetch(redirectURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenJSON) {
    const { access_token } = tokenJSON;
    const userJSON = await (
      await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailJSON = await (
      await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailFilter = emailJSON.find(
      (email) => email.primary === true && email.verified === true
    );
    const email = emailFilter.email;
    let userData = await userDB.findOne({ email });
    if (userData) {
      // change request and redirect to home
      req.session.loggedIn = true;
      req.session.user = userData;
    } else {
      // create new account on the server and redirect to home
      await userDB.create({
        email,
        password: "",
        name: userJSON.login,
        location: "",
      });
      userData = await userDB.findOne({ email });
    }
    req.session.loggedIn = true;
    req.session.user = userData;
    req.session.github = true;
    return res.redirect("/user/dashboard");
  } else {
    return res.redirect("/login");
  }
};

export const editUser = (req, res) => {
  return res.send("Edit Profile");
};

export const deleteUser = (req, res) => {
  return res.send("Delete User");
};
