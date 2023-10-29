import nc from "next-connect";
import db from "../../utils/db";
import { validateEmail } from "../../utils/validation";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import { createActivationToken } from "../../utils/tokens";
import { sendEmail } from "../../utils/sendEmail";
import { activateEmailTemplate } from "../../../emails/activateEmailTemplates";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const cryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: cryptedPassword });
    const addUser = await newUser.save();
    const activation_token = createActivationToken({
      id: addUser._id.toString(),
    });
    const url = `${process.env.BASE_URL}/activate/${activation_token}`;
    sendEmail(email, url, "", "Activate your account",activateEmailTemplate);
    await db.disconnectDb();
    res.json({
      message:
        "Registration successful, please check your email to activate your account",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
