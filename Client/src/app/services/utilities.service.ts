import { Injectable, ViewContainerRef } from '@angular/core';
import 'rxjs/add/operator/map';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';

@Injectable()
export class UtilitiesService {
  constructor(
    private modalDialogService: ModalDialogService,
    private viewContainer: ViewContainerRef,
  ) {}

  showSpinner() {
    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = 'inline';
      el.style['opacity'] = '0.5';
    }
  }

  hideSpinner() {
    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = 'none';
    }
  }

  openSimpleModal(
    title: string,
    message: string,
    viewContainer: ViewContainerRef,
  ) {
    this.modalDialogService.openDialog(viewContainer, {
      title: title,
      childComponent: SimpleModalComponent,
      settings: {
        closeButtonClass: 'close theme-icon-close',
      },
      data: {
        text: message,
      },
    });
  }
}
