import { Routes } from '@angular/router';
import { ShapeCardComponent } from './shape-card/shape-card.component';
import { ScanComponent } from './scan/scan.component';

export const routes: Routes = [

    {path: 'shape', component: ShapeCardComponent},
    {path: 'shape/:id', component: ScanComponent},

    {path: '**', redirectTo: 'shape', pathMatch: 'full'},
];
