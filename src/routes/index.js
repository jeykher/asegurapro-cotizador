import AutoPage from '../components/auto';
import HogarPage from '../components/hogar';
import ViajeroPage from '../components/viajero';
import CotizarPage from '../pages/CotizarPage/CotizarPage';
import PagePdf from '../components/page-test-pdf';

let BaseUrl = '/';

const routes = [
  {
    path: '/auto/:itemIndex',
    component: AutoPage,
  },
  {
    path: '/hogar/:itemIndex',
    component: HogarPage,
  },
  {
    path: '/viajero/:itemIndex',
    component: ViajeroPage,
  },
  {
    path: '/cotizar/:budgetId',
    component: CotizarPage,
  },
  {
    path: '/pdf',
    component: PagePdf,
  },
];

export default routes;
