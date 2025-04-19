import { Routes } from '@angular/router';
import { ShapeCardComponent } from './shape-card/shape-card.component';

export const routes: Routes = [

    {path: 'shape', component: ShapeCardComponent},

    {path: '**', redirectTo: 'shape', pathMatch: 'full'},
];
