import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let i = 0, welcome = "Welcome Player 1";

    function typeWriter() {
      if (i < welcome.length) {
        document.getElementById("welcome").innerHTML += welcome.charAt(i);
        i++;
        setTimeout(typeWriter, 75);
      }
    }

    typeWriter();
  }

}
