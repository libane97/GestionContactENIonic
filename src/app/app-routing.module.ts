import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'add-contact',
    loadChildren: () => import('./add-contact/add-contact.module').then( m => m.AddContactPageModule)
  },
  {
    path: 'edit-contact/:id',
    loadChildren: () => import('./edit-contact/edit-contact.module').then( m => m.EditContactPageModule)
  },
  {
    path: 'selected-contactby-id/:id',
    loadChildren: () => import('./selected-contactby-id/selected-contactby-id.module').then( m => m.SelectedContactbyIdPageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'etudiants/:id',
    loadChildren: () => import('./etudiants/etudiants.module').then( m => m.EtudiantsPageModule)
  },
  {
    path: 'etudiant',
    loadChildren: () => import('./etudiant/etudiant.module').then( m => m.EtudiantPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
