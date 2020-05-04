import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { ProductsComponent } from '../products/products.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private catService:CatalogueService,private router:Router) { }
  categories;
   Products;
   currentCategory;
  ngOnInit() {
    this.catService.getAllCategories().subscribe( data =>{
      this.categories = data
    }

    )
   
  }


  onGetProducts(cat){

this.currentCategory = cat;
console.log('la log de cat ' + cat.name);

    this.router.navigateByUrl("products/"+cat.name) ;
  }



}
