import { Routes } from '@angular/router';
import { AutenticacaoGuard } from './Shared/autenticacao.guard.service';

import {HomeComponent} from './home/home.component';
import {DiagramComponent} from './production/diagram/diagram.component';

export const ROUTES: Routes = [
  {path:'', component: HomeComponent },
  {path:'diagrama', component: DiagramComponent, canActivate: [ AutenticacaoGuard ]}
]

//
