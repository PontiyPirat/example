export const state = () => {
    currentUrl: "";
    strapiObj: null
}

export const mutations = {
    setUrl(state, userUrl) {
        state.currentUrl = userUrl
    },
    clearUrl(state) {
        state.currentUrl = null
    },
    setStrapiObj(state, strapiObj) {
        state.strapiObj = strapiObj
    },
    clearUrl(state) {
        state.strapiObj = null
    }
}

export const getters = {
    getUrl: state => {
        return state.currentUrl
    },
    getStrapiObj: state => {
        return state.strapiObj
    }
}