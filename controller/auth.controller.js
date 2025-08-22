import { User } from '../model/user.model.js';
import generateAndSetToken from '../utils/generateToken.js';

export const signup = async (req, res) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User with this email already exists.');
    }

    const user = await User.create({ email, password });

    if (user) {
        generateAndSetToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data.');
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
        generateAndSetToken(res, user._id);
        res.json({
            _id: user._id,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password.');
    }
};