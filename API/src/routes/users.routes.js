import { Router } from 'express';
import * as usersController from '../controllers/users.controller';
import { authJwt } from '../middlewares';
import { verifySignup } from '../middlewares';

const router = Router();

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUserById);
router.post('/', [
    // authJwt.verifyToken, 
    // authJwt.isAdmin, 
    verifySignup.checkDuplicateUsernameOrEmail, 
    verifySignup.checkRolesExisted
], usersController.createUser);
router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], usersController.updateUserById);
router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], usersController.deleteUserById);

export default router;