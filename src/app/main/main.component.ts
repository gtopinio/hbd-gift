import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  hasClicked = -1;
  mailHeader = "Happy Birthday, Chloe!";
  mailFooter = `To my confidante <br/> (❍ᴥ❍ʋ)`

  constructor(
    private _router: Router,
  ) {
  }

  showHbd() {
    this.hasClicked++;
    if(this.hasClicked >= 1) {
      this._router.navigate(['/hbd']);
    }
  }
}
