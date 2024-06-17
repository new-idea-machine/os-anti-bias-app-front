import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-information-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-information-form.component.html',
  styleUrl: './contact-information-form.component.css'
})
export class ContactInformationFormComponent implements OnInit {
  @Input() contactInformationForm!: FormGroup;

  constructor(){}

  ngOnInit(): void {

  }


}
