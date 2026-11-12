/** @typedef {{ topic: string, stem: string, correct: string, wrong: [string, string, string], explanation: string }} RawQuestion */

const mapPage = 'https://www.bbc.co.uk/bitesize/articles/zbvr4xs';

/** @type {RawQuestion[]} */
export const questionsPartOne = [
  {
    topic: 'Maps and compass',
    stem: `Ayesha is lining up a compass before a walk.

![A compass with eight direction points](/questions/bbcbitesize/geography/compass-points.jpg)

She wants to walk north-east. Which letters on the compass should she follow?`,
    correct: 'NE',
    wrong: ['NW', 'SE', 'SW'],
    explanation: `North-east is the direction halfway between north and east, so it is marked NE. Source: BBC Bitesize — ${mapPage}`,
  },
  {
    topic: 'Maps and compass',
    stem: `James is checking which way is north.

![A compass with its coloured needle lined up with a direction letter](/questions/bbcbitesize/geography/compass-needle.jpg)

The coloured needle has settled on one letter. Which direction is it showing?`,
    correct: 'North',
    wrong: ['East', 'South', 'West'],
    explanation: `A compass needle points north. On this compass it has lined up with N. Source: BBC Bitesize — ${mapPage}`,
  },
  {
    topic: 'Maps and compass',
    stem: `Priya is planning a walk from school. North is at the top of her map.

![A labelled map of the school, shop, church, park and river](/questions/bbcbitesize/geography/school-map.svg)

Which direction is the park from the school?`,
    correct: 'East',
    wrong: ['North', 'South', 'West'],
    explanation: `The park is to the right of the school, and north is at the top, so right is east. Source: BBC Bitesize — ${mapPage}`,
  },
  {
    topic: 'Maps and compass',
    stem: `Leo is at the school and wants the shop. North is at the top of the map.

![A labelled map of the school, shop, church, park and river](/questions/bbcbitesize/geography/school-map.svg)

Which way should he walk?`,
    correct: 'North',
    wrong: ['East', 'South', 'West'],
    explanation: `The shop is above the school on the map. With north at the top, that direction is north. Source: BBC Bitesize — ${mapPage}`,
  },
  {
    topic: 'Maps and compass',
    stem: `The class is reading a map that uses symbols. North is at the top.

![A map with a key for school, park, road and river](/questions/bbcbitesize/geography/symbol-map.svg)

Using the key, what is the green circle?`,
    correct: 'A park',
    wrong: ['The school', 'The main road', 'The river'],
    explanation: `The key says a green circle stands for a park. The black square is the school and the blue line is the river. Source: BBC Bitesize — ${mapPage}`,
  },
  {
    topic: 'Maps and compass',
    stem: `Omar is sorting the symbols on this map into human and physical features.

![A map with a key for school, park, road and river](/questions/bbcbitesize/geography/symbol-map.svg)

Which feature formed naturally?`,
    correct: 'The river',
    wrong: ['The school', 'The main road', 'The park, because every green space is a mountain'],
    explanation: `A river is a physical feature because people did not build it. The school and the road are human features. Source: BBC Bitesize — ${mapPage}`,
  },
  {
    topic: 'Maps and compass',
    stem: 'Maya is outside with a map and a compass. She wants the map to match the real world. What should she do?',
    correct: 'Turn the map until its north arrow points the same way as north on the compass',
    wrong: [
      'Keep the writing upright even if the north arrow points south',
      'Turn the compass until the needle points at the nearest shop',
      'Fold the map so the north arrow is hidden',
    ],
    explanation: 'When north on the map matches north on the ground, the paths on the map point the same way as the real paths.',
  },
  {
    topic: 'Maps and compass',
    stem: 'Ben opens a street map. There is a small arrow labelled N in the corner. What does that arrow tell him?',
    correct: 'Which way is north on this map',
    wrong: [
      'That every road on the map runs north',
      'The name of the nearest river',
      'That the map has no scale',
    ],
    explanation: 'A north arrow shows direction. It does not mean every road runs north, and it is not a scale.',
  },
  {
    topic: 'Maps and compass',
    stem: 'Hana compares an aerial photo of her street with a map of the same street. Which statement is most accurate?',
    correct: 'The photo shows what things look like from above, and the map uses symbols that a key explains',
    wrong: [
      'The photo names every building, so a key is never needed on a map',
      'A map is a photograph, so it cannot show roads',
      'An aerial photo always has north at the bottom',
    ],
    explanation: 'A map is a drawing that uses symbols. A photo shows the view, but it may not name places or explain symbols.',
  },
  {
    topic: 'Maps and compass',
    stem: 'Sam faces north. East is on his right and west is on his left. Which direction is behind him?',
    correct: 'South',
    wrong: ['North', 'East', 'North-east'],
    explanation: 'If you face north, south is behind you. East and west are to the sides.',
  },
  {
    topic: 'Maps and compass',
    stem: 'A footpath map uses a scale of 1 cm to 1 km. The path from the gate to the bridge measures 4 cm on the map. About how far is the walk?',
    correct: '4 km',
    wrong: ['4 cm', '1 km', '40 km'],
    explanation: 'Each centimetre on this map stands for 1 kilometre on the ground, so 4 cm stands for 4 km.',
  },
  {
    topic: 'Maps and compass',
    stem: 'Zara wants to follow a footpath from her village to a nearby hill. Which map is the best choice?',
    correct: 'A local map that shows paths, roads and a scale',
    wrong: [
      'A globe, because a globe shows every footpath in her village',
      'A map of the whole world with no roads marked',
      'A picture of a compass on its own, with no map',
    ],
    explanation: 'A local map shows the paths and how far they are. A world map or a globe is too zoomed out for one village walk.',
  },
  {
    topic: 'Maps and compass',
    stem: 'On a class map, a blue line is listed in the key as a river and a red line is listed as a main road. Noah sees a blue line beside the park. What is it?',
    correct: 'A river',
    wrong: ['A main road', 'A school', 'A mountain height'],
    explanation: 'The key tells you what each symbol means. On this map a blue line is a river, not a road.',
  },
  {
    topic: 'Maps and compass',
    stem: 'Ella stands facing north. She is told the library is north-west of her. Where should she look?',
    correct: 'Between north and west',
    wrong: [
      'Between south and east',
      'Straight behind her',
      'Only at the ground, because compass words are about rainfall',
    ],
    explanation: 'North-west is the direction between north and west. It is not the opposite of north.',
  },
  {
    topic: 'Maps and compass',
    stem: 'A group is lost in woodland. They have a map, a compass and a key. Which plan is best?',
    correct: 'Use the compass to find north, line up the map, then follow a path shown in the key',
    wrong: [
      'Guess a direction and ignore the map because woods all look the same',
      'Follow the needle without checking whether it points north',
      'Choose the path whose colour they like best, even if the key says it is a river',
    ],
    explanation: 'Direction, the map and the key work together. Guessing, or treating a river symbol as a path, can take them the wrong way.',
  },
  {
    topic: 'Maps and compass',
    stem: 'Tom needs to find France in the world, and later find a street in his town. Which pair of maps matches those two jobs?',
    correct: 'An atlas or globe for France, then a street map for his town',
    wrong: [
      'A street map of his town for France, and a globe for one street',
      'Two blank sheets of paper, because maps cannot show countries',
      'Only a rain gauge, because weather maps replace every other map',
    ],
    explanation: 'An atlas or globe shows countries. A street map is the right scale for roads in one town.',
  },

  {
    topic: 'Grid references',
    stem: `The class is finding places on this grid. Read along the bottom first, then up the side. Use the bottom-left corner of the square.

![A map grid with a church and a wood](/questions/bbcbitesize/geography/grid-square.svg)

What is the four-figure grid reference of the church?`,
    correct: '3211',
    wrong: ['1132', '3312', '3111'],
    explanation: `The church sits in the square whose bottom-left corner is easting 32 and northing 11. Source: BBC Bitesize — ${mapPage}`,
  },
  {
    topic: 'Grid references',
    stem: `Use the bottom-left corner of the square. Read the easting first, then the northing.

![A map grid with a church and a wood](/questions/bbcbitesize/geography/grid-square.svg)

What is the four-figure grid reference of the wood?`,
    correct: '3312',
    wrong: ['1233', '3211', '3413'],
    explanation: `The wood is in the square to the right of line 33 and above line 12, so the reference is 3312. Source: BBC Bitesize — ${mapPage}`,
  },
  {
    topic: 'Grid references',
    stem: 'Freya remembers the saying “along the corridor and up the stairs” for grid references. What does it tell her to do?',
    correct: 'Read the easting along the bottom before the northing up the side',
    wrong: [
      'Read the side number first and the bottom number second',
      'Start at the top-right corner of the square',
      'Add the two numbers together to make a distance in kilometres',
    ],
    explanation: 'Eastings go across the map towards the east. Northings go up towards the north. The easting is given first.',
  },
  {
    topic: 'Grid references',
    stem: 'A four-figure grid reference locates a whole square. When is a six-figure reference more useful?',
    correct: 'When you need to show where something is inside that square',
    wrong: [
      'When you want a less exact answer',
      'When you are naming a continent',
      'When you are measuring how much rain fell',
    ],
    explanation: 'A six-figure reference splits the square into tenths, so it pins a place down more closely than the square alone.',
  },
  {
    topic: 'Grid references',
    stem: 'On the map, the easting numbers get larger towards the right. What does that show?',
    correct: 'The numbers increase as you go east',
    wrong: [
      'The numbers increase as you go south',
      'The right-hand side of the map is always the sea',
      'A bigger easting means the place is on higher ground',
    ],
    explanation: 'Eastings are counted towards the east. A higher easting is further east, not further up a hill.',
  },
  {
    topic: 'Grid references',
    stem: 'Jack writes the grid reference for a picnic spot as 1846, but he read the side number first. The bottom-left corner of the square is easting 46 and northing 18. What should he have written?',
    correct: '4618',
    wrong: ['1846', '6418', '18'],
    explanation: 'The easting comes first. He had the two pairs the wrong way round, so 46 then 18 is 4618.',
  },
  {
    topic: 'Grid references',
    stem: 'Two friends both use the grid reference 2291. What should they be able to do?',
    correct: 'Find the same square on the map',
    wrong: [
      'Know the name of every person who has visited that square',
      'Tell the temperature in that square without measuring',
      'Decide that the square must be a city',
    ],
    explanation: 'A grid reference locates a square. It does not name visitors or tell you the weather.',
  },
  {
    topic: 'Grid references',
    stem: 'On many Ordnance Survey maps, the grid lines are 1 km apart. A straight path runs from one line to the next line. About how long is that part of the path?',
    correct: 'About 1 km',
    wrong: ['About 1 cm', 'About 10 km', 'About 100 km'],
    explanation: 'If the lines are 1 km apart on the ground, crossing one square in a straight line is about 1 km.',
  },
  {
    topic: 'Grid references',
    stem: 'A treasure note says “45 12”. The first pair is the easting. Which number is the easting?',
    correct: '45',
    wrong: ['12', '4512 metres', '57, because the two numbers should be added'],
    explanation: 'In a four-figure reference the first two digits are the easting. Here that is 45, and 12 is the northing.',
  },
  {
    topic: 'Grid references',
    stem: 'A town plan uses the same idea as a map grid: numbers across the bottom and letters up the side. The pool is in square D4, and the key says you read across first. Which square is one square to the east?',
    correct: 'E4, if E is the next line to the east',
    wrong: [
      'D3, because east means down the page',
      'A1, because the first square is always the answer',
      'D4 again, because east does not change the square',
    ],
    explanation: 'East is across the map, not down it. The next square towards the east has the next across-value and the same up-value.',
  },
  {
    topic: 'Grid references',
    stem: 'Chloe wants to tell her dad exactly where the geocache is hidden in a large wood. A four-figure reference only gives the whole square. What should she add?',
    correct: 'A six-figure reference, so the spot is clearer inside the square',
    wrong: [
      'The name of the continent only',
      'A guess of the temperature',
      'A smaller easting, because smaller numbers are always more exact',
    ],
    explanation: 'Six figures show tenths across and up the square. That is more precise than the square on its own.',
  },
  {
    topic: 'Grid references',
    stem: 'Yusuf plots 5034 and his partner plots 5035. What is the best description of the two squares?',
    correct: 'They are next to each other, one square further north',
    wrong: [
      'They are the same square',
      '5035 is one square further south, because a bigger northing means south',
      'They must be in different countries',
    ],
    explanation: 'The easting 50 is the same. Northing 35 is one higher than 34, so that square is the next one to the north.',
  },

  {
    topic: 'The United Kingdom',
    stem: 'A class map of the United Kingdom needs one label for each country. Which set is complete?',
    correct: 'England, Scotland, Wales and Northern Ireland',
    wrong: [
      'England, Scotland, Wales and the Republic of Ireland',
      'England, London, Cardiff and Edinburgh',
      'Great Britain, France, Spain and Italy',
    ],
    explanation: 'The United Kingdom is made up of England, Scotland, Wales and Northern Ireland. The Republic of Ireland is a different country.',
  },
  {
    topic: 'The United Kingdom',
    stem: 'Amira is labelling capital cities. Which match is correct?',
    correct: 'Cardiff is the capital of Wales',
    wrong: [
      'Belfast is the capital of Wales',
      'Edinburgh is the capital of England',
      'Dublin is the capital of Northern Ireland',
    ],
    explanation: 'Cardiff is the capital of Wales, Edinburgh of Scotland, Belfast of Northern Ireland, and London of England.',
  },
  {
    topic: 'The United Kingdom',
    stem: 'Noah knows Glasgow is a large city in Scotland. His quiz asks for the capital of Scotland. What should he choose?',
    correct: 'Edinburgh',
    wrong: ['Glasgow', 'Cardiff', 'Belfast'],
    explanation: 'A capital is the city where the country is governed. Scotland’s capital is Edinburgh, even though Glasgow is also a large city.',
  },
  {
    topic: 'The United Kingdom',
    stem: 'Kai lives in Belfast. Which statement is most accurate?',
    correct: 'Belfast is the capital of Northern Ireland, which is part of the United Kingdom',
    wrong: [
      'Belfast is the capital of the Republic of Ireland',
      'Belfast is in Wales',
      'Northern Ireland is not part of the United Kingdom',
    ],
    explanation: 'Northern Ireland is one of the four parts of the UK, and Belfast is its capital. Dublin is the capital of the Republic of Ireland.',
  },
  {
    topic: 'The United Kingdom',
    stem: 'A crossword says “the large island that contains England, Scotland and Wales”. Which name fits?',
    correct: 'Great Britain',
    wrong: [
      'The United Kingdom, because that name means the island only',
      'The English Channel',
      'Northern Ireland',
    ],
    explanation: 'Great Britain is the island of England, Scotland and Wales. The United Kingdom also includes Northern Ireland.',
  },
  {
    topic: 'The United Kingdom',
    stem: 'A ferry crosses the water between southern England and France. Which stretch of water is it crossing?',
    correct: 'The English Channel',
    wrong: ['The Irish Sea', 'The Mediterranean Sea', 'A loch in Scotland'],
    explanation: 'The English Channel lies between southern England and France. The Irish Sea is between Great Britain and Ireland.',
  },
  {
    topic: 'The United Kingdom',
    stem: 'On a map of Britain, the North Sea is on the right when north is at the top. Which coast does it lie beside?',
    correct: 'The east coast',
    wrong: ['The west coast', 'The border with France only', 'The middle of Wales'],
    explanation: 'With north at the top, east is to the right. The North Sea is to the east of Great Britain.',
  },
  {
    topic: 'The United Kingdom',
    stem: 'The Irish Sea is the water between Great Britain and Ireland. Which journey crosses it?',
    correct: 'A ferry from Wales to the east coast of Ireland',
    wrong: [
      'A train from London to Paris through the Channel Tunnel only',
      'A walk from Edinburgh to Glasgow',
      'A boat trip across a lake that is completely inside England',
    ],
    explanation: 'The Irish Sea separates the island of Great Britain from the island of Ireland. A journey inside one city does not cross it.',
  },
  {
    topic: 'The United Kingdom',
    stem: 'The class is marking the highest mountain in the United Kingdom. Which mountain should they mark?',
    correct: 'Ben Nevis, in Scotland',
    wrong: [
      'Scafell Pike, in England',
      'Snowdon (Yr Wyddfa), in Wales',
      'Slieve Donard, in Northern Ireland',
    ],
    explanation: 'Those are the highest peaks in each part of the UK. Ben Nevis is the highest of them all.',
  },
  {
    topic: 'The United Kingdom',
    stem: 'Which mountain is the highest in England?',
    correct: 'Scafell Pike',
    wrong: ['Ben Nevis', 'Snowdon (Yr Wyddfa)', 'Mont Blanc'],
    explanation: 'Scafell Pike is the highest mountain in England. Ben Nevis is in Scotland, Snowdon is in Wales, and Mont Blanc is in the Alps.',
  },
  {
    topic: 'The United Kingdom',
    stem: 'A book says the River Severn is the longest river in the UK and that it begins in the Welsh hills. Which fact fits?',
    correct: 'It starts in Wales and later flows through England to the sea',
    wrong: [
      'It starts in the sea and flows uphill to Wales',
      'It is a river in France',
      'It is shorter than every other UK river',
    ],
    explanation: 'The Severn’s source is in the hills of Wales. It flows downhill through England and reaches the sea at the Bristol Channel.',
  },
  {
    topic: 'The United Kingdom',
    stem: 'Which river flows through London?',
    correct: 'The Thames',
    wrong: ['The Nile', 'The Amazon', 'The Severn, because it is the only river in England'],
    explanation: 'The Thames flows through London to the North Sea. The Severn is longer, but it does not flow through London.',
  },
  {
    topic: 'The United Kingdom',
    stem: 'The Lake District is known for lakes and high hills. Where is it?',
    correct: 'In north-west England',
    wrong: ['In the middle of London', 'In France', 'On the continent of Antarctica'],
    explanation: 'The Lake District is a national park in north-west England. It is countryside, not part of central London.',
  },
  {
    topic: 'The United Kingdom',
    stem: 'Where is the United Kingdom?',
    correct: 'In Europe, in the Northern Hemisphere',
    wrong: [
      'On the Equator, in Antarctica',
      'In South America',
      'In the Southern Hemisphere, south of Australia',
    ],
    explanation: 'The UK is a group of islands in north-west Europe. It is well north of the Equator, so it is in the Northern Hemisphere.',
  },
  {
    topic: 'The United Kingdom',
    stem: 'A map key uses “loch” in Scotland and “lake” in England. What do the two words both name?',
    correct: 'A body of water surrounded by land',
    wrong: [
      'A salty ocean',
      'A capital city',
      'A line of longitude',
    ],
    explanation: 'A lake, or a loch in Scotland, is water with land around it. An ocean is the much larger salty water between continents.',
  },
  {
    topic: 'The United Kingdom',
    stem: 'Which city is the capital of the United Kingdom?',
    correct: 'London',
    wrong: ['Edinburgh', 'Cardiff', 'Belfast'],
    explanation: 'Edinburgh, Cardiff and Belfast are capitals of Scotland, Wales and Northern Ireland. London is the capital of the UK as a whole.',
  },

  {
    topic: 'Continents and oceans',
    stem: 'An atlas challenge asks how many continents there are. Which count is right?',
    correct: 'Seven',
    wrong: ['Four', 'Five', 'Twelve'],
    explanation: 'The seven continents are Africa, Antarctica, Asia, Europe, North America, Oceania and South America.',
  },
  {
    topic: 'Continents and oceans',
    stem: 'How many oceans are there?',
    correct: 'Five',
    wrong: ['Two', 'Seven, the same number as the continents', 'One, because all seawater has the same name'],
    explanation: 'The five oceans are the Pacific, Atlantic, Indian, Southern and Arctic. They join, but they still have separate names.',
  },
  {
    topic: 'Continents and oceans',
    stem: 'Which ocean is the largest?',
    correct: 'The Pacific Ocean',
    wrong: ['The Arctic Ocean', 'The English Channel', 'The River Thames'],
    explanation: 'The Pacific is the largest ocean. The Arctic is the smallest, and a channel or a river is not an ocean.',
  },
  {
    topic: 'Continents and oceans',
    stem: 'Which ocean is the smallest and surrounds the North Pole?',
    correct: 'The Arctic Ocean',
    wrong: ['The Pacific Ocean', 'The Southern Ocean', 'The Mediterranean Sea'],
    explanation: 'The Arctic Ocean is the smallest ocean and it is around the North Pole. The Southern Ocean is around Antarctica.',
  },
  {
    topic: 'Continents and oceans',
    stem: 'A quiz card says “Africa”. Which description is most accurate?',
    correct: 'Africa is a continent made up of many countries',
    wrong: [
      'Africa is a single city',
      'Africa is an ocean',
      'Africa is one of the four countries of the UK',
    ],
    explanation: 'A continent is a large land mass. Africa contains many countries, such as Nigeria and Kenya.',
  },
  {
    topic: 'Continents and oceans',
    stem: 'France is a close neighbour of the UK, across the English Channel. Which continent are both countries in?',
    correct: 'Europe',
    wrong: ['South America', 'Oceania', 'Antarctica'],
    explanation: 'The UK and France are both in Europe. The Channel is a sea between them, not a boundary between continents.',
  },
  {
    topic: 'Continents and oceans',
    stem: 'Rio de Janeiro is a city in Brazil. Which continent is Brazil in?',
    correct: 'South America',
    wrong: ['Europe', 'Africa', 'Oceania'],
    explanation: 'Brazil is a country in South America. Rio de Janeiro is a coastal city there.',
  },
  {
    topic: 'Continents and oceans',
    stem: 'Shanghai is a huge city in China. Which continent is China in?',
    correct: 'Asia',
    wrong: ['South America', 'Antarctica', 'Europe'],
    explanation: 'China is in Asia, the largest continent. Shanghai is a city on China’s coast.',
  },
  {
    topic: 'Continents and oceans',
    stem: 'Florida is one of the states of the USA. Which continent is the USA in?',
    correct: 'North America',
    wrong: ['Europe', 'Africa', 'Oceania'],
    explanation: 'The United States is in North America. Florida is a warm state in the south-east of that country.',
  },
  {
    topic: 'Continents and oceans',
    stem: 'Australia is a country, and it also sits in a wider continent. Which continent is that?',
    correct: 'Oceania',
    wrong: ['Europe', 'South America', 'The Atlantic Ocean'],
    explanation: 'Oceania is the continent that includes Australia, New Zealand and many Pacific islands. An ocean is water, not the continent.',
  },
  {
    topic: 'Continents and oceans',
    stem: 'Which statement about Antarctica is most accurate?',
    correct: 'It is a cold continent around the South Pole, with research stations rather than large cities',
    wrong: [
      'It is a country in Europe',
      'It is the warmest continent because it is nearest the Equator',
      'It is an ocean with no land',
    ],
    explanation: 'Antarctica is land around the South Pole. People stay mainly at research stations, not in big permanent cities.',
  },
  {
    topic: 'Continents and oceans',
    stem: 'A diagram shows the Pacific, Atlantic and Indian Oceans touching one another. What is the best conclusion?',
    correct: 'The oceans are connected, so water can move between them',
    wrong: [
      'Each ocean is a separate lake with land all the way around it',
      'Ships cannot leave one ocean and enter another',
      'Connected water means there is only one continent',
    ],
    explanation: 'The oceans join, so seawater and ships can pass from one into another. The continents are still separate land masses.',
  },
  {
    topic: 'Continents and oceans',
    stem: 'Which continent is the largest by area?',
    correct: 'Asia',
    wrong: ['Europe', 'Oceania', 'Antarctica'],
    explanation: 'Asia covers more land than any other continent. Europe is smaller, and the UK is only a small part of Europe.',
  },
  {
    topic: 'Continents and oceans',
    stem: 'The Southern Ocean is described as the water around Antarctica. Which pole is that near?',
    correct: 'The South Pole',
    wrong: ['The North Pole', 'The Equator', 'Greenwich in London'],
    explanation: 'Antarctica and the Southern Ocean are in the far south, around the South Pole. The Arctic Ocean is at the North Pole.',
  },

  {
    topic: 'Comparing places',
    stem: 'Priya’s village has one shop and a bus twice a day. Her cousin’s city has a station, hospitals and many jobs. Which difference is most accurate?',
    correct: 'The city offers more services and transport than the village',
    wrong: [
      'A village is always larger than a city',
      'A city cannot have any parks or trees',
      'The village must be hotter because it has fewer buildings',
    ],
    explanation: 'Cities are larger settlements with more services and transport. That does not mean they have no green space, or that villages are hotter.',
  },
  {
    topic: 'Comparing places',
    stem: 'Two photos were taken on the same day. One shows fields and a farm. The other shows offices and a bus station. What is the clearest difference?',
    correct: 'One place is rural and the other is urban',
    wrong: [
      'The fields prove that place is a capital city',
      'The bus station is a physical feature, like a river',
      'They must be in different hemispheres',
    ],
    explanation: 'Fields and a farm are typical of the countryside, which is rural. Offices and a busy bus station are typical of a town or city, which is urban.',
  },
  {
    topic: 'Comparing places',
    stem: 'The Amazon rainforest is hot and wet through the year. The UK has four seasons and is milder. Which explanation fits best?',
    correct: 'The Amazon is near the Equator, while the UK is much further north',
    wrong: [
      'The UK is on the Equator and the Amazon is at the North Pole',
      'Rainforests are cold because the trees block every ray of the Sun',
      'Seasons only happen in rainforests',
    ],
    explanation: 'Places near the Equator get strong sunshine all year. The UK is much further north, so it has a temperate climate and four seasons.',
  },
  {
    topic: 'Comparing places',
    stem: 'A family compares home in England with a holiday in France. Which comparison is fair?',
    correct: 'Both countries are in Europe, but a sea crossing or tunnel separates them and the everyday language is different',
    wrong: [
      'France is in South America, so the climates cannot be compared',
      'They are the same place because both have shops',
      'England is not in Europe',
    ],
    explanation: 'England and France are both in Europe, with the English Channel between them. Sharing some human features, such as shops, does not make them the same place.',
  },
  {
    topic: 'Comparing places',
    stem: 'One stretch of UK coast is a high rocky cliff. Another is a wide sandy beach. What should the class record?',
    correct: 'Both are coasts, but the landforms and how people might use them are different',
    wrong: [
      'A beach is not a coast',
      'Cliffs and beaches are human features because people look at them',
      'The two places must have the same waves, so there is nothing to compare',
    ],
    explanation: 'Cliffs and beaches are both physical coastal features, but they look different and people use them in different ways.',
  },
  {
    topic: 'Comparing places',
    stem: 'In a holiday album, one photo shows a mountain and a lake. The next shows a harbour, cranes and blocks of flats. How should they be sorted?',
    correct: 'The mountain and lake are physical features; the harbour, cranes and flats are human features',
    wrong: [
      'Everything in a photo is a human feature',
      'Cranes are physical features because they are tall',
      'A lake is a human feature because it can be named',
    ],
    explanation: 'Physical features formed naturally. Harbours, cranes and flats were built by people.',
  },
  {
    topic: 'Comparing places',
    stem: 'A mountain village has a narrow road and no railway. A port city has ships, trains and a motorway. Which difference matters most for moving heavy goods?',
    correct: 'The port city has more kinds of transport',
    wrong: [
      'The mountain village must be beside the Equator',
      'Ships can only travel on dry roads',
      'A port cannot be a settlement',
    ],
    explanation: 'A port links sea routes with roads and railways, so heavy goods can arrive and leave in more ways than they can in a small mountain village.',
  },
  {
    topic: 'Comparing places',
    stem: 'Two towns are in the same country. Both have a primary school. One also has a fishing harbour and the other is surrounded by wheat fields. What is a fair comparison?',
    correct: 'They are similar in having a school, but the jobs and land use are different',
    wrong: [
      'They are identical because both have a school',
      'The wheat fields mean that town is a rainforest',
      'A fishing harbour is a kind of mountain',
    ],
    explanation: 'Places can share some services and still differ in land use and work. Fishing and wheat farming are different ways of using the coast and the land.',
  },
  {
    topic: 'Comparing places',
    stem: 'Houses in a hot, dry city often have small windows and thick walls. Houses in a mild, rainy UK town often have pitched roofs. Why is that a useful comparison?',
    correct: 'The buildings are suited to the local climate',
    wrong: [
      'Roof shape is decided only by the name of the street',
      'Climate never affects buildings',
      'A pitched roof is used to make the weather hotter',
    ],
    explanation: 'People design buildings for the climate. Thick walls can keep out heat, and a sloping roof sheds rain.',
  },
  {
    topic: 'Comparing places',
    stem: 'Which general comparison of temperature in the UK is the most careful?',
    correct: 'Scotland is often cooler than southern England because it is further north',
    wrong: [
      'Southern England is at the North Pole, so it is always colder than Scotland',
      'Every day in Scotland is hotter than every day in England',
      'Latitude does not affect temperature at all',
    ],
    explanation: 'Further north usually means less strong sunshine over the year, so Scotland is often cooler. Weather on one day can still break that pattern.',
  },
  {
    topic: 'Comparing places',
    stem: 'An island village relies on a ferry. A city inland relies on trains and roads. What is the main transport difference?',
    correct: 'The island village needs a boat link, while the inland city can use land routes',
    wrong: [
      'A ferry is a kind of mountain pass',
      'Inland cities cannot have roads',
      'Islands are never settlements',
    ],
    explanation: 'Water separates an island from the mainland, so a ferry can be the link. An inland city is reached by land transport.',
  },
  {
    topic: 'Comparing places',
    stem: 'The class must compare their town with a holiday place. Which list matches what a geographer would record?',
    correct: 'Climate, land use, buildings and transport',
    wrong: [
      'Only which place has the nicer name',
      'Only the colour of the cars in one photo',
      'The score of a football match played there last week',
    ],
    explanation: 'Geographers compare what a place is like: its climate, how the land is used, what has been built, and how people get about.',
  },
  {
    topic: 'Comparing places',
    stem: 'A seaside town fills with visitors in summer and is quiet in winter. A nearby farming village stays small all year. What does the seaside pattern show?',
    correct: 'Tourism can change how busy a place is from season to season',
    wrong: [
      'The farming village must be in Antarctica',
      'A quiet winter means the seaside town has no houses',
      'Visitors are a physical feature, like a cliff',
    ],
    explanation: 'Tourism is a human activity. It can make a town much busier in the holiday season without changing the fact that people live there all year.',
  },
  {
    topic: 'Comparing places',
    stem: 'Two places have the same amount of rain in a year, but one gets it in a short wet season and the other gets a little rain in every month. Why does that difference matter?',
    correct: 'The pattern of rain changes when plants grow and when rivers may flood',
    wrong: [
      'The yearly total is the only fact that can ever matter',
      'A wet season means the place is a city',
      'Rain in every month means the place has no climate',
    ],
    explanation: 'The same total rain can fall in very different patterns. A short wet season and steady rain through the year affect farming and rivers in different ways.',
  },

  {
    topic: 'Weather and climate',
    stem: 'On Monday the playground is sunny. The school’s records say this month is usually rainy. Which wording is best?',
    correct: 'Monday’s sunshine is the weather; the usual rain is the climate',
    wrong: [
      'One sunny day means the climate has become a desert',
      'Climate means the weather at lunchtime only',
      'Weather can only be measured once every 30 years',
    ],
    explanation: 'Weather is what is happening now or on a particular day. Climate is the usual pattern over many years.',
  },
  {
    topic: 'Weather and climate',
    stem: 'A heatwave lasts three days in a place that is normally cool and wet. Which conclusion fits?',
    correct: 'The weather is hot this week, but three days do not change the climate',
    wrong: [
      'The climate has become tropical forever',
      'Heatwaves prove that rain gauges are useless',
      'A cool, wet climate can never have a hot day',
    ],
    explanation: 'Climate is a long-term pattern. A few hot days are weather, even if they feel unusual.',
  },
  {
    topic: 'Weather and climate',
    stem: 'Which sequence is the usual order of seasons in the UK?',
    correct: 'Spring, summer, autumn, winter',
    wrong: [
      'Winter, summer, winter, summer, with no spring or autumn',
      'One hot season that lasts all year',
      'Rain, wind, map, compass',
    ],
    explanation: 'The UK has four seasons. Spring warms up after winter, summer is warmest, autumn cools, and winter is coldest.',
  },
  {
    topic: 'Weather and climate',
    stem: 'The UK is said to have a temperate climate. What does that mean?',
    correct: 'It is often mild and wet, with warm summers and cooler winters',
    wrong: [
      'It is hot and dry every day of the year',
      'It is frozen solid all year, like the South Pole',
      'It has no seasons',
    ],
    explanation: 'Temperate places are neither tropical nor polar. The UK usually has mild, quite wet weather and four seasons.',
  },
  {
    topic: 'Weather and climate',
    stem: 'Two weather stations are close together. One is on a high mountain and one is in the valley. Which result is the most likely?',
    correct: 'The mountain station is usually colder',
    wrong: [
      'The mountain is usually hotter because it is closer to the Sun',
      'Height never affects temperature',
      'The valley must be a desert because it is lower',
    ],
    explanation: 'Air gets colder as you go higher, so mountain tops are usually colder than nearby valleys.',
  },
  {
    topic: 'Weather and climate',
    stem: 'The class wants to know how much rain falls on the field this week. Which plan is best?',
    correct: 'Put a rain gauge in the open and read it at the same time each day',
    wrong: [
      'Stand under a tree and guess from how wet your sleeve feels',
      'Use a thermometer and call that number rainfall',
      'Measure once, in a different place each day',
    ],
    explanation: 'A rain gauge measures rainfall. Keeping it in the open, and reading it in the same way each day, makes the results fair.',
  },
  {
    topic: 'Weather and climate',
    stem: 'Western hills in the UK are often wetter than low land further east. Which explanation fits best?',
    correct: 'Moist air from the Atlantic rises over the hills, cools, and drops rain',
    wrong: [
      'The east is always a rainforest and the west is always a desert',
      'Hills push rain back into the sea so hills stay dry',
      'Rain only falls on capital cities',
    ],
    explanation: 'Air from the Atlantic Ocean is moist. When it is forced up over western hills it cools, and the water falls as rain.',
  },
  {
    topic: 'Weather and climate',
    stem: 'A town sits in a steep valley where three streams meet. After very heavy rain, the streams burst their banks. Why is this place at risk?',
    correct: 'A lot of water runs quickly downhill into a narrow valley',
    wrong: [
      'Steep valleys never flood because water cannot flow downhill',
      'Flooding is caused by compass directions, not by rainfall',
      'Streams only flood when a town has no houses',
    ],
    explanation: 'Rain runs off steep slopes into the streams. Where several streams meet in a narrow valley, the water can rise over the banks.',
  },
  {
    topic: 'Weather and climate',
    stem: 'A world map colours polar, temperate, desert and tropical regions. Which description of a tropical rainforest region is best?',
    correct: 'Hot and wet for most of the year',
    wrong: [
      'Cold and dry, with a very short summer',
      'The same as the UK’s four seasons',
      'Always frozen because it is near the Equator',
    ],
    explanation: 'Tropical rainforest regions near the Equator are hot and have heavy rain through the year. Polar regions are the cold ones.',
  },
  {
    topic: 'Weather and climate',
    stem: 'Why are places near the Equator usually hotter than places near the poles?',
    correct: 'The Sun’s energy is more concentrated there through the year',
    wrong: [
      'The Equator is a volcano',
      'The poles are closer to the Sun than the Equator',
      'Heat only comes from the sea, and the Equator has no sea',
    ],
    explanation: 'Around the Equator the Sun is high in the sky for much of the year, so the ground receives stronger heating than it does near the poles.',
  },
  {
    topic: 'Weather and climate',
    stem: 'A diary says: Monday rain, Tuesday sun, Wednesday wind. What has been recorded?',
    correct: 'The weather on three days',
    wrong: [
      'The climate of the last 100 years',
      'The height of a mountain',
      'A four-figure grid reference',
    ],
    explanation: 'A few days of notes describe weather. Climate needs a long run of records, not one short diary.',
  },
  {
    topic: 'Weather and climate',
    stem: 'Scientists say a place has a desert climate. What evidence would support that?',
    correct: 'Very little rain, year after year',
    wrong: [
      'One dry afternoon',
      'A single snowman in winter',
      'The fact that the place has a main road',
    ],
    explanation: 'A desert climate means the place is very dry over a long time. One dry afternoon is not enough evidence.',
  },
  {
    topic: 'Weather and climate',
    stem: 'Which tool matches the measurement?',
    correct: 'A thermometer for temperature, a rain gauge for rainfall, and a wind vane for wind direction',
    wrong: [
      'A rain gauge for wind direction and a compass for rainfall',
      'A ruler for temperature',
      'A thermometer for the name of a continent',
    ],
    explanation: 'Each instrument measures one thing. Temperature, rainfall and wind direction need different tools.',
  },
  {
    topic: 'Weather and climate',
    stem: 'It is sunny all afternoon, so a pupil says the school field now has a desert climate. What is the mistake?',
    correct: 'A few hours of weather are being treated as the climate',
    wrong: [
      'Deserts can be sunny, so every sunny place is a desert that same day',
      'Climate can be decided without any record of rain',
      'Sunshine is not a kind of weather',
    ],
    explanation: 'Desert climates are very dry over many years. One sunny afternoon does not show that.',
  },
  {
    topic: 'Weather and climate',
    stem: 'A river floods after a storm. Which statement keeps weather and climate apart?',
    correct: 'The storm is weather; if heavy rain and floods happen often, that pattern is part of the climate',
    wrong: [
      'One flood changes the climate the same day',
      'Floods are not linked to rain',
      'Climate is the name of a single cloud',
    ],
    explanation: 'A storm is a weather event. Climate is the longer pattern, such as a place that often has heavy rain.',
  },
  {
    topic: 'Weather and climate',
    stem: 'The class records the playground weather every day in June, then compares it with a chart of average June conditions for the last 30 years. What can they fairly say?',
    correct: 'How this June’s weather compares with the usual June climate',
    wrong: [
      'That one month of records is itself a 30-year climate',
      'That the average chart shows tomorrow’s exact weather',
      'That June has no weather because it is a month',
    ],
    explanation: 'Their diary is this year’s weather. The 30-year chart shows the climate they can compare it with.',
  },
];
