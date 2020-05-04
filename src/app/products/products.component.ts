import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products;
urlEnc:string;
jwt:string;
  constructor(private catalogueService:CatalogueService,
    private route:ActivatedRoute,private router:Router) {
     

      router.events.subscribe(event => {
        if(event instanceof NavigationEnd) {
      console.log(route);
      this.jwt = localStorage.getItem('tocken');
  console.log("valeur de jwt "+this.jwt);
  let param:string=this.route.snapshot.params.urlProds;
   console.log("url a decoder : " + param);
    
      
     let request:string = "http://localhost:8087/products/"+param;
      
    console.log("apres decodage " + request); 
     this.getProducts(request);
        }
     
      });
    }

  ngOnInit(): void {
  }

  getProducts(url){
this.catalogueService.getRessource(url).subscribe(
data => {
  console.log("valeur de data " + data);
  this.products=data;
  console.log(this.products);
},err=>{
  console.log(err);
}

)
  }
}
