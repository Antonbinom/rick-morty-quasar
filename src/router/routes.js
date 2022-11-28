const routes = [
  {path: "/", name: 'home', component: () => import("pages/HomePage.vue")},
  {
    path: "/character/:id", name: 'character',
    component: () => import("pages/CharacterPage.vue"),
  },
  {path: "/episode/:id", name: 'episode', component: () => import("pages/EpisodePage.vue")},
];

export default routes;
