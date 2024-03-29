import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { CookieService } from 'ngx-cookie-service';

//create services file by using the command prompt ng g s and the name of the file
//service files are automatically injected in the root file and also the app.module.ts file under declarations
//to use http in the project, import the HttpClientModule in the app.module.ts file and add its import
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  //inject HttpClient in the constructor
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  //create method to get all categories
  //type is Observable, create domain model for Category in the models folder
  getAllCategories(): Observable<Category[]> {
    //returns an array of category
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Catagories`);
  }

  //create a service method to get a category by its id and use it inside the edit-category.component.ts file
  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/Catagories/${id}`);
  }

  //create a method to add the category, import the model being used into the method as a prop, make it type Observable, and import it from rxjs
  addCategory(model: AddCategoryRequest): Observable<void> {
    //return the srting url used in swagger
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Catagories?addAuth=true`, model);
  }

  //update category
  updateCategory(id: string, updateCategoryRequest: UpdateCategoryRequest): Observable<Category> {
    //talk to the api, give it the id it needs and the object it needs to update the entry
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/Catagories/${id}?addAuth=true`, updateCategoryRequest);
  }

  //delete category
  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`${environment.apiBaseUrl}/api/Catagories/${id}?addAuth=true`);
  }
}
