import { h } from '../mycomponent.core.js';

function generateUniqueId(field = 'def') {
    return new Date().getTime() + field.trim().replace(/\s/g, '_');
}
function eventFromElement(element, eventSource) {
    while (eventSource) {
        console.log(eventSource);
        if (eventSource === element)
            return true;
        eventSource = eventSource.parentElement;
    }
    return false;
}
function generateRandomID() {
    return ('_' +
        Math.random()
            .toString(36)
            .substr(2, 9));
}

export { generateUniqueId as a, generateRandomID as b, eventFromElement as c };
