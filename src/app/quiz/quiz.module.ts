import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { DataService } from '../services/data.service';
import { TopicService } from '../services/topic.service';
import { QuestionComponent } from '../question/question.component';
import { ResultComponent } from '../result/result.component';
import { HomeComponent } from '../home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
    QuestionComponent,
    ResultComponent
  ],
  exports: [
    HomeComponent,
    QuestionComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatDividerModule,
    MatButtonModule
  ],
  providers: [
    DataService,
    TopicService
  ]
})
export class QuizModule { }
