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