import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { tick } from '@angular/core/testing';
@Injectable({
  providedIn: 'root'
})
export class MoviesService 
{
  users:any=[];
  //import http obj 
  constructor(private httpObj:HttpClient) 
  {
    this.getAllUsers().subscribe(
      res=>{
        this.users=res;
        console.log("Users list=",this.users);
      },
      err=>{
        console.log("Error while getting users!");
      });
  }
  //fetch all movies data
  getData():Observable<any>
  {
    return this.httpObj.get("https://6342e25aba4478d4784469a1.mockapi.io/movies/movies")
  }
  //get movie by id
  getDataById(id:any):Observable<any>
  {
    return this.httpObj.get("https://6342e25aba4478d4784469a1.mockapi.io/movies/movies/"+id)
  }
  //add user data
  postUserData(newUserObj:any):Observable<any>
  {
    console.log("Adding user!");
    return this.httpObj.post("https://6342e25aba4478d4784469a1.mockapi.io/movies/users",newUserObj);
  }
  //get all users
  getAllUsers():Observable<any>
  {
    console.log("Getting all users!");
    return this.httpObj.get("https://6342e25aba4478d4784469a1.mockapi.io/movies/users");
  }
  //fetch user by username,if exists return true
  getUserByName(usernameTyped:any):boolean
  {
   // console.log("U entered:",usernameTyped)
    for(let i=0;i<this.users.length;i++)
        {
            //console.log("username=",this.users[i]["username"]);
            if(this.users[i]["username"]===usernameTyped)
            {
              console.log("MAtch found for username!");
              return false;
            }
        }
        return true;
  }
  //update no. of tickets left for movie
  updateTicketsAvlble(MovieObj:any):Observable<any>
  {   
    //reduce the count of tickets
    console.log("Updating tick for id=",MovieObj.id," id=",MovieObj);
    let ans= this.httpObj.put("https://6342e25aba4478d4784469a1.mockapi.io/movies/movies/"+MovieObj.id,MovieObj);
    //console.log("After updation for id:",MovieObj.id);
    return ans;
  }
  //updateUserData
  updateUserData(userObj:any,):Observable<any>
  {
    console.log("Updating user=",userObj.id);
    return this.httpObj.put("https://6342e25aba4478d4784469a1.mockapi.io/movies/users/"+userObj.id,userObj);
  }
  //delete user by id
  deleteUserById(userId:any):Observable<any>
  {
    console.log("Deleting user's data! of ",userId);
    return this.httpObj.delete("https://6342e25aba4478d4784469a1.mockapi.io/movies/users/"+userId);
  }
}
