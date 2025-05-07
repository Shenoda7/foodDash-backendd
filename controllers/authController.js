const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.signup = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const role = req.body.role || "user";
        const existingUser = await User.findOne({ email });
        if (existingUser)  return res.status(400).json({ message: "User already exists" });

        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = new User(
            {
                username,
                email,
                password: hashedPwd,
                role: role || "user",
            });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email });
        if (!foundUser) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
