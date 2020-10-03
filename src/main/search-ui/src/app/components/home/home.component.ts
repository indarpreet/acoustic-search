import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from "rxjs/operators";
import { SearchTerm } from 'src/app/models/SearchTerm';
import { UserDetails } from 'src/app/models/UserDetails';
import { SearchEngineService } from 'src/app/services/search-engine.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  searchEngineList = [1, 2, 3, 4, 5, 6];
  searchEngine: FormControl = new FormControl();
  userTopTenList: Array<UserDetails>;
  searchTerm: SearchTerm;

  constructor(private searchEngineService: SearchEngineService) {
    this.searchTerm = new SearchTerm();
  }

  ngOnInit() {
    /**
     * Typeahead form control
     */
    const typeahead = this.searchEngine.valueChanges.pipe(
      map((query) => {
        return query.length > 0 ? query : this.userTopTenList = undefined;
      }),
      filter((query) => query),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        this.searchTerm.term = searchTerm.toLowerCase();
        this.searchTerm.pageNo = 0;
        return this.getSearchResults();
      })
    );

    typeahead.subscribe(
      (response) => {
        this.userTopTenList = response;
      },
      (error) => {}
    );
  }

  /**
   * This method is called on click of page number
   */
  getSearchResultsByPage(pageNo) {
    this.searchTerm.pageNo = pageNo;
    this.getSearchResults().subscribe(
      (response) => {
        console.log("Next page results");
      },
      (error) => {}
    );
  }

  getSearchResults() {
    return this.searchEngineService.getSearchResults(this.searchTerm);
  }
}
