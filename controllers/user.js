const User = require('../models/User');
const auth = require('../auth');
const bcrypt = require('bcryptjs');
const { errorHandler } = require('../auth');

module.exports.createUser = (req, res) => {
    if (!req.body.email || !req.body.email.includes("@")) {
        return res.status(400).send({
            error: 'Email invalid'
        });
    }
    else if (!req.body.password || req.body.password.length < 8) {
        return res.status(400).send({
            error: 'Password must be atleast 8 characters long'
        })
    }

    return User.findOne({ email: req.body.email })
        .then(result => {
            if (result) {
                return res.status(409).send({ success: false, error: "Duplicate email found" });
            }

            let newUser = new User({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            });

            return newUser.save()
                .then(savedUser => {
                    return res.status(201).send({
                        message: 'User registered successfully',

                    });
                });
        })
        .catch(err => errorHandler(err, req, res));

};

module.exports.loginUser = (req, res) => {
    if (req.body.email.includes("@")) {
        return User.findOne({ email: req.body.email })
            .then(result => {
                if (result === null) {
                    return res.status(404).send({ error: 'No email found' });
                } else {
                    const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password)

                    if (isPasswordCorrect) {
                        return res.status(200).send({
                            message: 'User logged in successfully',
                            access: auth.createAccessToken(result)
                        });
                    } else {
                        return res.status(401).send({ error: 'Email and password do not match' });

                    }
                }
            })
            .catch(err => errorHandler(err, req, res));
    } else {
        return res.status(400).send({ error: 'Invalid email' });
    }
};

module.exports.getProfile = (req, res) => {
    return User.findById(req.user.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }

            user.password = "";
            return res.status(200).send(user);
        })
        .catch(err => errorHandler(err, req, res));
};

module.exports.setAsAdmin = (req, res) => {
    User.findByIdAndUpdate(req.params.id, { isAdmin: true }, { new: true })
        .then(result => {
            if (result) {
                return res.status(200).send({ updatedUser: result });
            } else {
                return res.status(404).send(false);
            }
        })
        .catch(err => errorHandler(err, req, res));
};

module.exports.updatePassword = (req, res) => {
    if (!req.body.newPassword || req.body.newPassword.length < 8) {
        return res.status(400).send({ message: "Password must be at least 8 characters" });
    }

    const hashedPassword = bcrypt.hashSync(req.body.newPassword, 10);

    return User.findByIdAndUpdate(req.user.id, { password: hashedPassword })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }

            return res.status(200).send({ message: "Password reset successfully" });
        })
        .catch(err => errorHandler(err, req, res));
};