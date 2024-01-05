import { Component } from '@angular/core';
import { sendTransaction } from './minting';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <input #nameEl placeholder="username" />
    <button (click)="mint(nameEl.value)">Mint</button>
  `,
})
export class AppComponent {
  mint(name: string) {
    sendTransaction(name);
  }
}
