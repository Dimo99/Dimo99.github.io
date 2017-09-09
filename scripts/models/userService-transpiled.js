'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var userService = function () {
    var allUsers = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var users;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return requester.get('user', '', 'kinvey');

                        case 2:
                            users = _context.sent;
                            return _context.abrupt('return', users.map(function (u) {
                                return {
                                    username: u.username,
                                    formatedName: formatSender(u.name, u.username)
                                };
                            }));

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function allUsers() {
            return _ref.apply(this, arguments);
        };
    }();

    function formatSender(name, username) {
        if (!name) return username;else return username + ' (' + name + ')';
    }

    return {
        allUsers: allUsers
    };
}();
