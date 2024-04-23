import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { authGuard } from '../auth/auth.guard';

import { ApitestComponent } from './apitest/apitest.component';

const routes: Routes = [
  {
    path: '',
    component: ApitestComponent,
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [authGuard],
})
export class PagesRoutingModule {}
export const RoutingComponents = [HomeComponent];
