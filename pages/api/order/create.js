import nc from "next-connect";
import db from "../../utils/db";
import User from "../../../models/User";
import auth from "../../../middleware/auth";
import Coupon from "../../../models/Coupon";
import Cart from "../../../models/Cart";
import Order from "../../../models/Order";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const {
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponAplied,
    } = req.body;
    const user = await User.findById(req.user);
    const newOrder = await new Order({
      user: user._id,
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponAplied,
    }).save();
    console.log("newOrder", newOrder);
    db.disconnectDb();
    return res.json({ message: "Order created",
    order_id : newOrder._id
  });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
