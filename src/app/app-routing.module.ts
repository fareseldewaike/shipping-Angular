import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './shared/guards/auth.guard';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: '' , 
 // canActivate: [authGuard],
     component: BlankLayoutComponent, children:[
    { path: '', redirectTo: 'home', pathMatch: 'full'}, 
    { path: 'home', component: HomeComponent},
   ]},
  { path: '' , component: AuthLayoutComponent ,
    children:[
      { path: '', redirectTo: 'about', pathMatch: 'full'}, 
      { path: 'about', component: AboutComponent},
      { path: 'login', component: LoginComponent},

     ]
  },
  { path: '**', component : NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
