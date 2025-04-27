// controller.ts
import { Vec } from 'azle';
import * as repository from '../repositories/userRepository';
import { User } from '../models/userModel'; // Import the User model

// Controller functions for User CRUD operations

// Create a new user
export function createUser(username: string, email: string, password: string): string {
  return repository.createUser(username, email, password);
}

// Get user by ID
export function getUserById(id: string): any {
//   return repository.getUserById(id);
}

// Update user information
export function updateUser(id: string, username: string, email: string, password: string): string {
  return repository.updateUser(id, username, email, password);
}

// Delete user by ID
export function deleteUser(id: string): string {
  return repository.deleteUser(id);
}

// Get all users
export function getAllUsers(): Vec<User> {
  return repository.getAllUsers();
}
