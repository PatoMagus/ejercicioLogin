import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';
import Role from '../models/Role';

export const verifyToken = async (req, res, next) => {
    try{
        const token = req.header["x-access-token"];

        console.log(token);

        if(!token) return res.status(403).json({ message: 'No se ha proporcionado ningun token'});

        const decoded = jwt.verify(token, config.SECRET);
        req.uderId = decoded.id;

        const user = await User.findById(req.uderId, {password: 0});
        if(!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        next(); 
    } catch (err){
        return res.status(401).json({ message: 'No autorizado' });
    }
}

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in: user.roles}});

    for(let i = 0; i < roles.length; i++){
        if(roles[i].name === "admin"){
            next();
            return;
        }
    }

    return res.status(403).json({ message: 'Requiere rol de administador' });
}