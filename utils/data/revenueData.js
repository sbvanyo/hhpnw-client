import { clientCredentials } from '../client';

const getRevenue = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/revenue`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleRevenue = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/revenue/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export { getRevenue, getSingleRevenue };
