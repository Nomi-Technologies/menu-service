const redirectLogic = require('../../logic/redirect');
const logger = require('../../utils/logger');

module.exports = {
  async redirect(req, res) {
    try {
      const url = await redirectLogic.getUrlById(req.params.identifier);
      if (!url) {
        throw Error(`No url set for ${req.params.identifier}`);
      }
      res.redirect(307, url);
    }
    catch(error) {
      logger.error(error);
      res.redirect(307, 'https://www.dinewithnomi.com/');
    }
  },
};
