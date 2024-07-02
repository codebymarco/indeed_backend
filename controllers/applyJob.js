const Employer = require('../models/employerModel')
const User = require('../models/userModel')
const Pdf = require('../models/pdfModel')
var nodemailer = require('nodemailer');
const job = require('../models/JobModel')

// Create the transporter with the required configuration for Outlook
// change the user and pass !
var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3',
       rejectUnauthorized: false
    },
    auth: {
        user: 'jobfinder1956@outlook.com',
        pass: 'Marco@outlook1999'
    }
});

const applyJob = async (req, res) =>{
    const employeeId = req.user._id
    const {jobId, companyId} = req.params
    console.log(__dirname)
    try{
        const job = await Job.findById({_id:jobId})
        const employer = await Employer.findById({_id: companyId})
        const employee = await User.findById({_id: employeeId})
        const pdf = await Pdf.findOne({user_id:employeeId})

        var mailOptions = {
            from: '"jobfinder " <jobfinder1956@outlook.com>', // sender address (who sends)
            to: employer.email, // list of receivers (who receives)
            subject: 'response to job post', // Subject line
            /*text: 'Hello world ', // plaintext body*/
            html: `<h1>${employee.email}</h1>` ,// html body
            attachments: [{
                filename: 'resume.pdf',
                path: pdf.pdfCv,
                contentType: 'application/pdf'
              }],
        };
        
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
            res.status(200).json('sucess')
        });
    }catch(error){
        console.log(error)
        res.status(400).json({error : error.message})
    }
}


module.exports = {
    applyJob
}