import mongoose from "mongoose"

const pdfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "must provide a pdf name"]
    },

    path: {
        type: Buffer,
        required: [true, "must provide a file"]
    },

    uploadedAt: {
        type: Date,
        default: Date.now()
    },
})

export const Pdf = mongoose.model("pdfs", pdfSchema)