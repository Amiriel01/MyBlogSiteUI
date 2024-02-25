import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})

//add lifecycle hook from Angular component that implements the ng OnDestroy method
//ctrl . on AddCategory Component to create a template for the ngOnDestroy, place it after the onFormSubmit method
export class AddCategoryComponent implements OnDestroy {
  //capture values from the add-category form
  //models folder, add-category-request.model.ts has the interface for the values for this form
  model : AddCategoryRequest;

  //add private subscribe and unsubscribe to prevent memory leaks and unsubscribe when the subscription request is no longer needed
  //make it a subsciption type or undefined using the ?
  private addCategorySubscription?: Subscription

  //create a constructor for the model: AddCategoryRequest
  //add the injectable categoryService from the category.service.ts
  constructor(private categoryService: CategoryService) {
    this.model = {
      name: '',
      urlHandle: '',
    };
  }

  //define method for submitting the add-category form in the html file
  onFormSubmit() {
    // console.log(this.model);

    //on form submit will submit the add category information using the model above

    //assign subscription coming from the addCategory method using this.addCategorySubcription = 
    this.addCategorySubscription = this.categoryService.addCategory(this.model)

    //must use the subscribe method for the Observable to be used
    .subscribe({
      next: (response) => {
        console.log('This was successful.');
      },
      error: (error) => {
        console.log('There is an error');
        console.log(error)
      },
    })
  }

  //place the ngOnDestroy here inside the component
  //this will unsubscribe from the subscription whenever the component is destroyed
  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
