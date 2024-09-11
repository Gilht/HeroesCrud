import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit{

  public myHeroes: Hero[] = [];

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),              
    superhero:  new FormControl<string>('', { nonNullable: true }),        
    publisher:  new FormControl<Publisher>(Publisher.DCComics),        
    alter_ego:   new FormControl(''),       
    first_appearance:  new FormControl(''), 
    characters:  new FormControl(''),       
    alt_img: new FormControl(''),         
  });

  public publishers = [
    { id: "DC Comics", desc: "DC - Comics"},
    { id: "Marvel Comics", desc: "Marvel - Comics"}
  ]

  constructor(
    private heroService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
    ) {}

  get currenthero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
   if (!this.router.url.includes("edit")) return;

   this.activatedRoute.params
   .pipe(
    switchMap(({id}) => this.heroService.getHeroById(id))
   ).subscribe(hero => {
    if(!hero) return this.router.navigateByUrl("/");

    this.heroForm.reset(hero);
    return;
   })
  }

  onSubmit(): void{
    if(this.heroForm.invalid) return;

    if (this.currenthero.id) {
      this.heroService.updateHero(this.currenthero)
      .subscribe((hero) => {
        this.showSnackBar(`${hero.superhero} has been updated`);
      })
      return;
    }

    this.heroService.addHero(this.currenthero)
    .subscribe((hero) => {
      this.showSnackBar(`${hero.superhero} created`);
      this.router.navigate(['heroes/edit', hero.id]);
    })
    // console.log({
    //   formIsValid: this.heroForm.valid,
    //   value: this.heroForm.value
    // });
  }

  onDeleteHero(){
    console.log("open component dialog ");
    if(!this.currenthero.id) throw Error("error on show confirmation")

    const dialogRef = this.dialog.open(ConfirmDialogComponent ,{
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
    .pipe(
      filter((result: boolean) => result),
      switchMap(() => this.heroService.deleteHeroById(this.currenthero.id)),
      filter((wasDeleted: boolean) => wasDeleted),
    )
    .subscribe(() => {
      this.router.navigate(['/heroes']);
    })
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, "done", {
      duration: 2500
    })
  }
}
