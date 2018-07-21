import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { fuseConfig } from './fuse-config';
import { RouterModule } from '@angular/router';
import { FuseComingSoonComponent } from './main/content/pages/coming-soon/coming-soon.component';
import { ComingSoonModule } from './main/content/pages/coming-soon/coming-soon.module';
import { FuseMainModule } from './main/main.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ComingSoonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        { path: "", component: FuseComingSoonComponent}
      ]
    ),
    FuseModule.forRoot(fuseConfig),
    FuseSharedModule,
    FuseMainModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
