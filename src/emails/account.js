const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'lokesh.pandu1998@gmail.com',
        subject: 'Sync Advert ##WELCOME##',
        html: `<h6>Hey ${name}, Welcome to Sync Advert.</h6> <br/>
        Now you can login as an admin using <a href="https://www.google.co.in/?gfe_rd=cr&dcr=0&ei=bOQ5WuXuGZOGX4jxrvAN"><i>this</i></a> link. You can edit call-to-action buttons, add/ delete new images, manage teams.`
    })
}

const sendForgotPasswordURL = (email, name) => {
    sgMail.send({
        to: email,
        from: 'lokesh.pandu1998@gmail.com',
        subject: 'Sync Advert ##PROFILE##',
        text: `Hey ${name}, did you request password modification? If this wasn't you please contact the developer. 
            </br>
            Click on the below link to redirect to continue with password change. The link expires in 30 minutes.`
    })
}

const sendPasswordChangeNotification = (email, name) => {
    sgMail.send({
        to: email,
        from: 'lokesh.pandu1998@gmail.com',
        subject: 'Sync Advert ##ALERT##',
        text: `Admin account password has been modified. If this wasn't you please contact the developer.`
    })
}

const sendEmailChangeNotification = (email, name) => {
    sgMail.send({
        to: email,
        from: 'lokesh.pandu1998@gmail.com',
        subject: 'Sync Advert ##ALERT##',
        text: `Admin account email has been modified. If this wasn't you please contact the developer.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendForgotPasswordURL,
    sendPasswordChangeNotification,
    sendEmailChangeNotification
}