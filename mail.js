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
     * @param {string | string[]} receiver
     */
    // sendTo(receiver){                    // Used for sending mail to single user
    //     /**
    //      * @type {string}
    //      */
    //     this.mailOptions.to = receiver;
    // }

    sendTo(receiver){                       // Used for sending mail to multiple user's
        const receivers = Array.isArray(receiver) ? receiver : [receiver];
        this.mailOptions.to = [...(this.mailOptions.to || []), ...receivers];
    }
    setCC(cc){
        let ccs = this.mailOptions.cc || [];
        ccs.push(cc)
        this.mailOptions.cc = ccs;
    }
    setBCC(bcc){
        let bccs = this.mailOptions.bcc || [];
        bccs.push(bcc)
        this.mailOptions.bcc = bccs;
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

    send(){
        return transporter.sendMail(this.mailOptions);
    }
}

export default Mail
