import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe-list/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthServiceService } from "../auth/auth-service.service";

@Injectable({providedIn:'root'})
export class DataStorageService{

    constructor(private http:HttpClient, private recipeService:RecipeService, private authService:AuthServiceService){}


    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http
        .put( 'https://ng-course-recipe-book-2034c-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe(response => {console.log(response);});
    }

    fetchRecipes(){
            return this.http
            .get<Recipe[]>('https://ng-course-recipe-book-2034c-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
                    map( recipes => {
                                return recipes.map( recipe => { return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }; });
                                    }),
                    tap( recipes => { this.recipeService.setRecipes(recipes); })
        );
       
    }

}