import Types "types";
    import Time "mo:base/Time";
import Nat64 "mo:base/Nat64";
import Int "mo:base/Int";
import Text "mo:base/Text";
import Char "mo:base/Char";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Prim "mo:prim";

module {
    public type Result<T> = {
        #ok: T;
        #err: Error;
    };
    
    // Standardized response format
    public type Response<T> = {
        status: Bool;
        message: Text;
        data: ?T;
    };



    public func generateUniqueID(length : Nat) : Text {
        let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let charsArray = Iter.toArray(Text.toIter(chars));
        let charsCount = charsArray.size();
        
        var result = "";
        var currentTime = Int.abs(Time.now());
        
        for (_ in Iter.range(0, length - 1)) {
        let index = currentTime % charsCount;
        result := result # Text.fromChar(charsArray[index]);
        currentTime := currentTime / 10 + 13; // Simple modification to get different values
        };

        
        Text.map(result, Prim.charToUpper);
    };

    // Convert Result type to Response format
    public func toResponse<T>(result: Types.Result<T>, successMsg: Text): Response<T> {
        switch (result) {
            case (#ok(data)) {
                return {
                    status = true;
                    message = successMsg;
                    data = ?data;
                };
            };
            case (#err(error)) {
                return {
                    status = false;
                    message = errorToMessage(error);
                    data = null;
                };
            };
        };
    };
    
    // Create a success response
public func success<T>(data: T, message: Text): Response<T> {
        return {
            status = true;
            message = message;
            data = ?data;
        };
    };
    
    // Create an error response
    public func error<T>(message: Text): Response<T> {
        return {
            status = false;
            message = message;
            data = null;
        };
    };
    
    // Convert error type to message
    public func errorToMessage(err: Types.Error): Text {
        switch (err) {
            case (#NotFound) { "Resource not found" };
            case (#AlreadyExists) { "Resource already exists" };
            case (#InvalidData) { "Invalid data provided" };
        };
    };

    public func resultToResponse<T>(result: Types.Result<T>, successMsg: Text, notFoundMsg: Text, invalidDataMsg: Text): Response<T> {
        switch (result) {
            case (#ok(value)) {
                return {
                    status = true;
                    message = successMsg;
                    data = ?value;
                };
            };
            case (#err(#NotFound)) {
                return {
                    status = false;
                    message = notFoundMsg;
                    data = null;
                };
            };
            case (#err(#InvalidData)) {
                return {
                    status = false;
                    message = invalidDataMsg;
                    data = null;
                };
            };
            case (#err(#AlreadyExists)) {
                return {
                    status = false;
                    message = "Item already exists";
                    data = null;
                };
            };
        };
    };
    
    // Helper function for array responses
    public func arrayToResponse<T>(items: [T], msg: Text): Response<[T]> {
        return {
            status = true;
            message = msg # " (" # debug_show(items.size()) # " items)";
            data = ?items;
        };
    };
}