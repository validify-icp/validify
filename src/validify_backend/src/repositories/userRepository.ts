// repository.ts
import { StableBTreeMap } from 'azle';
import { User } from '../models/userModel'; // Import the User model

// StableBTreeMap for User storage
const userStorage = new StableBTreeMap<string, User>(4, 44, 512);

// Repository functions for User CRUD operations

// Create a new user
export function createUser(username: string, email: string, password: string): string {
  const user = {
    id: "",
    username: username,
    email: email,
    password: password,
    created_date: "",
    updated_at: "",
  };
  userStorage.insert(user.id, user);
  return user.id;
}

// Read a user by ID
// export function getUserById(id: string): User {
//   return userStorage.get(id);
// }

// Update user information
export function updateUser(id: string, username: string, email: string, password: string): string {
  const user = match(userStorage.get(id), {
    Some: (user) => user,
    None: () => ({} as unknown as User),
  });
  
  if (user) {
    user.username = username;
    user.email = email;
    user.password = password;
    user.updated_at = Opt.Some(ic.time());
    userStorage.insert(user.id, user);
  }
  return user.id;
}

// Delete a user by ID
export function deleteUser(id: string): string {
  userStorage.remove(id);
  return `User with ID: ${id} removed successfully`;
}

// Get all users
export function getAllUsers(): Vec<User> {
  return userStorage.values();
}
