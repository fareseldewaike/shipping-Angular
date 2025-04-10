import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AuthNavComponent } from './components/auth-nav/auth-nav.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { BlankNavComponent } from './components/blank-nav/blank-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { BranchComponent } from './components/branch/branch.component';
import { BranchFormComponent } from './components/branch/branch-form/branch-form.component';
import { CityComponent } from './components/city/city.component';
import { CityFormComponent } from './components/city/city-form/city-form.component';
import { GovernorateComponent } from './components/governorate/governorate.component';
import { GovernorateFormComponent } from './components/governorate/governorate-form/governorate-form.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupsFormComponent } from './components/groups/groups-form/groups-form.component';
import { WeightComponent } from './components/weight/weight.component';
import { WeightFormComponent } from './components/weight/weight-form/weight-form.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    AppComponent,
   LoginComponent,
   AuthNavComponent,
   AuthLayoutComponent,   
   BlankLayoutComponent,
   BlankNavComponent,
   FooterComponent,
   AboutComponent,
   HomeComponent,
   BranchComponent ,
   BranchFormComponent,
   CityComponent,
   CityFormComponent ,
   GovernorateComponent,
   GovernorateFormComponent,
   GroupsComponent,
   GroupsFormComponent,
   WeightComponent,
   WeightFormComponent,
   AdminLayoutComponent,
   SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
