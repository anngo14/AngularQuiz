import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './question/question.component';
import { ResultComponent } from './result/result.component';
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'quiz', component: QuestionComponent},
  { path: 'result', component: ResultComponent},
  { path: 'logout' , component: LogoutComponent},
  { path: 'error', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent];