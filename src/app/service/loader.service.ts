import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  get currentUserValue(): boolean {
    return this.isLoadingSubject.value;
  }

  constructor() {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  public startLoader(url: string = 'app') {
    //if (this.reqs.length === 0) {
      // console.log('startLoader');
      
      this. start();
     // localStorage.setItem('isLoading', 'true');
    //}
    //this.reqs.push(url);
  }
  public stopLoader(url: string = 'app') {
   // this.reqs = this.reqs.filter(x => !(x === url));
    //if (this.reqs.length === 0) {
      setTimeout(() => {
        this.stop()

        //localStorage.removeItem('isLoading');
      }, 300);
    //}
  }

  start() {
    this.isLoadingSubject.next(true);
  }

  stop() {
    this.isLoadingSubject.next(false);
  }
}
