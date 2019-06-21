import Cookies from 'js-cookie'

export const state = () => {
    currentProject: ""
}

export const mutations = {
    setProject(state, projectText) {
        state.currentProject = projectText
        Cookies.set('curProj',projectText)
    },
    clearProject(state) {
        state.currentProject = null
        Cookies.set('curProj', null)
    }
}

export const getters = {
    getProject: state => {
        return state.currentProject
    }
}