import { r as registerInstance, c as createEvent, h } from './chunk-1851c479.js';
/**
 * For use import in project:
 *      npm import @vaadin/vaadin-upload --save
 * and import in the classes where is used;
 *      import '@vaadin/vaadin-upload';
 */
var KupUpload = /** @class */ (function () {
    function KupUpload(hostRef) {
        registerInstance(this, hostRef);
        this.ketchupFileUploaded = createEvent(this, "ketchupFileUploaded", 7);
        this.ketchupFileRejected = createEvent(this, "ketchupFileRejected", 7);
    }
    /*
    fileRejectedHandler(event: CustomEvent) {
        //event.detail.file.name + ' error: ' + event.detail.error;
        console.log('fileRejectedHandler' ,event);
    }
    */
    /**
     * Explanation for this piece of code.
     *
     * The file upload component is currently based on vaadin-upload web component.
     * However, as of now (17/10/2019) Vaadin's components are built using the old Polymer3 project.
     * This means that, to allow specific styling you should follow the guide linked below.
     *
     * To sum it up:
     * 1 - [Here]{@link https://caniuse.com/#search=%3A%3Apart} you can see that the `::part` selector is not yet supported,
     *   since it is a working draft.
     * 2 - Following Polymer3 project guidelines, Vaadin used the <dom-module> approach to allow custom styling of element
     *    with the attribute selector ([part="the-part"]) for the ::part spec.
     * 3 - This means that you are not able to style the parts of these components by using traditional CSS,
     *    since the shadow dom prevents you from doing that.
     * 4 - In addition, these modules can be read by the components only (1) if they are placed directly inside the light-dom
     *    of the document, usually inside the body tag and (2) they must be specified BEFORE the FIRST instance of
     *    the component is initialized.
     *
     * Given all these constraints, the only solution is to declare a module before the first instance of the
     * file uploader is declared, and to check for that dom-module presence before inserting the node in the DOM to
     * prevent unwanted duplicates.
     *
     * From here you can then add parts of customization for the styles.
     * Take a look at the example below.
     *
     * @see https://github.com/vaadin/vaadin-themable-mixin#style-scopes
     * @see https://vaadin.com/components/vaadin-upload/html-api/elements/Vaadin.UploadElement
     * @todo Remove the usage of innerHTML and use the document create element API to create the structure, even if it means more code.
     */
    KupUpload.prototype.componentWillLoad = function () {
        var moduleName = 'vaadin-upload-module-name';
        if (!document.getElementById(moduleName)) {
            var elem = document.createElement('div');
            elem.innerHTML = "<dom-module id=\"" + moduleName + "\" theme-for=\"vaadin-upload\">\n          <template>\n            <style>\n              [part=\"upload-button\"] {\n                background-color: var(--kup-upload_background-color);\n                color: var(--kup-upload_color);\n                border-radius: var(--kup-upload_border-radius);\n                font-size: var(--kup-upload_font-size);\n              }}\n            </style>\n          </template>\n        </dom-module>";
            document.body.insertBefore(elem, document.body.firstChild);
        }
    };
    ;
    KupUpload.prototype.render = function () {
        var _this = this;
        var $DynamicComponent = 'vaadin-upload';
        var confObj = {};
        if (this.typeOptions.formDataName && this.typeOptions.formDataName.trim() != '') {
            confObj.formDataName = this.typeOptions.formDataName;
        }
        if (this.typeOptions.accept && this.typeOptions.accept.trim() != '') {
            //file extension must start with a dot
            if (this.typeOptions.accept.indexOf('/') < 0 //mime
                && !this.typeOptions.accept.startsWith('.')) {
                confObj.accept = '.' + this.typeOptions.accept.trim();
            }
            else {
                confObj.accept = this.typeOptions.accept.trim();
            }
        }
        //const droppable : any = this.typeOptions.drop;
        //if (!droppable || droppable=='false') {
        if (!this.typeOptions.drop) {
            confObj.nodrop = 'true';
        }
        //const multiFile : any = this.typeOptions.multi;
        //if (!multiFile || multiFile=='false') {
        if (!this.typeOptions.multi) {
            confObj.maxFiles = '1';
        }
        //const confirmUpl : any = this.typeOptions.confirm;
        //if (confirmUpl || confirmUpl=='true') {
        if (this.typeOptions.confirm) {
            confObj.noAuto = 'true'; //manually confirm upload
        }
        if (this.typeOptions.maxSize && this.typeOptions.maxSize > 0) {
            confObj.maxFileSize = this.typeOptions.maxSize * 1000; // KB -> Bytes
        }
        if (this.typeOptions.service && this.typeOptions.service.trim() != '') {
            confObj.target = this.typeOptions.service.trim();
        }
        if (this.typeOptions.label && this.typeOptions.label.trim() != '') {
            //confObj.i18n={"dropFiles":{"one":"Trascina qui","many":"Trascina qui"},"addFiles":{"one":"Sfoglia...","many":"Sfoglia..."},"cancel":"Annulla","error":{"tooManyFiles":"Too Many Files.","fileIsTooBig":"File is Too Big.","incorrectFileType":"Incorrect File Type."},"uploading":{"status":{"connecting":"Connecting...","stalled":"Bloccato.","processing":"Processing File...","held":"In coda"},"remainingTime":{"prefix":"remaining time: ","unknown":"unknown remaining time"},"error":{"serverUnavailable":"Server non raggiungibile","unexpectedServerError":"Errore nel caricamento","forbidden":"Permesso negato"}},"units":{"size":["B","kB","MB","GB","TB","PB","EB","ZB","YB"]}};
            confObj.i18n = {
                dropFiles: {
                    one: 'Drop file here',
                    many: 'Drop files here',
                },
                addFiles: {
                    one: "" + this.typeOptions.label,
                    many: "" + this.typeOptions.label,
                },
                cancel: 'Cancel',
                error: {
                    tooManyFiles: 'Too Many Files.',
                    fileIsTooBig: 'File is Too Big.',
                    incorrectFileType: 'Incorrect File Type.',
                },
                uploading: {
                    status: {
                        connecting: 'Connecting...',
                        stalled: 'Stalled.',
                        processing: 'Processing File...',
                        held: 'Queued',
                    },
                    remainingTime: {
                        prefix: 'remaining time: ',
                        unknown: 'unknown remaining time',
                    },
                    error: {
                        serverUnavailable: 'Server Unavailable',
                        unexpectedServerError: 'Unexpected Server Error',
                        forbidden: 'Rejected',
                    },
                },
                units: {
                    size: ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                }
            };
        }
        /*
        //SUCCESS
            {
            "messages": [
                {
                "gravity": "INFO",
                "text": "File GTWJAR-IOTSPI-MultiDummyConnector-1.1.0-SNAPSHOT-1.6.0-SNAPSHOT.jar is uploaded",
                "fullText": "",
                "level": 50,
                "type": "INFO",
                "mode": "TN"
                }
            ]
            }
         //ERROR
            {
            "messages": [
                {
                "gravity": "ERROR",
                "text": "ERROR - File already exists",
                "fullText": "",
                "level": 90,
                "type": "INFO",
                "mode": "TN"
                }
            ]
            }
        */
        /*
        file-reject
                     {
                     message: ev.detail.xhr.response,
                 }
        */
        return (h($DynamicComponent, Object.assign({}, confObj, { "onUpload-error": function (ev) {
                //console.log('upload error', ev);
                _this.ketchupFileRejected.emit(ev.detail.xhr.response);
            }, "onUpload-success": function (ev) {
                //console.log('upload success', ev);
                _this.ketchupFileUploaded.emit(ev.detail.xhr.response);
            } })));
    };
    Object.defineProperty(KupUpload, "style", {
        get: function () { return ""; },
        enumerable: true,
        configurable: true
    });
    return KupUpload;
}());
export { KupUpload as kup_upload };
