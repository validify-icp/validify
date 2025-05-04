module {
  public type CertificateId = Text;
  public type EventId = Nat;
  public type BrandColor = Text;

  public type Certificate = {
    id: CertificateId;
    eventId: EventId;
    eventName: Text;
    institutionLogo: Text;           // Base64 or URL
    additionalLogo: ?Text;           // Optional extra logo
    certificateTitle: Text;
    description: Text;
    participantName: Text;
    validUntil: Text;                // Could be a date string (e.g. "2025-12-31")
    signature: Text;                 // Base64 or URL of signature image
    includeBarcode: Bool;
    certStatus: Text;
    certLink: Text;
    brandTemplate: BrandColor;       // e.g., "#FF5733" or a named theme
  };

  public type CreateCertRequest = {
  eventId: EventId;
  certificateTitle: Text;
  certificateLabel: Text;
  certificateLink: Text;
  description: Text;
  participantName: Text;
  participantRole: Text;
};     

  public type CertificateNew = {
    id: CertificateId;
    eventId: Nat;
    eventName: Text;
    eventDate: Text;
    certificateTitle: Text;
    certificateLabel: Text;
    certificateStatus: Text;
    certificateLink: Text;
    description: Text;
    participantName: Text;
    participantRole: Text;
    participantStatus: Text;
  };

  public type CertificateUserView = {
    id: CertificateId;
    eventId: EventId;
    eventName: Text;
    certificateTitle: Text;
    issuedBy: Text;
    participantName: Text;
    roleDescription: Text;
    status: Text;
    link: Text;
  };

  public type CertificateUpdate = {
    certificateTitle: Text;
    certificateLabel: Text;
    certificateStatus: Text;
    certificateLink: Text;
    description: Text;
    participantName: Text;
    participantRole: Text;
    participantStatus: Text;
  };

  public type CertificateUpdateReq = {
    id: CertificateId;
    update: CertificateUpdate;
  };

  public type Error = {
        #NotFound;
        #AlreadyExists;
        #InvalidData;
    };

   public type Result<T> = {
        #ok: T;
        #err: Error;
    };
}
