import debounce from 'lodash/debounce';
// shamelessy copyed from https://github.com/ionic-team/ionic/blob/master/core/src/utils/helpers.ts
export function debounceEvent(event, wait) {
    const original = event._original || event;
    return {
        _original: event,
        emit: debounce(original.emit.bind(original), wait),
    };
}
// export function debounce(func: (...args: any[]) => void, wait = 0) {
//     let timer: any;
//     return (...args: any[]): any => {
//         clearTimeout(timer);
//         timer = setTimeout(func, wait, ...args);
//     };
// }
