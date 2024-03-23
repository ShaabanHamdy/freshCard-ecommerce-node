import categoryModel from "../../../db/models/category/category.model.js"


// ============================================================
export const createCategory = async (req, res, next) => {
    const category = await categoryModel.findOne({ name: req.body.name })
    if (category) {
        next(new Error("there is category with the same name"))
    }
    const createCategory = await categoryModel.create({ name: req.body.name })

    res.json({ message: "success", createCategory })
}
// ================================================================
export const getAllCategories = async (req, res, next) => {
    const category = await categoryModel.find()
    if (category.length < 1) {
        next(new Error("not categories available"))
    }
    res.json({ message: "success", category })
}


// ======================================================
export const deleteAllCategories = async (req, res, next) => {
    const category = await categoryModel.deleteMany()
    if (category.deletedCount < 1 ) return next(new Error("not find any categories ", { cause: 409 }))
    res.status(201).json({ message: "success", deletedCount: category.deletedCount })
}


// =========================================================
export const getOneCategory = async (req, res, next) => {
    const category = await categoryModel.findOne({ _id: req.params.categoryId })
    if (!category) {
        next(new Error("category id fail"))
    }
    res.json({ message: "success", category })
}    
