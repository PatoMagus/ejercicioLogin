import User from '../models/User';
import Role from '../models/Role';


export const createUser = async (req, res) => {
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

    res.status(200).json(newUser);
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate("roles");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(user === null) {
            res.status(404).json({ message: 'No se pudo encontar al usuario' })
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const updateUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(user === null) {
            res.status(404).json({ message: 'No se pudo encontar al usuario' })
        } else {        
            try {
                const updateUsuario = await User.findByIdAndUpdate(req.params.id, req.body, { new: true});
                res.status(200).json(updateUsuario);
            } catch (err) {
                res.status(400).json({ message: err.message });
            }
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const deleteUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(user === null) {
            res.status(404).json({ message: 'No se pudo encontar al usuario' })
        } else {
            await User.findByIdAndDelete(req.params.id);
            res.status(204).json();
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}