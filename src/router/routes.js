const routes = [
  {path: '/', component: () => import('pages/HomePage.vue')},
  {path: '/character/:id', component: () => import('pages/CharacterPage.vue')},
  {path: '/episode/:id', component: () => import('pages/EpisodePage.vue')}
]

export default routes
