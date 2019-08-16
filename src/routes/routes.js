import Layout from '../components/Layout/DashboardLayout.vue';
//General Views
import NotFound from '../components/GeneralViews/NotFoundPage.vue';
//Pages
import Overview from '../components/SystemSetup/Overview.vue';

var routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/steps'
  },
  {
    path: '/steps',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Product Steps Setup',
        component: Overview
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  },
];

export default routes