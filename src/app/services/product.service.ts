import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  constructor(private db: AngularFireDatabase) { }

  saveProduct(product){
    this.db.list('/products').push(product).then(res=>{      
      this.db.object('/products/'+res.key)
      .update({id: res.key});
    })
  }

  

  updateProduct(product, id){
    console.log(`Updating Product: ${product}`);
    return this.db.object('/products/'+id)
    .update(product);
    
  }

  deleteProduct(id){
    this.db.object('/products/'+id)
    .remove();
  }

  getAllProducts() : AngularFireList<Product>{
    return this.db.list<Product>('/products');
  }

  getProduct(productId) : AngularFireObject<Product>{
    return this.db.object('/products/'+productId);
  }
}
