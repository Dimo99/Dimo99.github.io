'use strict';

var auth = function () {
    function saveSession(userInfo) {
        var userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authtoken', userAuth);
        var userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        var username = userInfo.username;
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('name', userInfo.name);
    }

    // user/login
    function login(username, password) {
        var userData = {
            username: username,
            password: password
        };

        return requester.post('user', 'login', 'basic', userData);
    }

    // user/register
    function register(username, password, name) {
        var userData = {
            username: username,
            password: password,
            name: name
        };

        return requester.post('user', '', 'basic', userData);
    }

    // user/logout
    function logout() {
        var logoutData = {
            authtoken: sessionStorage.getItem('authtoken')
        };

        return requester.post('user', '_logout', 'kinvey', logoutData);
    }

    function handleError(reason) {
        showError(reason.responseJSON.description);
    }

    function showInfo(message) {
        var infoBox = $('#infoBox');
        infoBox.text(message);
        infoBox.show();
        setTimeout(function () {
            return infoBox.fadeOut();
        }, 3000);
    }

    function showError(message) {
        var errorBox = $('#errorBox');
        errorBox.text(message);
        errorBox.show();
        setTimeout(function () {
            return errorBox.fadeOut();
        }, 3000);
    }

    return {
        login: login,
        register: register,
        logout: logout,
        saveSession: saveSession,
        showInfo: showInfo,
        showError: showError,
        handleError: handleError
    };
}();
