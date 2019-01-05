import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ROUTES } from './app.routes';
import { BD } from './Shared/bd.service';
import { Authentication } from './Shared/authentication.service';
import { AutenticacaoGuard } from './Shared/autenticacao.guard.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HomeComponent } from './home/home.component';
import { DiagramComponent } from './production/diagram/diagram.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    SettingsComponent,
    HomeComponent,
    DiagramComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule
  ],
  providers: [ BD, Authentication, AutenticacaoGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
