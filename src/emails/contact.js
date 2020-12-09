const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendContactMail = (adminEmail, adminName, { name, email, contact, occasion, reference, message}) => {
    try {
        sgMail.send({
            to: adminEmail,
            from: 'lokesh.pandu1998@gmail.com',
            subject: 'Sync Advert - ##New Message##',
            html: `
                <h2>Hi ${adminName}, ${name} wants to get in touch.</h2>
                <p>Contact No: ${contact || 'NA'}</p>
                <p>Email: ${email}</p>
                <p>Event: ${occasion}</p>
                <p>Reference: ${reference}</p>
                <p>Message: ${message}</p>    
            `
        })
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    sendContactMail
}