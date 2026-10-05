import "dotenv/config";
import express from "express";
import nm from "nodemailer";
import Mail from "./mail.js";


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

                                                        // Method-1
// const transporter = nm.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     secure: false,
//     port: 587,
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//     }
// })

// app.get('/', (req, res) => {
//     res.send("Hello World!")

//     const mailOptions = {
//         from: process.env.EMAIL,
//         to: process.env.TO_EMAIL,
//         subject: "Sending email using nodejs",
//         text: "Hello there Anuj Bunker"
//     }

//     transporter.sendMail(mailOptions, (error, info) => {
//         if(error){
//             console.log(error);
//         }
//         else{
//             console.log('Email sent: '+ info.response);
//         }
//     })
// })

                                                        // Method-2 (Using proper class)
// app.get('/', (req, res) => {
//     res.send('Hello World')

//     const mail = new Mail();
//     mail.setSenderEmail(process.env.EMAIL)
//     mail.sendTo(process.env.TO_EMAIL)
//     mail.setSubject('Subject')
//     mail.setText('Hello from coder sumit')
//     mail.send()
// })

                                                    // Method-3 (Sending HTML content and Templates)
app.post('/mail', (req, res) => {
    const {receiver_id, subject, text, html} = req.body;

    if (!receiver_id){
        return res
        .status(400)
        .json({ 
            error: 'receiver_id is required' 
        })
    }

    const mail = new Mail();
    mail.setSenderEmail(process.env.EMAIL)
    mail.sendTo(receiver_id)
    mail.setSubject(subject)
    mail.setText(text)
    mail.setHtml(html)

    mail.send()
    res.send('Email sent!')
})



app.listen(process.env.PORT, () => {
    console.log(`Server is running at port: ${process.env.PORT}`);
})
