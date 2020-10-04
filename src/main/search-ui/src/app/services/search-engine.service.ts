import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { SearchTerm } from "../models/SearchTerm";
import { UserDetails } from "../models/UserDetails";

@Injectable({
  providedIn: "root",
})
export class SearchEngineService {
 
  public _searchPageResults = new Subject<Array<UserDetails>>();

  public _totalPages =  new Subject<number>();

  constructor(private http: HttpClient) {}

  getSearchResults(searchTerm: SearchTerm): Observable<Array<UserDetails>> {
    return this.http.post<Array<UserDetails>>(
      environment.server_url + "search",
      searchTerm
    );
  }


  getTotalCount(searchTerm: SearchTerm): Observable<number> {
    return this.http.post<number>(
      environment.server_url + "total-count",
      searchTerm
    );
  }

  getUserDetails(searchTerm: SearchTerm) {
    return this.http.post<Array<UserDetails>>(
      environment.server_url + "user-details",
      searchTerm
    );
  }


}
