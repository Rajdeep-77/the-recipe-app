import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  subscription:Subscription;

  constructor( private recipeService: RecipeService,   private router:Router,   private route:ActivatedRoute) { }
  

  ngOnInit() {
    this.subscription = this.recipeService.recipeChanged.subscribe( (recipeArray:Recipe[]) => { this.recipes = recipeArray; } );
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo:this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
