import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.scss']
})
export class LogoutModalComponent {
 //Font-Awesome Icons 
 faLeaf = faLeaf;

  constructor(private authService : AuthService,
    private router:Router,
    private modalService: NgbModal) { }
  
  logout(){
    this.router.navigate(['/']);  
    this.authService.logout();     
    this.modalService.dismissAll();     
  }

  closeModal() {
    this.modalService.dismissAll();
  }



}
