module {
    public type EventId = Nat;
    public type OrganizerId = Nat;
    
    public type Event = {
        id: EventId;
        title: Text;
        date: Text;
        organizerId: OrganizerId;
    };
    
    public type EventUpdate = {
        title: ?Text;
        date: ?Text;
        organizerId: ?OrganizerId;
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