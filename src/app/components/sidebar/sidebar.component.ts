import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/user-profile', title: 'User profile',  icon: 'ni-single-02 text-yellow', class: '' },
    { path: '/details-contrat', title: 'Contrat',  icon: 'ni ni-archive-2 text-red', class: '' },
    { path: '/client', title: 'Client',  icon: 'ni ni-circle-08 text-green', class: '' },
    { path: '/paiement', title: 'Paiement',  icon: 'ni ni-money-coins text-orange', class: '' }
 // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
 // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
 // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
 // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
