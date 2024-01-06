import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { sendTransaction } from './minting';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  styleUrl: `./app.component.scss`,
  template: `
    <input #nameEl placeholder="Please enter unique username" />
    <button (click)="mint(nameEl.value)" [disabled]="disabled">
      Create Account and Mint NFT
    </button>

    <div>
      <br />
      <ul>
        <li *ngFor="let item of statusTextList()" [innerHTML]="item"></li>
      </ul>

      @if (errorText()) {
      <span class="error">{{ errorText() }}</span>
      }
    </div>
  `,
})
export class AppComponent {
  statusTextList = signal<string[]>([]);
  errorText = signal('');
  disabled: boolean = false;

  async mint(name: string) {
    this.disabled = true;
    try {
      const [events, receipt] = await sendTransaction(name, (x) =>
        this.statusTextList.update((y) => [...y, x])
      );

      this.statusTextList.update((x) => [
        ...x,
        `Receipt hash: ${receipt.hash}`,
        'Completed successfully!',
      ]);
    } catch (err: any) {
      this.errorText.set(err.message);
    }
  }
}
