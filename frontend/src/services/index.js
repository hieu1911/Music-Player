import httpRequest from '../utils/httpRequest';

export const getNewReleaseChart = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await httpRequest({
                url: '/newreleasechart',
                method: 'GET',
            });
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
