// routes/userRoute.ts
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from './controllers/userController';

export const UserRoutes = {
    createUser, getAllUsers, getUserById, updateUser, deleteUser
};
