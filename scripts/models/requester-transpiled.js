"use strict";

var requester = function () {
    var kinveyBaseUrl = "https://baas.kinvey.com/";
    var kinveyAppKey = "kid_Hk9XFznt-";
    var kinveyAppSecret = "3f7991eb77914c089d17af843f5914c2";

    //show loading box
    $(document).on({
        ajaxStart: function ajaxStart() {
            return $('#loadingBox').show();
        },
        ajaxStop: function ajaxStop() {
            return $('#loadingBox').fadeOut();
        }
    });

    // Creates the authentication header
    function makeAuth(type) {
        return type === 'basic' ? 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret) : 'Kinvey ' + sessionStorage.getItem('authtoken');
    }

    // Creates request object to kinvey
    function makeRequest(method, module, endpoint, auth) {
        return  {
            method: method,
            url: kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint,
            headers: {
                'Authorization': makeAuth(auth)
            }
        };
    }

    // Function to return GET promise
    function get(module, endpoint, auth) {
        return $.ajax(makeRequest('GET', module, endpoint, auth));
    }

    // Function to return POST promise
    function post(module, endpoint, auth, data) {
        var req = makeRequest('POST', module, endpoint, auth);
        req.data = data;
        return $.ajax(req);
    }

    // Function to return PUT promise
    function update(module, endpoint, auth, data) {
        var req = makeRequest('PUT', module, endpoint, auth);
        req.data = data;
        return $.ajax(req);
    }

    // Function to return DELETE promise
    function remove(module, endpoint, auth) {
        return $.ajax(makeRequest('DELETE', module, endpoint, auth));
    }

    return {
        get: get,
        post: post,
        update: update,
        remove: remove
    };
}();
