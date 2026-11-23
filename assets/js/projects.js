/*
 * Project list for the portfolio.
 * Order here is the order on the page. To add a project, copy one entry and edit it.
 *
 *   img      file name (no extension) in assets/img/gallery/web/ (800px and 1600px copies)
 *   full     optional different image for the detail view
 *   filters  any of: xr, installations, games, web
 *   layout   optional: "feature" (big tile) or "wide" (double-width tile)
 *   pos      optional image crop focus for the tile, e.g. "center 85%"
 *   status   optional small badge, e.g. "In development"
 *   note     optional platform note shown next to the main button
 */
window.PROJECTS = [
  {
    slug: 'elsewhere-electric',
    title: 'Elsewhere Electric',
    client: 'Stitch Media',
    desc: 'An upcoming asymmetric co-op VR game.',
    tags: ['VR', 'Game'],
    filters: ['xr', 'games'],
    img: 'gallery-11',
    alt: 'First-person VR hands over a retro control room console',
    url: 'https://www.gamesbystitch.com/games/elsewhere-electric',
    cta: 'Visit project page',
    status: 'Upcoming'
  },
  {
    slug: 'winteraction',
    title: 'WINTERACTION',
    client: 'Winterstations 2024 · University of Guelph',
    desc: 'An interactive AR installation developed for Winterstations 2024 in collaboration with the University of Guelph.',
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
    slug: 'cherry-blossoms-to',
    title: 'Cherry Blossoms TO',
    client: 'BottleCap Studio',
    desc: 'An interactive display that lets visitors control wind effects with movement-detection sensors, developed in collaboration with BottleCap Studio.',
    tags: ['Interactive display', 'Motion sensing'],
    filters: ['installations'],
    img: 'gallery-2',
    alt: 'A visitor raises her arms in front of a wall of drifting digital cherry blossoms',
    url: 'https://youtu.be/w295bVW-Ejs',
    cta: 'Watch video'
  },
  {
    slug: 'we-ar',
    title: 'WE[AR]',
    client: 'Winterstations 2023 · University of Guelph',
    desc: 'An interactive AR installation developed for Winterstations 2023 in collaboration with the University of Guelph, School of Environmental Design & Rural Development.',
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
    slug: 'luminous-trails',
    title: 'Luminous Trails',
    client: 'Nuit Blanche Toronto',
    desc: 'A geolocation-based AR social experience designed and developed for Nuit Blanche Toronto.',
    tags: ['AR', 'Geolocation'],
    filters: ['xr'],
    img: 'gallery-1',
    alt: 'A glowing AR figure and light trails in front of the Toronto sign at night',
    url: 'https://apps.apple.com/ca/app/luminous-trails/id1644229038',
    cta: 'Install on iOS',
    note: 'iOS'
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
    client: 'Tweed · BottleCap Studio',
    desc: 'Worked on the second iteration of Tweed Grow to Win, a promotional Among Us-style web game for mobile developed for Tweed in collaboration with BottleCap Studio.',
    tags: ['Web game', 'Mobile'],
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
    client: 'Tweed · BottleCap Studio',
    desc: 'A promotional Among Us-style web game for mobile and PC developed for Tweed in collaboration with BottleCap Studio.',
    tags: ['Web game', 'Mobile'],
    filters: ['games'],
    img: 'gallery-4',
    alt: 'Top-down pixel-art game scene in a greenhouse lab',
    url: 'https://roozbehmd.github.io/Tweed/',
    cta: 'Play in browser'
  },
  {
    slug: 'oneshot',
    title: 'OneShot',
    client: 'Sapporo · BottleCap Studio',
    desc: 'A web-based AR high-score runner game developed for Sapporo in collaboration with BottleCap Studio.',
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
    desc: 'A board game companion app designed and developed for Red Right Hand Publishing Inc.',
    tags: ['App', 'Board game'],
    filters: ['games'],
    img: 'gallery-6',
    alt: 'The Forbidden Sigil logo in carved metal with a red sigil',
    url: 'https://vimeo.com/560594164',
    cta: 'Watch video'
  },
  {
    slug: 'wonders-of-the-drifting-world',
    title: 'Wonders of the Drifting World VR',
    client: 'Convivial Studio',
    desc: 'Worked on the VR version of this project with Convivial Studio.',
    tags: ['VR'],
    filters: ['xr'],
    img: 'gallery-7',
    alt: 'Strange floating creatures and glowing orbs in a dark void',
    url: 'https://www.convivial.studio/drifters/',
    cta: 'Visit project page'
  },
  {
    slug: 'jack-beanboozled',
    title: 'Jack BeanBoozled',
    client: "Master's studies · 2020",
    desc: "My first Unity project: an AR storybook prototype developed during my master's studies in 2020.",
    tags: ['AR', 'Unity', 'Prototype'],
    filters: ['xr'],
    img: 'gallery-8',
    alt: 'A low-poly beanstalk storybook scene with clouds and a cottage',
    url: 'https://www.youtube.com/watch?v=I6vsOM9dKG0',
    cta: 'Watch video'
  }
];
