import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
    selectedIndex = 0;
    items = [
        {
            link: 'home',
            icon: 'home',
        },
        {
            link: 'pasienter',
            icon: 'users',
        },
        {
            link: 'bilder',
            icon: 'images',
        },
        {
            link: 'admin',
            icon: 'user-tie',
        },
    ];

    constructor() {}

    ngOnInit(): void {}

    select(index: number): void {
        this.selectedIndex = index;
    }
}
