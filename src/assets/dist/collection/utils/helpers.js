import debounce from 'lodash/debounce';
export function debounceEvent(event, wait) {
    const original = event._original || event;
    return {
        _original: event,
        emit: debounce(original.emit.bind(original), wait),
    };
}
