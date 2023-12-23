const User = require('../../../model/user');
const jwt = require('jsonwebtoken');

module.exports.createsession = async function(req, res) {
    try {
        let user = await User.findOne({
            email: req.body.email
        });

        if (!user || user.password !== req.body.password) {
            return res.status(422).json({
                message: "Invalid username or password"
            });
        }

        return res.status(200).json({
            message: "Sign-in successful, here is your token",
            data: {
                token: jwt.sign(user.toJSON(), 'codeiel', {
                    expiresIn: '10000'
                })
            }
        });
    } catch (error) {
        console.log('Error in the session creation jwt', error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
