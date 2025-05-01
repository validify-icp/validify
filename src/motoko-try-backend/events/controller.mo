import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Model "model";

module {
    public class EventController() {
        private var events = Buffer.Buffer<Model.Event>(0);
        private var nextId: Model.EventId = 1;
        
        // Create a new event
        public func create(title: Text, date: Text, organizerId: Model.OrganizerId): Model.Result<Model.Event> {
            // Simple validation
            if (title == "" or date == "") {
                return #err(#InvalidData);
            };
            
            let newEvent: Model.Event = {
                id = nextId;
                title = title;
                date = date;
                organizerId = organizerId;
            };
            
            events.add(newEvent);
            nextId += 1;
            
            #ok(newEvent)
        };
        
        // Read an event by ID
        public func read(id: Model.EventId): Model.Result<Model.Event> {
            for (event in events.vals()) {
                if (event.id == id) {
                    return #ok(event);
                };
            };
            
            #err(#NotFound)
        };
        
        // Read all events
        public func readAll(): [Model.Event] {
            Buffer.toArray(events)
        };
        
        // Read events by organizer ID
        public func readByOrganizer(organizerId: Model.OrganizerId): [Model.Event] {
            let filteredEvents = Buffer.Buffer<Model.Event>(0);
            
            for (event in events.vals()) {
                if (event.organizerId == organizerId) {
                    filteredEvents.add(event);
                };
            };
            
            Buffer.toArray(filteredEvents)
        };
        
        // Update an event
        public func update(id: Model.EventId, update: Model.EventUpdate): Model.Result<Model.Event> {
            for (i in Iter.range(0, events.size() - 1)) {
                let event = events.get(i);
                
                if (event.id == id) {
                    let updatedEvent: Model.Event = {
                        id = event.id;
                        title = Option.get(update.title, event.title);
                        date = Option.get(update.date, event.date);
                        organizerId = Option.get(update.organizerId, event.organizerId);
                    };
                    
                    ignore events.put(i, updatedEvent);
                    return #ok(updatedEvent);
                };
            };
            
            #err(#NotFound)
        };
        
        // Delete an event
        public func delete(id: Model.EventId): Model.Result<()> {
            var found = false;
            let newBuffer = Buffer.Buffer<Model.Event>(events.size());
            
            for (event in events.vals()) {
                if (event.id != id) {
                    newBuffer.add(event);
                } else {
                    found := true;
                };
            };
            
            if (not found) {
                return #err(#NotFound);
            };
            
            events := newBuffer;
            #ok(())
        };
    };
}