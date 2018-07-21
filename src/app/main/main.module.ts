import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseContentModule } from 'app/main/content/content.module';
import { FuseMainComponent } from './main.component';
import { ComingSoonModule } from './content/pages/coming-soon/coming-soon.module';
import { FuseComingSoonComponent } from './content/pages/coming-soon/coming-soon.component';


@NgModule({
    declarations: [
        FuseMainComponent,
    ],
    imports     : [
        RouterModule.forRoot(
            [
              { path: "", component: FuseComingSoonComponent}
            ]
          ),

        MatSidenavModule,

        FuseSharedModule,
        ComingSoonModule,
        FuseContentModule,
    ],
    exports     : [
        FuseMainComponent
    ]
})
export class FuseMainModule
{
}
