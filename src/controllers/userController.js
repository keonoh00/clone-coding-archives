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
  return res.redirect(`/user/${email}`);
};

export const editUser = (req, res) => {
  return res.send("Edit Profile");
};

export const deleteUser = (req, res) => {
  return res.send("Delete User");
};

export const logout = (req, res) => {
  return res.send("Logout");
};

export const dashboard = (req, res) => {
  return res.send("dashboard");
};
