
const db = require('../models');

const populateDB = async () => {
  await db.Restaurant.destroy({ where: {} });
  await db.Tag.destroy({ where: {} });
  let restaurant = await db.Restaurant.create({
    id: 1,
    name: "Bacari",
    streetAddress: "1 Apple Loop",
    city: "San Fransisco",
    state: "CA",
    zip: "90007",
    phone: "7232222223",
    url: "https://google.com/",
  });
  await db.User.register('admin@gmail.com', 'password123', '3033253734', 'admin', 1);
  let Cold = await db.Category.create({ 
    name: "Cold",
  });
  Cold.setRestaurant(restaurant)
  let Hot = await db.Category.create({ 
    name: "Hot",
  });
  Hot.setRestaurant(restaurant)
  let Grilled_Pizza = await db.Category.create({ 
    name: "Grilled Pizza",
  });
  Grilled_Pizza.setRestaurant(restaurant)
  let Sweet = await db.Category.create({ 
    name: "Sweet",
  });
  Sweet.setRestaurant(restaurant)
  let Brunch = await db.Category.create({ 
    name: "Brunch",
  });
  Brunch.setRestaurant(restaurant)
  let dairy = await db.Tag.create({
    name: "Dairy",
    type: "allergen",
    excludeForFilter: true
  });
  let gluten = await db.Tag.create({
    name: "Gluten",
    type: "allergen",
    excludeForFilter: true
  });
  let treenuts = await db.Tag.create({
    name: "Treenuts",
    type: "allergen",
    excludeForFilter: true
  });
  let egg = await db.Tag.create({
    name: "Egg",
    type: "allergen",
    excludeForFilter: true
  });
  let soy = await db.Tag.create({
    name: "Soy",
    type: "allergen",
    excludeForFilter: true
  });
  let shellfish = await db.Tag.create({
    name: "Shellfish",
    type: "allergen",
    excludeForFilter: true
  });
  let fish = await db.Tag.create({
    name: "Fish",
    type: "allergen",
    excludeForFilter: true
  });
  let seeds = await db.Tag.create({
    name: "Seeds",
    type: "allergen",
    excludeForFilter: true
  });
  let sesame = await db.Tag.create({
    name: "Sesame",
    type: "allergen",
    excludeForFilter: true
  });
  let garlic = await db.Tag.create({
    name: "Garlic",
    type: "allergen",
    excludeForFilter: true
  });
  let onion = await db.Tag.create({
    name: "Onion",
    type: "allergen",
    excludeForFilter: true
  });
  let cilantro = await db.Tag.create({
    name: "Cilantro",
    type: "allergen",
    excludeForFilter: true
  });
  let truffle = await db.Tag.create({
    name: "Truffle",
    type: "allergen",
    excludeForFilter: true
  });
  let dish;
  dish = await db.Dish.create({
    name: 'double chocolate cake',
    tableTalkPoints: 'Phasellus sit amet diam ut ante dapibus tristique.',
  });
  dish.setCategory(Sweet);
  dish.setRestaurant(restaurant);
  dish.addTag(treenuts);
  dish.addTag(gluten);

  dish = await db.Dish.create({
    name: 'bread pudding',
    tableTalkPoints: 'Vivamus dignissim enim a magna hendrerit rhoncus.',
  });
  dish.setCategory(Sweet);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(gluten);

  dish = await db.Dish.create({
    name: 'cardamom chocolate ganache',
    tableTalkPoints: 'Nunc sed nulla faucibus, lacinia tortor a, auctor orci.',
  });
  dish.setCategory(Sweet);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(gluten);
  dish.addTag(treenuts);

  dish = await db.Dish.create({
    name: 'malabi',
    tableTalkPoints: 'Praesent sed ante et nunc faucibus scelerisque.',
  });
  dish.setCategory(Sweet);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(treenuts);

  dish = await db.Dish.create({
    name: 'bacari ice cream',
    tableTalkPoints: 'Proin vitae odio dictum, aliquet augue eu, hendrerit turpis.',
  });
  dish.setCategory(Sweet);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(treenuts);

  dish = await db.Dish.create({
    name: 'the best cake you\'ve ever had',
    tableTalkPoints: 'Duis laoreet est quis vestibulum sagittis.',
  });
  dish.setCategory(Sweet);
  dish.setRestaurant(restaurant);
  dish.addTag(egg);
  dish.addTag(dairy);

  dish = await db.Dish.create({
    name: 'cheese & salumi',
    tableTalkPoints: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  });
  dish.setCategory(Cold);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(gluten);

  dish = await db.Dish.create({
    name: 'asian pear salad',
    tableTalkPoints: 'Phasellus feugiat velit nec egestas faucibus.',
  });
  dish.setCategory(Cold);
  dish.setRestaurant(restaurant);
  dish.addTag(egg);
  dish.addTag(soy);
  dish.addTag(gluten);

  dish = await db.Dish.create({
    name: 'shrimp ceviche',
    tableTalkPoints: 'Maecenas ornare tortor et eros pretium, a condimentum odio varius.',
  });
  dish.setCategory(Cold);
  dish.setRestaurant(restaurant);
  dish.addTag(shellfish);
  dish.addTag(cilantro);
  dish.addTag(onion);
  dish.addTag(soy);
  dish.addTag(garlic);

  dish = await db.Dish.create({
    name: 'poached shrimp',
    tableTalkPoints: 'In quis augue mollis, cursus tortor sed, scelerisque velit.',
  });
  dish.setCategory(Cold);
  dish.setRestaurant(restaurant);
  dish.addTag(garlic);
  dish.addTag(shellfish);

  dish = await db.Dish.create({
    name: 'burrata caprese',
    tableTalkPoints: 'Morbi ultrices massa ut sapien volutpat venenatis.',
  });
  dish.setCategory(Cold);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(treenuts);

  dish = await db.Dish.create({
    name: 'rainbow beet salad',
    tableTalkPoints: 'Suspendisse sit amet metus ultrices, scelerisque ante sit amet, posuere libero.',
  });
  dish.setCategory(Cold);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);

  dish = await db.Dish.create({
    name: 'bruschetta with tomato & basil',
    tableTalkPoints: 'In sed tellus et dolor rhoncus luctus.',
  });
  dish.setCategory(Cold);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(garlic);

  dish = await db.Dish.create({
    name: 'bruschetta with eggplant',
    tableTalkPoints: 'Donec facilisis magna at nisl auctor viverra.',
  });
  dish.setCategory(Cold);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(garlic);

  dish = await db.Dish.create({
    name: 'bruschetta with bell pepper',
    tableTalkPoints: 'Nulla ornare orci sed vestibulum malesuada.',
  });
  dish.setCategory(Cold);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(garlic);

  dish = await db.Dish.create({
    name: 'bruschetta with basil walnut pesto',
    tableTalkPoints: 'Mauris sed ex at elit aliquet tristique.',
  });
  dish.setCategory(Cold);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(treenuts);
  dish.addTag(dairy);
  dish.addTag(garlic);

  dish = await db.Dish.create({
    name: 'tuscan kale salad',
    tableTalkPoints: 'Donec congue elit accumsan, condimentum ligula eu, tempor leo.',
  });
  dish.setCategory(Cold);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(garlic);
  dish.addTag(cilantro);
  dish.addTag(soy);

  dish = await db.Dish.create({
    name: 'asian pear & brie',
    tableTalkPoints: 'Nulla at nisi sed libero commodo elementum.',
  });
  dish.setCategory(Grilled_Pizza);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(gluten);

  dish = await db.Dish.create({
    name: 'chorizo',
    tableTalkPoints: 'Etiam pulvinar justo a lobortis fermentum.',
  });
  dish.setCategory(Grilled_Pizza);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(gluten);
  dish.addTag(onion);
  dish.addTag(garlic);

  dish = await db.Dish.create({
    name: 'margherita',
    tableTalkPoints: 'Maecenas nec nunc vulputate, interdum nisi a, aliquam lorem.',
  });
  dish.setCategory(Grilled_Pizza);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(gluten);
  dish.addTag(onion);
  dish.addTag(garlic);

  dish = await db.Dish.create({
    name: 'smoked mushroom',
    tableTalkPoints: 'Donec ultrices libero et leo consequat, ut lobortis erat tincidunt.',
  });
  dish.setCategory(Grilled_Pizza);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(gluten);
  dish.addTag(garlic);

  dish = await db.Dish.create({
    name: 'white',
    tableTalkPoints: 'Praesent a sapien suscipit, iaculis elit sit amet, convallis nisl.',
  });
  dish.setCategory(Grilled_Pizza);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(gluten);

  dish = await db.Dish.create({
    name: 'bacon & double cream brie',
    tableTalkPoints: 'Proin vitae odio dictum, aliquet augue eu, hendrerit turpis.',
  });
  dish.setCategory(Grilled_Pizza);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(gluten);
  dish.addTag(onion);
  dish.addTag(garlic);

  dish = await db.Dish.create({
    name: 'vegan pizza',
    tableTalkPoints: 'Nullam consectetur elit consequat, placerat arcu et, condimentum dui.',
  });
  dish.setCategory(Grilled_Pizza);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);

  dish = await db.Dish.create({
    name: 'fried chicken sliders',
    tableTalkPoints: 'Sed gravida enim a felis congue, ac consectetur orci varius.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(dairy);

  dish = await db.Dish.create({
    name: 'frog legs',
    tableTalkPoints: 'Morbi quis justo nec sapien fringilla scelerisque et eget massa.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(garlic);

  dish = await db.Dish.create({
    name: 'oaxacan pasta',
    tableTalkPoints: 'Fusce eget quam eu dolor rhoncus venenatis quis ac lacus.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(treenuts);
  dish.addTag(dairy);
  dish.addTag(garlic);

  dish = await db.Dish.create({
    name: 'shishito peppers',
    tableTalkPoints: 'Nam volutpat est sit amet diam volutpat, ut suscipit orci tincidunt.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(garlic);

  dish = await db.Dish.create({
    name: 'sea bass balik',
    tableTalkPoints: 'Cras pretium dui sed mauris ullamcorper mollis.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(egg);
  dish.addTag(garlic);
  dish.addTag(onion);
  dish.addTag(fish);

  dish = await db.Dish.create({
    name: 'feta filo',
    tableTalkPoints: 'Vestibulum et orci pharetra, dignissim libero sed, luctus nunc.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(dairy);
  dish.addTag(sesame);

  dish = await db.Dish.create({
    name: 'shawarma tacos',
    tableTalkPoints: 'Maecenas rhoncus elit sed leo feugiat convallis.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(egg);
  dish.addTag(garlic);
  dish.addTag(sesame);
  dish.addTag(onion);

  dish = await db.Dish.create({
    name: 'grilled pistachio lamb kebab',
    tableTalkPoints: 'Donec id tellus ac eros maximus laoreet.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(onion);
  dish.addTag(garlic);
  dish.addTag(egg);
  dish.addTag(treenuts);

  dish = await db.Dish.create({
    name: 'stuffed mushroom',
    tableTalkPoints: 'Praesent aliquam urna nec justo blandit tincidunt.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(treenuts);
  dish.addTag(dairy);
  dish.addTag(garlic);

  dish = await db.Dish.create({
    name: 'chipotle chicken wings',
    tableTalkPoints: 'Nulla nec ligula sit amet metus aliquet mattis.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(dairy);
  dish.addTag(garlic);
  dish.addTag(onion);

  dish = await db.Dish.create({
    name: 'oven roasted bone marrow',
    tableTalkPoints: 'Sed dictum augue at tellus facilisis, maximus ullamcorper tellus euismod.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(onion);

  dish = await db.Dish.create({
    name: 'bacari fries',
    tableTalkPoints: 'Vivamus dignissim enim a magna hendrerit rhoncus.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(egg);
  dish.addTag(garlic);
  dish.addTag(treenuts);
  dish.addTag(seeds);

  dish = await db.Dish.create({
    name: 'ricotta & beet gnocchi',
    tableTalkPoints: 'Nunc efficitur nulla non aliquam lacinia.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(dairy);
  dish.addTag(garlic);
  dish.addTag(onion);

  dish = await db.Dish.create({
    name: 'gorgonzola pasta',
    tableTalkPoints: 'Duis pharetra nisl eu risus tempus, vel feugiat augue interdum.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(gluten);
  dish.addTag(garlic);
  dish.addTag(treenuts);

  dish = await db.Dish.create({
    name: 'lamb stuffed eggplant',
    tableTalkPoints: 'Cras ut ligula euismod, placerat turpis nec, euismod ante.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(dairy);
  dish.addTag(egg);
  dish.addTag(onion);
  dish.addTag(garlic);

  dish = await db.Dish.create({
    name: 'noa\'s cauliflower',
    tableTalkPoints: 'Donec tempus sem at leo finibus aliquam.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(egg);

  dish = await db.Dish.create({
    name: 'seared scallops',
    tableTalkPoints: 'Integer sollicitudin nisl non sem laoreet facilisis.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(onion);
  dish.addTag(garlic);
  dish.addTag(shellfish);

  dish = await db.Dish.create({
    name: 'grilled chicken breast',
    tableTalkPoints: 'Nulla et tellus vehicula, lacinia ante at, consectetur risus.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(dairy);
  dish.addTag(onion);

  dish = await db.Dish.create({
    name: 'bacari burger',
    tableTalkPoints: 'Aenean sagittis ex sit amet tristique dignissim.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(egg);
  dish.addTag(soy);
  dish.addTag(dairy);
  dish.addTag(garlic);
  dish.addTag(fish);

  dish = await db.Dish.create({
    name: 'chef\'s salmon',
    tableTalkPoints: 'Nunc eu dolor vehicula, dignissim diam eu, dapibus est.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(fish);
  dish.addTag(treenuts);
  dish.addTag(gluten);
  dish.addTag(egg);
  dish.addTag(garlic);

  dish = await db.Dish.create({
    name: 'hunter\'s mac & cheese',
    tableTalkPoints: 'Maecenas nec nunc vulputate, interdum nisi a, aliquam lorem.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(gluten);
  dish.addTag(garlic);
  dish.addTag(onion);
  dish.addTag(truffle);

  dish = await db.Dish.create({
    name: 'brussels sprouts',
    tableTalkPoints: 'Integer a orci venenatis, viverra diam et, hendrerit arcu.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(garlic);
  dish.addTag(dairy);

  dish = await db.Dish.create({
    name: 'seared petit filet',
    tableTalkPoints: 'Nulla elementum lorem a elit placerat, sed ullamcorper augue pulvinar.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(egg);
  dish.addTag(garlic);
  dish.addTag(onion);

  dish = await db.Dish.create({
    name: 'glazed pork belly',
    tableTalkPoints: 'Morbi non neque tempor, cursus tellus vitae, faucibus mauris.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(garlic);
  dish.addTag(onion);
  dish.addTag(sesame);
  dish.addTag(soy);

  dish = await db.Dish.create({
    name: 'bacon wrapped medjool dates',
    tableTalkPoints: 'Etiam vitae odio commodo, elementum lorem eget, imperdiet justo.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);

  dish = await db.Dish.create({
    name: 'wild mushroom polenta',
    tableTalkPoints: 'Vestibulum pulvinar lectus eu leo sodales venenatis.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(onion);

  dish = await db.Dish.create({
    name: 'avocado toast',
    tableTalkPoints: 'Etiam lacinia nunc pellentesque libero imperdiet, in cursus ipsum fringilla.',
  });
  dish.setCategory(Brunch);
  dish.setRestaurant(restaurant);
  dish.addTag(treenuts);
  dish.addTag(seeds);
  dish.addTag(egg);

  dish = await db.Dish.create({
    name: 'housemade granola bowl',
    tableTalkPoints: 'Sed dictum magna sit amet nunc luctus, eu tempor dolor viverra.',
  });
  dish.setCategory(Brunch);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);

  dish = await db.Dish.create({
    name: 'free-range egg pizza',
    tableTalkPoints: 'Vestibulum facilisis ante sed rhoncus gravida.',
  });
  dish.setCategory(Brunch);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(dairy);
  dish.addTag(egg);
  dish.addTag(onion);

  dish = await db.Dish.create({
    name: 'pancakes',
    tableTalkPoints: 'Maecenas luctus urna a lorem consectetur tempus.',
  });
  dish.setCategory(Brunch);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(seeds);
  dish.addTag(egg);
  dish.addTag(dairy);

  dish = await db.Dish.create({
    name: 'potato hash',
    tableTalkPoints: 'Donec aliquam orci ac urna varius pellentesque.',
  });
  dish.setCategory(Brunch);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(gluten);
  dish.addTag(onion);
  dish.addTag(egg);

  dish = await db.Dish.create({
    name: 'croque madame',
    tableTalkPoints: 'Proin sed arcu accumsan, pulvinar magna vitae, accumsan risus.',
  });
  dish.setCategory(Brunch);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(onion);
  dish.addTag(egg);
  dish.addTag(gluten);

  dish = await db.Dish.create({
    name: 'shrimp & grits',
    tableTalkPoints: 'Curabitur pellentesque risus non nisi pellentesque, eu finibus tellus pellentesque.',
  });
  dish.setCategory(Brunch);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(shellfish);
  dish.addTag(garlic);
  dish.addTag(seeds);

  dish = await db.Dish.create({
    name: 'crab cake benedict',
    tableTalkPoints: 'Maecenas placerat tortor et viverra interdum.',
  });
  dish.setCategory(Brunch);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(gluten);
  dish.addTag(onion);
  dish.addTag(egg);
  dish.addTag(shellfish);

  dish = await db.Dish.create({
    name: 'tofu scramble',
    tableTalkPoints: 'Aenean aliquam diam fermentum justo cursus, vel vehicula massa fringilla.',
  });
  dish.setCategory(Brunch);
  dish.setRestaurant(restaurant);
  dish.addTag(soy);
  dish.addTag(onion);
  dish.addTag(gluten);

  dish = await db.Dish.create({
    name: 'goat cheese polenta',
    tableTalkPoints: 'Cras non odio non risus lobortis eleifend quis nec dolor.',
  });
  dish.setCategory(Brunch);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(egg);
  dish.addTag(onion);
  dish.addTag(garlic);

  dish = await db.Dish.create({
    name: 'chai tea custard',
    tableTalkPoints: 'In sodales dolor quis nisl faucibus, ut euismod nisi aliquet.',
  });
  dish.setCategory(Brunch);
  dish.setRestaurant(restaurant);
  dish.addTag(treenuts);

};

module.exports = populateDB;
