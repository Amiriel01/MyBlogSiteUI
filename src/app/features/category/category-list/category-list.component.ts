import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
//CategoryListComponent is the name that is used in routing, it's found in the export statement
//implement the Oninit method
export class CategoryListComponent implements OnInit {
  //create variable to assign the response to, it can be a category or undefined
  // categories?: Category[]

  //if using an async pipe instead it can be done this way
  categories$?: Observable<Category[]>;

  //inject the CategoryService inside the component, create a constructor and inject it 
  constructor(private categoryService: CategoryService) {

  }

  //returns an observable so it can to be subscribed to
  ngOnInit(): void {
    //use this if using subscribe method
    //this.categoryService.getAllCategories();
    // .subscribe({
    //   next: (response) => {
    //     this.categories = response;
    //   }
    // })

    //use this if using the async pipe instead
    this.categories$ = this.categoryService.getAllCategories();
  }
}
