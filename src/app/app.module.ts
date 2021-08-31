import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http/'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlowerService} from './flower.service';
import { RouterModule } from '@angular/router';
import { UpdateFlowerComponent } from './update-flower/update-flower.component';
import { FlowerComponent } from './flower/flower.component';
import { AddFlowerComponent } from './add-flower/add-flower.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FlowerComponent,
    AddFlowerComponent,
    UpdateFlowerComponent, 
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path:'', 
        component:FlowerComponent},
      {
        path:'flower/add', 
        component:AddFlowerComponent},
      {
        path:'flower/update/:id', 
        component:UpdateFlowerComponent}
    ])
  ],
  providers: [
    FlowerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
