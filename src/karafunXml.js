function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}

function convertDuration(n) {
    return fmtMSS(parseInt(n))
}

export function getQueueFromXmlResponse(rawQueue) {
    if (Array.isArray(rawQueue.item)) {
        return rawQueue.item.map((item, index) => {
            return {
                artist: item.artist._text.replace(/&apos;/g, "'")
                                            .replace(/&quot;/g, '"')
                                            .replace(/&gt;/g, '>')
                                            .replace(/&lt;/g, '<')
                                            .replace(/&amp;/g, '&'),
                duration: convertDuration(item.duration._text),
                singer: item.singer._text.replace(/&apos;/g, "'")
                                            .replace(/&quot;/g, '"')
                                            .replace(/&gt;/g, '>')
                                            .replace(/&lt;/g, '<')
                                            .replace(/&amp;/g, '&'),
                title: item.title._text.replace(/&apos;/g, "'")
                                        .replace(/&quot;/g, '"')
                                        .replace(/&gt;/g, '>')
                                        .replace(/&lt;/g, '<')
                                        .replace(/&amp;/g, '&'),
                position: index+1,
                status: item._attributes.status
            }
        });
    }
    else if (rawQueue.item) {
        return [
            {
                artist: rawQueue.item.artist._text.replace(/&apos;/g, "'")
                                                    .replace(/&quot;/g, '"')
                                                    .replace(/&gt;/g, '>')
                                                    .replace(/&lt;/g, '<')
                                                    .replace(/&amp;/g, '&'),
                duration: convertDuration(rawQueue.item.duration._text),
                singer: rawQueue.item.singer._text.replace(/&apos;/g, "'")
                                                    .replace(/&quot;/g, '"')
                                                    .replace(/&gt;/g, '>')
                                                    .replace(/&lt;/g, '<')
                                                    .replace(/&amp;/g, '&'),
                title: rawQueue.item.title._text.replace(/&apos;/g, "'")
                                                .replace(/&quot;/g, '"')
                                                .replace(/&gt;/g, '>')
                                                .replace(/&lt;/g, '<')
                                                .replace(/&amp;/g, '&'),
                position: 1,
                status: rawQueue.item._attributes.status
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
                duration: convertDuration(item.duration._text),
                title: item.title._text
            }
        });
    }
    else if (rawList.item) {
        return [
            {
                id: rawList.item._attributes.id,
                artist: rawList.item.artist._text,
                duration: convertDuration(rawList.item.duration._text),
                title: rawList.item.title._text
            }
        ];
    }
    else
        return [];
}