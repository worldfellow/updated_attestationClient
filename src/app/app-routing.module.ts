import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component'
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'pages',canActivate: [AuthGuard],loadChildren: () => import('../app/pages/pages.module').then(m => m.PagesModule)
},
  {
    path: 'auth',
    
    children: [
      {
        path: 'login',
        component: LoginComponent,
        // canActivate: [AuthGuard],
      },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  

}
