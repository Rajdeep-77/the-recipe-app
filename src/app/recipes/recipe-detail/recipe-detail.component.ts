import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe-list/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id:number;
  constructor(private recipeServie: RecipeService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    // const id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeServie.getRecipe(this.id);
    });
  }

  onAddToShoppingList(){
    this.recipeServie.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo:this.route});
  }

  onDeleteRecipe(){
    this.recipeServie.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
