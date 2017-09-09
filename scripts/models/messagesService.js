let messageService = (() => {
    function formatDate(dateISO8601) {
        let date = new Date(dateISO8601);
        if (Number.isNaN(date.getDate()))
            return '';
        return date.getDate() + '.' + padZeros(date.getMonth() + 1) +
            "." + date.getFullYear() + ' ' + date.getHours() + ':' +
            padZeros(date.getMinutes()) + ':' + padZeros(date.getSeconds());

        function padZeros(num) {
            return ('0' + num).slice(-2);
        }
    }

    function formatSender(name, username) {
        if (!name)
            return username;
        else
            return username + ' (' + name + ')';
    }

    async function getAllMessagesForUser(username) {
        let messages = await requester.get('appdata', 'messages', 'kinvey');
        let messagesForUser = messages.filter(m => m.recipient_username === username);
        return messagesForUser.map(function (m) {
            return {
                senderName: formatSender(m.sender_name, m.sender_username),
                text: m.text,
                date: formatDate(m._kmd.ect)
            }
        });
    }

    async function getAllMessagesSendByUser(username) {
        let messages = await requester.get('appdata', 'messages', 'kinvey');
        let messagesFromUser = messages.filter(m => m.sender_username === username);
        return messagesFromUser.map(function (m) {
            return {
                toUser: m.recipient_username,
                text: m.text,
                date: formatDate(m._kmd.ect),
                id: m._id
            };
        });
    }

    function deleteMessage(messageId) {
        return requester.remove('appdata', 'messages/'+messageId, 'kinvey');
    }

    function postMessage(recipeintName, text) {
        let message = {
            sender_username: sessionStorage.getItem('username'),
            sender_name: sessionStorage.getItem('name'),
            recipient_username: recipeintName,
            text: text
        };
        return requester.post('appdata', 'messages', 'kinvey', message);
    }

    return {
        getAllMessagesForUser,
        getAllMessagesSendByUser,
        deleteMessage,
        postMessage
    }
})();