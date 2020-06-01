import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AuthentificationGuard } from 'src/app/authentification.guard';
import { UserDetailsComponent } from 'src/app/pages/user/user-details/user-details.component';
import { ContratComponent } from 'src/app/pages/contrat/contrat.component';
import { ClientComponent } from 'src/app/pages/client/client-details/client.component';
import { ClientAddComponent } from 'src/app/pages/client/client-add/client-add.component';
import { DetailsContratComponent } from 'src/app/pages/details-contrat/details-contrat.component';
import { MailingComponent } from 'src/app/pages/mailing/mailing.component';
import { PaiementComponent } from 'src/app/pages/paiement/paiement.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent,  canActivate: [AuthentificationGuard] },
    { path: 'user-profile',   component: UserProfileComponent,  canActivate: [AuthentificationGuard] },
    { path: 'tables',         component: TablesComponent,  canActivate: [AuthentificationGuard] },
    { path: 'icons',          component: IconsComponent,  canActivate: [AuthentificationGuard] },
    { path: 'maps',           component: MapsComponent,  canActivate: [AuthentificationGuard] },
    { path: 'user-details',   component: UserDetailsComponent,  canActivate: [AuthentificationGuard] },
    { path: 'client',         component: ClientComponent,  canActivate: [AuthentificationGuard] },
    { path: 'add-client',     component: ClientAddComponent,  canActivate: [AuthentificationGuard] },
    { path: 'contrat',        component: ContratComponent,  canActivate: [AuthentificationGuard] },
    { path: 'details-contrat', component: DetailsContratComponent,  canActivate: [AuthentificationGuard] },
    { path: 'send-mail',      component: MailingComponent,  canActivate: [AuthentificationGuard] },
    { path: 'paiement',        component: PaiementComponent,  canActivate: [AuthentificationGuard] }
];
