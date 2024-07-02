const express = require('express')
const router = express.Router()
const PdfRes = require('../models/pdfModel')
const {getSingleEmployee,deleteEmployee, deleteCv} = require('../controllers/employeeController')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const EmployeeAuth = require('../middlewear/requireEmployeeAuth')
router.use(EmployeeAuth)
const {applyJob} = require('../controllers/applyJob')
const {getSingleJobEmployee} = require('../controllers/jobController')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null,uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {

    const allowedFileTypes = ['application/pdf','application/doc','application/docx'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

router.post('/addCvDocument',upload.single('cv'), async(req, res) => {
    const user_id = req.user._id
    const url = req.protocol + '://' + req.get('host')
    const pdfCv = url + '/images/' + req.file.filename;
    const mimetype = req.file.mimetype;
try{
    const resume = await PdfRes.create({pdfCv,user_id, mimetype})
    res.status(200).json(resume)
    console.log(resume)
}catch(error){
    res.status(400).json({error : error.message})
    console.log(error.message)
}
});


//get single employer
router.get('/getOne', getSingleEmployee)

//delete single user
router.delete('/delete', deleteEmployee)

router.delete('/deleteCvDocument', deleteCv)

router.get('/apply/job/:jobId/:companyId', applyJob)

//get single job for an employee
router.get('/job/jobinfo/:id', getSingleJobEmployee)


router.get('/review/:id')

module.exports = router