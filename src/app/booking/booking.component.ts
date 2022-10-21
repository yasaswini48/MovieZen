import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import { MoviesService } from '../movies.service';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { SucessComponent } from '../sucess/sucess.component';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit 
{
  movieObj:any;
  show_times=["Morning Show","First Show","Night Show"]
  bookingForm:FormGroup=new FormGroup({
    username:new FormControl('',[Validators.required,Validators.minLength(6)]),
    tickets_booked:new FormControl('',[Validators.required]),
    show_time:new FormControl('',[Validators.required]),
    show_date:new FormControl('',[Validators.required])
  });
  //inject router obj
  constructor(private routerObj:ActivatedRoute,private rtObj:Router,private movieServiceObj:MoviesService,private dialogRef: MatDialog) { }
  ngOnInit() 
  {
   let id=this.routerObj.snapshot.params['id'];         //get the id of movie from url
   //get whole movie from service 
   this.movieServiceObj.getDataById(id).subscribe(
    res=>
    {
      this.movieObj=res;
    }
   ); 
  }
  //sucessful booking
  confirmNow()
  {
    //create an object,store in api
    let newUserObj=
    {
      username:this.username?.value,
      moviename:this.movieObj.name,
      movieId:this.movieObj.id,
      tickets_booked:this.tickets_booked?.value,
      show_time:this.show_times[this.show_time?.value-1],
      show_date:this.show_date?.value
    };
    console.log("New user=",newUserObj)
    //add user to api
    this.movieServiceObj.postUserData(newUserObj).subscribe(
      res=>
      {console.log("User added sucessfully!")},
      err=>
      {console.log("Error in adding user!");}
    );
    //update ticket details here
    this.movieObj.tickets_avlble-=this.tickets_booked?.value;
    console.log("After updating in .ts tickets=",this.movieObj.tickets_avlble);
    this.movieServiceObj.updateTicketsAvlble(this.movieObj).subscribe(
      res=>{
        console.log("Sucesfully reduced tickets!");
          },
      err=>{
        console.log("Error in updating tickets count!");
      });
    this.dialogRef.open(SucessComponent);
    this.bookingForm.reset();
  }
  //Getter method
  get username()
  {
    return this.bookingForm.get("username");
  }
  //get no. of tickets user want to book
  get tickets_booked()
  {
    return this.bookingForm.get("tickets_booked");
  }
  get show_time()
  {
    // console.log("Time=",this.bookingForm.get("show_time"))
    return this.bookingForm.get("show_time");
  }
  get show_date()
  {
    return this.bookingForm.get("show_date");
  }
  getTicketValidStatus()
  {
    let tickets_booked=this.tickets_booked?.value
    //console.log("U want=",tickets_booked," we have=",this.movieObj.tickets_avlble);
    if(tickets_booked<=0 || tickets_booked>this.movieObj.tickets_avlble)
    {
      console.log("NOt enogh tickets!");
      return false;
    }
    return true;
  }
  //if username is already taken,return false
  getUsernameValidStatus()
  {
    let usernameTyped=this.username?.value;
    if(!this.movieServiceObj.getUserByName(usernameTyped))
    {
      console.log(usernameTyped," is already taken!!!!");
      return false;
    }
    else
      return true;
  }
}
