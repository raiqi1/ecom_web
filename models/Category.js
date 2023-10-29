import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const cateegorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength:[2,'hanya boleh 2 karakter'],
        maxLength:[32,'hanya boleh 32 karakter']
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        index:true
    }
},{timestamps:true})

const Category = mongoose.models.Category || mongoose.model("Category",cateegorySchema);
export default Category;