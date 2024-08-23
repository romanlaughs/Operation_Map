export interface all {
  url: string;
  title: string;
  desc: string;
  rating: number;
  votes: number;
  type: string;
  showRating: boolean;
  contentSide: string;
}
export interface video {
  heading: string;
  data: videos[];
}
export interface videos {
  youtubeUrl: string;
  des?: string;
  rating: number;
  votes: number;
  type: string;
}

export const allData: all[] = [
  {
    url: 'https://themeforest.net/user/pixelstrap/portfolio/',
    title: 'PixelStrap - Portfolio | ThemeForest',
    desc: "2020's Best Selling Creative WP Themes. The #1 Source of Premium WP Themes! ThemeForest 45,000+ WP Themes & Website Templates From $2. Check it Out!",
    rating: 3,
    votes: 590,
    type: 'Theme',
    showRating: false,
    contentSide: 'left',
  },
  {
    url: 'PixelStrap - Portfolio | ThemeForestthemeforest.net › user ›',
    title: 'PixelStrap - Portfolio | ThemeForest',
    desc: 'the #1 marketplace for premium website templates, including themes for wordpress, magento, drupal, joomla, and more. create a website, fast.',
    rating: 3,
    votes: 590,
    type: 'Theme',
    showRating: false,
    contentSide: 'left',
  },
  {
    url: 'https://themeforest.net/user/pixelstrap/portfolio',
    title: 'Morbi feugiat mauris vel semper fringilla.',
    desc: 'operation_map.client introduces a IELTS Coaching, TOEFL Coaching, GRE Coaching, GMAT Coaching, SAT Coaching in Surat.',
    rating: 3,
    votes: 590,
    type: 'Theme',
    showRating: true,
    contentSide: 'left',
  },
  {
    url: 'https://themeforest.net/user/pixelstrap/portfolio',
    title: 'Morbi feugiat mauris vel semper fringilla.',
    desc: 'operation_map.client introduces a IELTS Coaching, TOEFL Coaching, GRE Coaching, GMAT Coaching, SAT Coaching in Surat.',
    rating: 3,
    votes: 590,
    type: 'Theme',
    showRating: true,
    contentSide: 'left',
  },
  {
    url: 'https://themeforest.net/user/pixelstrap/portfolio',
    title: 'Pixelstrap Website Templates from ThemeForest',
    desc: 'get 59 pixelstrap website templates on themeforest. buy pixelstrap website templates from $7. all created by our global community of independent web ...',
    rating: 3,
    votes: 590,
    type: 'Theme',
    showRating: true,
    contentSide: 'right',
  },
  {
    url: 'https://themeforest.net/user/pixelstrap/portfolio',
    title: 'Morbi feugiat mauris vel semper fringilla.',
    desc: 'operation_map.client introduces a IELTS Coaching, TOEFL Coaching, GRE Coaching, GMAT Coaching, SAT Coaching in Surat.',
    rating: 3,
    votes: 590,
    type: 'Theme',
    showRating: true,
    contentSide: 'right',
  },
];

export const videosData: video[] = [
  {
    heading: 'About 6,000 results (0.60 seconds)',
    data: [
      {
        des: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        youtubeUrl: 'https://www.youtube.com/embed/CJnfAXlBRTE',
        rating: 3,
        votes: 590,
        type: 'Theme',
      },
      {
        des: 'Lorem Ipsum is simply dummy text of the printing.',
        youtubeUrl: 'https://www.youtube.com/embed/wpmHZspl4EM',
        rating: 3,
        votes: 590,
        type: 'Theme',
      },
      {
        des: 'Morbi eget quam et purus commodo dapibus.',
        youtubeUrl: 'https://www.youtube.com/embed/-L4gEk7cOfk',
        rating: 3,
        votes: 590,
        type: 'Theme',
      },
    ],
  },
  {
    heading: 'About 6,000 results (0.60 seconds)',
    data: [
      {
        des: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        youtubeUrl: 'https://www.youtube.com/embed/CJnfAXlBRTE',
        rating: 3,
        votes: 590,
        type: 'Theme',
      },
      {
        des: 'Morbi eget quam et purus commodo dapibus.',
        youtubeUrl: 'https://www.youtube.com/embed/-L4gEk7cOfk',
        rating: 3,
        votes: 590,
        type: 'Theme',
      },
      {
        des: 'Lorem Ipsum is simply dummy text of the printing.',
        youtubeUrl: 'https://www.youtube.com/embed/wpmHZspl4EM',
        rating: 3,
        votes: 590,
        type: 'Theme',
      },
    ],
  },
];
