const nodemailer = require("nodemailer");


exports.sendConfirmationEmail = function ({ toUser, hash }) {
    return new Promise((res, rej) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GOOGLE_USER,
                pass: process.env.GOOGLE_PASSWORD
            }
        })

        const message = {
            from: process.env.GOOGLE_USER,
            to: toUser.email,
            subject: 'MarketFirst Registration - Verify your account',
            html: `
                <h3>Hello ${toUser.username}</h3?
                <a target="_" href="${process.env.DOMAIN}/api/activate/user/${hash}"></a>
            `
        }

        transporter.sendMail(message, function(err, info){
            if(err) {
                rej(err);
            }
            else{
                res(info);
            }
        })
    })
}