import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import _ "mo:base/Debug";
import _ "mo:base/Option";

actor {
  // Define the User type
  type User = {
    id: Nat;
    name: Text;
    age: Nat;
  };

  // Custom hash function
  func natHash(n: Nat) : Nat32 {
    return Nat32.fromNat(n);
  };

  // Store users in a HashMap (user ID -> User)
  let users = HashMap.HashMap<Nat, User>(0, Nat.equal, natHash);

  // Create: Add a new user
  public func createUser(user: User) : async Text {
    if (users.get(user.id) != null) {
      return "User with ID " # Nat.toText(user.id) # " already exists.";
    };
    users.put(user.id, user);
    return "User created successfully.";
  };

  // Read: Get user by ID
  public query func getUser(id: Nat) : async ?User {
    return users.get(id);
  };

  // Read All: Get all users
  public query func getAllUsers() : async [User] {
    return Iter.toArray(users.vals());
  };

  // Update: Modify an existing user
  public func updateUser(user: User) : async Text {
    if (users.get(user.id) == null) {
      return "User with ID " # Nat.toText(user.id) # " not found.";
    };
    users.put(user.id, user);
    return "User updated successfully.";
  };

  // Delete: Remove a user by ID
  public func deleteUser(id: Nat) : async Text {
    switch (users.remove(id)) {
      case (null) return "User not found.";
      case (_) return "User deleted successfully.";
    };
  };

  // Greet function
  public query func greet(user: User) : async Text {
    return "Hello " # user.name # ", you are " # Nat.toText(user.age) # " years old!";
  };
}
