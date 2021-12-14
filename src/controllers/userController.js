const fakeUserObj = {
  username: "devUser",
  loggedIn: false,
};

export const join = (req, res) => {
  return res.send("Join Us");
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
