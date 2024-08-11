import { Pdf } from '../models/pdf.mjs';

const getAllPdfs = async (req, res) => {
    const pdfs = await Pdf.find();
    res.json(pdfs);
}

export { getAllPdfs }