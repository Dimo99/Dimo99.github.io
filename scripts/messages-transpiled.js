'use strict';

var startApp = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var displayMessages = function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
                                ctx.username = sessionStorage.getItem('username');
                                _context.next = 4;
                                return messageService.getAllMessagesForUser(sessionStorage.getItem('username'));

                            case 4:
                                ctx.messages = _context.sent;

                                ctx.loadPartials({
                                    header: 'templates/common/header.hbs',
                                    footer: 'templates/common/footer.hbs'
                                }).then(function () {
                                    this.partial('templates/messages/myMessages.hbs');
                                });

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            return function displayMessages(_x) {
                return _ref2.apply(this, arguments);
            };
        }();

        var displayArchive = function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
                                ctx.username = sessionStorage.getItem('username');
                                _context2.next = 4;
                                return messageService.getAllMessagesSendByUser(sessionStorage.getItem('username'));

                            case 4:
                                ctx.messages = _context2.sent;

                                ctx.loadPartials({
                                    header: 'templates/common/header.hbs',
                                    footer: 'templates/common/footer.hbs',
                                    message: 'templates/messages/sentMessage.hbs'
                                }).then(function () {
                                    this.partial('templates/messages/archiveSent.hbs').then(function () {
                                        var button = $('td > button');
                                        button.each(function (index) {
                                            $(this).click(deleteMessage.bind(this, ctx));
                                        });
                                    });
                                });

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            return function displayArchive(_x2) {
                return _ref3.apply(this, arguments);
            };
        }();

        var displaySendMessage = function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
                                ctx.username = sessionStorage.getItem('username');
                                _context3.next = 4;
                                return userService.allUsers();

                            case 4:
                                ctx.users = _context3.sent;

                                ctx.loadPartials({
                                    header: 'templates/common/header.hbs',
                                    footer: 'templates/common/footer.hbs'
                                }).then(function () {
                                    this.partial('templates/messages/sendMessage.hbs').then(function () {
                                        $('#msgText').emojiPicker({
                                            height: '300px',
                                            width: '450px',
                                            onShow: function onShow(picker, settings, isActive) {
                                                $(picker).css('left', '160px');
                                            }
                                        });
                                    });
                                });

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            return function displaySendMessage(_x3) {
                return _ref4.apply(this, arguments);
            };
        }();
        //Logout section


        var app, postMessage, deleteMessage, logout, displayHome, displayRegister, postRegister, displayLogin, postLogin;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        postLogin = function postLogin(ctx) {
                            var username = ctx.params.username;
                            var password = ctx.params.password;
                            auth.login(username, password).then(function (userInfo) {
                                auth.saveSession(userInfo);
                                auth.showInfo('Login successful.');
                                ctx.redirect('#/home');
                            }).catch(auth.handleError);
                        };

                        displayLogin = function displayLogin(ctx) {
                            ctx.loadPartials({
                                header: 'templates/common/header.hbs',
                                footer: 'templates/common/footer.hbs'
                            }).then(function () {
                                this.partial('templates/login/login.hbs');
                            });
                        };

                        postRegister = function postRegister(ctx) {
                            var username = ctx.params.username;
                            var password = ctx.params.password;
                            var name = ctx.params.name;
                            auth.register(username, password, name).then(function (userInfo) {
                                auth.saveSession(userInfo);
                                auth.showInfo("User registration successful.");
                                ctx.redirect('#/home');
                            }).catch(auth.handleError);
                        };

                        displayRegister = function displayRegister(ctx) {
                            ctx.loadPartials({
                                header: 'templates/common/header.hbs',
                                footer: 'templates/common/footer.hbs'
                            }).then(function () {
                                this.partial('templates/register/register.hbs');
                            });
                        };

                        displayHome = function displayHome(ctx) {
                            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
                            ctx.username = sessionStorage.getItem('username');
                            ctx.loadPartials({
                                header: 'templates/common/header.hbs',
                                footer: 'templates/common/footer.hbs'
                            }).then(function () {
                                this.partial('templates/home/home.hbs');
                            });
                        };

                        logout = function logout(ctx) {
                            auth.logout().then(function () {
                                sessionStorage.clear();
                                ctx.redirect('#/home');
                                auth.showInfo('Logout successful.');
                            }).catch(auth.handleError);
                        };

                        deleteMessage = function deleteMessage(ctx) {
                            messageService.deleteMessage($(this).attr('data-id')).then(function () {
                                auth.showInfo('Message deleted.');
                                displayArchive(ctx);
                            }).catch(handleError);
                        };

                        postMessage = function postMessage(ctx) {
                            var recipientName = ctx.params.recipient;
                            var text = ctx.params.text;
                            messageService.postMessage(recipientName, text).then(function () {
                                auth.showInfo('Message sent.');
                                ctx.redirect('#/archive');
                            }).catch(auth.handleError);
                        };

                        app = Sammy('#app', function () {
                            this.use('Handlebars', 'hbs');
                            this.get('messages.html', displayHome);
                            this.get('#/home', displayHome);
                            this.get('#/register', displayRegister);
                            this.post('#/register', postRegister);
                            this.get('#/login', displayLogin);
                            this.post('#/login', postLogin);
                            this.get('#/logout', logout);
                            this.get('#/messages', displayMessages);
                            this.get('#/archive', displayArchive);
                            this.get('#/send', displaySendMessage);
                            this.post('#/send', postMessage);
                        });
                        //Messages section

                        //Home section

                        //Register section

                        //Login section

                        app.run();

                    case 10:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function startApp() {
        return _ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
