import { Home, Following, Profile } from '../pages';

//public routes
export const publicRoutes = [
  { path: '/', component: Home },
  { path: '/following', component: Following },
  { path: '/profile', component: Profile },
];

//private routes
export const privateRoutes = [];
