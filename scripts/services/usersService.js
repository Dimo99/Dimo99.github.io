let usersService = (() => {
    async function getAllUsers() {
        let users = await requester.get('user', '', 'kinvey');
        for (let i = 0; i < users.length; i++) {
            let cUser = users[i];
            cUser.numberOfFollowers = users.filter(u => u['subscriptions'].includes(cUser.username)).length;
        }

        return users.filter(u => u.username !== sessionStorage.getItem('username')).map(function (u) {
            return {
                name: u.username,
                numberOfFollowers: u.numberOfFollowers
            }
        });
    }

    async function getNumberOfFollowers(username) {
        let followers = await requester.get('user', `?query={"subscriptions":"${username}"}`);
        return followers.length;
    }

    async function getNumberOfFollowings(username) {
        let followings = await requester.get('user', `?query={"subscriptions":"${username}"}`);
        return followings.length;
    }

    async function isFollowing(username) {
        let currentUserFollowings = JSON.parse(sessionStorage.getItem('subs'));
        return currentUserFollowings.includes(username);
    }

    function follow(usernameToFollow) {
        let data = {
            subscriptions: JSON.parse(sessionStorage.getItem('subs'))
        };
        data.subscriptions.push(usernameToFollow);
        console.log(JSON.stringify(data.subscriptions));
        sessionStorage.setItem('subs', JSON.stringify(data.subscriptions));
        return requester.update('user', sessionStorage.getItem('userId'), 'kinvey',data);

    }

    function unFollow(usernameToUnFollow) {
        let data = {
            subscriptions: JSON.parse(sessionStorage.getItem('subs'))
        };
        let index = data.subscriptions.indexOf(usernameToUnFollow);
        if (index > -1) {
            data.subscriptions.splice(index, 1);
        }
        sessionStorage.setItem('subs',JSON.stringify(data.subscriptions));
        return requester.update('user',sessionStorage.getItem('userId'),'kinvey',data);
    }

    return {
        getAllUsers,
        getNumberOfFollowers,
        getNumberOfFollowings,
        isFollowing,
        follow,
        unFollow
    }
})();