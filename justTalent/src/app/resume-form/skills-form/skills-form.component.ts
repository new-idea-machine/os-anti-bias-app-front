import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-skills-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './skills-form.component.html',
  styleUrl: './skills-form.component.css'
})
export class SkillsFormComponent implements OnInit {
  @Input() skillsForm!: FormArray;



  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

  }

  addSkill(): void {
    this.skillsForm.push(this.fb.control(''));
  }

  removeSkill(index: number): void {
    this.skillsForm.removeAt(index);
  }




}
