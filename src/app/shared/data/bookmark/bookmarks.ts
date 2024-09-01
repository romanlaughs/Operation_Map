export interface bookmarkDetails{
    id: number;
    title: string;
    value: string;
    type: string;
    data: bookmarks[]
  };
  
  export interface bookmarks{
    id: number;
    image: string;
    title: string;
    url: string;
    desc: string;
    collection: string;
    favorite?: boolean;
  }

  export const bookmark: bookmarkDetails[] = [
    {
      id: 1,
      title: 'Created By Me',
      value: 'created_by_me',
      type: 'views',
      data: [
        {
          id: 1,
          image: 'assets/images/lightgallry/01.jpg',
          title: 'Admin Template',
          url: 'http://admin.pixelstrap.com//ltr/landing-page.html',
          desc: 'is beautifully crafted, clean and modern designed admin theme with 6 different demos and light - dark versions.',
          collection: 'General'
        },
        {
          id: 2,
          image: 'assets/images/lightgallry/02.jpg',
          title: 'Universal Template',
          url: 'https://angular.pixelstrap.com/universal/landing',
          desc: 'Universal is beautifully crafted, clean and modern designed admin theme',
          collection: 'General'
        },
        {
          id: 3,
          image: 'assets/images/lightgallry/03.jpg',
          title: 'Angular Theme',
          url: 'https://angular.pixelstrap.com/boho/landing',
          desc: 'cuba is beautifully crafted, clean and modern designed admin theme',
          collection: 'Fs'
        },
        {
          id: 4,
          image: 'assets/images/lightgallry/04.jpg',
          title: 'Multikart Admin',
          url: 'http://themes.pixelstrap.com/multikart/back-end/index.html',
          desc: 'Multikart Admin is modern designed admin theme',
          collection: 'General'
        },
        {
          id: 5,
          image: 'assets/images/lightgallry/05.jpg',
          title: 'Ecommerece theme',
          url: 'http://themes.pixelstrap.com/multikart',
          desc: 'Multikart HTML template is an apparently simple but highly functional tempalate designed for creating a flourisahing online business.',
          collection: 'General'
        },
        {
          id: 6,
          image: 'assets/images/lightgallry/06.jpg',
          title: 'Tovo app landing page',
          url: 'http://vue.pixelstrap.com/tovo/home-one',
          desc: 'Amazing Landing Page With Easy Customization',
          collection: 'Fs'
        }
      ]
    },
    {
      id: 2,
      title: 'Favourites',
      value: 'favorites',
      type: 'views',
      data: []
    },
    {
      id: 3,
      title: 'Shared With Me',
      value: 'shared_with_me',
      type: 'views',
      data: []
    },
    {
      id: 4,
      title: 'My Bookmark',
      value: 'my_bookmark',
      type: 'views',
      data: [
        {
          id: 1,
          image: 'assets/images/lightgallry/07.jpg',
          title: 'Universal Template',
          url: 'https://angular.pixelstrap.com/universal/landing',
          desc: 'Universal is beautifully crafted, clean and modern designed admin theme',
          collection: 'General'
        },
        {
          id: 2,
          image: 'assets/images/lightgallry/07.jpg',
          title: 'Multikart Admin',
          url: 'http://themes.pixelstrap.com/multikart/back-end/index.html',
          desc: 'Multikart Admin is modern designed admin theme',
          collection: 'General'
        },
        {
          id: 3,
          image: 'assets/images/lightgallry/07.jpg',
          title: 'Admin Template',
          url: 'http://admin.pixelstrap.com//ltr/landing-page.html',
          desc: 'is beautifully crafted, clean and modern designed admin theme with 6 different demos and light - dark versions.',
          collection: 'General'
        },
        {
          id: 4,
          image: 'assets/images/lightgallry/07.jpg',
          title: 'Tovo app landing page',
          url: 'http://vue.pixelstrap.com/tovo/home-one',
          desc: 'Amazing Landing Page With Easy Customization',
          collection: 'Fs'
        },
        {
          id: 5,
          image: 'assets/images/lightgallry/07.jpg',
          title: 'Angular Theme',
          url: 'https://angular.pixelstrap.com/boho/landing',
          desc: 'cuba is beautifully crafted, clean and modern designed admin theme',
          collection: 'Fs'
        },
        {
          id: 6,
          image: 'assets/images/lightgallry/07.jpg',
          title: 'Ecommerece theme',
          url: 'http://themes.pixelstrap.com/multikart',
          desc: 'Multikart HTML template is an apparently simple but highly functional tempalate designed for creating a flourisahing online business.',
          collection: 'General'
        },
      ]
    },
    {
      id: 5,
      title: 'Notification',
      value: 'Notification',
      type: 'tag',
      data: []
    },
    {
      id: 6,
      title: 'Newsletter',
      value: 'newsletter',
      type: 'tag',
      data: []
    },
    {
      id: 7,
      title: 'Business',
      value: 'business',
      type: 'tag',
      data: []
    },
    {
      id: 8,
      title: 'Holidays',
      value: 'holidays',
      type: 'tag',
      data: []
    },
    {
      id: 9,
      title: 'Important',
      value: 'important',
      type: 'tag',
      data: []
    },
    {
      id: 10,
      title: 'Organization',
      value: 'organization',
      type: 'tag',
      data: []
    }
  ]
  