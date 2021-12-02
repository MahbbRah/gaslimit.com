
let host = window.location.host;
if (host.includes("localhost:")) {
    host = "localhost";
}

const API = {
    ROOT: `http://${host}:3036/api/v1/`,
    SOCKETHOST: `http://${host}:4041`,
    S3ROOT: "http://fbadsimagesupllaunched.s3.amazonaws.com/",
    FOLDERS: {
        GET_ALL: "folders",
        CREATE: "folders",
        GET_ONE: "folders/:id",
        EDIT: "folders/:id",
        DELETE: "folders/:id",
        DELETE_AD: "folders/ad/:id",
    },
    FAVORITES: {
        GET_ALL: "favorites",
        CREATE: "favorites",
        GET_ONE: "favorites/:id",
        EDIT: "favorites/:id",
        REMOVE_FAV: "favorites",
    },
    ES: {
        SEARCH: 'es/search_ads',
        SUGGESTIONS: 'es/filter_suggestions',
        SUGGESTIONS_QUERY: 'es/get_suggestion_query'
    },
    USER: {
        USERS: 'users',
        BY_ID: 'users/:id'
    },
    AUTH: {
        LOGIN: 'auth/login',
    },
}

module.exports = {
    API
}