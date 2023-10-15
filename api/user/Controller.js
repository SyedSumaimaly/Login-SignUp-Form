require('dotenv').config();
const User = require('./model');
const { connect } = require('mongoose')
const { hash, compare } = require('bcryptjs');
const {sign} = require('jsonwebtoken')

const signUP = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        await connect(process.env.MONGO_URL)
        console.log("DB Connected");
        const checkExist = await User.exists({ email: email });

        if (checkExist) {
            res.json({
                "message": "User Already Exist"
            })
        } else {
            await User.create({ username, password: await hash(password, 12), email });
            console.log("Succ")
            res.status(201).json({
                "message": "Done"
            })
        }

    }
    catch (error) {
        res.json({
            "message": error.message
        })
    }

}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        await connect(process.env.MONGO_URL)

        const checkExistUser = await User.findOne({ email: email });

        if (!checkExistUser) {
            res.status(404).json({
                message: "User not found"
            })
        } else {

            const decryptPass = await compare(password, checkExistUser.password);

            if (email == checkExistUser.email && decryptPass) {

                const token = sign({
                    username: checkExistUser.username,
                    id: checkExistUser._id,
                    email: checkExistUser.email
                },
                process.env.JWT_SECRET
                )

                res.status(200).json({
                    message: "Successfully Signed In",
                    ticket: token
                })
            } else {
                res.json({
                    message: "Envalid Crediantials"
                })
            }


        }

    } catch (error) {

    }
}


module.exports = { signUP, login };