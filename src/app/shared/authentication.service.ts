import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from "../home/user.model"
import * as firebase from 'firebase';

@Injectable()
export class Authentication {

  public token_id: string

  constructor(private router: Router){}

  public cadastrarUsuarios(usuario: User): Promise<any> {
    console.log('chegamos ate o servico', usuario)

    return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((resposta: any) => {

        // remover a senha do atributo senha do usuario.
        delete usuario.senha

        // registrando dados complementares do usuario no path email na base64
        firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set({ usuario })
      })
      .catch((erro: Error) => {
        console.log(erro)
      })

  }

  public autenticar(email: string, senha: string): void {
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((resposta: any)=>{

        firebase.auth().currentUser.getIdToken()
          .then((idToken:string) =>{
            this.token_id = idToken
            localStorage.setItem('idToken', idToken)
            this.router.navigate(['/diagrama'])
          })
      })
      .catch((erro: Error)=>{
        console.log(erro)
      })

  }

  public autenticado(): boolean {

    if (this.token_id === undefined && localStorage.getItem('idToken') != null){
      this.token_id = localStorage.getItem('idToken')
    }
    if (this.token_id === undefined){
      this.router.navigate(['/'])
    }
    return this.token_id !== undefined
  }

  public sair(): void {
    firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem('idToken')
        this.token_id = undefined
        this.router.navigate(['/'])
      })

  }

}

