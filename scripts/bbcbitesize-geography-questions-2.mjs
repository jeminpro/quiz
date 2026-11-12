/** @typedef {{ topic: string, stem: string, correct: string, wrong: [string, string, string], explanation: string }} RawQuestion */

const riverPage = 'https://www.bbc.co.uk/bitesize/articles/z6g8dp3';
const latitudePage = 'https://www.bbc.co.uk/bitesize/articles/zd4rmfr';
const fieldworkPage = 'https://www.bbc.co.uk/bitesize/articles/zf6sydm';
const mapPage = 'https://www.bbc.co.uk/bitesize/articles/zbvr4xs';
const volcanoPage = 'https://www.bbc.co.uk/bitesize/articles/z63vdnb';
const biomePage = 'https://www.bbc.co.uk/bitesize/articles/zpvnb7h';
const settlementPage = 'https://www.bbc.co.uk/bitesize/articles/zfk72v4';
const subjectPage = 'https://www.bbc.co.uk/bitesize/subjects/zbkw2hv';

/** @type {RawQuestion[]} */
export const questionsPartTwo = [
  {
    topic: 'Rivers and the water cycle',
    stem: `Look at the water cycle diagram. Label 1 is on the lake, label 2 is the arrow in the sky, and label 3 is beside the falling rain.

![A diagram of the water cycle with labels 1, 2 and 3](/questions/bbcbitesize/geography/water-cycle.png)

What is happening at label 3?`,
    correct: 'Rain is falling from the cloud',
    wrong: [
      'Lake water is turning into vapour',
      'The river is flowing up the mountain',
      'The Sun is melting the land into rock',
    ],
    explanation: `Label 3 is next to the rain, which is precipitation. The rising arrows at label 1 show evaporation. Source: BBC Bitesize — ${riverPage}`,
  },
  {
    topic: 'Rivers and the water cycle',
    stem: `On this diagram, wavy arrows rise from the lake at label 1.

![A diagram of the water cycle with labels 1, 2 and 3](/questions/bbcbitesize/geography/water-cycle.png)

What is label 1 showing?`,
    correct: 'Water from the lake turning into vapour',
    wrong: [
      'Rain falling on the mountain',
      'A river flowing uphill',
      'Clouds turning into solid rock',
    ],
    explanation: `The Sun heats the lake and water becomes vapour. That is evaporation, shown by the arrows rising at label 1. Source: BBC Bitesize — ${riverPage}`,
  },
  {
    topic: 'Rivers and the water cycle',
    stem: `Look at the river diagram.

![A river labelled source, tributary and mouth](/questions/bbcbitesize/geography/river-course.svg)

Which label is the place where the river meets the sea?`,
    correct: 'Mouth',
    wrong: ['Source', 'Tributary', 'The start of the river in the hills'],
    explanation: `The mouth is where the river ends in the sea. The source is where it begins. Source: BBC Bitesize — ${riverPage}`,
  },
  {
    topic: 'Rivers and the water cycle',
    stem: `The same river diagram shows a smaller stream joining the main river.

![A river labelled source, tributary and mouth](/questions/bbcbitesize/geography/river-course.svg)

What is that smaller stream called?`,
    correct: 'A tributary',
    wrong: ['The mouth', 'The source of the sea', 'A compass point'],
    explanation: `A tributary is a smaller stream that flows into a larger river. Source: BBC Bitesize — ${riverPage}`,
  },
  {
    topic: 'Rivers and the water cycle',
    stem: 'A river begins in the hills and finishes at the coast. Why does the water travel that way?',
    correct: 'Gravity pulls the water downhill',
    wrong: [
      'Rivers flow uphill towards their source',
      'The sea pushes rivers back into the mountains',
      'Water only moves if a person digs a path uphill',
    ],
    explanation: 'Rivers flow from higher ground to lower ground because of gravity. The source is high and the mouth is at the sea.',
  },
  {
    topic: 'Rivers and the water cycle',
    stem: 'In the upper course, the river is steep and fast. Which feature is most likely there?',
    correct: 'A waterfall or a narrow valley, where the river is cutting down',
    wrong: [
      'A wide, slow mouth with no slope at all',
      'A sandy beach that is not on a river',
      'The source at the bottom of the sea',
    ],
    explanation: 'High in the hills the river drops quickly and erodes the land. Waterfalls and steep valleys are typical of that upper course.',
  },
  {
    topic: 'Rivers and the water cycle',
    stem: 'Further downstream the valley is flatter and the river bends from side to side. What are those bends called?',
    correct: 'Meanders',
    wrong: ['Sources', 'Compass roses', 'Grid references'],
    explanation: 'Meanders are the curves a river makes as it wears away the outer bank and drops material on the inner bank.',
  },
  {
    topic: 'Rivers and the water cycle',
    stem: 'After a flood, mud is left on the flat land beside the river. What has happened?',
    correct: 'The river slowed down and deposited the mud it had been carrying',
    wrong: [
      'The mud flowed uphill and stuck to the source',
      'Deposition means the river carried the mud away and left nothing',
      'Floods cannot leave mud behind',
    ],
    explanation: 'When a river slows, it drops the sand and mud it was carrying. That is deposition. Flat land beside a river is the floodplain.',
  },
  {
    topic: 'Rivers and the water cycle',
    stem: 'Which order matches the water cycle?',
    correct: 'Evaporation, then condensation into clouds, then precipitation, then water returning to rivers and the sea',
    wrong: [
      'Rain first falls upwards, then the sea disappears',
      'Clouds form before any water evaporates, and rivers flow to the mountain tops',
      'Water is used up and does not return',
    ],
    explanation: 'The Sun turns water into vapour. The vapour cools into clouds, falls as rain or snow, and rivers carry it back towards the sea.',
  },
  {
    topic: 'Rivers and the water cycle',
    stem: 'Condensation in the water cycle is when water vapour cools. What does it become?',
    correct: 'Tiny droplets that make clouds',
    wrong: [
      'Solid rock',
      'A new ocean that replaces the land',
      'Wind direction',
    ],
    explanation: 'Cooling vapour turns back into liquid droplets. Those droplets form clouds, and they may later fall as precipitation.',
  },
  {
    topic: 'Rivers and the water cycle',
    stem: 'Rain, snow and hail are all ways water falls from clouds. What is the shared name?',
    correct: 'Precipitation',
    wrong: ['Evaporation', 'A tributary', 'A settlement'],
    explanation: 'Precipitation is water falling from the air, whether it falls as rain, snow or hail.',
  },
  {
    topic: 'Rivers and the water cycle',
    stem: 'A class builds a model river in a tray of sand, with the top of the tray raised. Water poured at the top cuts a channel to the bottom. What does the model show?',
    correct: 'Water flows downhill and can erode a path',
    wrong: [
      'Water prefers to flow uphill if the sand is wet',
      'A river source must be at the lowest point',
      'Erosion means the water adds sand to the top of the slope',
    ],
    explanation: 'The raised end is like the hills. Water runs down, picks up sand and cuts a channel, which is a simple model of erosion.',
  },
  {
    topic: 'Rivers and the water cycle',
    stem: 'People use rivers for water, transport and sometimes electricity. Which statement is the best summary?',
    correct: 'Rivers are physical features that people also depend on',
    wrong: [
      'A river stops being physical once people use it',
      'Rivers are human features because they have names',
      'People cannot use a river without emptying the sea',
    ],
    explanation: 'A river forms naturally, so it is a physical feature. People still rely on it for water, travel and power.',
  },
  {
    topic: 'Rivers and the water cycle',
    stem: 'Where is the safest place to look for the source of a river?',
    correct: 'Uphill, where the stream begins',
    wrong: [
      'At the sea, because every river starts at its mouth',
      'In the school hall',
      'On the Equator, because all sources are there',
    ],
    explanation: 'The source is the start of the river, usually in hills or mountains. The mouth, at the sea, is the end.',
  },
  {
    topic: 'Rivers and the water cycle',
    stem: 'Two streams meet and continue as one larger river. What is that meeting place called?',
    correct: 'A confluence',
    wrong: ['A mouth, even though it is high in the hills', 'A desert', 'A time zone'],
    explanation: 'A confluence is where two rivers or streams join. The mouth is where a river meets the sea.',
  },
  {
    topic: 'Rivers and the water cycle',
    stem: 'A reservoir has been made by damming a valley. How should it be described?',
    correct: 'People have changed a valley so it stores water',
    wrong: [
      'A reservoir is a natural feature that nobody planned',
      'Dams make rivers flow uphill to the source',
      'Stored water is no longer part of the water cycle',
    ],
    explanation: 'The valley is physical, but the dam is human. Together they store water that can still evaporate and return as rain.',
  },

  {
    topic: 'Mountains, volcanoes and earthquakes',
    stem: `Contour lines join places of the same height.

![Contour lines on Hill A and Hill B](/questions/bbcbitesize/geography/contours.svg)

Which hill is steeper?`,
    correct: 'Hill B, because its contour lines are closer together',
    wrong: [
      'Hill A, because wider gaps mean a steeper slope',
      'They are equally steep because both drawings show a hill',
      'Neither, because contour lines only show rainfall',
    ],
    explanation: `Close contour lines mean the height changes over a short distance, so the slope is steep. Source: BBC Bitesize — ${subjectPage}`,
  },
  {
    topic: 'Mountains, volcanoes and earthquakes',
    stem: 'What is a mountain?',
    correct: 'A very high area of land',
    wrong: [
      'Any building taller than a house',
      'A river mouth',
      'A line of latitude',
    ],
    explanation: 'Mountains are high parts of the land. A tall building can look high, but it is a human feature, not a mountain.',
  },
  {
    topic: 'Mountains, volcanoes and earthquakes',
    stem: 'Ben Nevis is a mountain, but it is not erupting. Which statement is most accurate?',
    correct: 'Some mountains are volcanoes, but many mountains are not',
    wrong: [
      'Every mountain is an active volcano',
      'A mountain cannot be made of rock',
      'Ben Nevis is in the sea, so it is an ocean',
    ],
    explanation: 'Volcanoes are one way high land can form. Many mountains, including Ben Nevis, are not active volcanoes.',
  },
  {
    topic: 'Mountains, volcanoes and earthquakes',
    stem: 'A volcano is an opening in the Earth’s crust. What can escape from it?',
    correct: 'Magma, hot ash and gases',
    wrong: [
      'Only cold river water',
      'Grid references',
      'Nothing, because the crust has no openings',
    ],
    explanation: 'Magma is molten rock under the ground. When it reaches the surface it is called lava, and ash and gases can erupt with it.',
  },
  {
    topic: 'Mountains, volcanoes and earthquakes',
    stem: 'A guide says the rock under the ground is magma, and the rock flowing on the surface is lava. When does magma become lava?',
    correct: 'When it reaches the surface',
    wrong: [
      'When it freezes into snow',
      'When it is still deep underground',
      'Only if it falls as rain',
    ],
    explanation: 'The same molten rock has two names. It is magma below the surface and lava once it comes out of the volcano.',
  },
  {
    topic: 'Mountains, volcanoes and earthquakes',
    stem: 'Mount Etna in Italy can erupt violently and is built of layers of thick lava and ash. Mauna Loa in Hawaii has gentler slopes and runnier lava. What is the useful difference?',
    correct: 'Etna is a composite volcano and Mauna Loa is a shield volcano',
    wrong: [
      'They are the same shape because all lava behaves the same way',
      'Mauna Loa is a river and Etna is a lake',
      'Shield volcanoes are always under the North Sea',
    ],
    explanation: 'Thicker lava and ash can pile up into a steep composite volcano. Runnier lava spreads out to make a wider, gentler shield volcano.',
  },
  {
    topic: 'Mountains, volcanoes and earthquakes',
    stem: 'Most volcanoes and strong earthquakes happen where huge pieces of the Earth’s crust meet. What are those pieces called?',
    correct: 'Tectonic plates',
    wrong: ['Rain gauges', 'Capital cities', 'Tributaries'],
    explanation: 'The crust is broken into tectonic plates. They move slowly, and volcanoes and earthquakes are common at their edges.',
  },
  {
    topic: 'Mountains, volcanoes and earthquakes',
    stem: 'Plates can lock together. Pressure builds, then the rocks suddenly move. What is that sudden shake?',
    correct: 'An earthquake',
    wrong: [
      'A season',
      'A four-figure grid reference',
      'Evaporation',
    ],
    explanation: 'An earthquake is the shaking caused when built-up pressure in the crust is released. It is not a kind of weather.',
  },
  {
    topic: 'Mountains, volcanoes and earthquakes',
    stem: 'An earthquake happens under the ocean and a series of huge waves spreads out. What are those waves called?',
    correct: 'A tsunami',
    wrong: ['A meander', 'A hamlet', 'A compass needle'],
    explanation: 'A tsunami is a set of large waves that can be set off by an undersea earthquake. It is not a bend in a river.',
  },
  {
    topic: 'Mountains, volcanoes and earthquakes',
    stem: 'The UK does have earthquakes, but they are usually small. Japan has many stronger ones. Which preparation matches a place where strong earthquakes are common?',
    correct: 'Buildings that can sway, and a practised plan to take cover',
    wrong: [
      'Windows left wide open so people can watch the shaking',
      'No plan, because earthquakes only happen in deserts',
      'A rain gauge on its own, because earthquakes are a kind of rainfall',
    ],
    explanation: 'In places such as Japan, buildings are designed to move with the shock, and people practise taking cover under something sturdy.',
  },
  {
    topic: 'Mountains, volcanoes and earthquakes',
    stem: 'During an earthquake indoors, which action is the safest of these choices?',
    correct: 'Take cover under a sturdy table and protect your head',
    wrong: [
      'Stand by a window to get a better view',
      'Run back into the building to fetch a coat if you are already outside and clear',
      'Use a lift, because lifts are the safest place in a shaking building',
    ],
    explanation: 'Falling objects cause many injuries. A sturdy table gives cover. Windows and lifts are dangerous during the shaking.',
  },
  {
    topic: 'Mountains, volcanoes and earthquakes',
    stem: 'Lava and ash break down into rich soil, so some people farm near volcanoes. What does that show?',
    correct: 'Volcanoes can be dangerous and also useful',
    wrong: [
      'Volcanoes are never dangerous',
      'Ash makes it impossible for any plant to grow',
      'People only live near volcanoes because lava is cold',
    ],
    explanation: 'Eruptions can destroy land and harm people, but the broken-down lava and ash can make fertile soil for crops.',
  },
  {
    topic: 'Mountains, volcanoes and earthquakes',
    stem: 'A valley is the low land between hills. A class sees a river in the bottom of a steep valley. Which explanation fits?',
    correct: 'The valley is lower than the hills, so water runs down into it',
    wrong: [
      'Valleys are higher than the peaks around them',
      'Rivers avoid valleys and stay on the peaks',
      'A valley is a human feature because it has a shape',
    ],
    explanation: 'Valleys are low routes through higher land. Gravity pulls water off the slopes and into the valley bottom.',
  },
  {
    topic: 'Mountains, volcanoes and earthquakes',
    stem: 'Edinburgh Castle stands on a steep rock that is the remains of an ancient volcano. Why was that site useful?',
    correct: 'The high rock made the castle harder to attack',
    wrong: [
      'A high rock is always the warmest place in a country',
      'Castles can only be built on sand at a river mouth',
      'An old volcano means the castle is a physical feature',
    ],
    explanation: 'The rock is a physical feature. People used its height for defence, so the castle is a human feature shaped by the land.',
  },
  {
    topic: 'Mountains, volcanoes and earthquakes',
    stem: 'The size of an earthquake can be measured. A bigger number on the scale means what?',
    correct: 'A more powerful earthquake',
    wrong: [
      'A smaller earthquake',
      'A wetter climate',
      'A place further from the Equator, with no link to the shaking',
    ],
    explanation: 'Earthquake scales, such as the Richter scale, give a bigger number to a more powerful quake. Most quakes are too small to feel.',
  },
  {
    topic: 'Mountains, volcanoes and earthquakes',
    stem: 'The Earth’s inside is described in layers: a metal core, a rocky mantle, and a thin crust. Where do people live?',
    correct: 'On the crust',
    wrong: ['Inside the metal core', 'In the mantle', 'On a tectonic plate that is not part of the crust'],
    explanation: 'The crust is the outer layer we can see and live on. It is split into plates that move over the hotter rock beneath.',
  },

  {
    topic: 'Biomes',
    stem: 'What is a biome?',
    correct: 'A large region with a similar climate, landscape, plants and animals',
    wrong: [
      'A single tree',
      'The capital city of a country',
      'A four-figure grid reference',
    ],
    explanation: 'Climate decides what can grow, and the plants and animals of that region live together as a biome.',
  },
  {
    topic: 'Biomes',
    stem: 'A hot desert has had almost no rain for years. Which adaptation matches that biome?',
    correct: 'Plants that store water, and animals that shelter from the sun in the day',
    wrong: [
      'Plants that need soaking wet soil all year',
      'Animals that can only live on thick ice',
      'No living things, because a desert is the same as an ocean',
    ],
    explanation: 'Hot deserts are very dry. Cacti store water, and some animals stay in burrows during the hottest part of the day.',
  },
  {
    topic: 'Biomes',
    stem: 'Antarctica is extremely cold and also very dry. Why can it still be called a desert?',
    correct: 'A desert is a place with very little rain or snow, and it does not have to be hot',
    wrong: [
      'Deserts are always hot, so Antarctica cannot be one',
      'A desert must be a sandy beach beside the Equator',
      'Cold places receive the most rain on Earth',
    ],
    explanation: 'Desert means very dry. Some deserts are hot and some, such as Antarctica, are cold.',
  },
  {
    topic: 'Biomes',
    stem: 'The tundra is found in the Arctic and on high mountains. Which description fits?',
    correct: 'It is cold and windy, with a very short summer and few kinds of plants',
    wrong: [
      'It is hot and wet all year, with very tall trees',
      'It is a city biome made of offices',
      'It is the same as a tropical rainforest',
    ],
    explanation: 'Tundra is too cold for many species. Snow covers the ground for much of the year and the growing season is short.',
  },
  {
    topic: 'Biomes',
    stem: 'A rainforest has very tall evergreen trees and heavy rain. Why are these biomes especially important?',
    correct: 'They are home to a huge share of the world’s plants and animals',
    wrong: [
      'They contain almost no living things',
      'They only grow in Antarctica',
      'Cutting them down makes the habitat larger for every animal',
    ],
    explanation: 'Rainforests cover a small part of the land but hold an enormous variety of life. They grow where it is warm and very wet.',
  },
  {
    topic: 'Biomes',
    stem: 'On which continent are you least likely to find a rainforest?',
    correct: 'Antarctica',
    wrong: ['South America', 'Africa', 'Asia'],
    explanation: 'Rainforests need heat and heavy rain. Antarctica is too cold, which is why rainforests are found on the other continents.',
  },
  {
    topic: 'Biomes',
    stem: 'The East African savannah is grassland with scattered trees. Lions hunt zebras there. What does that food link show?',
    correct: 'Animals in a biome depend on the plants, and on each other',
    wrong: [
      'Grass is not part of the biome',
      'Hunters do not need any other living things',
      'A savannah is a kind of ocean',
    ],
    explanation: 'Zebras eat the grass, and lions eat the zebras. The plants and animals of the savannah depend on one another.',
  },
  {
    topic: 'Biomes',
    stem: 'Large areas of rainforest are cleared for timber, mining or cattle farming. What are the animals that lived in those trees most likely to need?',
    correct: 'Somewhere else to find food and shelter',
    wrong: [
      'Nothing different, because trees are not part of a habitat',
      'To move into the open ocean, because rainforest animals are sea fish',
      'To increase in number, because less forest always means more space for wildlife',
    ],
    explanation: 'Clearing the forest removes habitat. Many animals cannot stay once the food and shelter of the trees have gone.',
  },
  {
    topic: 'Biomes',
    stem: 'Much of the UK is mild and wet enough for deciduous woods and grass, rather than rainforest or hot desert. Which biome description fits best?',
    correct: 'A temperate landscape of woods, fields and grassland',
    wrong: [
      'A tropical rainforest with no seasons',
      'A hot sandy desert with almost no rain',
      'Tundra that is frozen for most of the year in every county',
    ],
    explanation: 'The UK’s temperate climate suits deciduous trees, grass and farmland. It is not a tropical rainforest or a hot desert.',
  },
  {
    topic: 'Biomes',
    stem: 'A national park protects a stretch of countryside. What is the main idea?',
    correct: 'The landscape and its wildlife are looked after, while people can still visit carefully',
    wrong: [
      'All farming and walking are replaced by a city',
      'The park is no longer a real place on a map',
      'Protection means the climate inside the park becomes tropical',
    ],
    explanation: 'National parks are a way of caring for important countryside. People still live in and visit many of them.',
  },
  {
    topic: 'Biomes',
    stem: 'Which pair matches the biome to the climate?',
    correct: 'Rainforest: hot and wet. Hot desert: very dry. Tundra: cold, with a short summer',
    wrong: [
      'Rainforest: frozen all year. Desert: the wettest place on Earth. Tundra: hot and steamy',
      'All three biomes have the same climate',
      'Tundra is defined by its shops, not by its climate',
    ],
    explanation: 'The climate is the main reason these biomes look so different. Plants and animals are adapted to those conditions.',
  },
  {
    topic: 'Biomes',
    stem: 'Orangutans in parts of Southeast Asia have lost forest as trees are cut down. Which link is most accurate?',
    correct: 'Habitat loss can reduce the number of animals that depend on that forest',
    wrong: [
      'Cutting trees gives orangutans more of the food they need',
      'Animals never depend on particular plants',
      'A rainforest can be removed without changing the biome',
    ],
    explanation: 'Orangutans need the forest for food and shelter. When that habitat shrinks, their population can fall.',
  },

  {
    topic: 'Settlements and land use',
    stem: 'Which list is in order from the smallest settlement to the largest?',
    correct: 'Hamlet, village, town, city',
    wrong: [
      'City, town, village, hamlet',
      'Village, hamlet, city, town',
      'Town, city, hamlet, village',
    ],
    explanation: 'A hamlet is a few houses. A village has more services, a town has more still, and a city is the largest.',
  },
  {
    topic: 'Settlements and land use',
    stem: 'A cluster of houses has no shop and no school. What is the best name for it?',
    correct: 'A hamlet',
    wrong: ['A city', 'A capital', 'An ocean'],
    explanation: 'Hamlets are the smallest settlements. They do not have the shops and services of a village or town.',
  },
  {
    topic: 'Settlements and land use',
    stem: 'A place has many houses, a regular railway, a hospital and a shopping centre, but it does not have a cathedral or a university. Which label fits best?',
    correct: 'A town',
    wrong: [
      'A hamlet',
      'A single isolated farm',
      'A continent',
    ],
    explanation: 'Towns have lots of houses and services such as stations and hospitals. A hamlet would not have a shopping centre or a hospital.',
  },
  {
    topic: 'Settlements and land use',
    stem: 'Belfast is a city. A nearby town is mostly housing on the city’s edge. What does suburban mean here?',
    correct: 'A mainly housing area on the edge of a larger city',
    wrong: [
      'Open countryside with no link to a city',
      'The centre of a capital, with no houses',
      'A place that is not a settlement',
    ],
    explanation: 'Suburban places sit on the edge of towns and cities and are used mainly for housing. Rural means the countryside beyond that.',
  },
  {
    topic: 'Settlements and land use',
    stem: 'Which land use is rural?',
    correct: 'Sheep grazing on open hills',
    wrong: [
      'A high street full of shops',
      'A railway station in a city centre',
      'A block of city flats',
    ],
    explanation: 'Rural land is countryside. Grazing is a rural land use. Shops, stations and flats are urban.',
  },
  {
    topic: 'Settlements and land use',
    stem: 'Early villages were often built beside a river, on land that was not too steep. Why was that a strong choice?',
    correct: 'The river gave water, and flatter land was easier to build and farm on',
    wrong: [
      'A river makes farming impossible',
      'The steepest cliff is always the easiest place to grow crops',
      'People never chose sites for practical reasons',
    ],
    explanation: 'Water, food and a workable site are basic needs. A river and gentler land can provide them.',
  },
  {
    topic: 'Settlements and land use',
    stem: 'A class is choosing a site for a new town. Which reason is the strongest?',
    correct: 'Flat land above the flood level, with a water supply and a road',
    wrong: [
      'The inside of a river bend that floods every winter, chosen only for the view',
      'The middle of a lake, so every journey needs a boat and there is no dry land',
      'A name that sounds pleasant, with no check on water, slope or flood risk',
    ],
    explanation: 'A town needs dry land, water and a way in and out. A site that floods every year, or has no dry ground, fails those needs.',
  },
  {
    topic: 'Settlements and land use',
    stem: 'A map colours housing yellow, shops red, a park green and a factory purple. The factory is next to a main road on the edge of town. What does the road suggest?',
    correct: 'Goods and workers can reach the factory',
    wrong: [
      'Factories are physical features, like rivers',
      'A road stops all land use around it',
      'Parks are usually built in the middle of factories',
    ],
    explanation: 'Land use and transport go together. A factory on a main road is easier to supply than one with no access.',
  },
  {
    topic: 'Settlements and land use',
    stem: 'An isolated farm is one or two houses far from other homes. How is that different from a village?',
    correct: 'A village is a larger group of homes and usually has a few services',
    wrong: [
      'An isolated farm is bigger than a city',
      'A village never has any houses',
      'They are the same size by definition',
    ],
    explanation: 'An isolated farm stands alone. A village is a small settlement with more homes and often a shop, church or school.',
  },
  {
    topic: 'Settlements and land use',
    stem: 'A new housing estate is built on fields at the edge of a town. What has changed?',
    correct: 'Rural land has become suburban housing',
    wrong: [
      'The fields have become a river source',
      'The land use is unchanged because the soil is still underneath',
      'The town must now be in a different continent',
    ],
    explanation: 'Building houses on fields changes the land use from farming or open land to housing. That is a human change at the edge of the town.',
  },
  {
    topic: 'Settlements and land use',
    stem: 'Why might a settlement grow at a bridge point on a river?',
    correct: 'People and goods can cross there, so routes and trade meet',
    wrong: [
      'A bridge stops anyone from travelling',
      'Rivers make trade impossible',
      'Bridge points are only found at the South Pole',
    ],
    explanation: 'A safe crossing gathers roads. Houses, shops and work often grow where people already need to meet and cross.',
  },
  {
    topic: 'Settlements and land use',
    stem: 'A hilltop village was first built for defence. A later town grew in the valley beside the railway. What does the pair show?',
    correct: 'The reason for a site can change as transport and needs change',
    wrong: [
      'Settlements never change their reasons for being where they are',
      'Railways are physical features',
      'A valley is always safer from attack than a hill, so hill villages cannot exist',
    ],
    explanation: 'Height once helped defence. Later, flat land and a railway mattered more for trade. Both are human choices shaped by the land.',
  },
  {
    topic: 'Settlements and land use',
    stem: 'Which job is most closely tied to rural land use?',
    correct: 'A farmer growing crops or keeping animals',
    wrong: [
      'A train driver on an underground city railway only',
      'A shop worker in a city shopping centre, with no link to the land',
      'A lighthouse keeper is the only job that exists in the countryside',
    ],
    explanation: 'Farming uses the countryside to produce food. Many other jobs are urban, though the countryside has more jobs than farming alone.',
  },
  {
    topic: 'Settlements and land use',
    stem: 'Arable farming grows crops. Pastoral farming keeps animals. Eastern lowlands in the UK are often used for crops, while wetter hills are often used for sheep. Why?',
    correct: 'Flatter, drier land suits crops, and rougher, wetter hills suit grazing',
    wrong: [
      'Sheep can only live in city centres',
      'Crops grow best on the steepest wet rock',
      'Climate and slope have no effect on farming',
    ],
    explanation: 'Farmers match the land and climate. Machines and crops need gentler, drier fields. Sheep can graze hill grass.',
  },
  {
    topic: 'Settlements and land use',
    stem: 'A planner looks at a floodplain. The land is flat and near a river, but it floods most winters. What is the careful decision?',
    correct: 'Avoid building homes on the part that floods, or raise the protection before building',
    wrong: [
      'Build as many homes as possible on the lowest ground and ignore the floods',
      'Floodplains are mountains, so flooding is impossible',
      'A river makes the land safer from water',
    ],
    explanation: 'Flat land near water is useful, but a floodplain is doing its natural job when it floods. Homes there need that risk to be taken seriously.',
  },
  {
    topic: 'Settlements and land use',
    stem: 'Urban, suburban and rural are three ways of describing land. Which example is urban?',
    correct: 'The busy centre of a city, with many shops and tall buildings',
    wrong: [
      'A hamlet with five houses and no shop',
      'Open moorland used for grazing',
      'A single farm several kilometres from the next house',
    ],
    explanation: 'Urban means a town or city. Hamlets, moors and isolated farms are rural.',
  },

  {
    topic: 'Resources and trade',
    stem: 'A UK shop sells bananas that were grown in a hotter country. What has happened?',
    correct: 'The bananas have been imported',
    wrong: [
      'The bananas have been exported from the UK',
      'Trade means the fruit grew in the shop',
      'Food cannot be moved between countries',
    ],
    explanation: 'An import is something bought in from another country. The UK’s climate is too cool for banana farms, so the fruit is traded.',
  },
  {
    topic: 'Resources and trade',
    stem: 'A factory in the UK sells machines to a buyer in another country. What is that sale?',
    correct: 'An export',
    wrong: ['An import into the UK', 'A river mouth', 'A biome'],
    explanation: 'Exports are goods sold to another country. Imports are goods bought from another country.',
  },
  {
    topic: 'Resources and trade',
    stem: 'What is trade?',
    correct: 'Buying and selling goods or services',
    wrong: [
      'Only the movement of tectonic plates',
      'A type of rainfall',
      'The name for a six-figure grid reference',
    ],
    explanation: 'Trade is the exchange of things people need or want. It can happen in a local shop or between countries.',
  },
  {
    topic: 'Resources and trade',
    stem: 'Which resource is renewable?',
    correct: 'Wind used to turn a turbine',
    wrong: ['Coal', 'Oil', 'Natural gas'],
    explanation: 'Wind keeps blowing, so it can be used again. Coal, oil and gas are fossil fuels and they will run out if we keep using them.',
  },
  {
    topic: 'Resources and trade',
    stem: 'Why are coal, oil and gas called non-renewable?',
    correct: 'They formed very slowly and are being used much faster than they can be replaced',
    wrong: [
      'They can be made again overnight in any kitchen',
      'They are not natural resources',
      'Renewable means the fuel is dug from underground',
    ],
    explanation: 'Fossil fuels take millions of years to form. Once they are burned they are not replaced on a human timescale.',
  },
  {
    topic: 'Resources and trade',
    stem: 'A village has a river, good soil and a small wood. Which list is the best match?',
    correct: 'Water, food and timber are natural resources the village could use',
    wrong: [
      'Only things made in a factory count as resources',
      'A river cannot be a resource',
      'Soil is a human feature because people walk on it',
    ],
    explanation: 'Natural resources are useful materials from the environment, including water, soil and wood. People still have to use them carefully.',
  },
  {
    topic: 'Resources and trade',
    stem: 'The economy of a town includes shops, farms and a factory. What is the economy looking at?',
    correct: 'How people make, buy and sell things',
    wrong: [
      'Only the weather',
      'Only the height of the hills',
      'The number of continents',
    ],
    explanation: 'Economic activity is work and trade: producing goods and services and exchanging them for money.',
  },
  {
    topic: 'Resources and trade',
    stem: 'A port city imports fuel and exports grain. Which sentence describes that pattern?',
    correct: 'Fuel comes in from abroad and grain is sold abroad',
    wrong: [
      'Both fuel and grain are leaving, so nothing arrives',
      'Imports are goods the city sends away',
      'A port cannot be part of trade',
    ],
    explanation: 'Imports arrive and exports leave. A port is a place where that exchange often happens.',
  },
  {
    topic: 'Resources and trade',
    stem: 'Two farms feed a city. One is nearby and one is across the world. What extra cost can the distant farm add?',
    correct: 'A long journey for the food, using transport',
    wrong: [
      'No difference, because distance never affects trade',
      'The nearby farm must export the food before the city can eat it',
      'Transport is only used for mountains, not for food',
    ],
    explanation: 'Food from far away has to be moved by ship, road or air. That transport is part of the trade that brings it to the city.',
  },
  {
    topic: 'Resources and trade',
    stem: 'A country has little flat farmland and a cool climate, but it has skilled factories. Which trade pattern is likely?',
    correct: 'It may import food and export manufactured goods',
    wrong: [
      'It must grow every food it needs and never trade',
      'Factories mean the country has no economy',
      'A cool climate is the same as a tropical rainforest',
    ],
    explanation: 'Places trade what they can produce for what they lack. Climate and land affect food, while factories can produce goods to sell.',
  },
  {
    topic: 'Resources and trade',
    stem: 'Electricity can be made by burning gas or by using wind. Which comparison is fair?',
    correct: 'Gas is a limited fuel; wind can keep being used',
    wrong: [
      'Wind is non-renewable and gas comes back every night',
      'Neither wind nor gas is a resource',
      'Electricity is a physical landform, like a cliff',
    ],
    explanation: 'Both can make electricity, but the resources are different. Gas is used up. Wind is a renewable resource.',
  },
  {
    topic: 'Resources and trade',
    stem: 'A mine closes because the useful rock has run out. What does that show about mineral resources?',
    correct: 'They are limited, so they can be used up in a place',
    wrong: [
      'Minerals grow back in a week like grass',
      'A closed mine means the rock was never a resource',
      'Trade stops minerals from ever running out',
    ],
    explanation: 'Minerals are non-renewable. Once the useful rock has been dug out, that supply is gone.',
  },

  {
    topic: 'How places change',
    stem: 'An old photo of a street shows fields. A new photo of the same spot shows houses and a shop. What has happened?',
    correct: 'The land use has changed from fields to housing and shops',
    wrong: [
      'The street has moved to another continent',
      'Photos cannot show change',
      'Houses are physical features, so nothing human has changed',
    ],
    explanation: 'Comparing then and now shows how people have changed the place. Fields have been built on.',
  },
  {
    topic: 'How places change',
    stem: 'A new road is built through the edge of a village. Which effects are the most likely?',
    correct: 'Quicker journeys, but also more noise and a change in land use',
    wrong: [
      'No change at all, because roads are invisible on maps',
      'The village becomes a mountain',
      'Traffic noise falls because roads remove cars',
    ],
    explanation: 'A road can help people travel and can attract new buildings. It also takes land and can make the edge of the village noisier.',
  },
  {
    topic: 'How places change',
    stem: 'A cliff path is closed because the cliff edge is now closer to the path than it was ten years ago. What process fits?',
    correct: 'The sea has eroded the cliff',
    wrong: [
      'The cliff has grown out into the sea',
      'Erosion means sand is added and the cliff gets bigger',
      'Paths move cliffs uphill',
    ],
    explanation: 'Waves can wear a cliff away. Over years the edge moves back, so a path that was safe can become too close to the drop.',
  },
  {
    topic: 'How places change',
    stem: 'A holiday village gains cafes and a car park, and summer traffic jams get worse. Which summary is fairest?',
    correct: 'Tourism brings jobs and visitors, and also pressure on roads and quiet places',
    wrong: [
      'Tourism only helps and cannot cause any problems',
      'Tourism only causes problems and never creates work',
      'Cafes are physical features formed by the sea',
    ],
    explanation: 'Tourism changes places in more than one way. It can support local work and also add traffic, litter and busy seasons.',
  },
  {
    topic: 'How places change',
    stem: 'Photos from 2008 and today show a factory replaced by flats. What question should a geographer ask next?',
    correct: 'Why did the land use change, and who is affected?',
    wrong: [
      'Nothing, because a change of building does not count',
      'Only “what colour is the door?”',
      'Whether the flats have moved the Equator',
    ],
    explanation: 'Geographers do not stop at “it looks different”. They ask what caused the change and what it means for people and the place.',
  },
  {
    topic: 'How places change',
    stem: 'A river used to flood a street every winter. A higher wall and a new overflow channel are built. Which conclusion is careful?',
    correct: 'People have tried to reduce the flood risk, but very heavy rain could still test the new defences',
    wrong: [
      'A wall means rain can never fall there again',
      'Flood defences turn a river into a volcano',
      'The street was never at risk if it is near a river',
    ],
    explanation: 'Defences can lower the risk by holding or diverting water. They do not stop rainfall, and an extreme flood can still be too much for them.',
  },
  {
    topic: 'How places change',
    stem: 'Hadrian’s Wall follows a line of hills. The wall is human and the hills are physical. What does that pairing show?',
    correct: 'People used the shape of the land when they built',
    wrong: [
      'The hills were built by the Romans in a single day',
      'A wall is a physical feature because it is old',
      'Physical features never affect human ones',
    ],
    explanation: 'The builders followed the high ground. The land shaped the route of a human feature.',
  },
  {
    topic: 'How places change',
    stem: 'A beach grows wider after a groyne, a fence built out into the sea, traps sand. What process is the groyne encouraging?',
    correct: 'Deposition of sand',
    wrong: [
      'Erosion that removes all the sand',
      'Evaporation of the beach into clouds',
      'A change from coast to desert biome overnight',
    ],
    explanation: 'Groynes slow the movement of sand along the shore, so sand is dropped and the beach can build up. That is deposition caused by a human structure.',
  },
  {
    topic: 'How places change',
    stem: 'A quarry is dug into a hillside, then later filled with water and opened as a nature reserve. How many stages of change is that?',
    correct: 'The hill was altered for rock, then altered again for wildlife and visitors',
    wrong: [
      'There was no change because the hill is still in the same country',
      'A quarry is a natural lake that people cannot affect',
      'Nature reserves cannot be made on old industrial land',
    ],
    explanation: 'Places can change more than once. Digging the quarry was a human change, and so was turning the hole into a lake and reserve.',
  },
  {
    topic: 'How places change',
    stem: 'A high-street shop closes and becomes a cafe. The building stays. What has changed?',
    correct: 'The use of the building',
    wrong: [
      'The continent it stands on',
      'The climate of the whole country',
      'Nothing, because the walls are the same',
    ],
    explanation: 'Land use can change even when the building remains. A shop and a cafe are different services.',
  },
  {
    topic: 'How places change',
    stem: 'Old maps show a marsh. Newer maps show a housing estate and drains. What should pupils remember?',
    correct: 'Draining the marsh made building possible, but the land may still have a water problem',
    wrong: [
      'Marshes cannot be changed by people',
      'Drains prove the area was always dry rock',
      'A housing estate is a physical feature',
    ],
    explanation: 'People can drain wet land and build on it. The old marsh is a clue that water still needs to be managed.',
  },
  {
    topic: 'How places change',
    stem: 'A village school is full because new houses have been built. Which link is most accurate?',
    correct: 'More housing can increase the number of people who need services',
    wrong: [
      'New houses reduce the population',
      'Schools are not a service',
      'Population and services are never connected',
    ],
    explanation: 'Settlements change together. Extra homes often mean more children, so schools and other services come under pressure.',
  },
  {
    topic: 'How places change',
    stem: 'A coastline loses a metre of cliff in a storm, and also loses a little cliff in ordinary weeks. How should the two be described?',
    correct: 'The storm is a sudden change and the weekly loss is slower change',
    wrong: [
      'Only sudden changes count in geography',
      'Slow change means nothing is happening',
      'Cliffs grow during storms and shrink in calm weather only',
    ],
    explanation: 'Coasts change in sudden events and in small steps. Both are erosion over different lengths of time.',
  },
  {
    topic: 'How places change',
    stem: 'Pupils compare a 1960 photo of their high street with the street today. The cars and shop signs are different, but the church is still there. What is the best summary?',
    correct: 'Some features have changed and some have stayed',
    wrong: [
      'If one building remains, the whole place is unchanged',
      'If the cars are different, the church cannot be the same building',
      'Photos of the same street cannot be compared',
    ],
    explanation: 'Change and continuity can happen together. Transport and shops may change while an older building stays.',
  },

  {
    topic: 'Fieldwork',
    stem: `The children are out studying a rocky hillside.

![Two children in high-visibility jackets looking at a rocky hill](/questions/bbcbitesize/geography/fieldwork-hill.jpg)

Which statement is most accurate?`,
    correct: 'The rock and the shape of the hill are physical features',
    wrong: [
      'The hill is a human feature because it is steep',
      'The bright jackets are physical features because they are outdoors',
      'A hillside cannot be studied in fieldwork',
    ],
    explanation: `Physical features formed naturally. The jackets were made by people, so they are not part of the hill. Source: BBC Bitesize — ${fieldworkPage}`,
  },
  {
    topic: 'Fieldwork',
    stem: 'Ankush is studying how a new road is changing his village. Which method is NOT useful for that question?',
    correct: 'A questionnaire for people who have never visited the village',
    wrong: [
      'A sketch of the road, the houses and the fields beside it',
      'Noise readings beside the road and in a quiet lane',
      'A count of vehicles at the same time each weekday',
    ],
    explanation: 'The enquiry is about this village. People who have never been there cannot describe the change. Maps, noise readings and traffic counts can.',
  },
  {
    topic: 'Fieldwork',
    stem: 'What is fieldwork?',
    correct: 'Going outside the classroom to collect information for yourself',
    wrong: [
      'Copying a map without looking at the place',
      'Guessing an answer before you have a question',
      'Only reading a story that is set in another country',
    ],
    explanation: 'Fieldwork means observing and measuring real places. You still plan a question first, then collect evidence.',
  },
  {
    topic: 'Fieldwork',
    stem: 'Ayesha takes her own photos of a street. A guidebook also has photos of that street. Which sort is her photo?',
    correct: 'A primary source, because she collected it herself',
    wrong: [
      'A secondary source, because all photos are secondary',
      'Useless, because photos cannot be evidence',
      'A climate graph',
    ],
    explanation: 'Primary information is what you collect, such as your own photo or measurements. A guidebook is secondary because someone else prepared it.',
  },
  {
    topic: 'Fieldwork',
    stem: 'Which pair is correct?',
    correct: 'A traffic tally is quantitative; a written description of how the street feels is qualitative',
    wrong: [
      'A tally is qualitative because it uses numbers',
      'A description is quantitative because it is written in words',
      'Both words mean the same thing',
    ],
    explanation: 'Quantitative data are numbers, such as a count. Qualitative data are descriptions, opinions and sketches.',
  },
  {
    topic: 'Fieldwork',
    stem: 'The class wants to compare rainfall in the playground and on the field. Which plan is best?',
    correct: 'Use the same type of gauge, in the open, and read both at the same times',
    wrong: [
      'Put one gauge under a tree and the other on a roof, and read them on different weeks',
      'Guess from how wet the grass looks',
      'Measure the playground only, then say the field had the same rain',
    ],
    explanation: 'A fair comparison keeps the equipment, the openness and the times the same, and changes only the place.',
  },
  {
    topic: 'Fieldwork',
    stem: 'They want to know whether the High Street is busier at 8:30 am than at 1:00 pm. What should they keep the same?',
    correct: 'The place they count, the method, and the length of each count',
    wrong: [
      'The time of day, because both counts should be at 8:30',
      'Nothing, because a busier street can be judged by which count they prefer',
      'The weather only, and they should count different streets',
    ],
    explanation: 'The thing they are testing is the time of day, so the place, the method and how long they count should stay the same.',
  },
  {
    topic: 'Fieldwork',
    stem: 'A river study is planned after heavy rain. The bank is slippery. Which choice is the safe one?',
    correct: 'Stay back from the edge and measure from a bridge with an adult',
    wrong: [
      'Wade in to see how deep the middle is',
      'Go alone if the water looks slow',
      'Lean out as far as possible to fill a bottle',
    ],
    explanation: 'Fieldwork has to be safe. Fast or high water, slippery banks and working alone are reasons to change the plan.',
  },
  {
    topic: 'Fieldwork',
    stem: 'Results: Monday 2 mm of rain, Tuesday 0 mm, Wednesday 8 mm. Which conclusion fits?',
    correct: 'Wednesday was the wettest of these three days',
    wrong: [
      'The climate has changed because of one wet Wednesday',
      'It never rains here',
      'Tuesday was wetter than Wednesday',
    ],
    explanation: 'The numbers only support a comparison of those three days. Wednesday has the highest total. They do not prove a change in climate.',
  },
  {
    topic: 'Fieldwork',
    stem: 'Noise beside a new road is 70 decibels. Noise in a park 200 metres away is 45 decibels. What can they say?',
    correct: 'It was noisier beside the road than in the park when they measured',
    wrong: [
      'The whole country is noisy',
      'The park is noisier than the road',
      'Decibels measure rainfall, so the road is wetter',
    ],
    explanation: 'The readings compare two places at the time of the survey. They do not describe the whole country.',
  },
  {
    topic: 'Fieldwork',
    stem: 'The enquiry question is “How do pupils travel to our school?” Which method fits best?',
    correct: 'A tally of how pupils arrive, taken on more than one morning',
    wrong: [
      'A rainfall graph for a town 100 km away',
      'Asking one friend and treating that answer as the whole school',
      'Measuring the height of the nearest mountain',
    ],
    explanation: 'The method has to match the question. A travel tally, repeated so one odd day does not decide the result, answers it.',
  },
  {
    topic: 'Fieldwork',
    stem: 'They have counts, a sketch map and three interview quotes. How should they present the findings?',
    correct: 'A chart for the counts, the map for where things are, and a few quotes for opinions',
    wrong: [
      'Hide the counts and report only the largest number they can think of',
      'Use the quotes as if they were exact counts',
      'Throw the map away because maps cannot show findings',
    ],
    explanation: 'Different evidence needs different displays. Numbers suit a chart, places suit a map, and opinions can be quoted.',
  },
  {
    topic: 'Fieldwork',
    stem: 'A pupil wants to know how people in the village feel about the new playground. Which sample is best?',
    correct: 'A range of villagers of different ages, not only the pupil’s closest friends',
    wrong: [
      'Only the pupil’s two best friends',
      'People who live in another country and have not heard of the village',
      'No one, because feelings cannot be asked about',
    ],
    explanation: 'The question is about this village. Asking different local people gives a fairer picture than asking only friends, or asking people who do not know the place.',
  },
  {
    topic: 'Fieldwork',
    stem: 'Before collecting data, the group writes: “Does the park have more litter near the gate than near the pond?” Why is that a useful first step?',
    correct: 'It gives them a clear question to collect evidence for',
    wrong: [
      'A question means they no longer need to look at the park',
      'Litter cannot be counted',
      'The first step should be to decide the answer, then ignore anything that disagrees',
    ],
    explanation: 'Fieldwork starts with a question. Then they can choose what to count and where, and later check whether the evidence answers it.',
  },
  {
    topic: 'Fieldwork',
    stem: 'They sketch the school grounds and mark benches, bins and grassy areas. What is the sketch for?',
    correct: 'To record where human and physical features are',
    wrong: [
      'To replace every measurement with a guess',
      'To show the climate of the last 50 years',
      'To prove the school is a continent',
    ],
    explanation: 'A sketch map shows the layout of a place. Benches and bins are human features. Grass is part of the grounds they can also describe.',
  },
  {
    topic: 'Fieldwork',
    stem: 'A secondary source says the river is 30 cm deep. Their own measurement, taken safely from the bridge, is 45 cm. What should they do?',
    correct: 'Record both, and note when and where each figure came from',
    wrong: [
      'Change their measurement to 30 cm so it matches the book',
      'Ignore the book because secondary sources are always false',
      'Average them and say the depth is exact for the whole year',
    ],
    explanation: 'The book and the measurement may be from different days or places. Good fieldwork keeps both and explains the difference, rather than forcing them to match.',
  },
  {
    topic: 'Fieldwork',
    stem: 'The group finishes a litter survey. Which evaluation question is the most useful?',
    correct: 'Did we survey enough of the park, and would another day change the result?',
    wrong: [
      'Did we enjoy the walk, so the data must be right?',
      'Can we add extra litter in the chart to make the problem look bigger?',
      'Should we delete the gate count because it was the largest?',
    ],
    explanation: 'Evaluating means asking whether the method was fair and the conclusion is supported. It does not mean changing the numbers to fit a preferred story.',
  },
  {
    topic: 'Fieldwork',
    stem: 'Which kit matches a study of how windy the playground is?',
    correct: 'A wind vane or anemometer, used at set times in an open spot',
    wrong: [
      'A rain gauge only, because wind is a kind of rain',
      'A world atlas, with no visit to the playground',
      'A thermometer left indoors',
    ],
    explanation: 'The tool has to measure the thing in the question. Wind direction or wind speed must be measured outside, in a comparable place.',
  },

  {
    topic: 'Latitude and time zones',
    stem: `The lines on this globe are lines of latitude. N and S mark the poles. Line C runs around the middle.

![A globe with lines of latitude labelled A, B, C and D](/questions/bbcbitesize/geography/latitude-lines.svg)

What is line C called?`,
    correct: 'The Equator',
    wrong: ['The Arctic Circle', 'The Prime Meridian', 'The Greenwich line of longitude'],
    explanation: `The Equator is the line of latitude around the middle of the Earth, at 0°. Source: BBC Bitesize — ${latitudePage}`,
  },
  {
    topic: 'Latitude and time zones',
    stem: `Line A circles the Earth in the far north, but it is not the North Pole itself.

![A globe with lines of latitude labelled A, B, C and D](/questions/bbcbitesize/geography/latitude-lines.svg)

Which name best fits line A?`,
    correct: 'The Arctic Circle',
    wrong: ['The Equator', 'The Prime Meridian', 'The South Pole'],
    explanation: `The Arctic Circle is a line of latitude around the far north. The North Pole is the point at the top, not that circle. Source: BBC Bitesize — ${latitudePage}`,
  },
  {
    topic: 'Latitude and time zones',
    stem: 'What do lines of latitude tell you?',
    correct: 'How far north or south a place is from the Equator',
    wrong: [
      'How far east or west a place is from London',
      'The population of a city',
      'The depth of a river',
    ],
    explanation: 'Latitude is the set of lines that run around the Earth, parallel to the Equator. They measure north and south.',
  },
  {
    topic: 'Latitude and time zones',
    stem: 'What do lines of longitude tell you?',
    correct: 'How far east or west a place is from the Prime Meridian',
    wrong: [
      'How far north a place is from the Equator',
      'The height of a mountain',
      'Whether a place is a town or a village',
    ],
    explanation: 'Longitude lines run from the North Pole to the South Pole. They are measured east or west of the Prime Meridian.',
  },
  {
    topic: 'Latitude and time zones',
    stem: 'The Prime Meridian is at 0° longitude and passes through Greenwich in London. A place labelled 10°W is where, compared with Greenwich?',
    correct: 'To the west',
    wrong: ['To the east', 'On the Equator by definition', 'At the South Pole'],
    explanation: 'W means west of the Prime Meridian. E means east. Latitude, not this number, would tell you how far north or south it is.',
  },
  {
    topic: 'Latitude and time zones',
    stem: 'A ship’s position is 15°S, 30°E. Which description fits?',
    correct: 'South of the Equator and east of the Prime Meridian',
    wrong: [
      'North of the Equator and west of the Prime Meridian',
      'On the Equator and on the Prime Meridian',
      'At 15° east and 30° south, because the numbers are the other way round',
    ],
    explanation: 'The first number is latitude. 15°S is south of the Equator. 30°E is east of Greenwich.',
  },
  {
    topic: 'Latitude and time zones',
    stem: 'Why is it daytime in the UK while it can be night-time in Australia?',
    correct: 'The Earth is spinning, so different longitudes face the Sun at different times',
    wrong: [
      'Australia is north of the Equator and the UK is south of it',
      'Time zones are caused by rainfall',
      'The Sun goes round the Earth once every day',
    ],
    explanation: 'The Earth rotates once every 24 hours. Places to the east, such as Australia, have a different time of day from the UK.',
  },
  {
    topic: 'Latitude and time zones',
    stem: 'New York is west of London. When it is midday in London, what is the careful thing to say about New York?',
    correct: 'It is still morning there, because places to the west are behind in time',
    wrong: [
      'It is already the next day at the same hour, because west is always ahead',
      'It must be midnight because the USA is in the Southern Hemisphere',
      'London and New York must show the same time because they are both cities',
    ],
    explanation: 'Time zones follow longitude. The Sun reaches places further east first, so the UK is ahead of New York.',
  },
  {
    topic: 'Latitude and time zones',
    stem: 'A GPS app gives a latitude and a longitude for a hidden gate. A paper map gives a four-figure grid reference for the same gate. What is the difference?',
    correct: 'Latitude and longitude work on the globe; a grid reference locates a square on that map',
    wrong: [
      'They are the same number written in two fonts',
      'A grid reference gives the time zone',
      'Latitude replaces the need for a map scale',
    ],
    explanation: 'Both can pinpoint a place, but they are different systems. Grid references belong to a particular map. Latitude and longitude belong to the whole Earth.',
  },
  {
    topic: 'Latitude and time zones',
    stem: 'The Tropic of Cancer is about 23.5°N and the Tropic of Capricorn is about 23.5°S. What are they?',
    correct: 'Lines of latitude either side of the Equator',
    wrong: [
      'Lines of longitude through London and New York',
      'The two poles',
      'The borders of the United Kingdom',
    ],
    explanation: 'The tropics are special lines of latitude. Between them, the Sun can be directly overhead at some time in the year.',
  },
  {
    topic: 'Latitude and time zones',
    stem: 'A pupil says the North Pole is a line of latitude called the Arctic Circle. What is the accurate correction?',
    correct: 'The North Pole is a point at 90°N. The Arctic Circle is a line around the polar region',
    wrong: [
      'The North Pole is on the Equator',
      'The Arctic Circle is a line of longitude through Greenwich',
      'There is no difference between a pole and a circle of latitude',
    ],
    explanation: 'The pole is the single most northern point. The Arctic Circle is one of the major lines of latitude that surround that region.',
  },
  {
    topic: 'Latitude and time zones',
    stem: 'Family in the UK want to phone relatives in Australia and find them awake. What should they check?',
    correct: 'The time-zone difference, because Australia is hours ahead',
    wrong: [
      'Only the temperature, because warmer places share the UK’s clock',
      'The four-figure grid reference of their own house',
      'Nothing, because every country uses the same clock time',
    ],
    explanation: 'Australia’s clocks are many hours ahead of the UK. A morning call in Britain can be evening or night for the relatives.',
  },
];
