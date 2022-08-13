import React from 'react';
import { Redirect } from 'react-router-dom'

const WYDiscover = React.lazy(() => import("@/pages/discover"));
const WYMine = React.lazy(() => import("@/pages/mine"));
const WYFriends = React.lazy(() => import("@/pages/friend"));
const Album = React.lazy(() => import("@/pages/discover/c-pages/album"));
const Ranking = React.lazy(() => import("@/pages/discover/c-pages/ranking"));
const Djradio = React.lazy(() => import("@/pages/discover/c-pages/djradio"));
const Recommend = React.lazy(() => import("@/pages/discover/c-pages/recommend"));
const Artist = React.lazy(() => import("@/pages/discover/c-pages/artist"));
const Songs = React.lazy(() => import("@/pages/discover/c-pages/songs"));
const Player = React.lazy(() => import("@/pages/player"));

const routes = [
  {
    path: '/',
    exact: true,
    render: () => (
      <Redirect to='/discover' />
    )
  },
  {
    path: '/discover',
    component: WYDiscover,
    routes: [
      {
        path: '/discover',
        exact: true,
        render: () => (
          <Redirect to='discover/recommend' />
        )
      },
      {
        path: '/discover/recommend',
        component: Recommend,
      },
      {
        path: '/discover/ranking',
        component: Ranking,
      },
      {
        path: '/discover/songs',
        component: Songs,
      },
      {
        path: '/discover/djradio',
        component: Djradio,
      },
      {
        path: '/discover/artist',
        component: Artist,
      },
      {
        path: '/discover/album',
        component: Album,
      },
      {
        path: '/discover/player',
        component: Player,
      }
    ]
  },
  {
    path: '/mine',
    component: WYMine,
  },
  {
    path: '/friend',
    component: WYFriends,
  }
];

export default routes;