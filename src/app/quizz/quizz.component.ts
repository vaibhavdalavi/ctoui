import { Component, OnInit, Input } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/animations';
import { QUESTION_BANK } from '../data/question-data';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss'],
  animations: [
    trigger('pageState', [
      state('inactive', style({
        boxShadow: '0 1px 3px #aaa',
        border: '1px solid grey',
        transform: 'scale(1)'
      })),
      state('active',   style({
        boxShadow: '0 2px 5px #aaa',
        border: '1px solid green',
        transform: 'scale(1.4)',
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ])
  ]
})

export class QuizzComponent implements OnInit {
  @Input() timerRunning: boolean;
  questions = QUESTION_BANK;
  selections = {};
  option = false;
  activeSlideIndex = 0;

  constructor() {
  }

  ngOnInit() {}

  onSelected(questionIdx, choiceIdx) {
    this.selections[questionIdx] = choiceIdx;

    if (Object.keys(this.selections).length === this.questions.length) {
      this.activeSlideIndex = 0;
    } else {
      // FOR AUTO change question
      if (this.activeSlideIndex === this.questions.length - 1 && this.option) {
        this.activeSlideIndex = 0;
      } else if (this.option) {
        this.activeSlideIndex += 1;
      }
    }
  }

  changeActiveSlide(index) {
    this.activeSlideIndex = index;
  }

  resetQuiz() {
    this.selections = {};
  }

}
