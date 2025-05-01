import Debug "mo:base/Debug";
import Controller "events/controller";
import CertController "certificate/controller";
import Types "types";
import ModelCertificate "certificate/model";
import Helper "helper";

actor {
    let eventController = Controller.EventController();
    let certificateController = CertController.CertificateController();
    
    // Create API
    public func createEvent(title: Text, date: Text, organizerId: Types.OrganizerId): async Helper.Response<Types.Event> {
        let result = eventController.create(title, date, organizerId);
        return Helper.resultToResponse<Types.Event>(
            result,
            "Event created successfully",
            "Error creating event",
            "Invalid event data provided"
        );
    };
    
    // Read APIs
    public query func getEvent(id: Types.EventId): async Helper.Response<Types.Event> {
        let result = eventController.read(id);
        return Helper.resultToResponse<Types.Event>(
            result,
            "Event retrieved successfully",
            "Event not found",
            "Invalid event data"
        );
    };
    
    public query func getAllEvents(): async Helper.Response<[Types.Event]> {
        let events = eventController.readAll();
        return Helper.arrayToResponse<Types.Event>(events, "All events retrieved");
    };
    
    public query func getEventsByOrganizer(organizerId: Types.OrganizerId): async Helper.Response<[Types.Event]> {
        let events = eventController.readByOrganizer(organizerId);
        return Helper.arrayToResponse<Types.Event>(
            events, 
            "Events for organizer " # debug_show(organizerId) # " retrieved"
        );
    };
    
    // Update API
    public func updateEvent(id: Types.EventId, update: Types.EventUpdate): async Helper.Response<Types.Event> {
        let result = eventController.update(id, update);
        return Helper.resultToResponse<Types.Event>(
            result,
            "Event updated successfully",
            "Event not found",
            "Invalid update data provided"
        );
    };
    
    // Delete API
    public func deleteEvent(id: Types.EventId): async Helper.Response<()> {
        let result = eventController.delete(id);
        return Helper.resultToResponse<()>(
            result,
            "Event deleted successfully",
            "Event not found",
            "Invalid event data"
        );
    };

    public func createCertificate(
    id: ModelCertificate.CertificateId,
    eventId: Types.EventId,
    eventName: Text,
    institutionLogo: Text,
    additionalLogo: ?Text,
    certificateTitle: Text,
    description: Text,
    participantName: Text,
    validUntil: Text,
    signature: Text,
    includeBarcode: Bool,
    brandTemplate: ModelCertificate.BrandColor
  ): async Helper.Response<ModelCertificate.Certificate> {
    let result = certificateController.create(
      id,
      eventId,
      eventName,
      institutionLogo,
      additionalLogo,
      certificateTitle,
      description,
      participantName,
      validUntil,
      signature,
      includeBarcode,
      brandTemplate
    );
    
    return Helper.resultToResponse<ModelCertificate.Certificate>(
      result,
      "Certificate created successfully",
      "Certificate not found",
      "Invalid certificate data provided",
    );
  };
  
  // Read APIs
  public query func getCertificate(id: ModelCertificate.CertificateId): async Helper.Response<ModelCertificate.Certificate> {
    let result = certificateController.read(id);
    return Helper.resultToResponse<ModelCertificate.Certificate>(
      result,
      "Certificate retrieved successfully",
      "Certificate not found",
      "Invalid certificate data",
    );
  };
  
  public query func getAllCertificates(): async Helper.Response<[ModelCertificate.Certificate]> {
    let certificates = certificateController.readAll();
    return Helper.arrayToResponse<ModelCertificate.Certificate>(certificates, "All certificates retrieved");
  };
  
  public query func getCertificatesByEvent(eventId: Types.EventId): async Helper.Response<[ModelCertificate.Certificate]> {
    let certificates = certificateController.readByEvent(eventId);
    return Helper.arrayToResponse<ModelCertificate.Certificate>(
      certificates,
      "Certificates for event " # debug_show(eventId) # " retrieved"
    );
  };
  
  public query func getCertificatesByParticipant(name: Text): async Helper.Response<[ModelCertificate.Certificate]> {
    let certificates = certificateController.readByParticipant(name);
    return Helper.arrayToResponse<ModelCertificate.Certificate>(
      certificates,
      "Certificates for participant containing '" # name # "' retrieved"
    );
  };
  
  // Update API
  public func updateCertificate(id: ModelCertificate.CertificateId, update: ModelCertificate.CertificateUpdate): async Helper.Response<ModelCertificate.Certificate> {
    let result = certificateController.update(id, update);
    return Helper.resultToResponse<ModelCertificate.Certificate>(
      result,
      "Certificate updated successfully",
      "Certificate not found",
      "Invalid update data provided"
    );
  };
  
  // Delete API
  public func deleteCertificate(id: ModelCertificate.CertificateId): async Helper.Response<()> {
    let result = certificateController.delete(id);
    return Helper.resultToResponse<()>(
      result,
      "Certificate deleted successfully",
      "Certificate not found",
      "Invalid certificate data",
    );
  };
    
    // Example usage for testing
    public func runExample(): async () {
        Debug.print("Creating two events...");
        let event1Result = eventController.create("Tech Conference", "2025-05-25", 1);
        let event2Result = eventController.create("Community Meetup", "2025-06-15", 2);
        let event3Result = eventController.create("Workshop", "2025-07-10", 1);
        
        switch (event1Result) {
            case (#ok(event)) {
                Debug.print("Created event: " # event.title);
                
                // Update example
                let updateResult = eventController.update(
                    event.id, 
                    { title = ?"Annual Tech Conference"; date = null; organizerId = null }
                );
                
                switch (updateResult) {
                    case (#ok(updated)) {
                        Debug.print("Updated title to: " # updated.title);
                    };
                    case (#err(error)) {
                        Debug.print("Update failed");
                    };
                };
                
                // Show events by organizer
                let organizer1Events = eventController.readByOrganizer(1);
                Debug.print("Organizer 1 events: " # debug_show(organizer1Events.size()));
                
                // Delete example
                let deleteResult = eventController.delete(event.id);
                switch (deleteResult) {
                    case (#ok()) {
                        Debug.print("Event deleted successfully");
                    };
                    case (#err(error)) {
                        Debug.print("Delete failed");
                    };
                };
            };
            case (#err(error)) {
                Debug.print("Create failed");
            };
        };
        
        // Show remaining events
        let events = eventController.readAll();
        Debug.print("Remaining events: " # debug_show(events.size()));
    };
}