import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
categories;
mode='list';
currentCategory;
  constructor(private catService:CatalogueService) { }

  ngOnInit(){
    console.log("je passe par la")
    this.catService.getAllCategories()
    .subscribe( data=>
      {
        this.categories=data;
        console.log(this.categories)
      },err =>{
        console.log(err);
      }

      
    )
  }

  getAllCategories(){
    
      this.catService.getAllCategories()
    .subscribe( data=>
      {
        this.categories=data;
        console.log(this.categories)
      },err =>{
        console.log(err);
      }

      
    )
  }

  onDeleteCategory(c){
    let co = confirm("Etes-vous sur de vouloir supprimer cette categorie ?");
    if(!co){
      return;
    }
    this.catService.deleteCateggory(c)
    .subscribe(data=>
      {
        this.getAllCategories();
      },err=>{
        console.log(err);
      })
  }

  addCategory(){

    this.mode='new-cat';
  }

  saveCategory(data){
    console.log(data);
    this.catService.addCategory(data)
      .subscribe(
      data =>
      {
        this.mode='list';
        this.getAllCategories();
      },err=>{
        console.log(err);
      }
    );
  }

  onEditCategory(c){
    this.catService.getCatToModify(c._links.self.href)
    .subscribe(
      data=>{
        this.currentCategory=data;
        this.mode='edit-mode';
      },err=>{
        console.log(err)
      }
    )
  }

  putCategory(data,url){
    console.log(data);
    this.catService.putCategory(data,url)
    .subscribe(
      data =>{
        this.mode='list';
        this.getAllCategories();
      },err=>{
        console.log(err);
      }
    )
  }

}
