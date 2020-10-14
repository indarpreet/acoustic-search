import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SearchEngineComponent } from './components/search-engine/search-engine.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule, MatInputModule, MatPaginatorModule } from '@angular/material';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { AppService } from './app.service';
import { LoginComponent } from './components/login/login.component';
import { ExponentialPipe } from './pipes/exponential.pipe';
import { BasicHighlightDirective } from './directives/basic-highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchEngineComponent,
    EmployeeDetailsComponent,
    LoginComponent,
    ExponentialPipe,
    BasicHighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ClickOutsideModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
