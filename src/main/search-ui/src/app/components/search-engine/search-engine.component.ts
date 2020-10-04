import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Router } from '@angular/router';
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
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css']
})
export class SearchEngineComponent implements OnInit {

  searchEngine: FormControl = new FormControl();
  userTopTenList: Array<UserDetails>;
  searchTerm: SearchTerm;
  showDropDown : boolean;

  constructor(private route : Router  , private searchEngineService: SearchEngineService) {
    this.searchTerm = SearchTerm.getSearchTermInstance();
  }

  ngOnInit() {
    /**
     * Typeahead form control
     */
    const typeahead = this.searchEngine.valueChanges.pipe(
      map((query) => {
        return query.length > 0 ? query : false;
      }),
      filter((query) => query),
      distinctUntilChanged(),
      debounceTime(2000),
      switchMap((searchTerm) => {
        this.searchTerm.term = searchTerm.toLowerCase();
        this.searchTerm.pageNo = 0;
        return this.searchEngineService.getSearchResults(this.searchTerm);
      })
    );

    typeahead.subscribe(
      (response) => {
        this.showDropDown =true;
        this.userTopTenList = this.highlightResponse(response);
        
      },
      (error) => {}
    );
  }

  highlightResponse(response : Array<UserDetails>){
    response.forEach(ele => {
      ele.searchIndex = ele.searchIndex.replace(this.searchEngine.value , "<b>"+ this.searchEngine.value +"</b>");
    });
    return response;
  }

  close(){
    this.searchEngine.patchValue("");
  }

  search(){ 
    this.showDropDown =false; 
    this.getTotalCount();
    this.searchEngineService._searchPageResults.next(this.userTopTenList);
    
   
  }

  onClickedOutside(event){
    this.showDropDown =false; 
  }

  getTotalCount(){
    this.searchEngineService.getTotalCount(this.searchTerm).subscribe(response =>{
      this.searchEngineService._totalPages.next(response);
    })
  }
}
