import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'info-tab',
  templateUrl: './info-tab.component.html',
  styleUrls: ['./info-tab.component.css']
})
export class InfoTabComponent {

  @Output() editRequest = new EventEmitter<string>(true);

  public requestEdit(templateRef: Element) {
    var ta = document.createElement("textarea");
    ta.innerHTML = templateRef.innerHTML;
    this.editRequest.emit(ta.value);
  }

}
