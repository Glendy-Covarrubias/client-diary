import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryComponent } from './components/diary/diary.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  { path: 'diary', component: DiaryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
