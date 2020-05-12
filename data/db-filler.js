
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
    name: 'cheese & salumi',
    description: 'saint-andrè, gorgonzola dulce, midnight moon, mahon, salame varzi, salame calabrese served with: whole grain mustard, cornichon, caper berry, dried apricot, baguette',
    tableTalkPoints: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  });
  dish.setCategory(Cold);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(gluten);

  dish = await db.Dish.create({
    name: 'asian pear salad',
    description: 'grilled shiitake mushroom, wild arugula, hard boiled egg, winter citrus vinaigrette',
    tableTalkPoints: 'Phasellus feugiat velit nec egestas faucibus.',
  });
  dish.setCategory(Cold);
  dish.setRestaurant(restaurant);
  dish.addTag(egg);
  dish.addTag(soy);
  dish.addTag(gluten);

  dish = await db.Dish.create({
    name: 'shrimp ceviche',
    description: 'pickled fennel, heirloom cherry tomato, cucumber, za\'atar, sumac, lime chili chips',
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
    description: 'citrus chili sauce, shaved radish, parsley, basil',
    tableTalkPoints: 'In quis augue mollis, cursus tortor sed, scelerisque velit.',
  });
  dish.setCategory(Cold);
  dish.setRestaurant(restaurant);
  dish.addTag(garlic);
  dish.addTag(shellfish);

  dish = await db.Dish.create({
    name: 'burrata caprese',
    description: 'burrata di gioia, fresh basil, heirloom cherry tomato, basil walnut pesto, grey salt',
    tableTalkPoints: 'Morbi ultrices massa ut sapien volutpat venenatis.',
  });
  dish.setCategory(Cold);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(treenuts);

  dish = await db.Dish.create({
    name: 'rainbow beet salad',
    description: 'oven roasted beets, chèvre, tarragon, frantoia olive oil, black peppercorn, grey salt',
    tableTalkPoints: 'Suspendisse sit amet metus ultrices, scelerisque ante sit amet, posuere libero.',
  });
  dish.setCategory(Cold);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);

  dish = await db.Dish.create({
    name: 'bruschetta with tomato & basil',
    description: 'local heirloom tomato & basil',
    tableTalkPoints: 'In sed tellus et dolor rhoncus luctus.',
  });
  dish.setCategory(Cold);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(garlic);

  dish = await db.Dish.create({
    name: 'bruschetta with eggplant',
    description: 'roasted market eggplant salad & persian cucumber',
    tableTalkPoints: 'Donec facilisis magna at nisl auctor viverra.',
  });
  dish.setCategory(Cold);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(garlic);

  dish = await db.Dish.create({
    name: 'bruschetta with bell pepper',
    description: 'dalia\'s open fire roasted bell peppers',
    tableTalkPoints: 'Nulla ornare orci sed vestibulum malesuada.',
  });
  dish.setCategory(Cold);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(garlic);

  dish = await db.Dish.create({
    name: 'bruschetta with basil walnut pesto',
    description: 'balsamic roasted garlic with basil walnut pesto',
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
    description: 'crispy black kale & chopped rainbow kale, persian cucumber, heirloom cherry tomato, green onion, crumbled feta, za\'atar, sumac, kale tahini',
    tableTalkPoints: 'Donec congue elit accumsan, condimentum ligula eu, tempor leo.',
  });
  dish.setCategory(Cold);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(garlic);
  dish.addTag(cilantro);
  dish.addTag(soy);

  dish = await db.Dish.create({
    name: 'fried chicken sliders',
    description: 'cornbread crusted, hawaiian roll, pickled cucumber, cabbage, lemon kalamata olive caper aioli',
    tableTalkPoints: 'Sed gravida enim a felis congue, ac consectetur orci varius.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(dairy);

  dish = await db.Dish.create({
    name: 'frog legs',
    description: 'coconut crusted, roasted garlic cauliflower puree, gremolata',
    tableTalkPoints: 'Morbi quis justo nec sapien fringilla scelerisque et eget massa.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(garlic);

  dish = await db.Dish.create({
    name: 'oaxacan pasta',
    description: 'handmade pasta, oaxacan cream, romesco, toasted almond, cilantro',
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
    description: 'ricotta salata, pickled onion, black beans, za\'atar vinaigrette',
    tableTalkPoints: 'Nam volutpat est sit amet diam volutpat, ut suscipit orci tincidunt.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(garlic);

  dish = await db.Dish.create({
    name: 'sea bass balik',
    description: 'pan seared, charred shishito pepper & black beans, tarragon aioli, pomegranate molasses, grilled lemon',
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
    description: 'clover honey, toasted sesame, black caraway, flaxseed',
    tableTalkPoints: 'Vestibulum et orci pharetra, dignissim libero sed, luctus nunc.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(dairy);
  dish.addTag(sesame);

  dish = await db.Dish.create({
    name: 'shawarma tacos',
    description: 'mary\'s air chilled chicken, israeli spice mix, cabbage, pickled red onion, lemon garlic tahini',
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
    description: 'kale, turmeric, and beet tahini; cucumber, heirloom cherry tomato',
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
    description: 'five cheese blend, toasted pecan, basil walnut pesto, parmesan, parsley',
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
    description: 'buttermilk batter, smoked pepper sauce, blue cheese creme fraiche, scallion',
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
    description: 'caper panko, sea salt, black pepper, crostini',
    tableTalkPoints: 'Sed dictum augue at tellus facilisis, maximus ullamcorper tellus euismod.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(onion);

  dish = await db.Dish.create({
    name: 'bacari fries',
    description: 'chef\'s "bcn" sauce, fried egg',
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
    description: 'hand-made, chèvre fondue, chimichurri',
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
    description: 'gorgonzola dulcelatte cream sauce, hand-made tripoline, zucchini, calabrese pepper, crushes pistachio',
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
    description: 'seasoned ground leg of lamb, lemon garlic emulsion, lemon chip, scallion',
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
    description: 'caramelized, chipotle sauce, mixed greens',
    tableTalkPoints: 'Donec tempus sem at leo finibus aliquam.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(egg);

  dish = await db.Dish.create({
    name: 'seared scallops',
    description: 'carrot parsnip puree, melted leeks, crispy capers, white truffle oil',
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
    description: 'mary\'s air chilled chicken, crispy parmesan risotto cake, lemon jalapeño caper sauce',
    tableTalkPoints: 'Nulla et tellus vehicula, lacinia ante at, consectetur risus.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);
  dish.addTag(dairy);
  dish.addTag(onion);

  dish = await db.Dish.create({
    name: 'bacari burger',
    description: 'all natural beef, open faced, fresh tomato, carmelized onion, worcestershire aioli, telera roll',
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
    description: 'crispy skin, walnut crust, garlic herb bulgar, parsley',
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
    description: '5 cheese fondue, toasted panko, white truffle oil, scallion',
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
    description: 'caramelized, pomegranate molasses, creme fraiche, red beet',
    tableTalkPoints: 'Integer a orci venenatis, viverra diam et, hendrerit arcu.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(garlic);
  dish.addTag(dairy);

  dish = await db.Dish.create({
    name: 'seared petit filet',
    description: 'grilled zucchini, house-made bernaise',
    tableTalkPoints: 'Nulla elementum lorem a elit placerat, sed ullamcorper augue pulvinar.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(egg);
  dish.addTag(garlic);
  dish.addTag(onion);

  dish = await db.Dish.create({
    name: 'glazed pork belly',
    description: 'sweet umami mulling glaze, toasted sesame seed, lemon, scallion, cilantro',
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
    description: 'parmagiano-reggiano stuffed',
    tableTalkPoints: 'Etiam vitae odio commodo, elementum lorem eget, imperdiet justo.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);

  dish = await db.Dish.create({
    name: 'wild mushroom polenta',
    description: 'chanterelle, wood ear, shiitake, cremini, scallion, cucumber',
    tableTalkPoints: 'Vestibulum pulvinar lectus eu leo sodales venenatis.',
  });
  dish.setCategory(Hot);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(onion);

  dish = await db.Dish.create({
    name: 'asian pear & brie',
    description: 'guava fromage blanc, wild arugula, grey salt, frantoia olive oil',
    tableTalkPoints: 'Nulla at nisi sed libero commodo elementum.',
  });
  dish.setCategory(Grilled_Pizza);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(gluten);

  dish = await db.Dish.create({
    name: 'chorizo',
    description: 'tomatillo salsa, queso fresco',
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
    description: 'organic tomato sauce, mozzarella di gioia, fresh basil, olive oil',
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
    description: 'fromage blanc, 2yr white cheddar, parsley',
    tableTalkPoints: 'Donec ultrices libero et leo consequat, ut lobortis erat tincidunt.',
  });
  dish.setCategory(Grilled_Pizza);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(gluten);
  dish.addTag(garlic);

  dish = await db.Dish.create({
    name: 'white',
    description: 'fromage blanc, bacon, scallion, mozzarella',
    tableTalkPoints: 'Praesent a sapien suscipit, iaculis elit sit amet, convallis nisl.',
  });
  dish.setCategory(Grilled_Pizza);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(gluten);

  dish = await db.Dish.create({
    name: 'bacon & double cream brie',
    description: 'organic tomato sauce, fresh jalapeño',
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
    description: 'organix tomato sauce, mixed greens, roasted garlic, caramelized onion, fresh tomato',
    tableTalkPoints: 'Nullam consectetur elit consequat, placerat arcu et, condimentum dui.',
  });
  dish.setCategory(Grilled_Pizza);
  dish.setRestaurant(restaurant);
  dish.addTag(gluten);

  dish = await db.Dish.create({
    name: 'double chocolate cake',
    description: 'chocolate pudding, hazelnut brittle',
    tableTalkPoints: 'Phasellus sit amet diam ut ante dapibus tristique.',
  });
  dish.setCategory(Sweet);
  dish.setRestaurant(restaurant);
  dish.addTag(treenuts);
  dish.addTag(gluten);

  dish = await db.Dish.create({
    name: 'bread pudding',
    description: 'clover honey custard, vanilla bean ice cream',
    tableTalkPoints: 'Vivamus dignissim enim a magna hendrerit rhoncus.',
  });
  dish.setCategory(Sweet);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(gluten);

  dish = await db.Dish.create({
    name: 'cardamom chocolate ganache',
    description: 'brown butter cookie dough, banana brulee, candied walnut, chantilly cream',
    tableTalkPoints: 'Nunc sed nulla faucibus, lacinia tortor a, auctor orci.',
  });
  dish.setCategory(Sweet);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(gluten);
  dish.addTag(treenuts);

  dish = await db.Dish.create({
    name: 'malabi',
    description: 'rosewater custard, shaved coconut, hibiscus flower syrup, candied pistachio',
    tableTalkPoints: 'Praesent sed ante et nunc faucibus scelerisque.',
  });
  dish.setCategory(Sweet);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(treenuts);

  dish = await db.Dish.create({
    name: 'bacari ice cream',
    description: 'vanilla bean, walnut, clover honey',
    tableTalkPoints: 'Proin vitae odio dictum, aliquet augue eu, hendrerit turpis.',
  });
  dish.setCategory(Sweet);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);
  dish.addTag(treenuts);

  dish = await db.Dish.create({
    name: 'the best cake you\'ve ever had',
    description: 'medjool dates, brown sugar caramel, crispy bacon',
    tableTalkPoints: 'Duis laoreet est quis vestibulum sagittis.',
  });
  dish.setCategory(Sweet);
  dish.setRestaurant(restaurant);
  dish.addTag(egg);
  dish.addTag(dairy);

  dish = await db.Dish.create({
    name: 'avocado toast',
    description: 'house-baked superfood bread (gluten free), watermelon radish, olive oil, grey salt',
    tableTalkPoints: 'Etiam lacinia nunc pellentesque libero imperdiet, in cursus ipsum fringilla.',
  });
  dish.setCategory(Brunch);
  dish.setRestaurant(restaurant);
  dish.addTag(treenuts);
  dish.addTag(seeds);
  dish.addTag(egg);

  dish = await db.Dish.create({
    name: 'housemade granola bowl',
    description: 'fresh fruit, greek yogurt, clover honey, fresh mint',
    tableTalkPoints: 'Sed dictum magna sit amet nunc luctus, eu tempor dolor viverra.',
  });
  dish.setCategory(Brunch);
  dish.setRestaurant(restaurant);
  dish.addTag(dairy);

  dish = await db.Dish.create({
    name: 'free-range egg pizza',
    description: 'fromage blanc, caramalized onion, mixed greens, mozzerella',
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
    description: 'whole wheat, flax seed, hemp seed, cardamom butter, fresh fruit',
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
    description: 'chorizo, bell pepper, caramelized onion, mornay sauce, fried egg',
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
    description: 'pastrami and onion ragu, five-cheese, fried egg, telera roll',
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
    description: 'slow poached, harissa butter, yellow corn grits, cucumber, scallion, grey salt',
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
    description: 'panko rusted claw meat, freshly made grapefruit hollandaise, sous vide egg',
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
    description: 'roasted bell pepper, kale, spanish onion, pomegranate sweet chili sauce, grilled baguette',
    tableTalkPoints: 'Aenean aliquam diam fermentum justo cursus, vel vehicula massa fringilla.',
  });
  dish.setCategory(Brunch);
  dish.setRestaurant(restaurant);
  dish.addTag(soy);
  dish.addTag(onion);
  dish.addTag(gluten);

  dish = await db.Dish.create({
    name: 'goat cheese polenta',
    description: 'ground leg of lamb ragu, smoked pepper sauce, fried egg',
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
    description: 'chia seed, coconut mild, elderflower macerated berries, crushed marcona almond',
    tableTalkPoints: 'In sodales dolor quis nisl faucibus, ut euismod nisi aliquet.',
  });
  dish.setCategory(Brunch);
  dish.setRestaurant(restaurant);
  dish.addTag(treenuts);

};

module.exports = populateDB;
