import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from '../app/editor/editor.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { ListMapsComponent } from './list-maps/list-maps.component';
import {StartMenuComponent} from './start-menu/start-menu.component';

const routes: Routes = [
  { path: '', redirectTo: 'startMenu', pathMatch: 'full' },
  { path: 'editor', component: EditorComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list', component: ListMapsComponent, canActivate: [AuthGuard] },
  { path: 'editor/:id', component: EditorComponent, canActivate: [AuthGuard] },
  { path: 'startMenu', component: StartMenuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
