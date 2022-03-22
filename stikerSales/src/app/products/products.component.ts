import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { Guid } from 'guid-typescript';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup,FormControl } from '@angular/forms';
import { IfStmt, ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  faCheckCircle = faCheckCircle;
  products!: Product[];
  form: any;

  constructor() { }

  ngOnInit(): void {
   
    this.ShoppingCart();
    this.form = new FormGroup({
      purchaseId: new FormControl(),
      name: new FormControl(),
      observation: new FormControl(),
      quantity: new FormControl(),
      isFinished: new FormControl(),  
    });
  }

  RegisterProduct():void {

    this.form.value.purchaseId = Guid.create().toString();
    this.form.value.isFinished = false;
    this.form.value.reactCheck = "X"; 
    this.form.value.vueCheck = "X";
    this.form.value.angularCheck = "X";

    const product: Product = this.form.value;
    this.products.push(product);
    localStorage.setItem('DB',JSON.stringify(this.products));
    this.form.reset();
  }

  ShoppingCart():void{
    if(localStorage.getItem('DB')){
      this.products = JSON.parse(localStorage.getItem('DB')!); 
    }
    else{
      this.products = [];
    }
  }

  RefreshProduct(purchaseId: string){
      const index: number = this.products.findIndex(p => p.purchaseId === purchaseId);

      if(this.products[index].isFinished){
        this.products[index].isFinished = false;
      }
      else{
        this.products[index].isFinished = true;
      }

      localStorage.setItem('DB',JSON.stringify(this.products));
  }

  
  
}
