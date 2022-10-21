import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MoviesService } from '../movies.service';
import { UpdateSuccessComponent } from '../update-success/update-success.component';
@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit {
  users:any=[];
  editUserIndex:Number=-1;
  editUserObj:any="";
  editUserStatus:boolean=false;
  editUserShowTime:String="";
  editUserTicketsAvlbe:Number=0;
  editUserMovieObj:any;
  prevBooked:Number=0;
  show_times=["Morning Show","First Show","Night Show"];
  //create an object,store in api
  //get all users data
  constructor(private movieServiceObj:MoviesService,private dialogRef: MatDialog) 
  {}
  ngOnInit(): void 
  {
    this.movieServiceObj.getAllUsers().subscribe(
      res=>{
        this.users=res;
        console.log("Users in bookings=",res);
      },err=>{
        console.log("Error in getting all users in booking!");
      });
  }
  //editing userObj
  onEdit(userObj:any,ind:any)
  {
    console.log("Editing ind=",ind," obj=",userObj);
    this.editUserObj=userObj;
    this.editUserIndex=ind;
    this.editUserStatus=true;         //to convert the feild to input feild
    this.editUserShowTime=userObj.show_time;
    this.prevBooked=userObj.tickets_booked;
    //get tickets avlble
    this.movieServiceObj.getDataById(userObj.movieId).subscribe(res=>{
      //console.log("Left for ",userObj.movieId," = ",res.tickets_avlble);
      this.editUserMovieObj=res;
      this.editUserTicketsAvlbe=res.tickets_avlble;
    },err=>{});
   // console.log("obj=",this.editUserObj," idx=",this.editUserIndex," stat=",this.editUserStatus,"","time=",this.editUserObj.show_time);
  }
  getTicketValidStatus()
  {
   // console.log("U gave=",this.editUserObj.tickets_booked," I have=",this.editUserTicketsAvlbe);
    return (this.editUserObj.tickets_booked<=this.editUserTicketsAvlbe && this.editUserObj.tickets_booked>=1);
  }
  //updating
  onConfirm(edittedObj:any)
  {
    this.editUserStatus=false;
    this.editUserObj.show_time=this.editUserShowTime;
   // console.log("got=",edittedObj);
    //adding remaing things to the obj
    edittedObj.id=this.editUserObj["id"];
    edittedObj.username=this.editUserObj["username"];
    edittedObj.moviename=this.editUserObj["moviename"];
    edittedObj.movieId=this.editUserObj["movieId"];
    let d=Number(this.prevBooked)-this.editUserObj.tickets_booked;
    //console.log("Final obj=",edittedObj);
    //update the user api
    this.movieServiceObj.updateUserData(edittedObj).subscribe(res=>{console.log("Sucesfully updated!")});
    //update the movie api
    this.editUserMovieObj.tickets_avlble+=d;
    this.movieServiceObj.updateTicketsAvlble(this.editUserMovieObj).subscribe(res=>{console.log("Sucesfully updated!")});
    this.dialogRef.open(UpdateSuccessComponent);
  }
  //deleting
  onDelete(userId:any,ind:any)
  {
    this.movieServiceObj.deleteUserById(userId).subscribe(res=>{console.log("Deleted sucess!")},err=>{console.log("Error in deleting!")});
    this.users.splice(ind,1);
    console.log("Sucessfully deleted!");
    this.dialogRef.open(UpdateSuccessComponent);
  }
 
}
