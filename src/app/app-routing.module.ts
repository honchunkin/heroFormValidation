import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroFormTemplateComponent } from './template/hero-form-template.component';
import { HeroFormReactiveComponent } from './reactive/hero-form-reactive.component';
import { SelectItemComponent } from './select-item/select-item.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: SelectItemComponent },
  { path: 'reactive', component: HeroFormReactiveComponent },
  { path: 'template', component: HeroFormTemplateComponent },
  { path: 'helloworld', component: HelloWorldComponent },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
