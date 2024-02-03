import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StudentComponent } from './components/student/student.component';
import { SubjectComponent } from './components/subject/subject.component';
import { authGuard } from './guards/auth.guard';
import { areaAccessGuard } from './guards/area-access.guard';
import { StudentprofileComponent } from './components/studentprofile/studentprofile.component';

export const routes: Routes = [
    { 
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    { 
        path: 'home',
        title:"Home",
        component:HomeComponent
    },
    { 
        path: 'login',
        title:'Login Page',
        component:LoginComponent
    },
    { 
        path: 'register',
        title:'Register Page',
        component:RegisterComponent
    },
    { 
        path: 'profile/:userId',
        title:'Profile',
        component:ProfileComponent,
        canActivate: [authGuard,areaAccessGuard]
    },
    { 
        path: 'student-profile/:stId',
        title:'Student Profile',
        component:StudentprofileComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'student',
        title:"Student List",
        component:StudentComponent,
        canActivate: [authGuard,areaAccessGuard]
    },
    { 
        path: 'subject',
        title:'Subject',
        component:SubjectComponent,
        canActivate: [authGuard,areaAccessGuard]
    },
    { 
        path: '**',
        component:PageNotFoundComponent
    }
];