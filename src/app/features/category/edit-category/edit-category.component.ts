import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

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
  editCategorySubsciption?: Subscription;
  category?: Category;

  //create constuctor
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private router: Router
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
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? '',
    };

    //pass this object to service 
    if (this.id){
      this.editCategorySubsciption = this.categoryService.updateCategory(this.id, updateCategoryRequest)
      .subscribe({
        next: (response) => {
          //add router to the constructor above
          this.router.navigateByUrl('/admin/categories');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.paramsSubsciption?.unsubscribe();
    this.editCategorySubsciption?.unsubscribe();
  }
}
