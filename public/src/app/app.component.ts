import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cakes: Object;
  cakeInfo : Object;
  showCakes: boolean = false;
  showCake: boolean = false;
  editCake: boolean = false;
  newCake: Object;
  cakeToEdit: Object;
  newRating: Object;
  avgRating: number;

  constructor(private _httpService: HttpService){}
  ngOnInit() {
    this.getCakesFromService();
    this.newCake = {};
    this.cakeToEdit = {};
    this.newRating = {};
  }
   

  getCakesFromService(){
    let observable = this._httpService.getCakes()
    observable.subscribe(data => {
      console.log("Got our data!", data);
      this.cakes = data;
      this.showCakes = true;
    })
  }
  showCakeInfo(id){
    this.editCake = false;
    let cake = this._httpService.getCakeInfo(id);
    cake.subscribe(data => {
      console.log("Got our cake info!", data);
      if (data["ratings"].length > 0){
        let sum = 0;
        for (let rating of data["ratings"]){
          sum += rating;
        }
        this.avgRating = (sum/data["ratings"].length).toFixed(1);
      }
      this.cakeInfo = data;
      this.showCake = true;
    })
  }


  onSubmit(){
    let observable = this._httpService.addCake(this.newCake);
    observable.subscribe(data => {
      console.log("Got data from post back!", data);
      this.newCake = {};
    })
    this.getCakesFromService();
  }

  editOneCake(id){
    this.showCake = false;
    let cake = this._httpService.getCakeInfo(id);
    cake.subscribe(data =>{
      this.cakeToEdit = data;
      this.editCake = true;
    })
  }

  rateOneCake(id){
    console.log(id);
    let cake = this._httpService.rateCake(id, this.newRating);
    cake.subscribe(data => {
      console.log("Successfully updated cake!", data);
      this.newRating = {};
      this.editCake = false;
      this.getCakesFromService();
      if (this.showCake == true){
        this.showCakeInfo(id);
      }
    })
  }

  destroyCake(id){
    let observable = this._httpService.deleteCake(id);
    observable.subscribe(data => {
      console.log("Deleted cake", data);
    })
    this.getCakesFromService();
  }
}
