const urlCheck = (url) => {
    const rule = /((http(s)?):\/\/)?(www.)?google.com/;
    return rule.test(url);
};

module.exports = { urlCheck };
