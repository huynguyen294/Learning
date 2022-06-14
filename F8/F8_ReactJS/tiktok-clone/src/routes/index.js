import { Home, Following, Profile, Upload, Search } from '../pages';
import { HeaderOnly, Empty } from '../layouts';

//public routes
export const publicRoutes = [
  { path: '/', component: Home },
  { path: '/following', component: Following },
  { path: '/profile', component: Profile },
  { path: '/upload', component: Upload, layout: HeaderOnly },
  { path: '/search', component: Search, layout: Empty },
];

//private routes
export const privateRoutes = [];
