'use strict';

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$|react-merge-refs|wagmi|@wagmi))']
};

module.exports = config;