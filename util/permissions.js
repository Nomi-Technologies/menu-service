const {
    Dish,
    Tag,
    User,
    Restaurant,
    Category,
    Menu,
    UserPermission
  } = require("../models");

const { Op } = require("sequelize");

const fs = require('fs');

let userIsAdmin = async (email) => {
  try {
      let user = await User.getUser({ email: email })

      if(user.isAdmin) {
          return true;
      }
  } catch(err) {
      throw err;
  }

  return false;
}

let hasUserPemission = async(userId, restaurantId) => {
  try {
      let userpermission = await User.getUserPermission({ userId: userId, restaurantId: restaurantId })

      if(userpermission) {
          return true;
      }
  } catch(err) {
      throw err;
  }

  return false;
}
