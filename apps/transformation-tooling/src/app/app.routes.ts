import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'self-diagnosis',
    pathMatch: 'full',
  },
  {
    path: 'self-diagnosis',
    loadChildren: () =>
      import('./pages/self-diagnosis/self-diagnosis-bundle.module').then(
        (m) => m.SelfDiagnosisBundleModule
      ),
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
