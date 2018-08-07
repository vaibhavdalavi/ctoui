import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { QuestionComponent } from '../question/question.component';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  isTimerRunning = false;
  stopWatch = new StopWatch();
  @Input() question: QuestionComponent;
  @Input() selectedQuestion: number;
  @Output() selectedChoice = new EventEmitter();
  
  constructor(private userService: UserService,
    public authService: AuthService) { 
    this.currentUser = this.authService.actingUser;
  }

  ngOnInit() {
  }

  onClicked(index) {
    this.selectedChoice.emit(index);
  }

  toggleStartStopTimer(): void {
    if (this.isTimerRunning) {
      this.isTimerRunning = false;
      this.stopWatch.stop();
      //this.stopRecording();

    } else {
      if (this.stopWatch.numberOfSecondsRead > 0) {
        this.resetTimer();
      }
      this.isTimerRunning = true;
      this.stopWatch.start();
      //this.startRecording();
    }
  }

  resetTimer(): void {
    this.isTimerRunning = false;
    this.stopWatch.reset();
  }

}

class StopWatch {
  numberOfSecondsRead = 0;
  seconds = 0;
  minutes = 0;
  displayText = '00:00';
  timerInterval: any;

  add(): void {
    this.numberOfSecondsRead++;
    this.seconds++;
    if (this.seconds >= 60) {
      this.seconds = 0;
      this.minutes++;
      if (this.minutes >= 60) {
        this.minutes = 0;
      }
    }

    this.displayText =
      (this.minutes
        ? this.minutes > 9
          ? this.minutes
          : '0' + this.minutes
        : '00') +
      ':' +
      (this.seconds > 9 ? this.seconds : '0' + this.seconds);
  }

  start(): void {
    this.reset();
    this.resume();
  }

  stop(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  pause(): void {
    this.stop();
  }

  resume(): void {
    this.timerInterval = setInterval(() => {
      this.numberOfSecondsRead++;
      this.seconds++;
      if (this.seconds >= 60) {
        this.seconds = 0;
        this.minutes++;
        if (this.minutes >= 60) {
          this.minutes = 0;
        }
      }

      this.displayText =
        (this.minutes
          ? this.minutes > 9
            ? this.minutes
            : '0' + this.minutes
          : '00') +
        ':' +
        (this.seconds > 9 ? this.seconds : '0' + this.seconds);
    }, 1000);
  }

  reset(): void {
    this.stop();
    this.displayText = '00:00';
    this.seconds = 0;
    this.minutes = 0;
    this.numberOfSecondsRead = 0;
  }
}