import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Authentication } from '../../Shared/authentication.service';
import { User } from '../user.model'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'nome_completo': new FormControl(null),
    'nome_usuario': new FormControl(null),
    'senha': new FormControl(null)
  })

  constructor(private authentication: Authentication) { }

  ngOnInit() {
  }

  public cadastrarUsuario(): void {

    let user: User = new User(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha
    )
    this.authentication.cadastrarUsuarios(user)
      .then(() => this.exibirPainelLogin())
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login')
  }

}
