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
                <p>Email: ${email || 'NA'}</p>
                <p>Event: ${occasion || 'NA'}</p>
                <p>Reference: ${reference || 'NA'}</p>
                <p>Message: ${message || 'NA'}</p>    
            `
        })
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    sendContactMail
}