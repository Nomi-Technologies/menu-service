import csv
import os.path

def escape_character(string, chars = ["\'"]):
  for char in chars:
    string = string.replace(char, "\\" + char)
  return string

# all dishes by category
all_dishes = {}
all_allergens = {}

# all_allergens['Gluten-Free Possible'] = []
# all_allergens['Vegan Possible'] = []

with open('menu.csv') as csv_file:
  reader = csv.reader(csv_file)
  first = True
  for row in reader:
    if first:
      first = False
      continue

    if not row[0] in all_dishes:
      all_dishes[row[0]] = []

    as_ = []
    # logging the allergens
    if not row[5] == '':
      allergens = row[5].split(', ')
      for allergen in allergens:
        a = allergen.lower()
        a = a[0].upper() + a[1:]
        as_.append(a)
        if not a in all_allergens:
          all_allergens[a] = []
        all_allergens[a].append(row[1])

    # adding dish to category
    all_dishes[row[0]].append((row[1], row[2], row[3], as_, row[12]))

    # if not row[6] == 'X':
    #   all_allergens["Gluten-Free Possible"].append(row[1])
    
    # if not row[7] == 'X':
    #   all_allergens["Vegan Possible"].append(row[1])

f = open(os.path.dirname(__file__) + 'db-filler.js', 'w')
f.writelines('''
const db = require('../models');

const populateDB = async () => {
  await db.Restaurant.destroy({ where: {} });
  await db.Tag.destroy({ where: {} });
  let restaurant = await db.Restaurant.create({
    id: 1,
    name: "Bacari",
    unique_name: "bacari",
    streetAddress: "1 Apple Loop",
    city: "San Fransisco",
    state: "CA",
    zip: "90007",
    phone: "7232222223",
    url: "https://google.com/",
  });
  await db.User.register('admin@gmail.com', 'password123', '3033253734', 'admin', 1);''')

f.writelines('''
  let menu = await db.Menu.create({
    id: 1,
    name: "Spring 2020",
  });
  menu.setRestaurant(restaurant);
''')

for key in [
  "Cold",
  "Hot",
  "Grilled Pizza",
  "Sweet",
  "Brunch"
]:
  f.writelines('''
  let %s = await db.Category.create({ 
    name: "%s",
  });
  %s.setRestaurant(restaurant)
  %s.setMenu(menu)''' % (key.replace(' ', '_'), key, key.replace(' ', '_'), key.replace(' ', '_')))

for allergen in [
  "dairy", 
  "gluten", 
  "treenuts", 
  "egg", 
  "soy", 
  "shellfish", 
  "fish", 
  "seeds", 
  "sesame", 
  "garlic", 
  "onion", 
  "cilantro", 
  "truffle"
]:
  f.writelines('''
  let %s = await db.Tag.create({
    name: "%s",
    type: "allergen",
    excludeForFilter: true,
  });

  ''' % (allergen, allergen.capitalize()))

f.writelines('''
  let dish;''')
for key in all_dishes:
  for dish in all_dishes[key]:
    f.writelines('''
  dish = await db.Dish.create({
    name: '%s',
    description: '%s',
    tableTalkPoints: '%s',
  });
  dish.setCategory(%s);
  dish.setRestaurant(restaurant);
  dish.setMenu(menu);
''' % (escape_character(dish[0]), escape_character(dish[1]), escape_character(dish[4]), key.replace(' ', '_')))
    for a in dish[3]:
      f.write('  dish.addTag({});\n'.format(a.lower()))

f.writelines('''
};

module.exports = populateDB;
''')
    
f.close()
