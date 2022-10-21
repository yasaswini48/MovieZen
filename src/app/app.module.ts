import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BookingComponent } from './booking/booking.component';
import { ViewMoviesComponent } from './view-movies/view-movies.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from '@angular/material/dialog';
import { SucessComponent } from './sucess/sucess.component';
import { HomeComponent } from './home/home.component';
import { UpdateSuccessComponent } from './update-success/update-success.component';
@NgModule({
  declarations: 
  [AppComponent, BookingComponent, ViewMoviesComponent, ViewBookingsComponent, SucessComponent, HomeComponent, UpdateSuccessComponent],
  imports: 
  [BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule
  ],
  providers:[],
  bootstrap:[AppComponent]
})
export class AppModule { } 
