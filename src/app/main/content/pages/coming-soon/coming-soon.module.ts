import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseCountdownModule } from '@fuse/components';

import { FuseComingSoonComponent } from './coming-soon.component';
import { RouterModule } from '@angular/router';
// const routes = [
//     {
//         path     : '',
//         component: FuseComingSoonComponent
//     }
// ];

@NgModule({
    declarations: [
        FuseComingSoonComponent
    ],
    imports     : [
        //RouterModule.forChild(routes),
        FuseSharedModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FuseCountdownModule
    ],
    exports:[
        FuseComingSoonComponent
    ]
})
export class ComingSoonModule
{
}
