import { Component, HostBinding, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations/index';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector   : 'fuse-content',
    templateUrl: './content.component.html',
    styleUrls  : ['./content.component.scss'],
    animations : fuseAnimations
})
export class FuseContentComponent
{
  
    constructor(
    )
    {
    }
}
