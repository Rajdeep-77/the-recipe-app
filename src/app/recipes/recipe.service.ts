import { EventEmitter, Injectable } from "@angular/core";
// import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe-list/recipe.model";

@Injectable()
export class RecipeService {
    // recipeSelected =new Subject<Recipe>();
    // recipeSelected =new EventEmitter<Recipe>();

    private recipes: Recipe[] =[
        new Recipe('Tasty Schnitzel',
        'A super-tasty Schnitzel',
        'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG', 
        // "https://cdn.iconscout.com/icon/free/png-256/gujrati-food-1851596-1569321.png"
        [ new Ingredient('Meat',1), new Ingredient('French fries',20) ]),

        new Recipe('Big Fat Burger',
        'What else you need to say?',
        'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
        // "https://cdn.iconscout.com/icon/free/png-256/gujrati-food-1851596-1569321.png"
        [ new Ingredient('Buns',2), new Ingredient('Meat',1) ])
    ];

    constructor(private slService: ShoppingListService) {}

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index:number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }
}