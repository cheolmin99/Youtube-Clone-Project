export default class Youtube {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async search(keyword) {
        return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
    }

    async channelImageURL(id) {
        return this.apiClient.channels({params: {part: 'snippet', id} })
        .then((res) => res.data.items[0].snippet.thumbnails.default.url);
    }

    async commentThreads(id) {
        return this.apiClient.commentThreads({
            params: {
                part: 'snippet',
                videoId: id,
                maxResults: 25,
            }
        })
        .then((res) => res.data.items.map((item) => ({...item.snippet.topLevelComment.snippet})))
    }

    async relatedVideos(id) {
        return this.apiClient.search({
            params: {
                part: 'snippet',
                maxResults: 25,
                type: 'video',
                q: id
            }
        })
        .then((res) => res.data.items.map((item) => ({...item, id: item.id.videoId})))
    }

    async #searchByKeyword(keyword) {
        return this.apiClient.search(
            {
                params: {
                    part: 'snippet',
                    maxResults: 25,
                    type: 'video',
                    q: keyword
                },
            }
        )
        .then((res) => res.data.items.map((item) => ({...item, id: item.id.videoId})))
    }

    async #mostPopular() {
        return this.apiClient.videos(
            {
                params: {
                    part: 'snippet',
                    maxResults: 25,
                    chart: 'mostPopular'
                },
            }
        )
        .then((res) => res.data.items)
    }
}