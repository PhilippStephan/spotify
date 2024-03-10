export interface RouterNode {
  name: string;
  children?: RouterNode[];
  route: string;
  icon?: string;
}

export const TREE_DATA: RouterNode[] = [
  {
    name: 'Home',
    route: '/home',
    icon: 'home'
  },
  {
    name: 'Search',
    route: '/search',
    icon: 'search'
  },
  {
    name: 'Statistics',
    children: [
      {
        name: 'Tracks',
        route: 'statistics/tracks',
        icon: 'audiotrack'
      },
      {
        name: 'Artists',
        route: 'statistics/artists',
        icon: 'person'
      },
    ],
    route: '/statistics',
    icon: 'analytics'
  },
  {
    name: 'Library',
    route: '/library',
    icon: 'library_music'
  },
];
