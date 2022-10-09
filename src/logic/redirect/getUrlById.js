const { Redirect } = require('../../models');

async function getUrlById(id) {
  const redirect = await Redirect.findByPk(id);
  return redirect.url;
}

module.exports = getUrlById;
