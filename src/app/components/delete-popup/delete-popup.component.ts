import { CommonModule } from '@angular/common';
import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-popup.component.html',
  styleUrl: './delete-popup.component.css'
})
export class DeletePopupComponent {
  @Input() modalOpen:boolean=false;
  @Input() deleteType:string="";
  @Output() conformationEvent=new EventEmitter<boolean>();
  modelClose():void{
    this.conformationEvent.emit(false);
    this.modalOpen=false;
  }
  modelReturn():void{
    this.conformationEvent.emit(true);
    this.modalOpen=false;
  }
}
