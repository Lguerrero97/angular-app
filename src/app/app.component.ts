import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  animationClass: string = 'roll-forward';
  showBanner = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
         this.showBanner = event.url !== '/login';
        const url = event.urlAfterRedirects;

        if (url.includes('/login')) {
          this.animationClass = 'bounce-spin';
        } else if (url.includes('/crud-products')) {
          this.animationClass = 'roll-forward';
        } else {
          this.animationClass = 'wave';
        }
      });
  }

  logout(){
    localStorage.removeItem('activeUser');
  }
}