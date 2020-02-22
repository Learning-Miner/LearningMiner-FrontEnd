import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule, MenubarModule, DialogModule } from 'primeng/primeng';

import { AppComponent } from './app.component';

import { ConceptMapModule } from './conceptmap-module/conceptmap.module';
import { EditorComponent } from './editor/editor.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { UserService } from './services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { RegisterComponent } from './register/register.component';
import { ListMapsComponent } from './list-maps/list-maps.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MapDetailComponent } from './map-detail/map-detail.component';
import { MenuInicioComponent } from './menu-inicio/menu-inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    LoginComponent,
    RegisterComponent,
    ListMapsComponent,
    NavbarComponent,
    MapDetailComponent,
    MenuInicioComponent,
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
    HttpModule,
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
export class AppModule { }
