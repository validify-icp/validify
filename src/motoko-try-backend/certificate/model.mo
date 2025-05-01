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
    brandTemplate: BrandColor;       // e.g., "#FF5733" or a named theme
  };

  public type CertificateUpdate = {
    eventName: ?Text;
    institutionLogo: ?Text;
    additionalLogo: ?Text;
    certificateTitle: ?Text;
    description: ?Text;
    participantName: ?Text;
    validUntil: ?Text;
    signature: ?Text;
    includeBarcode: ?Bool;
    brandTemplate: ?BrandColor;
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
