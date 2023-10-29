import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const subSchema = new mongoose.Schema({
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
    },
    parent:{
        type:ObjectId,
        ref:"Category",
        required:true
    }
});

const SubCategory = mongoose.models.SubCategory || mongoose.model("SubCategory",subSchema);
export default SubCategory;