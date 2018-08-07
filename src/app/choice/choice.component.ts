import { Component, OnInit, Input } from '@angular/core';
import { Choice } from '../models/question';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnInit {
  @Input() choice: Choice;
  @Input() isSelected: Choice;
  @Input() drawType: string;

  constructor() { }

  ngOnInit() {
  }

}
