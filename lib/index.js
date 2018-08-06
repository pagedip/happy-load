"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = require("../happy-load.json");
/**
 * Returns an array of all loading message objects. Provide a source to get messages for just that source.
 * @param source Optional source to scope messages.
 */
function all(source) {
    if (source != null) {
        var indexes = exports.data.by_source[source];
        if (indexes == null)
            throw new Error("Missing source '" + source + "'");
        return indexes.map(function (i) { return exports.data.all[i]; });
    }
    else {
        return exports.data.all;
    }
}
exports.all = all;
/**
 * Get a specific loading message by id.
 * @param id The string id or index of the loading message.
 */
function get(id) {
    if (typeof id === "number")
        return exports.data.all[id];
    var index = exports.data.by_id[id];
    if (index != null)
        return exports.data.all[index];
}
exports.get = get;
/**
 * Get a random loading message, optionally scoped to a source.
 * @param source Optional source to scope messages.
 */
function random(source) {
    var messages = all(source);
    return messages[Math.floor(Math.random() * messages.length)];
}
exports.random = random;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFpQmEsUUFBQSxJQUFJLEdBQVMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFeEQ7OztHQUdHO0FBQ0gsYUFBb0IsTUFBZTtJQUNqQyxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7UUFDbEIsSUFBTSxPQUFPLEdBQUcsWUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxJQUFJLE9BQU8sSUFBSSxJQUFJO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDeEUsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsWUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBWCxDQUFXLENBQUMsQ0FBQztLQUN4QztTQUFNO1FBQ0wsT0FBTyxZQUFJLENBQUMsR0FBRyxDQUFDO0tBQ2pCO0FBQ0gsQ0FBQztBQVJELGtCQVFDO0FBRUQ7OztHQUdHO0FBQ0gsYUFBb0IsRUFBbUI7SUFDckMsSUFBSSxPQUFPLEVBQUUsS0FBSyxRQUFRO1FBQUUsT0FBTyxZQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELElBQU0sS0FBSyxHQUFHLFlBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0IsSUFBSSxLQUFLLElBQUksSUFBSTtRQUFFLE9BQU8sWUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBSkQsa0JBSUM7QUFFRDs7O0dBR0c7QUFDSCxnQkFBdUIsTUFBZTtJQUNwQyxJQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0IsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUhELHdCQUdDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBMb2FkTWVzc2FnZSB7XG4gIHRleHQ/OiBzdHJpbmc7XG4gIHN1YnRleHQ/OiBzdHJpbmc7XG4gIGlkOiBzdHJpbmc7XG4gIHNvdXJjZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhdGEge1xuICBhbGw6IExvYWRNZXNzYWdlW107XG4gIGJ5X3NvdXJjZToge1xuICAgIFtzb3VyY2U6IHN0cmluZ106IG51bWJlcltdO1xuICB9O1xuICBieV9pZDoge1xuICAgIFtpZDogc3RyaW5nXTogbnVtYmVyO1xuICB9O1xufVxuXG5leHBvcnQgY29uc3QgZGF0YTogRGF0YSA9IHJlcXVpcmUoXCIuLi9oYXBweS1sb2FkLmpzb25cIik7XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSBvZiBhbGwgbG9hZGluZyBtZXNzYWdlIG9iamVjdHMuIFByb3ZpZGUgYSBzb3VyY2UgdG8gZ2V0IG1lc3NhZ2VzIGZvciBqdXN0IHRoYXQgc291cmNlLlxuICogQHBhcmFtIHNvdXJjZSBPcHRpb25hbCBzb3VyY2UgdG8gc2NvcGUgbWVzc2FnZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhbGwoc291cmNlPzogc3RyaW5nKSB7XG4gIGlmIChzb3VyY2UgIT0gbnVsbCkge1xuICAgIGNvbnN0IGluZGV4ZXMgPSBkYXRhLmJ5X3NvdXJjZVtzb3VyY2VdO1xuICAgIGlmIChpbmRleGVzID09IG51bGwpIHRocm93IG5ldyBFcnJvcihcIk1pc3Npbmcgc291cmNlICdcIiArIHNvdXJjZSArIFwiJ1wiKTtcbiAgICByZXR1cm4gaW5kZXhlcy5tYXAoKGkpID0+IGRhdGEuYWxsW2ldKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZGF0YS5hbGw7XG4gIH1cbn1cblxuLyoqXG4gKiBHZXQgYSBzcGVjaWZpYyBsb2FkaW5nIG1lc3NhZ2UgYnkgaWQuXG4gKiBAcGFyYW0gaWQgVGhlIHN0cmluZyBpZCBvciBpbmRleCBvZiB0aGUgbG9hZGluZyBtZXNzYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0KGlkOiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIGRhdGEuYWxsW2lkXTtcbiAgY29uc3QgaW5kZXggPSBkYXRhLmJ5X2lkW2lkXTtcbiAgaWYgKGluZGV4ICE9IG51bGwpIHJldHVybiBkYXRhLmFsbFtpbmRleF07XG59XG5cbi8qKlxuICogR2V0IGEgcmFuZG9tIGxvYWRpbmcgbWVzc2FnZSwgb3B0aW9uYWxseSBzY29wZWQgdG8gYSBzb3VyY2UuXG4gKiBAcGFyYW0gc291cmNlIE9wdGlvbmFsIHNvdXJjZSB0byBzY29wZSBtZXNzYWdlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbShzb3VyY2U/OiBzdHJpbmcpIHtcbiAgY29uc3QgbWVzc2FnZXMgPSBhbGwoc291cmNlKTtcbiAgcmV0dXJuIG1lc3NhZ2VzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1lc3NhZ2VzLmxlbmd0aCldO1xufVxuIl19