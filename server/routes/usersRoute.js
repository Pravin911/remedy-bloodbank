const router = require('express').Router();
const bcrypt = require('bcrypt');  // for hashing the passwords
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware');
const Inventory = require('../model/inventoryModel');

// register new user
router.post('/register', async (req, res) => {
    try {
        // Check if user exists
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10); // 10 rounds for generating salt (hashing)
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        // Save user
        const user = new User(req.body);
        await user.save();

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: error.message,
        });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        // Check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found',
            });
        }

        // Check if userType matches
        if(user.userType !== req.body.userType){
            res.send({
                success: false,
                message:  `User is not match with ${req.body.userType}`
            });
        }


        // Check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message: 'Invalid password',
            });
        }

        // Generating JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: token,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// get current user
router.get('/get-current-user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        return res.send({
            success: true,
            message: 'User fetched successfully',
            data: user,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
})

// get all unique donars for an organization
router.get('/get-all-donars', authMiddleware, async (req, res) => {
    try {
        const organization = new mongoose.Types.ObjectId(req.body.userId);
        const uniqueDonarsIds = await Inventory.distinct(
            'donar',
            {
                organization,
            },
        );

        const donars = await User.find({
            _id: { $in: uniqueDonarsIds },
        })

        console.log(uniqueDonarsIds);
        return res.send({
            success: true,
            message: 'Donars fetched successfully',
            data: donars,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
