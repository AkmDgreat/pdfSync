import express from 'express';
import path from 'path';
import fs from 'fs';
import { createpdf } from '../controllers/createPdf.mjs';
import { getAllPdfs } from '../controllers/getAllPdf.mjs';

const router = express.Router();
const rootDir = path.resolve('public');

// router.get('/', isAuthenticated, (req, res) => {
//     res.sendFile(path.join(rootDir, '../public', 'app.html'));
// });

import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
router.post('/', upload.single('pdfFile'), createpdf)

router.get('/', getAllPdfs)

// Upload endpoint
// Upload endpoint
// router.post('/upload', isAuthenticated, (req, res) => {
//     upload(req, res, (err) => {
//         if (err) {
//             res.status(400).json({
//                 success: false,
//                 message: err.message
//             });
//         } else {
//             if (req.file == undefined) {
//                 res.status(400).json({
//                     success: false,
//                     message: 'Error: No File Selected!'
//                 });
//             } else {
//                 res.json({
//                     success: true,
//                     message: 'File Uploaded!',
//                     fileUrl: `/uploads/${req.file.filename}`
//                 });
//             }
//         }
//     });
// });


// // Endpoint to list all files
// router.get('/files', isAuthenticated, (req, res) => {
//     fs.readdir('./uploads', (err, files) => {
//         if (err) {
//             res.status(500).send('Error reading files');
//             return;
//         }
//         const fileLinks = files.map(file => `<li><a href="/uploads/${file}" target="_blank">${file}</a></li>`).join('');
//         res.send(`
//             <h2>Uploaded Files</h2>
//             <ul>${fileLinks}</ul>
//             <a href="/home">Go Back</a>
//         `);
//     });
// });

export default router;