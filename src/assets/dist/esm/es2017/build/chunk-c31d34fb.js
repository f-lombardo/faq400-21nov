import { h } from '../mycomponent.core.js';

function generateUniqueId(field = "def") {
    return (new Date()).getTime() + field.trim().replace(/\s/g, '_');
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

export { eventFromElement as a, generateUniqueId as b };
