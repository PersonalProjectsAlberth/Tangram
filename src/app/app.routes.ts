import { Routes } from '@angular/router';
import { ShapeCardComponent } from './shape-card/shape-card.component';
import { ScanComponent } from './scan/scan.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { HowToPlayComponent } from './how-to-play/how-to-play.component';

export const routes: Routes = [

    {path: 'login', component: LoginComponent },
    {path: 'shape', component: ShapeCardComponent, canActivate: [AuthGuard]},
    {path: 'shape/:id', component: ScanComponent, canActivate: [AuthGuard]},
    {path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard]},
    {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
    {path: 'howtoplay', component: HowToPlayComponent, canActivate: [AuthGuard]},

    {path: '**', redirectTo: 'login', pathMatch: 'full'},
];
