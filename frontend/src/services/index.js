import httpRequest from '../utils/httpRequest';

export const getInfoSong = (songId) => 
    new Promise(async (resolve, reject) => {
        try {
            let response = await httpRequest({
                url: '/infosong',
                method: 'GET',
                params: {
                    id: songId
                },
            })
            resolve(response)
        } catch(err) {
            reject(err)
        }
    })

export const getSong = (songId) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await httpRequest({
                url: '/song',
                method: 'GET',
                params: {
                    id: songId
                },
            })
            resolve(response)
        } catch(err) {
            reject(err)
        }
    })

export const getLyric = (songId) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await httpRequest({
                url: '/lyric',
                method: 'GET',
                params: {
                    id: songId
                },
            })
            resolve(response)
        } catch(err) {
            reject(err)
        }
    })

export const getInfoSongByName = (keyword) => 
    new Promise(async (resolve, reject) => {
        try {
            let response = await httpRequest({
                url: '/search',
                method: 'GET',
                params: {
                    keyword,
                },
            })
            resolve(response)
        } catch(err) {
            reject(err)
        }
    })

export const getPlaylistDetail = (playlistId) => 
    new Promise(async (resolve, reject) => {
        try {
            let response = await httpRequest({
                url: '/detailplaylist',
                method: 'GET',
                params: {
                    id: playlistId
                },
            })
            resolve(response)
        } catch(err) {
            reject(err)
        }
    })

export const getHome = () => 
    new Promise(async (resolve, reject) => {
        try {
            let response = await httpRequest({
                url: '/home',
                method: 'GET'
            })
            resolve(response)
        } catch(err) {
            reject(err)
        }
    })

export const getChart = () => 
    new Promise(async (resolve, reject) => {
        try {
            let response = await httpRequest({
                url: '/charthome',
                method: 'GET'
            })
            resolve(response)
        } catch(err) {
            reject(err)
        }
    })

export const getNewReleaseChart = () =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await httpRequest({
                url: '/newreleasechart',
                method: 'GET',
            });
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });

export const getTop100 = () =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await httpRequest({
                url: '/top100',
                method: 'GET'
            })
            resolve(response)
        } catch(err) {
            reject(err)
        }
    })

export const getListMV = () =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await httpRequest({
                url: '/listmv',
                method: 'GET'
            })
            resolve(response)
        } catch(err) {
            reject(err)
        }
    })

export const getCategory = () =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await httpRequest({
                url: '/category',
                method: 'GET'
            })
            resolve(response)
        } catch(err) {
            reject(err)
        }
    })

export const getMV = () => 
    new Promise(async (resolve, reject) => {
        try {
            let response = await httpRequest({
                url: '/mv',
                method: 'GET'
            })
            resolve(response)
        } catch(err) {
            reject(err)
        }
    })

export const getRadio = () => 
    new Promise(async (resolve, reject) => {
        try {
            let response = await httpRequest({
                url: '/radio',
                method: 'GET'
            })
            resolve(response)
        } catch(err) {
            reject(err)
        }
    })

export const getMyMusic = () => 
    new Promise(async (resolve, reject) => {
        try {
            let response = await httpRequest({
                url: '/mymusic',
                method: 'GET'
            })
            resolve(response)
        } catch(err) {
            reject(err)
        }
    })

export const getMusicRecently = () => 
    new Promise(async (resolve, reject) => {
        try {
            let response = await httpRequest({
                url: '/musicRecently',
                method: 'GET'
            })
            resolve(response)
        } catch(err) {
            reject(err)
        }
    })

export const getPlaylistRecently = () => 
    new Promise(async (resolve, reject) => {
        try {
            let response = await httpRequest({
                url: '/playlistRecently',
                method: 'GET'
            })
            resolve(response)
        } catch(err) {
            reject(err)
        }
    })