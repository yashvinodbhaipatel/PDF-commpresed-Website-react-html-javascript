(function (global, factory) {
    // Check if AMD module loader is available
    if (typeof define === 'function' && define.amd) {
        define([], factory); // Define as AMD module
    } else if (typeof exports !== 'undefined') {
        factory(); // Define for CommonJS
    } else {
        // Define for browser
        factory();
        global.FileSaver = {
            exports: {}
        }.exports;
    }
})(this, function () {
    "use strict";

    // Function to create a blob with appropriate encoding
    function createBlob(blob, options) {
        if (typeof options === 'undefined') {
            options = { autoBom: false };
        } else if (typeof options !== 'object') {
            console.warn("Deprecated: Expected third argument to be an object");
            options = { autoBom: !options };
        }

        if (options.autoBom &&
            /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
            return new Blob(["\uFEFF", blob], { type: blob.type });
        } else {
            return blob;
        }
    }

    // Function to perform a GET request to download a file
    function downloadFile(url, filename, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";

        xhr.onload = function () {
            save(xhr.response, filename, callback);
        };

        xhr.onerror = function () {
            console.error("Could not download file");
        };

        xhr.send();
    }

    // Function to check if a URL is accessible
    function urlAccessible(url) {
        var xhr = new XMLHttpRequest();
        xhr.open("HEAD", url, false);

        try {
            xhr.send();
        } catch (error) {}

        return xhr.status >= 200 && xhr.status <= 299;
    }

    // Function to trigger a click event on an element
    function triggerClickEvent(element) {
        try {
            element.dispatchEvent(new MouseEvent("click"));
        } catch (error) {
            var event = document.createEvent("MouseEvents");
            event.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
            element.dispatchEvent(event);
        }
    }

    // Determine the correct global object based on the environment
    var globalObj = typeof window === 'object' && window.window === window ? window :
        typeof self === 'object' && self.self === self ? self :
        typeof global === 'object' && global.global === global ? global : undefined;

    // Detect if running on macOS with AppleWebKit but not Safari
    var isMacWebkit = /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent);

    // Define saveAs function
    var saveAs = globalObj.saveAs || (typeof window !== 'object' || window !== globalObj ? function () {} :
        'download' in HTMLAnchorElement.prototype && !isMacWebkit ? // Modern browsers supporting download attribute
        function (blob, filename, callback) {
            var URL = globalObj.URL || globalObj.webkitURL;
            var anchor = document.createElement("a");

            filename = filename || blob.name || "download";
            anchor.download = filename;
            anchor.rel = "noopener";

            if (typeof blob === 'string') {
                anchor.href = blob;
                if (anchor.origin === location.origin) {
                    triggerClickEvent(anchor);
                } else if (urlAccessible(anchor.href)) {
                    downloadFile(blob, filename, callback);
                } else {
                    triggerClickEvent(anchor);
                }
            } else {
                anchor.href = URL.createObjectURL(blob);
                setTimeout(function () {
                    URL.revokeObjectURL(anchor.href);
                }, 40000);
                setTimeout(function () {
                    triggerClickEvent(anchor);
                }, 0);
            }
        } :
        'msSaveOrOpenBlob' in navigator ? // IE & Edge
        function (blob, filename, callback) {
            filename = filename || blob.name || "download";

            if (typeof blob !== 'string') {
                navigator.msSaveOrOpenBlob(createBlob(blob, callback), filename);
            } else if (urlAccessible(blob)) {
                downloadFile(blob, filename, callback);
            } else {
                var anchor = document.createElement("a");
                anchor.href = blob;
                anchor.target = "_blank";
                setTimeout(function () {
                    triggerClickEvent(anchor);
                });
            }
        } :
        // Fallback for older browsers
        function (blob, filename, callback, popup) {
            popup = popup || open("", "_blank");
            if (popup && (popup.document.title = popup.document.body.innerText = "downloading...")) {
                if (typeof blob === 'string') {
                    return downloadFile(blob, filename, callback);
                }

                var isOctetStream = blob.type === 'application/octet-stream';
                var isConstructor = /constructor/i.test(globalObj.HTMLElement) || globalObj.safari;
                var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);

                if ((isChromeIOS || isOctetStream && isConstructor || isMacWebkit) && typeof FileReader !== 'undefined') {
                    var reader = new FileReader();
                    reader.onloadend = function () {
                        var result = reader.result;
                        result = isChromeIOS ? result : result.replace(/^data:[^;]*;/, "data:attachment/file;");
                        if (popup) {
                            popup.location.href = result;
                        } else {
                            location = result;
                        }
                        popup = null;
                    };
                    reader.readAsDataURL(blob);
                } else {
                    var URL = globalObj.URL || globalObj.webkitURL;
                    var url = URL.createObjectURL(blob);
                    if (popup) {
                        popup.location = url;
                    } else {
                        location.href = url;
                    }
                    popup = null;
                    setTimeout(function () {
                        URL.revokeObjectURL(url);
                    }, 40000);
                }
            }
        });

    // Assign saveAs function to global object
    globalObj.saveAs = saveAs;

    // Export for CommonJS
    if (typeof module !== 'undefined') {
        module.exports = saveAs;
    }
});
