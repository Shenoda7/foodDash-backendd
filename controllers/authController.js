const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.signup = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).send("User already exists");

        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPwd });
        await newUser.save();

        res.status(201).send("User registered successfully");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email });
        if (!foundUser) return res.status(400).send("Wrong email or password");

        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) return res.status(400).send("Wrong email or password");

        res.status(200).send("Login successful");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
