let userService = (() => {
    function formatSender(name, username) {
        if (!name)
            return username;
        else
            return username + ' (' + name + ')';
    }

    async function allUsers() {
        let users = await requester.get('user', '', 'kinvey');
        return users.map(function (u) {
            return {
                username: u.username,
                formatedName: formatSender(u.name, u.username)
            }

        });
    }

    return {
        allUsers
    }
})();