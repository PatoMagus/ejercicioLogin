import Role from '../models/Role';
import User from '../models/User'

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();

        if(count > 0) return;

        const values = await Promise.all([
            new Role({ name: "user" }).save(),
            new Role({ name: "admin" }).save()
        ]);
        
        console.log(values);
    } catch (err) {
        console.log(err);
    }
}

export const createUser = async () => {
    try {
        const firstUser = await User.estimatedDocumentCount();

        if(firstUser > 0) return;

        const role = await Role.findOne({ name: "admin" });

        const newUser = new User({
            username: 'admin', 
            password: await User.encryptPassword('admin'),
            email: 'admin@user.cl',
            roles: [role._id]
        });

        const values = await newUser.save();
        console.log(values);
    } catch (err) {
        console.log(err);
    }
}