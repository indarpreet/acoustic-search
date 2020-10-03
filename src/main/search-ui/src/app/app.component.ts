import { query } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from "rxjs/operators";
import { SearchTerm } from "./models/SearchTerm";
import { UserDetails } from "./models/UserDetails";
import { SearchEngineService } from "./service/search-engine.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
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
      map((query) => query),
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
