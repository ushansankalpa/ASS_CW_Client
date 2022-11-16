import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'techqweb';

  blankUrl = '';
	currentUrl: string = '';
	checkoutUrls = ['/'];
  checkoutRegUrls = ['/register'];
	constructor(private router: Router) {

      // this.router.events.pipe(
      //   filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      //   map(e => {
      //     // e is now NavigationEnd
      //     this.currentUrl = e.url;
      //     // setTimeout(callback => {
      //     //   window.scrollTo(0, 0);
      //     // }, 100)
      //   })
      // );
		
	}

  ngOnInit() {
    
    // this.router.events.pipe(
    //   filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    //   map(e => {
    //     // e is now NavigationEnd
    //     this.currentUrl = e.url;
    //     setTimeout(callback => {
    //       window.scrollTo(0, 0);
    //     }, 100)
    //   })
    // );

    this.router.events.subscribe(value => {
      this.currentUrl = this.router.url.toString();
      if(value instanceof NavigationEnd){
        this.currentUrl = this.router.url;
        console.log(this.router.url.toString());
      }    
        
      });

    // this.router.events.filter(e => e instanceof NavigationEnd)
		// 	.subscribe((e: NavigationEnd) => {
		// 		this.currentUrl = e.url;
		// 		setTimeout(callback => {
		// 			window.scrollTo(0, 0);
		// 		}, 100)
		// 	});
  }


  isCheckoutRoute() {
		if (!this.currentUrl) {
			return false;
		}
		const index = this.checkoutUrls.indexOf(this.currentUrl);
    const index2 = this.checkoutRegUrls.indexOf(this.currentUrl);
		if ((index >= 0) || (index2 >= 0)) {
			return true;
		} else {
			return false;
		}
	}
}
