// pinia demo

import { defineStore } from 'pinia'

const APP_INFO = {
    appName:'AI合富',
}

export const useAppStore = defineStore('appInfo',() => {
    const appInfo = reactive(APP_INFO)
    return{
        appInfo
    }
})
