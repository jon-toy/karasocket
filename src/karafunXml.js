export function getQueueFromXmlResponse(rawQueue) {
    if (Array.isArray(rawQueue.item)) {
        return rawQueue.item.map((item, index) => {
            return {
                artist: item.artist._text,
                duration: item.duration._text,
                singer: item.singer._text,
                title: item.title._text,
                position: index+1
            }
        });
    }
    else if (rawQueue.item) {
        return [
            {
                artist: rawQueue.item.artist._text,
                duration: rawQueue.item.duration._text,
                singer: rawQueue.item.singer._text,
                title: rawQueue.item.title._text,
                position: 1
            }
        ];
    }
    else
        return [];
}

export function getListFromXmlResponse(rawList) {
    if (Array.isArray(rawList.item)) {
        return rawList.item.map(item => {
            return {
                id: item._attributes.id,
                artist: item.artist._text,
                duration: item.duration._text,
                title: item.title._text
            }
        });
    }
    else if (rawList.item) {
        return [
            {
                id: rawList.item._attributes.id,
                artist: rawList.item.artist._text,
                duration: rawList.item.duration._text,
                title: rawList.item.title._text
            }
        ];
    }
    else
        return [];
}