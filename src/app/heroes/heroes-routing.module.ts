import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewHeroePageComponent } from './pages/new-heroe-page/new-heroe-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutPageComponent,
    children: [
      { path: "new-hero", component: NewHeroePageComponent },
      { path: "search", component: SearchPageComponent },
      { path: "edit/:id", component: NewHeroePageComponent },
      { path: "list", component: ListPageComponent },
      { path: ":id/", component: HeroPageComponent },
      { path: "**", redirectTo: "list" }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
