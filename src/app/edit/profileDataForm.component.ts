import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'profile-data-form',
  imports: [FormsModule],
  template: `
    <form #profileForm="ngForm">
    </form>
  `
})

export class ProfileDataFormComponent {

}