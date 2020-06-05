const User = require("../models/User");
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.Referral = (req,res,next) => {
    const Id = req.query.Id;
    User.findById(Id, (err,doc) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        const link = doc.invite_link;
        const email = 'harish.natraj28@gmail.com'
        const msg = {
            to: req.body.to_mail,
            from: email,
            subject: 'Check this link',
            text: link,
            html: `<p><a href="${link}">Click on the link<a> to accept the invite</p>`,
          };
         sgMail.send(msg).then(msg => res.json({
             message: "Mail sent succssfully"
         }))
         .catch(ex => console.log(ex.response.body.errors))
         console.log(msg);
    })
}