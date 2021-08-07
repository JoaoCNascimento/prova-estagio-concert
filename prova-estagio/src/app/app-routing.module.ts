import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './components/guard/auth-guard';

const routes: Routes = [

  {
    path: "",
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },

  {
    path: "login",
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },

  {
    path: 'clientes',
    loadChildren: () => import('./modules/clientes/clientes.module').then(m => m.ClientesModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'funcionarios',
    loadChildren: () => import('./modules/funcionarios/funcionarios.module').then(m => m.FuncionariosModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'mapa',
    loadChildren: () => import('./modules/mapa/mapa.module').then(m => m.MapaModule),
    canActivate: [AuthGuard]
  },

  {
    path: '**',
    redirectTo: "/"
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
