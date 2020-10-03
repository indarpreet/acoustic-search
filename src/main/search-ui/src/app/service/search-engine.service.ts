import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { SearchTerm } from "../models/SearchTerm";
import { UserDetails } from "../models/UserDetails";

@Injectable({
  providedIn: "root",
})
export class SearchEngineService {

  constructor(private http: HttpClient) {}

  getSearchResults(searchTerm: SearchTerm): Observable<Array<UserDetails>> {
    return this.http.post<Array<UserDetails>>(
      environment.server_url + "search",
      searchTerm
    );
  }

  // getPageResults(searchTerm: SearchTerm): Observable<Array<UserDetails>> {
  //   return this.http.post<Array<UserDetails>>(
  //     environment.server_url + "search/next",
  //     searchTerm
  //   );
  // }
}
