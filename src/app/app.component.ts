import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import {MediaMatcher} from '@angular/cdk/layout';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public collapsed = false;
  title = 'techqweb';

  blankUrl = '';
	currentUrl: string = '';
	checkoutUrls = ['/'];
  checkoutRegUrls = ['/register'];
  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);

  isExpanded = true;
  state = 'collapsed';

  mobileQuery!: MediaQueryList;
  private _mobileQueryListener!: () => void;
 
  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
    this.collapsed = !this.collapsed
  }

	constructor(private router: Router,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
		
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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logOut(){
    localStorage.removeItem('user_id');
    this.router.navigate(['/']);
  }

}
