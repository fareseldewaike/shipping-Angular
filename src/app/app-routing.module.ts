import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './shared/guards/auth.guard';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { BranchFormComponent } from './components/branch/branch-form/branch-form.component';
import { BranchComponent } from './components/branch/branch.component';
import { CityFormComponent } from './components/city/city-form/city-form.component';
import { CityComponent } from './components/city/city.component';
import { GovernorateFormComponent } from './components/governorate/governorate-form/governorate-form.component';
import { GovernorateComponent } from './components/governorate/governorate.component';
import { GroupsFormComponent } from './components/groups/groups-form/groups-form.component';
import { GroupsComponent } from './components/groups/groups.component';
import { WeightFormComponent } from './components/weight/weight-form/weight-form.component';
import { WeightComponent } from './components/weight/weight.component';
import { CommonModule } from '@angular/common'; 
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';


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

  { path: '' , component: AdminLayoutComponent ,
    children:[
      //branches
    { path: 'branches', component: BranchComponent },
    { path: 'branches/:id/edit', component: BranchFormComponent },

    //governorates 
    { path: 'governorates', component: GovernorateComponent },
    { path: 'governorates/:id/edit', component: GovernorateFormComponent },
  
    //cities
    { path: 'cities', component: CityComponent },
    { path: 'cities/:id/edit', component: CityFormComponent },
  
    //weight
    { path: 'weights', component: WeightComponent },
    { path: 'weights/:id/edit', component: WeightFormComponent },
  
  
    //groups
    { path: 'groups', component: GroupsComponent },
    { path: 'groups/:id/edit', component: GroupsFormComponent },

     ]
  },
   
  
    
  
    
  { path: '**', component : NotfoundComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
