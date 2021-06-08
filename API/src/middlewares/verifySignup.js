import Role from '../models/Role';
import User from '../models/User';

export const checkRolesExisted = async (req, res, next) => {
    try{
        const roles = await Role.find();
        if (req.body.roles) {
            for(let i = 0; i < req.body.roles.length; i++) {
                if(!roles.find(rol => rol.name === req.body.roles[i])){
                    return res.status(400).json({
                        message: 'Rol ' + req.body.roles[i] + ' no existe'
                    });
                }
            }
        }
        next();
    } catch (err){
        return res.status(500).json({ message: err });
    }
}

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });

    if(user) return res.status(400).json({message: 'El usuario ya existe'});

    const email = await User.findOne({ email: req.body.email });

    if(email) return res.status(400).json({message: 'El email ya existe'});

    next();
}