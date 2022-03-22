import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { Guid } from 'guid-typescript';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup,FormControl } from '@angular/forms';
import { IfStmt, ThisReceiver } from '@angular/compiler';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  faCheckCircle = faCheckCircle;
  products!: Product[];
  form: any;
  selected:string = "X";
  checkboxR = false;
  checkboxV = false;
  checkboxA = false;

 
 
  
  
  

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
    console.log( "valor react = " + this.form.value.reactCheck)
  

  }

  checkBoxReact(event:any)
  {
    console.log("event => " + event);
     
    if(event.checked === undefined)
    {
      this.checkboxR = true;
     
    }else{
      this.checkboxR = false;
    }
    return this.checkboxR;
   
  }

  checkBoxVue(event:any)
  {
    console.log("event => " + event);
     
    if(event.checked === undefined)
    {
      this.checkboxV = true;
     
    }else{
      this.checkboxV = false;
    }
    return this.checkboxV;
   
  }
  
  checkBoxAngular(event:any)
  {
    console.log("event => " + event);
     
    if(event.checked === undefined)
    {
      this.checkboxA = true;
     
    }else{
      this.checkboxA = false;
    }
    return this.checkboxA;
   
  }


  RegisterProduct():void {
    
   
    
    if(this.checkboxR === true )
    {
      this.form.value.reactCheck = this.selected;
    }

    if(this.checkboxV === true )
    {
      this.form.value.vueCheck = this.selected;
    }
    
    if(this.checkboxA === true)
    {
      this.form.value.angularCheck = this.selected;
    }

    
    
   
   
    if(this.form.name == null)
    {
      this.form.value.purchaseId = null;
      
      if(this.form.value.name != null){
        this.form.value.purchaseId = Guid.create().toString();
        
      }
    
    }
    

    
    this.form.value.isFinished = false;
    
    

    const product: Product = this.form.value;
    this.products.push(product);
    localStorage.setItem('DB',JSON.stringify(this.products));
   
   
    
    
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

  confirmButton()
  {
    window.location.reload();
  }

 
  
  
}
