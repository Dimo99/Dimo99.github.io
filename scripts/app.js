$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');
        const headerPath = 'templates/common/header.hbs';
        const footerPath = 'templates/common/footer.hbs';
        const mainPath = 'templates/common/main.hbs';
        const menuPath = 'templates/common/menu.hbs';
        this.get('skeleton.html', displayHome);
        this.get('#/home', displayHome);
        this.get('#/register', displayRegister);
        this.get('#/login', displayLogin);
        this.post('#/register', postRegister);
        this.post('#/login', postLogin);
        this.get('#/logout', logout);
        this.post('#/feed', postFeed);
        this.get('#/me', displayCurrentUserProfile);
        this.get('#/discover', displayDiscover);
        this.get('#/userprofile', displayUserProfile);
        this.get('#/follow',follow);
        this.get('#/unfollow',unFollow)
        //Welcome controller
        function displayHome(ctx) {
            if (auth.isAuthed()) {
                displayFeed(ctx);
            }
            else {
                displayRegister(ctx);
            }
        }

        //Register controller
        function displayRegister(ctx) {
            if (auth.isAuthed()) {
                ctx.redirect('#/home');
                return;
            }
            ctx.loggedIn = auth.isAuthed();
            ctx.loadPartials({
                header: headerPath,
                footer: footerPath,
                page: 'templates/register/register.hbs'
            }).then(function () {
                this.partial(mainPath);
            });
        }

        function postRegister(ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPass = ctx.params.repeatPass;
            if (username.length < 5) {
                auth.showError('Username should be at least 5 characters long!');
                return;
            }
            if (password === '') {
                auth.showError('Password cannot be empty!');
                return;
            }
            if (password !== repeatPass) {
                auth.showError('Passwords should be equal!');
                return;
            }
            auth.register(username, password).then(function (userInfo) {
                auth.saveSession(userInfo);
                ctx.redirect('#/home');
                auth.showInfo('User registration successful.');
            }).catch(auth.handleError);
        }

        //Login controller
        function displayLogin(ctx) {
            if (auth.isAuthed()) {
                ctx.redirect('#/home');
                return;
            }
            ctx.loggedIn = auth.isAuthed();
            ctx.loadPartials({
                header: headerPath,
                footer: footerPath,
                page: 'templates/login/login.hbs'
            }).then(function () {
                this.partial(mainPath);
            });
        }

        function postLogin(ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;
            auth.login(username, password).then(function (userInfo) {
                auth.saveSession(userInfo);
                ctx.redirect('#/home');
                auth.showInfo('Login successful.');
            }).catch(auth.handleError);
        }

        //Logout controller
        function logout(ctx) {
            auth.logout().then(function () {
                sessionStorage.clear();
                ctx.redirect('#/home');
                auth.showInfo('Logout successful.');
            })
        }

        //Feed controller
        async function displayFeed(ctx) {
            ctx.loggedIn = auth.isAuthed();
            ctx.username = sessionStorage.getItem('username');
            try {
                ctx.chirpsCount = await  chirpsService.chirpsCount();
                ctx.followingCount = await chirpsService.followingCount();
                ctx.followersCount = await chirpsService.followersCount();
                ctx.articles = await chirpsService.feeds();
            }
            catch (error) {
                auth.handleError(error);
            }
            ctx.loadPartials({
                header: headerPath,
                footer: footerPath,
                menu: menuPath,
                page: 'templates/home/feed.hbs'
            }).then(function () {
                this.partial(mainPath);
            });
        }

        function postFeed(ctx) {
            let text = ctx.params.text;
            if (text.length === 0) {
                auth.showError('Chirp shouldn\'t be empty!');
                return;
            }
            if (text.length > 150) {
                auth.showError('Chirp shouldn\'t be more than 150 characters!');
                return;
            }
            chirpsService.createChirp(text).then(function () {
                auth.showInfo('Chirp published.');
                $('.chirp-input').text('');
                ctx.redirect('#/me');
            })
        }

        //Profile controller
        async function displayUserProfile(ctx) {
            if (ctx.params.username === undefined) {
                ctx.redirect('#/home');
                auth.showError('You can\'t access undefined user');
                return;
            }
            let username = ctx.params.username;
            try {
                ctx.isFollowing = await usersService.isFollowing(username);
                ctx.chrips = await chirpsService.chirpsForGivenUser(username);
                ctx.chirpsCount = ctx.chrips.length;
                ctx.followingCount = await usersService.getNumberOfFollowings(username);
                ctx.followersCount = await usersService.getNumberOfFollowers(username);
            }
            catch (error) {
                auth.handleError(error);
            }
            ctx.loggedIn = auth.isAuthed();
            ctx.username = sessionStorage.getItem('username');
            ctx.name = username;
            ctx.loadPartials({
                header: headerPath,
                footer: footerPath,
                page: 'templates/profile/profile.hbs',
                menu: menuPath
            }).then(function () {
                this.partial(mainPath);
            })
        }

        async function displayCurrentUserProfile(ctx) {
            let username = sessionStorage.getItem('username');
            ctx.loggedIn = auth.isAuthed();
            ctx.username = username;
            try {
                ctx.chirpsCount = await  chirpsService.chirpsCount();
                ctx.followingCount = await await usersService.getNumberOfFollowings(username);
                ctx.followersCount = await usersService.getNumberOfFollowers(username);
                ctx.chirps = await chirpsService.chirps();
            }
            catch (error) {
                auth.handleError(error);
            }
            ctx.loadPartials({
                header: headerPath,
                footer: footerPath,
                menu: menuPath,
                page: 'templates/profile/myProfile.hbs'
            }).then(function () {
                this.partial(mainPath).then(function () {
                    let deleteButton = $('.chirp-delete');
                    deleteButton.each(function (index) {
                        $(this).click(deleteChirp.bind(this,ctx));
                    })
                });
            });
        }

        //Discover controller
        async function displayDiscover(ctx) {
            ctx.loggedIn = auth.isAuthed();
            ctx.username = sessionStorage.getItem('username');
            ctx.userList = await usersService.getAllUsers();
            ctx.loadPartials({
                header: headerPath,
                footer: footerPath,
                menu: menuPath,
                page: 'templates/discover/discover.hbs'
            }).then(function () {
                this.partial(mainPath);
            });
        }
        //Follow controller
        function follow(ctx) {
            let usernameToFollow = ctx.params.username;
            usersService.follow(usernameToFollow).then(function () {
                auth.showInfo('Subscribed to '+usernameToFollow);
                ctx.redirect('#/home');
            }).catch(auth.handleError);
            
        }
        function unFollow(ctx) {
            let usernameToUnFollow = ctx.params.username;
            usersService.unFollow(usernameToUnFollow).then(function () {
               auth.showInfo('Unsubscribed to '+usernameToUnFollow);
               ctx.redirect('#/home');
            }).catch(auth.handleError);
        }
        //Chirp controller
        function deleteChirp(ctx) {
            let id = $(event.target).attr('data-id');
            console.log(id);
            chirpsService.deleteChirp(id).then(function () {
                auth.showInfo('Chirp deleted.');
                ctx.redirect('#/home');
            }).catch(auth.handleError);
        }
    });
    app.run();
});