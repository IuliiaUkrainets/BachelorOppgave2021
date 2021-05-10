import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchParamService } from '../../_services/search-param.service';

@Component({
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
    @ViewChild('searchField') searchField: ElementRef;
    search: string;

    constructor(
        public accountService: AccountService,
        private router: Router,
        private toastr: ToastrService,
        private searchService: SearchParamService
    ) {}

    ngOnInit(): void {
        this.searchService.search.subscribe((result) => {
            this.search = result; // this set's the username to the default observable value
        });
    }

    logout(): void {
        this.accountService.logout();
        this.router.navigateByUrl('/');
    }

    updateSearch(): void {
        this.searchService.changeSearch(this.search);
        this.search = '';
    }
}
