import httpRequest from '../utils/httpRequest';

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
