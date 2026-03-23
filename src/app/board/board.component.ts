import { AfterViewInit, Component } from '@angular/core';
import { BoardDataService } from './board-data.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements AfterViewInit {
  constructor(private data: BoardDataService) {}
  storydata: any[] = [];
  storyEnd: number = 6;
  storyBegin:number = 0;
  currentStories: any[] = [];
  loadBtn=true;
  ngAfterViewInit(): void {
    this.data
      .getStoryID()
      .pipe()
      .subscribe((val: any) => {
        this.storydata = Object.values(val);
        this.currentStories = this.storydata.slice(this.storyBegin, this.storyEnd);
        console.log(this.currentStories);
      });

  }

  loadMoreJobs() {
    this.storyEnd= Math.min(this.storyEnd+6, this.storydata.length)
    this.storyBegin+=6;
    this.currentStories = this.storydata.slice(this.storyBegin, this.storyEnd);
    if(this.storyEnd>=this.storydata.length){
      this.loadBtn=false
    }
    console.log(this.currentStories);
  }
}
