async function startApp() {
    let app = Sammy('#app', function () {
        this.use('Handlebars', 'hbs');
        this.get('messages.html', displayHome);
        this.get('#/home', displayHome);
        this.get('#/register',displayRegister);
        this.post('#/register',postRegister);
        this.get('#/login',displayLogin);
        this.post('#/login',postLogin);
        this.get('#/logout',logout);
        this.get('#/messages',displayMessages);
        this.get('#/archive',displayArchive);
        this.get('#/send',displaySendMessage);
        this.post('#/send',postMessage);
    });
    //Messages section
    function postMessage(ctx) {
        let recipientName = ctx.params.recipient;
        let text = ctx.params.text;
        messageService.postMessage(recipientName,text).then(function () {
            auth.showInfo('Message sent.');
            displayArchive(ctx);
        }).catch(auth.handleError);
    }
    async function displayMessages(ctx) {
        ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
        ctx.username = sessionStorage.getItem('username');
        ctx.messages = await messageService.getAllMessagesForUser(sessionStorage.getItem('username'));
        ctx.loadPartials({
            header:'templates/common/header.hbs',
            footer:'templates/common/footer.hbs'
        }).then(function () {
            this.partial('templates/messages/myMessages.hbs');
        });
    }
    async function displayArchive(ctx) {
        ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
        ctx.username = sessionStorage.getItem('username');
        ctx.messages = await messageService.getAllMessagesSendByUser(sessionStorage.getItem('username'));
        ctx.loadPartials({
            header:'templates/common/header.hbs',
            footer:'templates/common/footer.hbs',
            message:'templates/messages/sentMessage.hbs'
        }).then(function () {
            this.partial('templates/messages/archiveSent.hbs').then(function () {
                let button = $('td > button');
                button.click(deleteMessage.bind(button,ctx));
            });
        });
    }
    function deleteMessage(ctx) {
        messageService.deleteMessage($(this).attr('data-id')).then(function () {
            auth.showInfo('Message deleted.');
            displayArchive(ctx);
        }).catch(handleError);
    }
    async function displaySendMessage(ctx) {
        ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
        ctx.username = sessionStorage.getItem('username');
        ctx.users = await userService.allUsers();
        ctx.loadPartials({
            header:'templates/common/header.hbs',
            footer:'templates/common/footer.hbs'
        }).then(function () {
            this.partial('templates/messages/sendMessage.hbs');
        });
    }
    //Logout section
    function logout(ctx) {
        auth.logout().then(()=>{
            sessionStorage.clear();
            displayHome(ctx);
            auth.showInfo('Logout successful.');
        }).catch(auth.handleError);
    }
    //Home section
    function displayHome(ctx) {
        ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
        ctx.username = sessionStorage.getItem('username');
        ctx.loadPartials({
            header:'templates/common/header.hbs',
            footer:'templates/common/footer.hbs'
        }).then(function () {
            this.partial('templates/home/home.hbs');
        });
    }
    //Register section
    function displayRegister(ctx) {
        ctx.loadPartials({
            header:'templates/common/header.hbs',
            footer:'templates/common/footer.hbs'
        }).then(function () {
            this.partial('templates/register/register.hbs');
        });
    }
    function postRegister(ctx) {
         let username = ctx.params.username;
         let password = ctx.params.password;
         let name = ctx.params.name;
         auth.register(username,password,name).then((userInfo)=>{
             auth.saveSession(userInfo);
             auth.showInfo("User registration successful.");
             displayHome(ctx);
         }).catch(auth.handleError);
    }
    //Login section
    function displayLogin(ctx) {
        ctx.loadPartials({
            header:'templates/common/header.hbs',
            footer:'templates/common/footer.hbs'
        }).then(function () {
            this.partial('templates/login/login.hbs');
        });
    }
    function postLogin(ctx) {
        let username = ctx.params.username;
        let password = ctx.params.password;
        auth.login(username,password).then((userInfo)=>{
            auth.saveSession(userInfo);
            auth.showInfo('Login successful.');
            displayHome(ctx);
        }).catch(auth.handleError);
    }
    app.run();
}