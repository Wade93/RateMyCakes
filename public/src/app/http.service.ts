import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http : HttpClient) {
  }
  getCakes(){
  return this._http.get('/cakes');
  }
  getCakeInfo(id){
    return this._http.get(`/cakes/${id}`)
  }
  addCake(newCake){
    return this._http.post('/cakes/', newCake);
  }
  rateCake(id, rating){
    return this._http.put(`/cakes/${id}/`, rating);
  }
  deleteCake(id){
    return this._http.delete(`/cakes/${id}/`)
  }
}
