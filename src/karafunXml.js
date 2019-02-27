export function getQueueFromXmlResponse(response) {
    let rawQueue = response.status.queue;

    if (Array.isArray(rawQueue.item)) {
        return rawQueue.item.map(item => {
            return {
                artist: item.artist._text,
                duration: item.duration._text,
                singer: item.singer._text,
                title: item.title._text
            }
        });
    }
    else if (rawQueue.item) {
        return [
            {
                artist: rawQueue.item.artist._text,
                duration: rawQueue.item.duration._text,
                singer: rawQueue.item.singer._text,
                title: rawQueue.item.title._text
            }
        ];
    }
    else
        return [];
}