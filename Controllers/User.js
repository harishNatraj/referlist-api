const User = require("../models/User");
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.Signup = async (req, res, next) => {
    console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
    const refferalId = req.query.refferalId;
    const email = req.body;
    const _user = await User.findOne(email);
    if (_user) {
        let msg1 = '';
        let msg2 = '';
            User.findOne(email, (err, doc) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    })
                }
                const rank = doc.position;
                console.log(rank)
                if (rank === 1) {
                    msg1 = "Congrats, You are on the top of the list"
                    msg2 = "Welcome"
                } else {
                    msg1 = "Congrats, You are on waitlist"
                    msg2 = `There ${rank-1 === 1 ? 'is' : 'are'} ${rank-1} ${rank-1 === 1 ? 'person' : 'people'} ahead of you`
                }
                return res.json({
                    user: doc,
                    message1: msg1,
                    message2: msg2
                })
            })
        }
     else {
        let user = new User(email);
        User.find().sort({ position: -1 }).limit(1).exec(async (err, doc) => {
            let max = 0;
            if (Array.isArray(doc) && doc.length > 0) {
                max = doc[0].position
            }
            user.position = max + 1;
            user.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    })
                }
                console.log("saved")
                console.log(user._id)
            })
            user.invite_link = req.protocol + '://' + 'localhost:3000' + '/signup' + '?refferalId=' + user._id;
            if (refferalId) {
                User.findById(req.query.refferalId, (err, doc) => {
                    const p = doc.position;
                    if (p == 1) {
                        res.json({
                            message: 'Referrer is already the top of the list.'
                        })
                        return;
                    }
                    const a = p - 1;
                    User.findOneAndUpdate({ position: a }, { $set: { position: p } }, { new: true }, (err, doc) => {
                        if (err) {
                            return res.status(400).json({
                                error: err
                            })
                        }
                    })
                    User.findByIdAndUpdate(req.query.refferalId, { $set: { position: a } }, { new: true }, (err, doc) => {
                        if (err) {
                            return res.status(400).json({
                                error: err
                            })
                        }
                    })
                    if (a === 1) {
                        const email = doc.email;
                        const msg = {
                            to: email,
                            from: 'harish.natraj28@gmail.com',
                            subject: 'Welcome',
                            html: 'You have reached the top of the list',
                        };
                        sgMail.send(msg).then(r => console.log(r))
                            .catch(ex => console.log(ex.response.body.errors))
                        console.log(msg);
                    }
                })
                res.json({
                    message: "Sign up successfull",
                    user: user

                })

            } else {
                res.json({
                    message: "Signup successfull",
                    user: user
                })
            }
        })
    }

}

exports.GetUser = (req, res, next) => {
    const Id = req.query.Id;
    let msg1 = '';
    let msg2 = '';
    if (Id) {
        User.findById(Id, (err, doc) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            const rank = doc.position;
            if (rank === 1) {
                msg1 = "Congrats, You are on the top of the list"
                msg2 = "Welcome"
            } else {
                msg1 = "Congrats, You are on waitlist"
                msg2 = `There ${rank-1 === 1 ? 'is' : 'are'} ${rank-1} ${rank-1 === 1 ? 'person' : 'people'} ahead of you`

            }
            return res.json({
                user: doc,
                message1: msg1,
                message2: msg2
            })
        })

    } else {
        User.find().sort({ position: 1 }).then((users) => {
            return res.json({
                users
            })
        })
            .catch((err) => {
                console.log(err)
            })
    }
}