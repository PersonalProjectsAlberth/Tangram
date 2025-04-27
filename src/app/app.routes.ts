import { Routes } from '@angular/router';
import { ShapeCardComponent } from './shape-card/shape-card.component';
import { ScanComponent } from './scan/scan.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [

    {path: 'shape', component: ShapeCardComponent},
    {path: 'shape/:id', component: ScanComponent},
    {path: 'statistics', component: StatisticsComponent},
    {path: 'settings', component: SettingsComponent},

    {path: '**', redirectTo: 'shape', pathMatch: 'full'},
];
