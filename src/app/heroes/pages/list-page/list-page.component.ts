import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { interval, Observable, merge, from } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html'
})
export class ListPageComponent implements OnInit{
  public heroes: Hero[] = [];
  constructor(private heroesService: HeroesService) {
  }



  ngOnInit(): void {
     this.heroesService.getHeroes()
     .subscribe(heroes => this.heroes = heroes);
  }
}
