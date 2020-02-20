import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor() { }

  showMenu(){
    const showMenu = localStorage.getItem('showItems');
    if (showMenu) {
      return true;
    } else {
      return false;
    }
  }


}
