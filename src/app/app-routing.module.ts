import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryComponent } from './components/diary/diary.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'diary', component: DiaryComponent, canActivate: [AuthGuard] },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  } /**Esto es un hack para cuando el usuario ingresa un ruta que no existe no crashe la pagina y mande a login. Nota: Siempre al ultimo del array */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
