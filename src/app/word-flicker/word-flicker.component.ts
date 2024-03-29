import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-word-flicker',
  templateUrl: './word-flicker.component.html',
  styleUrls: ['./word-flicker.component.css']
})
export class WordFlickerComponent implements OnInit {
  words = [
    'Tanda mo na po XD',
    'Jk, Happy Birthday, Chloeee!',
    'I hope na ma-enjoy mo araw mo!',
    'I wish you all the best!',
    'Magpakabait ka na, ha?',
    'Libre naman dyan 😆',
    'Jk, stay safe and healthy!',
    'Ingat ka po lagi sa work!',
    'See you sa PBB house natin 😆'

  ];
  part = '';
  i = 0;
  offset = 0;
  len = this.words.length;
  forwards = true;
  skip_count = 0;
  skip_delay = 15;
  speed = 70;

  ngOnInit() {
    this.wordflick();
  }

  wordflick() {
    setInterval(() => {
      if (this.forwards) {
        if (this.offset >= this.words[this.i].length) {
          ++this.skip_count;
          if (this.skip_count == this.skip_delay) {
            this.forwards = false;
            this.skip_count = 0;
          }
        }
      }
      else {
        if (this.offset == 0) {
          this.forwards = true;
          this.i++;
          this.offset = 0;
          if (this.i >= this.len) {
            this.i = 0;
          }
        }
      }
      this.part = this.words[this.i].substr(0, this.offset);
      if (this.skip_count == 0) {
        if (this.forwards) {
          this.offset++;
        }
        else {
          this.offset--;
        }
      }
    }, this.speed);
  }
}
