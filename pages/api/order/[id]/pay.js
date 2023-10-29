import nc from "next-connect";
import auth from "../../../../middleware/auth";
import db from "../../../utils/db";
import Order from "../../../../models/Order";

const handler = nc().use(auth);

handler.put(async (req, res) => {
//   console.log("hello from api");
  await db.connectDb();
  const order = await Order.findById(req.body.order_id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      // update_time: req.body.update_time,
      email_address:req.body.email_address,
    };
    const updatedOrder = await order.save();
    await db.disconnectDb();
    res.json({ message: "Order Paid", order: updatedOrder });
  }else{
    await db.disconnectDb();
    res.status(404).json({message:"Order not found"});
  }
});

export default handler;
