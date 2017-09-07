let chirpsService = (() => {
    function calcTime(dateIsoFormat) {
        let diff = new Date - (new Date(dateIsoFormat));
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + pluralize(diff);
        diff = Math.floor(diff / 12);
        return diff + ' year' + pluralize(diff);

        function pluralize(value) {
            if (value !== 1) return 's';
            else return '';
        }
    }

    async function feeds() {
        let feeds = await requester.get('appdata', `chirps?query={"author":{"$in": ${sessionStorage.getItem('subs')}}}&sort={"_kmd.ect": 1}`, 'kinvey');
        return feeds.map(function (f) {
            return {
                author: f.author,
                text: f.text,
                date: calcTime(f._kmd.ect)
            }
        });
    }

    async function followingCount() {
        let username = sessionStorage.getItem('username');
        let following = await requester.get('user', `?query={"username":"${username}"}`,'kinvey');
        console.log(following);
        return following.length;
    }

    async function followersCount() {
        let username = sessionStorage.getItem('username');
        let followers = await requester.get('user', `?query={"subscriptions":"${username}"}`,'kinvey');
        return followers.length;
    }

    async function chirpsCount() {
        let username = sessionStorage.getItem('username');
        let chirps = await requester.get('appdata', `chirps?query={"author":"${username}"}`);
        return chirps.length;
    }

    function createChirp(text) {
        return requester.post('appdata', 'chirps', 'kinvey', {text: text, author: sessionStorage.getItem('username')});
    }

    async function chirps() {
        let chirps = await requester.get('appdata', `chirps?query={"author":"${sessionStorage.getItem('username')}"}&sort={"_kmd.ect": 1}`);
        return chirps.map(function (c) {
            return {
                id:c._id,
                date: calcTime(c._kmd.ect),
                text: c.text
            }
        });
    }

    async function chirpsForGivenUser(username) {
        let chirps = await requester.get('appdata', `chirps?query={"author":"${username}"}&sort={"_kmd.ect": 1}`);
        return chirps.map(function (c) {
            return {
                date: calcTime(c._kmd.ect),
                text: c.text
            }
        });
    }
    function deleteChirp(id) {
        console.log(id);
        return requester.remove('appdata',`chirps/${id}`,'kinvey');
    }
    return {
        feeds,
        followingCount,
        followersCount,
        chirpsCount,
        createChirp,
        chirps,
        chirpsForGivenUser,
        deleteChirp
    }
})();