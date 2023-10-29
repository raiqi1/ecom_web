import nc from "next-connect";
import db from "../../utils/db";
import bcrypt from "bcrypt";
import { sendEmail } from "../../utils/sendEmail";
import User from "../../../models/User";
import { createResetToken } from "../../utils/tokens";
import { resetEmailTemplate } from "../../../emails/resetEmailTemplate";

const handler = nc();

handler.put(async (req, res) => {
  try {
    await db.connectDb();
    const {user_id, password} = req.body;
    const user = await User.findById(user_id);
    if(!user){
        return res.status(400).json({message: "User does not exist"});
    }
    const cryptedPassword = await bcrypt.hash(password, 10);
    await user.updateOne({password: cryptedPassword});
    res.json({email:user.email})
    await db.disconnectDb();
    res.json({
      message:
       'email sent successfully. Please check your email untuk reset passwordnya',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
