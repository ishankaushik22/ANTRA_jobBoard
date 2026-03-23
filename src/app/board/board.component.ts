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
  storyToShow: number = 6;
  currentStories: any[] = [];
  loadBtn=true;
  ngAfterViewInit(): void {
    this.data
      .getStoryID()
      .pipe()
      .subscribe((val: any) => {
        this.storydata = Object.values(val);
        this.currentStories = this.storydata.slice(0, this.storyToShow);
        console.log(this.currentStories);
      });
      
  }

  loadMoreJobs() {
    this.storyToShow= Math.min(this.storyToShow+6, this.storydata.length)
    this.currentStories = this.storydata.slice(0, this.storyToShow);
    if(this.storyToShow===this.storydata.length){
      this.loadBtn=false
    }
    console.log(this.currentStories);
  }
}
