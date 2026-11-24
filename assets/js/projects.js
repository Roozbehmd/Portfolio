/*
 * Project list for the portfolio.
 * Order here is the order on the page. To add a project, copy one entry and edit it.
 *
 *   img      file name (no extension) in assets/img/gallery/web/ (800px and 1600px copies)
 *   full     optional different image for the detail view (fullAlt describes it)
 *   filters  any of: xr, installations, games, web
 *   layout   optional: "feature" (big tile) or "wide" (double-width tile)
 *   pos      optional image crop focus for the tile, e.g. "center 85%"
 *   status   optional small badge, e.g. "In development"
 *   note     optional platform note shown next to the main button
 */
window.PROJECTS = [
  {
    slug: 'seven-ascensions',
    title: 'The Book of Kings: Seven Ascensions',
    client: 'Hexon Engineering Inc. · 2026',
    desc: 'A spatial computing game for Meta Quest that brings the epic stories of ancient Iran’s Book of Kings into the player’s own room, across seven interconnected levels. As lead developer and creative director I build the mixed-reality interactions, spatial navigation and narrative dialogue systems, working with theatrical and linguistic consultants. Level one, The Shadow Serpent, turns the room into a moonlit marsh hunted with a mirror and a torch.',
    tags: ['Spatial computing', 'Mixed reality', 'Meta Quest'],
    filters: ['xr', 'games'],
    img: 'seven-ascensions-logo',
    alt: 'The Book of Kings: Seven Ascensions logo: seven mosaic arches above gilded lettering',
    status: 'In development',
    layout: 'feature'
  },
  {
    slug: 'destination-ducks',
    title: 'Destination Ducks',
    client: 'Hexon Engineering Inc.',
    desc: 'An iOS app and website that give each cruise-ship rubber duck a passport and a story. Finders scan a duck, log a sighting and follow its journey from port to port, while their ducks play on a 3D pool deck.',
    tags: ['Real-world game', 'iOS app', '3D', 'Web'],
    filters: ['games', 'web'],
    img: 'destination-ducks-hero',
    alt: 'The Destination Ducks emblem above rubber ducks swimming in a pool on a sunny cruise-ship deck',
    url: 'https://destinationducks.com',
    cta: 'Visit website'
  },
  {
    slug: 'detour-ducks',
    title: 'Detour Ducks',
    client: 'Hexon Engineering Inc.',
    desc: 'The off-road sister of Destination Ducks: ducks left in trail rigs instead of on cruise ships. Your ducks ride along on a diorama dashboard, with feeding, play and GPS-tracked sightings.',
    tags: ['Real-world game', 'iOS app', '3D'],
    filters: ['games'],
    img: 'detour-ducks-hero',
    alt: 'The Detour Ducks badge above a rubber-duck campsite built across the dashboard of an off-road truck',
    status: 'In development'
  },
  {
    slug: 'hayat',
    title: 'Hayat: Echoes Through Time',
    client: 'Interactive narrative · Unity WebGL',
    desc: 'A browser-based narrative experience set in a traditional Persian courtyard. Three structures rise and fall across three turning points in Iranian history, told through a father and daughter who return in every era.',
    tags: ['Web', '3D', 'Narrative'],
    filters: ['web', 'games'],
    img: 'hayat',
    alt: 'An avatar stands in a Persian courtyard facing a central reflecting pool and three buildings',
    url: 'https://roozbehmd.github.io/Hayat/',
    cta: 'Play the demo',
    note: 'Desktop browser',
    status: 'Demo',
    layout: 'wide'
  },
  {
    slug: 'elsewhere-electric',
    title: 'Elsewhere Electric',
    client: 'Stitch Media · 2023–2025',
    desc: 'An asymmetrical VR and flatscreen co-op game set in a narrative-driven world, released on the Meta Quest Store in summer 2025. As the VR developer on a team of artists, designers and developers, I designed and built its VR mechanics and interactive elements.',
    tags: ['VR', 'Game', 'Meta Quest'],
    filters: ['xr', 'games'],
    img: 'gallery-11',
    alt: 'First-person VR hands over a retro control room console',
    url: 'https://www.gamesbystitch.com/games/elsewhere-electric',
    cta: 'Visit project page'
  },
  {
    slug: 'doja-grow-room',
    title: 'DOJA Grow Room',
    client: 'Doja',
    desc: 'An interactive display developed for Doja.',
    tags: ['Interactive display'],
    filters: ['installations'],
    img: 'gallery-13',
    alt: 'A person stands in front of a screen showing a lush grow room',
    url: 'https://youtu.be/YRb0Nn1kpPE',
    cta: 'Watch video'
  },
  {
    slug: 'winteraction',
    title: 'WINTERACTION',
    client: 'Winter Stations 2024 · University of Guelph',
    desc: 'An interactive augmented reality installation for the 2024 Winter Stations exhibition at Woodbine Beach, designed and developed with the University of Guelph’s architecture department.',
    tags: ['AR', 'Installation'],
    filters: ['xr', 'installations'],
    img: 'gallery-12',
    alt: 'A visitor holds up a tablet to an AR installation on a winter beach',
    url: 'https://winteraction.org',
    cta: 'Download the app',
    note: 'iOS & Android',
    layout: 'feature'
  },
  {
    slug: 'jailhouse',
    title: 'Jailhouse',
    client: 'Personal project',
    desc: 'A web-based multiplayer mayhem game. The latest version is available to play.',
    tags: ['Web game', 'Multiplayer'],
    filters: ['games'],
    img: 'gallery-09',
    alt: 'Low-poly characters partying with a piano and drums on a prison rooftop',
    url: 'https://roozbehmd.github.io/Jailhouse/',
    cta: 'Play in browser',
    note: 'Desktop only · Chrome or Firefox',
    status: 'In development'
  },
  {
    slug: 'luminous-trails',
    title: 'Luminous Trails',
    client: 'Nuit Blanche Toronto 2023',
    desc: 'An augmented reality experience for Nuit Blanche 2023 that gave the public a canvas to draw and explore virtual trails across an alternate version of downtown Toronto. Visitors became the art: more than 1,500 trails were submitted, and many more people watched the landscape grow.',
    tags: ['AR', 'Geolocation', 'Public art'],
    filters: ['xr'],
    img: 'gallery-1',
    alt: 'A glowing AR figure and light trails in front of the Toronto sign at night',
    url: 'https://apps.apple.com/ca/app/luminous-trails/id1644229038',
    cta: 'Install on iOS',
    note: 'iOS',
    layout: 'wide'
  },
  {
    slug: 'cherry-blossoms-to',
    title: 'Trinity Bellwoods Cherry Blossoms',
    client: 'BottleCap Media · 2021',
    desc: 'An interactive display in Toronto’s Trinity Bellwoods where a Microsoft Kinect captures visitors’ movements and turns them into wind that sweeps through virtual cherry blossoms. Made with BottleCap Media.',
    tags: ['Installation', 'Kinect', 'Motion sensing'],
    filters: ['installations'],
    img: 'gallery-2',
    alt: 'A visitor raises her arms in front of a wall of drifting digital cherry blossoms',
    url: 'https://youtu.be/w295bVW-Ejs',
    cta: 'Watch video'
  },
  {
    slug: 'we-ar',
    title: 'WE[AR]',
    client: 'Winter Stations 2023 · University of Guelph',
    desc: 'I designed and developed the augmented reality experience for WE[AR], an installation at the Winter Stations exhibition on Woodbine Beach, made with the University of Guelph’s architecture department. The AR layer invited visitors to interact personally with the piece and its surroundings; the project ran for two consecutive editions, 2023 and 2024.',
    tags: ['AR', 'Installation'],
    filters: ['xr', 'installations'],
    img: 'gallery-05c',
    full: 'gallery-05',
    alt: 'A visitor views an AR scene on a tablet at the beach',
    url: 'https://vzn7p.zappar.io/1456904615276066861/21/',
    cta: 'Open the AR experience',
    note: 'iOS & Android'
  },
  {
    slug: 'exile',
    title: 'EXILE',
    client: 'Prototype',
    desc: 'A prototype first-person game.',
    tags: ['Game', 'First person'],
    filters: ['games'],
    img: 'gallery-0',
    alt: 'A red-lit forest beneath a burning mountain peak',
    url: 'https://roozbehmd.github.io/EXILE/',
    cta: 'Download',
    note: 'Windows & Mac',
    layout: 'feature'
  },
  {
    slug: 'virtual-gallery',
    title: 'Virtual Gallery',
    client: 'ARTCRYPTION',
    desc: 'A virtual gallery developed for the NFT store ARTCRYPTION.',
    tags: ['3D', 'Web'],
    filters: ['web'],
    img: 'gallery-14',
    alt: 'A robot figure walking through a white virtual gallery',
    url: 'https://roozbehmd.github.io/Gallery/',
    cta: 'Explore in browser'
  },
  {
    slug: 'tweed-grow-to-win-2',
    title: 'Tweed Grow to Win 2',
    client: 'Tweed · BottleCap Media',
    desc: 'The second Grow to Win promotional game for Tweed, made with BottleCap Media in Unity WebGL. Skill-based challenges and light storytelling connect players with Tweed’s products, tuned to run smoothly in mobile browsers.',
    tags: ['Web game', 'Unity WebGL', 'Mobile'],
    filters: ['games'],
    img: 'gallery-08',
    alt: 'Pixel-art game scene with a Tweed wedding cake sign',
    url: 'https://roozbehmd.github.io/Tweed2/',
    cta: 'Play in browser'
  },
  {
    slug: 'sky',
    title: 'SKY',
    client: 'Live digital art',
    desc: 'Interactive live digital art.',
    tags: ['Generative', 'Interactive'],
    filters: ['web'],
    img: 'gallery-06',
    alt: 'Constellations drawn across a deep purple night sky',
    url: 'https://roozbehmd.github.io/SKY/',
    cta: 'View in browser'
  },
  {
    slug: 'jenga-blocks',
    title: 'Jenga Blocks',
    client: 'Web game',
    desc: 'A web-based Jenga game.',
    tags: ['Web game', '3D'],
    filters: ['games'],
    img: 'gallery-10',
    alt: 'A wooden block tower standing on a table at night',
    url: 'https://roozbehmd.github.io/JengaBlocks/',
    cta: 'Play in browser'
  },
  {
    slug: 'fungi',
    title: 'FUNGI',
    client: 'Live digital art',
    desc: 'Generative live digital art.',
    tags: ['Generative'],
    filters: ['web'],
    img: 'gallery-07',
    alt: 'A field of glowing diamond outlines',
    url: 'https://roozbehmd.github.io/FUNGI/',
    cta: 'View in browser'
  },
  {
    slug: 'planetarium',
    title: 'PLANETARIUM',
    client: "Master's thesis",
    desc: "A lifestyle game with the goal of habit change, designed and developed for my Master's degree thesis.",
    tags: ['Game', 'Habit change'],
    filters: ['games'],
    img: 'gallery-3',
    alt: 'The Planetarium title beside a planet, moon and sun',
    url: 'https://www.youtube.com/watch?v=mcaDTC8QlLU',
    cta: 'Watch video',
    pos: 'center 85%',
    layout: 'wide'
  },
  {
    slug: 'time',
    title: 'TIME',
    client: 'Live clock',
    desc: 'A live clock based on the designs of Tudor watches, available to view in any browser.',
    tags: ['Web', 'Clock'],
    filters: ['web'],
    img: 'gallery-02',
    alt: 'A black watch face with glowing green markers and cyan hands',
    url: 'https://roozbehmd.github.io/TIME/',
    cta: 'View in browser'
  },
  {
    slug: 'tweed-grow-to-win',
    title: 'Tweed Grow to Win',
    client: 'Tweed · BottleCap Media',
    desc: 'A promotional Unity WebGL game for Tweed, made with BottleCap Media, that blends gameplay and narrative so players connect with Tweed’s products through skill-based challenges. Runs in desktop and mobile browsers.',
    tags: ['Web game', 'Unity WebGL', 'Mobile'],
    filters: ['games'],
    img: 'gallery-4',
    alt: 'Top-down pixel-art game scene in a greenhouse lab',
    url: 'https://roozbehmd.github.io/Tweed/',
    cta: 'Play in browser'
  },
  {
    slug: 'oneshot',
    title: 'OneShot',
    client: 'Sapporo · BottleCap Media',
    desc: 'A web-based AR high-score runner game developed for Sapporo in collaboration with BottleCap Media.',
    tags: ['Web AR', 'Game'],
    filters: ['xr', 'games'],
    img: 'gallery-5',
    alt: 'Pixel-art runner sprinting down a blue carpet between cheering crowds',
    url: 'https://youtube.com/shorts/fwRhLD-S5eM?feature=share',
    cta: 'Watch video'
  },
  {
    slug: 'forbidden-sigil',
    title: 'Forbidden Sigil',
    client: 'Red Right Hand Publishing Inc.',
    desc: 'A companion app for the Forbidden Sigil board game, designed and developed for Red Right Hand Publishing. Its interactive story evolves with players’ decisions and progress, and a roster of playable characters with distinct abilities lets each group play its own way, merging the digital and physical game.',
    tags: ['App', 'Board game', 'iOS & Android'],
    filters: ['games'],
    img: 'gallery-6',
    alt: 'The Forbidden Sigil logo in carved metal with a red sigil',
    url: 'https://vimeo.com/560594164',
    cta: 'Watch video'
  },
  {
    slug: 'wonders-of-the-drifting-world',
    title: 'Wonders of the Drifting World VR',
    client: 'Convivial Studio · Aquarium of the Pacific',
    desc: 'The VR adaptation of an exhibition by Düsseldorf’s Convivial Studio with the Aquarium of the Pacific and marine biologist Christian Sardet. I engineered the Oculus Quest version, turning Sardet’s high-resolution macro footage into a fully spatialized, interactive underwater world.',
    tags: ['VR', 'Oculus Quest', 'Exhibition'],
    filters: ['xr'],
    img: 'gallery-7',
    alt: 'Strange floating creatures and glowing orbs in a dark void',
    url: 'https://www.convivial.studio/drifters/',
    cta: 'Visit project page'
  },
  {
    slug: 'jack-beanboozled',
    title: 'Jack and the Beanstalk',
    client: 'Independent project · 2020',
    desc: 'An augmented reality storybook that retells Jack and the Beanstalk with playful animations and characters readers can tap, drag and place in their own space to move the story forward. My first Unity project, made during my master’s studies.',
    tags: ['AR', 'Storybook', 'Mobile'],
    filters: ['xr'],
    img: 'gallery-8',
    alt: 'A low-poly beanstalk storybook scene with clouds and a cottage',
    url: 'https://www.youtube.com/watch?v=I6vsOM9dKG0',
    cta: 'Watch video'
  }
];
