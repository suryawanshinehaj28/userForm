import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { HttpClientModule} from '@angular/common/http';

import { UserlistComponent } from './userlist/userlist.component';
import { UsercountComponent } from './usercount/usercount.component'

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
   
    UserlistComponent,
    UsercountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
