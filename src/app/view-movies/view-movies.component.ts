import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../movies.service';
@Component({
  selector: 'app-view-movies',
  templateUrl: './view-movies.component.html',
  styleUrls: ['./view-movies.component.css']
})
export class ViewMoviesComponent implements OnInit {
   //inject service obj
   constructor(private movieServiceObj:MoviesService,private routerObj:Router)
   {}
   movies:any=[]       //without any it is showing error!
  ngOnInit(): void     ////on loading the componenet,get all movies  
  {
    this.movieServiceObj.getData().subscribe(
      res=>{
        this.movies=res;
        console.log("Loaded all movies!") 
      }
    );
  }
   //on clicking book,rise event,send to booking comp
   bookMovie(clickedMovieId:any)
   {
     console.log("Clicked on booking!=",clickedMovieId);
     this.routerObj.navigateByUrl("bookingMovie/"+clickedMovieId);      //take id of clicked to movie to booking comp
   }
}
