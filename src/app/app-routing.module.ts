import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from '../app/editor/editor.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { ListMapsComponent } from './list-maps/list-maps.component';
import {StartMenuComponent} from './start-menu/start-menu.component';
import {IndividualReportComponent} from './individual-report/individual-report.component';
import {GroupReportComponent} from './group-report/group-report.component';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {DoneMapsComponent} from './done-maps/done-maps.component';
import { ToDoMapsComponent } from './to-do-maps/to-do-maps.component';

const routes: Routes = [
  { path: '', redirectTo: 'startMenu', pathMatch: 'full' },
  { path: 'editor', component: EditorComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list', component: ListMapsComponent, canActivate: [AuthGuard] },
  { path: 'editor/:id', component: EditorComponent, canActivate: [AuthGuard] },
  { path: 'startMenu', component: StartMenuComponent },
  { path: 'individual-report', component: IndividualReportComponent, canActivate: [AuthGuard] },
  { path: 'group-report', component: GroupReportComponent, canActivate: [AuthGuard] },
  { path: 'main-menu', component: MainMenuComponent, canActivate: [AuthGuard] },
  { path: 'doneMaps', component: DoneMapsComponent, canActivate: [AuthGuard] },
  { path: 'toDoMaps', component: ToDoMapsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
