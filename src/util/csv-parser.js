/* eslint-disable */
const { Op } = require('sequelize');

const parse = require('csv-parse');
const fs = require('fs');
const { createCategory } = require('../logic/categories');
const { createDish } = require('../logic/dishes');
const {
  Dish,
  Tag,
  Category,
} = require('../models');

// converts list of allergen names to ids
const allergensToIds = async (allergens) => {
  const allergenIds = [];
  const splitAllergens = allergens.split(',');
  for (allergen of splitAllergens) {
    try {
      const tag = await Tag.findOne(
        { where: { name: { [Op.iLike]: allergen.trim() } } },
      );
      if (tag) {
        allergenIds.push(tag.id);
      }
    }
    catch(err) {
      throw err;
    }
  }
  return allergenIds;
};

const getOrCreateCategory = async (categoryName, menuId) => {
  try {
    const category = await Category.findOne({ where: { name: categoryName, menuId } });
    if (category) {
      return category.id;
    }
    newCategory = await createCategory(menuId, { name: categoryName, menuId });
    return newCategory.id;
  }
  catch(err) {
    throw err;
  }
};

const arrayDiff = (arr1, arr2) => arr1.concat(arr2).filter((val) => !(arr1.includes(val) && arr2.includes(val)));

const parseCSV = async (data, restaurantId, menuId, overwrite) => new Promise(async (finish, reject) => {
  parse(data, { columns: true }, async (err, output) => {
    if (err) {
      throw err;
    }
    else {
      for (let i = 0; i < output.length; i++) {
        const dish = output[i];
        let categoryId;
        let allergenIds;
        let existingDish;
        const vp = dish.VP !== '';
        const gfp = dish.GFP !== '';
        let modifiableAllergenIds;

        // parse relevant information
        try {
          categoryId = await getOrCreateCategory(dish.Category, menuId);
          allergenIds = await allergensToIds(dish.Allergens);
          modifiableAllergenIds = await allergensToIds(dish.Modifiable);
          existingDish = await Dish.findOne({ where: { name: dish.Name, restaurantId, categoryId } });
        }
        catch(err) {
          reject(err);
          throw err;
        }

        // check if dish exists
        if (existingDish) {
          try {
            await existingDish.update({
              description: dish.Description,
              price: dish.Price,
              tableTalkPoints: dish['Table Talk Points'],
              categoryId,
              vp,
              gfp,
            });
            const nonModifiableAllergenIds = arrayDiff(allergenIds, modifiableAllergenIds);
            await existingDish.setTags(nonModifiableAllergenIds);
            await existingDish.addTags(modifiableAllergenIds, { through: { removable: true } });
          }
          catch(err) {
            reject(err);
            throw err;
          }
        }
        else {
          try {
            const dishInfo = {
              name: dish.Name,
              description: dish.Description,
              price: dish.Price,
              tableTalkPoints: dish['Table Talk Points'],
              categoryId,
              menuId,
              restaurantId,
              vp,
              gfp,
            };
            const newDish = await createDish(categoryId, dishInfo);
            const nonModifiableAllergenIds = arrayDiff(allergenIds, modifiableAllergenIds);
            await newDish.setTags(nonModifiableAllergenIds);
            await newDish.addTags(modifiableAllergenIds, { through: { removable: true } });
          }
          catch(err) {
            reject(err);
            throw err;
          }
        }
      }
      finish('finished');
    }
  });
});

const dishAllergensToString = (tags) => {
  const allergenNames = [];
  tags.forEach((tag) => {
    allergenNames.push(tag.name);
  });

  return allergenNames.join(', ');
};

const formatCell = (value) => {
  if (value && value.includes(',')) {
    return `"${value}"`;
  }
  return value;
};

// converts a menu object to csv format
const menuToCSV = async (menu) => new Promise(async (finish, reject) => {
  try {
    const csv_array = [];
    const header = [
      'Category',
      'Name',
      'Description',
      'Price',
      'Allergens',
      'Modifiable',
      'GFP',
      'VP',
      'Table Talk Points',
    ];
    const num_parameters = header.length;

    csv_array.push(header);

    // loop over each category
    menu.Categories.forEach((category) => {
      category.Dishes.forEach(async (dish) => {
        // create a row of empty strings of length header
        row = Array(num_parameters).join('.').split('.');
        row[header.indexOf('Category')] = formatCell(category.name);
        row[header.indexOf('Name')] = formatCell(dish.name);
        row[header.indexOf('Description')] = formatCell(dish.description);
        row[header.indexOf('Price')] = formatCell(dish.price);
        row[header.indexOf('Allergens')] = formatCell(dishAllergensToString(dish.Tags));

        // compile modifiable tags
        const modifiableTags = [];
        dish.Tags.forEach((tag) => {
          if (tag.DishTag.removable) {
            modifiableTags.push(tag);
          }
        });
        row[header.indexOf('Modifiable')] = formatCell(dishAllergensToString(modifiableTags));
        row[header.indexOf('GFP')] = dish.GFP ? 'X' : '';
        row[header.indexOf('VP')] = dish.VP ? 'X' : '';
        row[header.indexOf('Table Talk Points')] = formatCell(dish.tableTalkPoints);
        csv_array.push(row);
      });
    });

    const csv = csv_array.map((e) => e.join(',')).join('\n');
    finish(csv);
  }
  catch(err) {
    reject(err);
  }
});

module.exports = { parseCSV, menuToCSV, getOrCreateCategory };
