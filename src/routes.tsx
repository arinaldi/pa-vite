import { createBrowserRouter, redirect } from 'react-router';

import { Fallback } from '@/components/fallback';
import Test from '@/components/test';
import { ROUTE_HREF, ROUTES_ADMIN } from '@/lib/constants';
import Admin from '@/routes/admin/admin';
import Artists from '@/routes/artists/artists';
import FeaturedSongs from '@/routes/songs/featured-songs';
import NewReleases from '@/routes/releases/new-releases';
import Root from '@/routes/root';
import SignIn from '@/routes/signin/signin';
import TopAlbums from '@/routes/albums/top-albums';
import { supabase } from '@/supabase/client';
import {
  getAdminData,
  getArtists,
  getFavorites,
  getReleases,
  getSongs,
} from '@/supabase/data';
import ErrorPage from './error-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    HydrateFallback: Fallback,
    children: [
      {
        path: ROUTES_ADMIN.base.href,
        Component: Admin,
        loader: async (args) => {
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (!session) {
            return redirect(ROUTE_HREF.TOP_ALBUMS);
          }

          return getAdminData(args);
        },
      },
      {
        path: ROUTE_HREF.TOP_ALBUMS,
        Component: TopAlbums,
        loader: getFavorites,
      },
      {
        path: ROUTE_HREF.ARTISTS,
        Component: Artists,
        loader: getArtists,
      },
      {
        path: ROUTE_HREF.DASHBOARD,
        Component: Test,
      },
      {
        path: ROUTE_HREF.NEW_RELEASES,
        Component: NewReleases,
        loader: getReleases,
      },
      {
        path: ROUTE_HREF.SIGNIN,
        Component: SignIn,
        loader: async () => {
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (session) {
            return redirect(ROUTES_ADMIN.base.href);
          }
        },
      },
      {
        path: '/songs',
        Component: FeaturedSongs,
        loader: getSongs,
      },
    ],
  },
]);
