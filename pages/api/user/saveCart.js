import nc from "next-connect";
import Product from "../../../models/Product";
import User from "../../../models/User";
import Cart from "../../../models/Cart";
import auth from "../../../middleware/auth";
import db from "../../utils/db";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const { cart } = req.body;
    const user = await User.findById(req.user);

    // Find the user's existing cart, if it exists
    const existingCart = await Cart.findOne({ user: user._id });

    // Create a new array to hold the updated cart items
    const updatedCart = [];

    for (let i = 0; i < cart.length; i++) {
      const dbProduct = await Product.findById(cart[i]._id).lean();
      const subProduct = dbProduct.subProducts[cart[i].style];
      const price = Number(
        subProduct.sizes.find((p) => p.size === cart[i].size).price
      );
      const discountedPrice =
        subProduct.discount > 0
          ? (price - price / subProduct.discount).toFixed(2)
          : price.toFixed(2);

      const cartItem = {
        name: dbProduct.name,
        product: dbProduct._id,
        color: {
          color: cart[i].color.color,
          image: cart[i].color.image,
        },
        image: subProduct.images[0].url,
        qty: Number(cart[i].qty),
        size: cart[i].size,
        price: discountedPrice,

      };

      updatedCart.push(cartItem);
    }

    let cartTotal = 0;

    for (let i = 0; i < updatedCart.length; i++) {
      cartTotal += updatedCart[i].price * updatedCart[i].qty;
    }

    if (existingCart) {
      // If an existing cart exists, update it with the new cart items and total
      existingCart.products = updatedCart;
      existingCart.cartTotal = cartTotal.toFixed(2);
      await existingCart.save();
    } else {
      // Otherwise, create a new cart
      await new Cart({
        products: updatedCart,
        cartTotal: cartTotal.toFixed(2),
        user: user._id,
      }).save();
    }

    db.disconnectDb();

    return res.status(200).json({ message: "Cart Created successfully" });
  } catch (error) {
    db.disconnectDb();
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
