import Pusher from "pusher";

export const pusherServer= new Pusher({
    appId: '1696766',
    key: '0a7071b4084c39aba50e',
    secret: 'c65fd5232eab0598048c',
    cluster: 'eu',
    useTLS: true
});

