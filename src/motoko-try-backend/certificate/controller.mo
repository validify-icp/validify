import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Text "mo:base/Text";
import Model "model";

module {
  public class CertificateController() {
    private var certificates = Buffer.Buffer<Model.Certificate>(0);
    
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
      };
      
      certificates.add(newCertificate);
      
      #ok(newCertificate)
    };
    
    // Read a certificate by ID
    public func read(id: Model.CertificateId): Model.Result<Model.Certificate> {
      for (cert in certificates.vals()) {
        if (cert.id == id) {
          return #ok(cert);
        };
      };
      
      #err(#NotFound)
    };
    
    // Read all certificates
    public func readAll(): [Model.Certificate] {
      Buffer.toArray(certificates)
    };
    
    // Read certificates by event ID
    public func readByEvent(eventId: Model.EventId): [Model.Certificate] {
      let filteredCertificates = Buffer.Buffer<Model.Certificate>(0);
      
      for (cert in certificates.vals()) {
        if (cert.eventId == eventId) {
          filteredCertificates.add(cert);
        };
      };
      
      Buffer.toArray(filteredCertificates)
    };
    
    // Read certificates by participant name (partial match)
    public func readByParticipant(name: Text): [Model.Certificate] {
      let filteredCertificates = Buffer.Buffer<Model.Certificate>(0);
      
      for (cert in certificates.vals()) {
        if (Text.contains(cert.participantName, #text name)) {
          filteredCertificates.add(cert);
        };
      };
      
      Buffer.toArray(filteredCertificates)
    };
    
    // Update a certificate
    public func update(id: Model.CertificateId, update: Model.CertificateUpdate): Model.Result<Model.Certificate> {
      for (i in Iter.range(0, certificates.size() - 1)) {
        let cert = certificates.get(i);
        
        if (cert.id == id) {
          let updatedCertificate: Model.Certificate = {
            id = cert.id;
            eventId = cert.eventId;
            eventName = Option.get(update.eventName, cert.eventName);
            institutionLogo = Option.get(update.institutionLogo, cert.institutionLogo);
            additionalLogo = switch (update.additionalLogo) {
              case (null) { cert.additionalLogo };
              case (?opt) { ?opt };
            };
            certificateTitle = Option.get(update.certificateTitle, cert.certificateTitle);
            description = Option.get(update.description, cert.description);
            participantName = Option.get(update.participantName, cert.participantName);
            validUntil = Option.get(update.validUntil, cert.validUntil);
            signature = Option.get(update.signature, cert.signature);
            includeBarcode = Option.get(update.includeBarcode, cert.includeBarcode);
            brandTemplate = Option.get(update.brandTemplate, cert.brandTemplate);
          };
          
          ignore certificates.put(i, updatedCertificate);
          return #ok(updatedCertificate);
        };
      };
      
      #err(#NotFound)
    };
    
    // Delete a certificate
    public func delete(id: Model.CertificateId): Model.Result<()> {
      var found = false;
      let newBuffer = Buffer.Buffer<Model.Certificate>(certificates.size());
      
      for (cert in certificates.vals()) {
        if (cert.id != id) {
          newBuffer.add(cert);
        } else {
          found := true;
        };
      };
      
      if (not found) {
        return #err(#NotFound);
      };
      
      certificates := newBuffer;
      #ok(())
    };
  };
}