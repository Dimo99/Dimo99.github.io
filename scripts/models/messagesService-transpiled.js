'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var messageService = function () {
    var getAllMessagesForUser = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(username) {
            var messages, messagesForUser;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return requester.get('appdata', 'messages', 'kinvey');

                        case 2:
                            messages = _context.sent;
                            messagesForUser = messages.filter(function (m) {
                                return m.recipient_username === username;
                            });
                            return _context.abrupt('return', messagesForUser.map(function (m) {
                                return {
                                    senderName: formatSender(m.sender_name, m.sender_username),
                                    text: m.text,
                                    date: formatDate(m._kmd.ect)
                                };
                            }));

                        case 5:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function getAllMessagesForUser(_x) {
            return _ref.apply(this, arguments);
        };
    }();

    var getAllMessagesSendByUser = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(username) {
            var messages, messagesFromUser;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return requester.get('appdata', 'messages', 'kinvey');

                        case 2:
                            messages = _context2.sent;
                            messagesFromUser = messages.filter(function (m) {
                                return m.sender_username === username;
                            });
                            return _context2.abrupt('return', messagesFromUser.map(function (m) {
                                return {
                                    toUser: m.recipient_username,
                                    text: m.text,
                                    date: formatDate(m._kmd.ect),
                                    id: m._id
                                };
                            }));

                        case 5:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        return function getAllMessagesSendByUser(_x2) {
            return _ref2.apply(this, arguments);
        };
    }();

    function formatDate(dateISO8601) {
        var date = new Date(dateISO8601);
        if (Number.isNaN(date.getDate())) return '';
        return date.getDate() + '.' + padZeros(date.getMonth() + 1) + "." + date.getFullYear() + ' ' + date.getHours() + ':' + padZeros(date.getMinutes()) + ':' + padZeros(date.getSeconds());

        function padZeros(num) {
            return ('0' + num).slice(-2);
        }
    }

    function formatSender(name, username) {
        if (!name) return username;else return username + ' (' + name + ')';
    }

    function deleteMessage(messageId) {
        return requester.remove('appdata', 'messages/' + messageId, 'kinvey');
    }

    function postMessage(recipeintName, text) {
        var message = {
            sender_username: sessionStorage.getItem('username'),
            sender_name: sessionStorage.getItem('name'),
            recipient_username: recipeintName,
            text: text
        };
        return requester.post('appdata', 'messages', 'kinvey', message);
    }

    return {
        getAllMessagesForUser: getAllMessagesForUser,
        getAllMessagesSendByUser: getAllMessagesSendByUser,
        deleteMessage: deleteMessage,
        postMessage: postMessage
    };
}();
