import express from "express";
import nm from "nodemailer";
import Mail from "./mail.js";

import dotenv from "dotenv";
dotenv.config({
    path: '.env'
})

const app = express()

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
app.get('/', (req, res) => {
    res.send('Hello World')

    const mail = new Mail();
    mail.sendTo(process.env.TO_EMAIL)
    mail.setSubject('Subject')
    mail.setText('Hello from coder sumit')
    mail.send()
})



app.listen(process.env.PORT, () => {
    console.log(`Server is running at port: ${process.env.PORT}`);
})
