import nc from "next-connect";
import db from "../../utils/db";
import User from "../../../models/User";
import auth from "../../../middleware/auth";
import bcrypt from "bcrypt";

const handler = nc().use(auth);

handler.put(async (req, res) => {
  try {
    db.connectDb();
    const { current_password, password } = req.body;
    const user = await User.findById(req.user);
    const crypted_pass = await bcrypt.hash(password, 12);
    if (!user.password) {
      await user.updateOne({
        password: crypted_pass,
      });
      return res
        .status(200)
        .json({ message: "Password changed successfully unknowingly" });
    }
    const isMatch = await bcrypt.compare(current_password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    await user.updateOne({
      password: crypted_pass,
    });
    db.disconnectDb();
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export default handler;
