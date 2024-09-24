const db = require("../db/queries");

const code = "amazon"; //secret code to become member

exports.joinFormGet = async (req, res) => {
  const { id } = req.user;
  const user = await db.getUserById(Number(id));
  res.render("join", { user: user });
};

exports.setMemberStatusPut = async (req, res) => {
  try {
    const { id } = req.user;
    const { passcode } = req.body;
    const user = await db.getUserById(Number(id));
    if (user.ismember) {
      return res.send("Youre a member already");
    }
    console.log(user.ismember);
    if (code === passcode) {
      await db.updateUserMemberStatus(Number(id));
      console.log(`user with the id: ${id} is now a member`);
      return res.redirect("/");
    } else {
      return res.render("join", {
        user: req.user,
        message: "Code incorrect. Try again to become a member",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
