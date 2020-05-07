import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ButtonModule, MenubarModule, DialogModule} from 'primeng/primeng';

import {AppComponent} from './app.component';

import {ConceptMapModule} from './conceptmap-module/conceptmap.module';
import {EditorComponent} from './editor/editor.component';
import {AppRoutingModule} from './/app-routing.module';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {UserService} from './services/user.service';
import {CookieService} from 'ngx-cookie-service';
import {AuthGuard} from './auth.guard';
import {TokenInterceptorService} from './services/token-interceptor.service';
import {RegisterComponent} from './register/register.component';
import {ListMapsComponent} from './list-maps/list-maps.component';
import {NavbarComponent} from './navbar/navbar.component';
import {StartMenuComponent} from './start-menu/start-menu.component';
import {DoneMapsComponent} from './done-maps/done-maps.component';
import {IndividualReportComponent} from './individual-report/individual-report.component';
import {GroupReportComponent} from './group-report/group-report.component';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {ToDoMapsComponent} from './to-do-maps/to-do-maps.component';
import {ChartsModule} from 'ng2-charts-x';
import {NewAssignmentComponent} from './new-assignment/new-assignment.component';
import {OngoingActivitiesComponent} from './ongoing-activities/ongoing-activities.component';
import {ClosedActivitiesComponent} from './closed-activities/closed-activities.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    LoginComponent,
    RegisterComponent,
    ListMapsComponent,
    NavbarComponent,
    StartMenuComponent,
    DoneMapsComponent,
    IndividualReportComponent,
    GroupReportComponent,
    MainMenuComponent,
    ToDoMapsComponent,
    NewAssignmentComponent,
    OngoingActivitiesComponent,
    ClosedActivitiesComponent,
    ActivityDetailComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ButtonModule,
    MenubarModule,
    DialogModule,
    ConceptMapModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
  ],
  providers: [
    UserService,
    CookieService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
