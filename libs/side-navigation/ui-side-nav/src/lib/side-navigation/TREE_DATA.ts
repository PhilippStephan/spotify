export interface RouterNode {
  name: string;
  children?: RouterNode[];
  route: string;
  icon: string;
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
    name: 'Library',
    route: '/library',
    icon: 'library_books'
  },
];
