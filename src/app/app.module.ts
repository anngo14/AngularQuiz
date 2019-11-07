import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import { LogoutComponent } from './logout/logout.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { TopicService } from './services/topic.service';
import { QuizModule } from './quiz/quiz.module';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { MatDialogModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LogoutComponent,
    LoginComponent,
    ErrorComponent,
    NotfoundComponent,
    ThankyouComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatMenuModule,
    HttpClientModule,
    QuizModule,
    MatDialogModule
  ],
  providers: [UserService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
