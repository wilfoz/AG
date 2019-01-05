import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

@Injectable()
export class BD {

  constructor(){}

  public publicar(publicacao: any): void {

    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo })
      .then((response: any) => {

        let nomeImagem = response.key

        firebase.storage().ref()
          .child(`imagens/${nomeImagem}`)
          .put(publicacao.imagem)
      })
  }

  public consultaPublicacoes(emailUsuario: string): Promise<any> {

    return new Promise((resolve, reject) =>{

      //consultar as informações em database
      firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
      .orderByKey()
      .once('value')
      .then((snapshot: any) =>{

        //console.log(snapshot.val())

        let publicacoes: Array<any> = []

        snapshot.forEach((childSnapshot: any) =>{

          let publicacao = childSnapshot.val()

          publicacao.key = childSnapshot.key
          publicacoes.push(publicacao)

        })
        return publicacoes.reverse()

      })
        .then((publicacoes: any) => {

          publicacoes.forEach((publicacao: any) => {

            //consulta a url da imagem (storage)
            firebase.storage().ref()
              .child(`imagens/${publicacao.key}`)
              .getDownloadURL()
              .then((url: string) => {

                publicacao.url_imagem = url

                //consultar nome do usuario
                firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                  .once('value')
                  .then((snapshot: any) => {
                    publicacao.nome_usuario = snapshot.val().usuario.nome_usuario
                  })
              })
          })
          resolve(publicacoes)
        })
    })

  }
}
