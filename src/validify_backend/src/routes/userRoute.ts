// routes.ts
import { $query, $update, Vec } from 'azle';
import { createUser, getUserById, updateUser, deleteUser, getAllUsers } from '../controllers/userController';
import { User } from '../models/userModel'; // Import the User model

// Routes for User CRUD operations

$update;
export function createUserRoute(username: string, email: string, password: string): string {
  return createUser(username, email, password);
}

$query;
export function getUserByIdRoute(id: string): User | null {
  return getUserById(id);
}

$update;
export function updateUserRoute(id: string, username: string, email: string, password: string): string {
  return updateUser(id, username, email, password);
}

$update;
export function deleteUserRoute(id: string): string {
  return deleteUser(id);
}

$query;
export function getAllUsersRoute(): Vec<User> {
  return getAllUsers();
}
