import nc from "next-connect";
import auth from "../../../middleware/auth";
import Category from "../../../models/Category";
import db from "../../utils/db";
import slugify from "slugify";
import SubCategory from "../../../models/SubCategory";
import admin from "../../../middleware/admin";

const handler = nc().use(auth).use(admin);

handler.post(async (req, res) => {
  try {
    const { name, parent } = req.body;
    db.connectDb();
    const test = await SubCategory.findOne({ name });
    if (test) {
      return res
        .status(400)
        .json({ message: "SubCategory already exist, Try a different name" });
    }
    await new SubCategory({ name, parent, slug: slugify(name) }).save();

    db.disconnectDb();
    res.json({
      message: `SubCategory ${name} has been created successfully.`,
      subcategories: await SubCategory.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    const { id } = req.body;
    db.connectDb();
    await SubCategory.findByIdAndRemove(id);
    db.disconnectDb();
    return res.json({
      message: "SubCategory has been deleted successfully.",
      subCategories: await SubCategory.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    const { id, name, parent } = req.body;
    db.connectDb();
    await SubCategory.findByIdAndUpdate(id, {
      name,
      parent,
      slug: slugify(name),
    });
    db.disconnectDb();
    return res.json({
      message: "SubCategory has been updated successfully.",
      subCategories: await SubCategory.find({}).sort({ createdAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.get(async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.json({ message: "Please provide a category" });
    }
    db.connectDb();
    const results = await SubCategory.find({ parent: category }).select("name");
    db.disconnectDb();
    return res.json(results );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
