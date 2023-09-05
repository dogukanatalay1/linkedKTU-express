/* eslint-disable no-undef */
const { urlCheck } = require('../utils/url-check');

describe('URL Function Tests', () => {
    it('lorem', () => {
        const result = urlCheck('google.com');
        expect(result).toEqual(true);
    });
});
