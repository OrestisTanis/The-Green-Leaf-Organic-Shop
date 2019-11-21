## The Green Leaf Organic Shop
(This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.9.)

The Green Leaf is a simple e-commerce application built with Angular 8, Bootstrap 4 and Firebase, where:
- Users are able to filter their searches for products and even anonymous users can add items to a shopping cart.
- User authentication (currently through Google or Facebook accounts) is necessary for 'checking out' as well as viewing user order history.
- Users with administrator privileges can create/modify/delete products via the application's user interface, as well as view the shop's entire client order history. For demonstration purposes, all authenticated users get administrator privileges.
- All app, user and product data is stored in a Firebase Real-time Database.

## Live Demo Link
[https://oshop-bb9c1.firebaseapp.com/](https://oshop-bb9c1.firebaseapp.com/)

## Features 
The Green Leaf is an Angular project with:
- [Firebase Real-time Database](https://firebase.google.com/docs/database) (implemented with [angularfire2](https://github.com/angular/angularfire)).
- [Firebase Authentication](https://firebase.google.com/docs/auth) (implemented with [angularfire2](https://github.com/angular/angularfire)).
- [Bootstrap 4](https://getbootstrap.com/) (implemented with [NG Bootstrap](https://ng-bootstrap.github.io/)).
- [Font Awesome](https://github.com/FortAwesome/angular-fontawesome)
- [RxJS](https://github.com/ReactiveX/rxjs)


## Running the Application Locally
```
git clone https://github.com/OrestisTanis/The-Green-Leaf-Organic-Shop.git
cd The-Green-Leaf-Organic-Shop/
npm install
ng serve
```
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
