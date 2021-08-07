import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimulaLoadingService {

  constructor(
    private http: HttpClient
  ) { }

  simulaLoading() {
    this.http.get("").subscribe();
  }
}
