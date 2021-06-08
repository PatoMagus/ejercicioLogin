import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';

export const signUp = async (req, res) => {
    const newUser = new User({
        username: req.body.username, 
        password: await User.encryptPassword(req.body.password),
        email: req.body.email
    });

    if(req.body.roles) {
        const foundRoles = await Role.find({ name: {$in: req.body.roles} });
        newUser.roles = foundRoles.map(role => role._id);
    }else{
        const role = await Role.findOne({ name: "user" });
        newUser.roles = [role._id];
    }

    const saveUser = await newUser.save();

    const token = jwt.sign({ id: saveUser._id }, config.SECRET, {
        expiresIn: 600 //10 min
    });

    res.status(200).json({ token });
}

export const signIn = async (req, res) => {
    const userFound = await User.findOne({email: req.body.email}).populate("roles");

    if(!userFound) return res.status(400).json({ message: 'Usuario no encontrado' });

    const matchPassword = await User.comparePassword(req.body.password, userFound.password);

    if (!matchPassword) return res.status(401).json({token: null, message: 'Contraseña invalida'});

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 600 //10 min
    });

    res.json({ token});
}