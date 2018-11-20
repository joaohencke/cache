const redis = require('redis');
const { promisify } = require('util');

const _ = redis.createClient();

_.getAsync = promisify(_.get).bind(_);
_.setAsync = promisify(_.set).bind(_);
_.delAsync = promisify(_.del).bind(_);

_.on('error', err => console.error('redis client error', err));

exports.set = ({ key, data, expiresIn, type = 'EX' }) => {
  const jsonData = JSON.stringify(data);
  if (expiresIn) return _.setAsync(key, jsonData, type, expiresIn);
  return _.setAsync(key, jsonData);
};

exports.get = async key => {
  const data = await _.getAsync(key);
  if (data) return JSON.parse(data);
  return null;
};

exports.exists = async key => !!(await exports.get(key));

exports.delete = key => _.delAsync(key);
