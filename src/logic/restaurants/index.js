const createRestaurant = require('./createRestaurant');
const getRestaurantById = require('./getRestaurantById');
const updateRestaurant = require('./updateRestaurant');
const updateRestaurantById = require('./getRestaurantById');
const restaurantList = require('./restaurantList');
const getAllRestaurantsByGroupId = require('./getAllRestaurantsByGroupId');

module.exports = {
  createRestaurant,
  getRestaurantById,
  updateRestaurant,
  updateRestaurantById,
  restaurantList,
  getAllRestaurantsByGroupId,
};
