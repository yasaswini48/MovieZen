import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { HomeComponent } from './home/home.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { ViewMoviesComponent } from './view-movies/view-movies.component';
const routes: Routes = 
[
  {path:'viewMovies',component:ViewMoviesComponent},
  {path:'bookingMovie/:id',component:BookingComponent},
  {path:'viewBookings',component:ViewBookingsComponent},
  {path:'home',component:HomeComponent},
  {path:'',redirectTo:'/viewMovies',pathMatch:'full'}     //On loading show movies by defaulf
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
