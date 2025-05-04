import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Text "mo:base/Text";
import Model "model";

module {
  public class CertificateController() {
    private var certificates = Buffer.Buffer<Model.Certificate>(0);
    private var certificatesNew = Buffer.Buffer<Model.CertificateNew>(0);
    
    // Create a new certificate
    public func create(
      id: Model.CertificateId,
      eventId: Model.EventId,
      eventName: Text,
      institutionLogo: Text,
      additionalLogo: ?Text,
      certificateTitle: Text,
      description: Text,
      participantName: Text,
      validUntil: Text,
      signature: Text,
      includeBarcode: Bool,
      certStatus: Text,
      certLink: Text,
      brandTemplate: Model.BrandColor
    ): Model.Result<Model.Certificate> {
      // Basic validation
      if (id == "" or eventName == "" or certificateTitle == "" or participantName == "") {
        return #err(#InvalidData);
      };
      
      // Check if certificate with this ID already exists
      for (cert in certificates.vals()) {
        if (cert.id == id) {
          return #err(#AlreadyExists);
        };
      };
      
      let newCertificate: Model.Certificate = {
        id;
        eventId;
        eventName;
        institutionLogo;
        additionalLogo;
        certificateTitle;
        description;
        participantName;
        validUntil;
        signature;
        includeBarcode;
        brandTemplate;
        certStatus;
        certLink;
      };
      
      certificates.add(newCertificate);
      
      #ok(newCertificate)
    };

    public func createCertificateNew(
      id: Model.CertificateId,
      eventId: Nat,
      eventName: Text,
      eventDate: Text,
      certificateTitle: Text,
      certificateLabel: Text,
      certificateStatus: Text,
      certificateLink: Text,
      description: Text,
      participantName: Text,
      participantRole: Text,
      participantStatus: Text,
    ): Model.CertificateNew {
      // Basic validation
      // if (id == "" or eventName == "" or certificateTitle == "" or participantName == "") {
      //   return #err(#InvalidData);
      // };
      
      // // Check if certificate with this ID already exists
      // for (cert in certificatesNew.vals()) {
      //   if (cert.id == id) {
      //     return #err(#AlreadyExists);
      //   };
      // };
      
      let newCertificate: Model.CertificateNew = {
        id;
        eventId;
        eventName;
        eventDate;
        certificateTitle;
        certificateLabel;
        certificateStatus;
        certificateLink;
        description;
        participantName;
        participantRole;
        participantStatus;
      };
      
      certificatesNew.add(newCertificate);
      
      newCertificate
    };

    public func getCustomerCertificate(ids: [Model.CertificateId]) : [Model.CertificateUserView] {
        var results: [Model.CertificateUserView] = [];

        for (id in ids.vals()) {
        var found: Bool = false;

        for (cert in certificatesNew.vals()) {
            if (id == cert.id) {
                let view : Model.CertificateUserView = {
                    id = cert.id;
                    eventId = cert.eventId;
                    eventName = cert.eventName;
                    certificateTitle = cert.certificateTitle;
                    issuedBy = cert.eventName;
                    participantName = cert.participantName;
                    roleDescription = cert.description;
                    status = cert.participantStatus;
                    link = cert.certificateLink;
                };
                results := Array.append<Model.CertificateUserView>(results, [view]);
                found := true;
                // break;
            };
        };

        if (found == false) {
            let notFoundView : Model.CertificateUserView = {
                id = id;
                eventId = 0; // or a placeholder
                eventName = "Unknown Certificate";
                certificateTitle = "Unknown";
                issuedBy = "Unknown Issuer";
                participantName = "Unknown";
                roleDescription = "No details available";
                status = "Not Found";
                link = "#";
            };
            results := Array.append<Model.CertificateUserView>(results, [notFoundView]);
        };
    };

        results;
    };

    
    // Read a certificate by ID
    public func read(id: Model.CertificateId): Model.Result<Model.CertificateNew> {
      for (cert in certificatesNew.vals()) {
        if (cert.id == id) {
          return #ok(cert);
        };
      };
      
      #err(#NotFound)
    };
    
    // Read all certificates
    public func readAll(): [Model.CertificateNew] {
      Buffer.toArray(certificatesNew)
    };
    
    // Read certificates by event ID
    public func readByEvent(eventId: Model.EventId): [Model.CertificateNew] {
      let filteredCertificates = Buffer.Buffer<Model.CertificateNew>(0);
      
      for (cert in certificatesNew.vals()) {
        if (cert.eventId == eventId) {
          filteredCertificates.add(cert);
        };
      };
      
      Buffer.toArray(filteredCertificates)
    };
    
    // Read certificates by participant name (partial match)
    public func readByParticipant(name: Text): [Model.CertificateNew] {
      let filteredCertificates = Buffer.Buffer<Model.CertificateNew>(0);
      
      for (cert in certificatesNew.vals()) {
        if (Text.contains(cert.participantName, #text name)) {
          filteredCertificates.add(cert);
        };
      };
      
      Buffer.toArray(filteredCertificates)
    };
    
    // Update a certificate
    public func update(id: Model.CertificateId, update: Model.CertificateUpdate): ?Model.CertificateNew {
      for (i in Iter.range(0, certificatesNew.size() - 1)) {
        let cert = certificatesNew.get(i);

        if (cert.id == id) {
          let updatedCertificate: Model.CertificateNew = {
            id = cert.id;
            eventId = cert.eventId;
            eventName = cert.eventName;
            eventDate = cert.eventDate;
            certificateTitle = if (update.certificateTitle == "") cert.certificateTitle else update.certificateTitle;
            certificateLabel = if (update.certificateLabel == "") cert.certificateLabel else update.certificateLabel;
            certificateStatus = if (update.certificateStatus == "") cert.certificateStatus else update.certificateStatus;
            certificateLink = if (update.certificateLink == "") cert.certificateLink else update.certificateLink;
            description = if (update.description == "") cert.description else update.description;
            participantName = if (update.participantName == "") cert.participantName else update.participantName;
            participantRole = if (update.participantRole == "") cert.participantRole else update.participantRole;
            participantStatus = if (update.participantStatus == "") cert.participantStatus else update.participantStatus;
          };

          ignore certificatesNew.put(i, updatedCertificate);
          return ?updatedCertificate;
        };
      };

      // Not found
      null
    };



    
    // Delete a certificate
    public func delete(id: Model.CertificateId): Model.Result<()> {
      var found = false;
      let newBuffer = Buffer.Buffer<Model.CertificateNew>(certificatesNew.size());
      
      for (cert in certificatesNew.vals()) {
        if (cert.id != id) {
          newBuffer.add(cert);
        } else {
          found := true;
        };
      };
      
      if (not found) {
        return #err(#NotFound);
      };
      
      certificatesNew := newBuffer;
      #ok(())
    };
  };
}