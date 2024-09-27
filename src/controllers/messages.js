const db = require("../db/queries");

exports.createMessageFormGet = (req, res) => {
  console.log(req.user);
  res.render("createMessage");
};

exports.createMessagePut = async (req, res) => {
  try {
    const { id } = req.user;
    const { title, text } = req.body;
    const date = new Date();
    await db.insertMessage(title, text, date, Number(id));
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
