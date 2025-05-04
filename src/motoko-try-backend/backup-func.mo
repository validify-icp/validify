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

      // Create API
    // public func createEvent(title: Text, date: Text, organizerId: Types.OrganizerId): async Helper.Response<Types.Event> {
    //     let result = eventController.create(title, date, organizerId);
    //     return Helper.resultToResponse<Types.Event>(
    //         result,
    //         "Event created successfully",
    //         "Error creating event",
    //         "Invalid event data provided"
    //     );
    // };

     // // Update API
    // public func updateEvent(id: Types.EventId, update: Types.EventUpdate): async Helper.Response<Types.Event> {
    //     let result = eventController.update(id, update);
    //     return Helper.resultToResponse<Types.Event>(
    //         result,
    //         "Event updated successfully",
    //         "Event not found",
    //         "Invalid update data provided"
    //     );
    // };
    
    // // Delete API
    // public func deleteEvent(id: Types.EventId): async Helper.Response<()> {
    //     let result = eventController.delete(id);
    //     return Helper.resultToResponse<()>(
    //         result,
    //         "Event deleted successfully",
    //         "Event not found",
    //         "Invalid event data"
    //     );
    // };

  //   public func createCertificate(
  //   eventId: Types.EventId,
  //   eventName: Text,
  //   certificateTitle: Text,
  //   description: Text,
  //   participantName: Text,
  //   validUntil: Text,
  // ): async Helper.Response<ModelCertificate.Certificate> {
  //   let id = Helper.generateUniqueID(10);
  //   let certStatus = "pending";
  //   let certLink = "http://gambar.com";
    
  //   let result = certificateController.create(
  //     id,
  //     eventId,
  //     eventName,
  //     "",
  //     ?"",
  //     certificateTitle,
  //     description,
  //     participantName,
  //     validUntil,
  //     "signature",
  //     true,
  //     certStatus,
  //     certLink,
  //     "brandTemplate",
  //   );
    
  //   return Helper.resultToResponse<ModelCertificate.Certificate>(
  //     result,
  //     "Certificate created successfully",
  //     "Certificate not found",
  //     "Invalid certificate data provided",
  //   );
  // };

  // Update API
  // public func updateCertificate(id: ModelCertificate.CertificateId, update: ModelCertificate.CertificateUpdate): async Helper.Response<ModelCertificate.Certificate> {
  //   let result = certificateController.update(id, update);
  //   return Helper.resultToResponse<ModelCertificate.Certificate>(
  //     result,
  //     "Certificate updated successfully",
  //     "Certificate not found",
  //     "Invalid update data provided"
  //   );
  // };
  
  // // Delete API
  // public func deleteCertificate(id: ModelCertificate.CertificateId): async Helper.Response<()> {
  //   let result = certificateController.delete(id);
  //   return Helper.resultToResponse<()>(
  //     result,
  //     "Certificate deleted successfully",
  //     "Certificate not found",
  //     "Invalid certificate data",
  //   );
  // };
    
  //   // Example usage for testing
  //   public func runExample(): async () {
  //       Debug.print("Creating two events...");
  //       let event1Result = eventController.create("Tech Conference", "2025-05-25", 1);
  //       let event2Result = eventController.create("Community Meetup", "2025-06-15", 2);
  //       let event3Result = eventController.create("Workshop", "2025-07-10", 1);
        
  //       switch (event1Result) {
  //           case (#ok(event)) {
  //               Debug.print("Created event: " # event.title);
                
  //               // Update example
  //               let updateResult = eventController.update(
  //                   event.id, 
  //                   { title = ?"Annual Tech Conference"; date = null; organizerId = null }
  //               );
                
  //               switch (updateResult) {
  //                   case (#ok(updated)) {
  //                       Debug.print("Updated title to: " # updated.title);
  //                   };
  //                   case (#err(error)) {
  //                       Debug.print("Update failed");
  //                   };
  //               };
                
  //               // Show events by organizer
  //               let organizer1Events = eventController.readByOrganizer(1);
  //               Debug.print("Organizer 1 events: " # debug_show(organizer1Events.size()));
                
  //               // Delete example
  //               let deleteResult = eventController.delete(event.id);
  //               switch (deleteResult) {
  //                   case (#ok()) {
  //                       Debug.print("Event deleted successfully");
  //                   };
  //                   case (#err(error)) {
  //                       Debug.print("Delete failed");
  //                   };
  //               };
  //           };
  //           case (#err(error)) {
  //               Debug.print("Create failed");
  //           };
  //       };
        
  //       // Show remaining events
  //       let events = eventController.readAll();
  //       Debug.print("Remaining events: " # debug_show(events.size()));
  //   };
}
