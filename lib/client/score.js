const Promise = require('bluebird');
const v205HttpClient = require('./v205HttpClient');
const _ = require('lodash');

function getScoreApi(siftScienceClient) {
  const key = siftScienceClient._key;
  const logger = siftScienceClient._logger;

  return {
    /**
     * @param {Object} [userId]
     * @param {Object} [params]
     * https://sift.com/developers/docs/curl/score-api/get-score
     */
    getByUserId(userId, params = {}) {
      if (!userId) return Promise.reject(new Error('userId is required'));

      _.extend(params, {
        api_key: key
      });

      return Promise.resolve(v205HttpClient.get(`/users/${userId}/score`, params))
        .then(response => response.data)
        .catch(error => {
          logger.logRequestError(error);
          throw error;
        });
    }
  };
}

module.exports = getScoreApi;
