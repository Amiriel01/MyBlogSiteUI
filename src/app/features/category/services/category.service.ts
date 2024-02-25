import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//create services file by using the command prompt ng g s and the name of the file
//service files are automatically injected in the root file and also the app.module.ts file under declarations
//to use http in the project, import the HttpClientModule in the app.module.ts file and add its import
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  //inject HttpClient in the constructor
  constructor(private http: HttpClient) { }

  //create a method to add the category, import the model being used into the method as a prop, make it type Observable, and import it from rxjs
  addCategory(model: AddCategoryRequest): Observable<void> {
    //return the srting url used in swagger
    return this.http.post<void>(`https://localhost:7013/api/Catagories`, model);
  }
}
