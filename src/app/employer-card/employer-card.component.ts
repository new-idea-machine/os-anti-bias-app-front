import { Component, Input } from '@angular/core';
import { Employer } from '../interfaces/employer';

@Component({
  selector: 'app-employer-card',
  standalone: true,
  imports: [],
  templateUrl: './employer-card.component.html',
  styleUrl: './employer-card.component.css'
})
export class EmployerCardComponent {
  @Input() employer: Employer | undefined;
}
