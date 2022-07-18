import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './helperServices/auth.guard';
import { HomeComponent } from './home/home.component';
import { HouseDetailComponent } from './house-detail/house-detail.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'bookDetail/:id', component: BookDetailComponent},
  { path: 'houseDetail/:id', component: HouseDetailComponent},
  { path: 'characterDetail/:id', component: CharacterDetailComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
