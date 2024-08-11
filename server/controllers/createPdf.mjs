import { Pdf } from '../models/pdf.mjs';

const createpdf = async (req, res) => {
    try {
        // const pdf = await Pdf.create(req.body)
        const newPdf = new Pdf({
            name: req.file.originalname,
            path: req.file.path
        })

        await newPdf.save();

        res.status(201).json({ newPdf }) 
    } 
    catch (error) {
        res.status(500).json({ msg: error }) // if u don't want a lengthy error, do this: { msg: "there was an error" }
    }
}

export { createpdf }

// import multer from 'multer';
// import path from 'path';

// // Set storage engine for multer
// const storage = multer.diskStorage({
//     destination: './uploads',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// // Init upload
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 10000000 }, // 10 MB
//     fileFilter: function (req, file, cb) {
//         checkFileType(file, cb);
//     }
// }).single('pdf');

// // Check file type
// function checkFileType(file, cb) {
//     // Allowed ext
//     const filetypes = /pdf/;
//     // Check ext
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     // Check mime
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb('Error: PDFs Only!');
//     }
// }

// export {
//     upload,
//     checkFileType
// };
