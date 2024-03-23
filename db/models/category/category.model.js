import mongoose, { Schema, model } from "mongoose";
const categorySchema = new Schema({
    name: { type: String, lowercase: true, required: true, unique: [true, 'category name must be unique  '] },

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
})





const categoryModel = mongoose.models.Category || model("Category", categorySchema)


export default categoryModel