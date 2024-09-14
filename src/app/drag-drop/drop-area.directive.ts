import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[dropHere]',
  standalone: true
})
export class DropAreaDirective {


  log() {
    console.log('opa')
  }

  @HostListener('drop' , ['$event']) 
  onDrop(e : DragEvent) {
    
    console.log('drop');
    console.log(e.dataTransfer?.getData('text/plain') )
  }

  // TW : Ambiguidade >:(  !!!!
  // Drag Over não é "acabou o drag event", é "o drag está over/sobre aqui"
  // mais um motivo para ultima flor do lácio >>> tio san language
  @HostListener('dragover' , ['$event']) 
  onDragOver(e: DragEvent) {
    e.preventDefault()
    return;
    // console.log('drag over')
    // console.log(e)
  }

  constructor() { }

}
