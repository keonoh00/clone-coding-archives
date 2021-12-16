import userDB from "../models/user";

export const createAccount = (req, res) => {
  return res.render("createAccount", { pageTitle: "Create Account" });
};

export const postAccount = async (req, res) => {
  const { name, email, username, password, location } = req.body;
  await userDB.create({
    name,
    email,
    username,
    password,
    location,
  });
  return res.redirect("/login");
};

export const editUser = (req, res) => {
  return res.send("Edit Profile");
};

export const deleteUser = (req, res) => {
  return res.send("Delete User");
};

export const login = (req, res) => {
  return res.send("Login");
};

export const logout = (req, res) => {
  return res.send("Logout");
};

export const dashboard = (req, res) => {
  return res.send("dashboard");
};
