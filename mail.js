import nm from 'nodemailer';

const transporter = nm.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD      // This is an APP password.
    }
})


class Mail{
    constructor(){
        this.mailOptions = {
            from: {
                address: process.env.EMAIL,
                name: 'Sumit'
            }
        }
    }

    /**
     * @param {string} name
     */
    setCompanyName(name){
        this.mailOptions.from.name = name;
    }

    /**
     * @param {string} email
     */
    setSenderEmail(email){
        this.mailOptions.from.address = email;
    }

    /**
     * @param {string} receiver
     */
    sendTo(receiver){
        /**
         * @type {string}
         */
        this.mailOptions.to = receiver;
    }

    /**
     * @param {string} subject
     */
    setSubject(subject){
        this.mailOptions.subject = subject;
    }

    /**
     * @param {string} text
     */
    setText(text){
        /**
         * @type {string}
         */
        this.mailOptions.text = text;
    }

    /**
     * @param {string} html
     */
    setHtml(html){
        /**
         * @type {string}
         */
        this.mailOptions.html = html;
    }

    /**
     * @return {void}
     */
    send(){
        transporter.sendMail(this.mailOptions, (error, info) => {
            if(error){
                console.log(error);
            }
            else{
                console.log("Email sent: " + info.response);
            }
        })
    }
}

export default Mail
