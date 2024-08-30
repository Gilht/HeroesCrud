import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { NewHeroePageComponent } from './pages/new-heroe-page/new-heroe-page.component';


@NgModule({
  declarations: [
    HeroPageComponent,
    ListPageComponent,
    LayoutPageComponent,
    SearchPageComponent,
    NewHeroePageComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule
  ]
})
export class HeroesModule { }
