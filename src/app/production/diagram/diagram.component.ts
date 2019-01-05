import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { FormGroup } from '@angular/forms'
import { BD } from '../../Shared/bd.service';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements OnInit {

  public titulo: string = 'Diagrama'
  public email: string
  private image: any
  public publicacao: any

  public formulario: FormGroup = new FormGroup({})

  constructor(private bd: BD) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) =>{
      this.email = user.email
      this.atualizarDiagrama()
    })
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.titulo,
      imagem: this.image[0]
    })
  }

  public atualizarDiagrama(): void {

    this.bd.consultaPublicacoes(this.email)
      .then((publicacoes: any) => {
        this.publicacao = publicacoes[0]
        console.log(this.publicacao)
      })
  }

  public preparaImagemUpload(event: Event): void {
    this.image = (<HTMLInputElement>event.target).files
    console.log(this.image)
  }
}
