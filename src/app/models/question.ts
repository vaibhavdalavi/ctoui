export class Question {
    title: string;
    drawType: string;
    choices: Choice[];
  }
  
  export class Choice {
    title: string;
    imageUrl: string;
    summary: string;
  }
