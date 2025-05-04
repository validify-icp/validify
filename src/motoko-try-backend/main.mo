import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Controller "events/controller";
import CertController "certificate/controller";
import Types "types";
import ModelCertificate "certificate/model";
import Helper "helper";

actor {
    let eventController = Controller.EventController();
    let certificateController = CertController.CertificateController();
    

    
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
    
    // public query func getEventsByOrganizer(organizerId: Types.OrganizerId): async Helper.Response<[Types.Event]> {
    //     let events = eventController.readByOrganizer(organizerId);
    //     return Helper.arrayToResponse<Types.Event>(
    //         events, 
    //         "Events for organizer " # debug_show(organizerId) # " retrieved"
    //     );
    // };
    
   

    public func createCertificatesNew(
      requests: [ModelCertificate.CreateCertRequest]
    ) : async Helper.Response<[ModelCertificate.CertificateNew]> {
      
      var responses: [ModelCertificate.CertificateNew] = [];
      let getEvent = eventController.read(requests[0].eventId);

      let (eventName, eventDate) = switch (getEvent) {
          case (#ok(event)) {
              (event.title, event.date)
          };
          case (#err(_)) {
              ("UNKNOWN EVENT", "UNKNOWN DATE") // Default fallback if not found
          };
      };

      

      for (req in requests.vals()) {
        // let id = Helper.generateUniqueID(10);

        let certificateStatus = "Registered";
        let participantStatus = "Registered";

        let newCert = certificateController.createCertificateNew(
          req.id,
          req.eventId,
          eventName,
          eventDate,
          req.certificateTitle,
          req.certificateLabel,
          certificateStatus,
          req.certificateLink,
          req.description,
          req.participantName,
          req.participantRole,
          participantStatus,
        );

        responses := Array.append<ModelCertificate.CertificateNew>(responses, [newCert]);

      };

      return Helper.resultToResponse<[ModelCertificate.CertificateNew]>(
      #ok(responses),
      "Certificate created successfully",
      "Certificate not found",
      "Invalid certificate data provided",
    );
    };


    
  
  // Read APIs
  public query func getCertificate(id: ModelCertificate.CertificateId): async Helper.Response<ModelCertificate.CertificateNew> {
    let result = certificateController.read(id);
    return Helper.resultToResponse<ModelCertificate.CertificateNew>(
      result,
      "Certificate retrieved successfully",
      "Certificate not found",
      "Invalid certificate data",
    );
  };

  public query func getAllCustCertificates(ids: [ModelCertificate.CertificateId]): async Helper.Response<[ModelCertificate.CertificateUserView]> {
    let certificates = certificateController.getCustomerCertificate(ids);
    return Helper.arrayToResponse<ModelCertificate.CertificateUserView>(certificates, "All certificates retrieved");
  };
  
  public query func getAllCertificates(): async Helper.Response<[ModelCertificate.CertificateNew]> {
    let certificates = certificateController.readAll();
    return Helper.arrayToResponse<ModelCertificate.CertificateNew>(certificates, "All certificates retrieved");
  };
  
  public query func getCertificatesByEvent(eventId: Types.EventId): async Helper.Response<[ModelCertificate.CertificateNew]> {
    let certificates = certificateController.readByEvent(eventId);
    return Helper.arrayToResponse<ModelCertificate.CertificateNew>(
      certificates,
      "Certificates for event " # debug_show(eventId) # " retrieved"
    );
  };
  
  public query func getCertificatesByParticipant(name: Text): async Helper.Response<[ModelCertificate.CertificateNew]> {
    let certificates = certificateController.readByParticipant(name);
    return Helper.arrayToResponse<ModelCertificate.CertificateNew>(
      certificates,
      "Certificates for participant containing '" # name # "' retrieved"
    );
  };

  // Update API
  public func updateCertificates(updates: [ModelCertificate.CertificateUpdateReq]): async Helper.Response<[ModelCertificate.CertificateNew]> {
      var updatedCerts: [ModelCertificate.CertificateNew] = [];

      for (req in updates.vals()) {
        let result = certificateController.update(req.id, req.update);

        switch (result) {
          case (?cert) {
            updatedCerts := Array.append(updatedCerts, [cert]);
          };
          case (null) {
            (); // Skip or log not found
          };
        };
      };

      return {
        status = true;
        message = "Batch update complete";
        data = ?updatedCerts;
      };
    };


        // Create API EVENT
    public func createEvent(title: Text, date: Text, organizerId: Types.OrganizerId): async Helper.Response<Types.Event> {
        let result = eventController.create(title, date, organizerId);
        return Helper.resultToResponse<Types.Event>(
            result,
            "Event created successfully",
            "Error creating event",
            "Invalid event data provided"
        );
    };
  
  
}