import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  //give a variable for id
  id: string | null = null;
  //create subsciptions for paramMap so it can be unsubscribed from
  paramsSubsciption?: Subscription;
  category?: Category;

  //create constuctor
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
    ) {
    
  }

  ngOnInit(): void {
    //this.paramsSubscription is not equal to the route subscribe
    this.paramsSubsciption = this.route.paramMap.subscribe({
      next: (params) => {
       this.id = params.get('id');

       if (this.id) {
        //get the data from the api for this category id, create a service method to do this in the category.service.ts file
        this.categoryService.getCategoryById(this.id)
        .subscribe({
          next: (response) => {
            this.category = response;
          }
        });
       }
      }
    });
  }

  onFormSubmit(): void {
    console.log(this.category)
  }

  ngOnDestroy(): void {
    this.paramsSubsciption?.unsubscribe();
  }
}
