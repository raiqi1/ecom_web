import nc from "next-connect";
import db from "../../utils/db";
import { sendEmail } from "../../utils/sendEmail";
import User from "../../../models/User";
import { createResetToken } from "../../utils/tokens";
import { resetEmailTemplate } from "../../../emails/resetEmailTemplate";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message: "User does not exist"});
    }
    const user_id = createResetToken({
        id: user._id.toString(),
      });
    const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;
    sendEmail(email, url, "", "Activate your account",resetEmailTemplate);
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
