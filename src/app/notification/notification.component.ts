import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  template: `
    <div class="notification-container">
      {{ message }}
    </div>
  `,
  styles: [`
    .notification-container {
      background: #4caf50;
      color: white;
      padding: 10px;
      border-radius: 5px;
      position: relative;
    }
  `]
})
export class NotificationComponent {
  @Input() message!: string;
}
