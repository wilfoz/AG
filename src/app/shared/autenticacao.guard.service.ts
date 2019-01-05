import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Authentication } from './authentication.service'

@Injectable()
export class AutenticacaoGuard implements CanActivate {

  constructor(private auth: Authentication){}

  canActivate(): boolean {
    return this.auth.autenticado()
  }
}
