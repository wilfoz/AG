import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'control-AG';

  ngOnInit(): void {

    var config = {
      apiKey: "AIzaSyB15EHghbsZXNPzXD18ngvrvEvAO82ehbU",
      authDomain: "controllag.firebaseapp.com",
      databaseURL: "https://controllag.firebaseio.com",
      projectId: "controllag",
      storageBucket: "controllag.appspot.com",
      messagingSenderId: "175259036663"
    };
    firebase.initializeApp(config);
  }

}
