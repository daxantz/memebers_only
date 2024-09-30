const db = require("../db/queries");

const code = "iwanttobeadmin";

exports.AdminFormGet = (req, res) => {
  res.render("createAdmin", { message: null });
};

exports.setAdminStatusPut = async (req, res) => {
  try {
    const { id } = req.user;
    const { passcode } = req.body;
    const user = await db.getUserById(Number(id));
    if (user.isAdmin) {
      return res.send("Youre an admin already");
    }
    console.log(user.isAdmin);
    if (code === passcode) {
      await db.updateUserAdminStatus(Number(id));
      console.log(`user with the id: ${id} is now an admin`);
      return res.render("CreateAdmin", {
        user: req.user,
        message: "You're now an admin and can delete messages",
      });
    } else {
      return res.render("CreateAdmin", {
        user: req.user,
        message: "Code incorrect. Try again to become an admin",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
