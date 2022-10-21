import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
   //inject service obj
   constructor(private movieServiceObj:MoviesService,private routerObj:Router)
   {}
   movies:any=[]       //without any it is showing error!
  //I'm sending the clicked movie to booking comp
  @Output() sendClickedMovie=new EventEmitter<any>();
  ngOnInit(): void 
  {
  //on loading the componenet,get movies
    this.movieServiceObj.getData().subscribe(
      res=>{
        this.movies=res;
        console.log("res=",res);
        for(let movie of this.movies)
        {
          console.log("name="+movie.name)
        }
      }
    );
  }
   //on clicking book,rise event,send to booking comp
   bookMovie()
   {
     console.log("Movie clicked=");
     this.routerObj.navigateByUrl("bookingMovie")
   }
}






