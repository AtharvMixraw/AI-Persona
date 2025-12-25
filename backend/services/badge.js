const CONSTANTS = require('../../config/constants');

function getBadgeUrl(badgeFilename) {
  return `${CONSTANTS.BADGE_BASE_URL}/${badgeFilename}`;
}

function getBadgePath(badgeFilename) {
  const path = require('path');
  return path.join(__dirname, '../../badges', badgeFilename);
}

module.exports = {
  getBadgeUrl,
  getBadgePath
};