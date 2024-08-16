import { CommonModule, formatDate} from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Resume } from '../interfaces/resume';
import { EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-resume-form',
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.css']
})


export class ResumeFormComponent implements OnInit {
  @Input() resume: Resume | undefined;
  @Output() formSubmitted = new EventEmitter();
  @Output() cancelEdit = new EventEmitter();
  resumeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    //INITIALIZE THE FORM GROUP WITH DEFAULT EMPTY CONTROLS AND VALIDATORS
    this.resumeForm = this.fb.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      skills: this.fb.array([]),
      education: this.fb.array([]),
      workExperience: this.fb.array([]),
      contactInformation: this.fb.group({
        phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
        emailAddress: ['', [Validators.required, Validators.email]],
        linkedInProfile: [''],
        otherSocialMedia: ['']
      }),
      projects: this.fb.array([]),
      certifications: this.fb.array([]),
      languages: this.fb.array([]),
    });
  }

  ngOnInit() {
    //IF RESUME DATA IS PROVIDED, POPULATE THE FROM WITH EXISTING DATA
    if (this.resume) {
      this.populateForm(this.resume);
    } else {
      //IF NO RESUME DATA, ADD EMPTY FORM CONTROL
      this.addSkill();
      this.addEducation();
      this.addWorkExperience();
      this.addProject();
      this.addCertification();
    }
  }

  //POPULATE THE FORM WITH RESUME DATA
  populateForm(resume: Resume) {
    this.resumeForm.patchValue({
      resume_id: resume.resume_id,
      title: resume.title,
      summary: resume.summary,
      contactInformation: resume.contactInformation
    });

    resume.skills.forEach(skill => this.skills.push(this.fb.control(skill)));
    resume.education.forEach(edu => this.education.push(this.fb.group({
      degree: [edu.degree, Validators.required],
      school: [edu.school, Validators.required],
      major: [edu.major, Validators.required],
      graduationYear: [edu.graduationYear, Validators.required]
    })));

    resume.workExperience.forEach(work => this.workExperience.push(this.fb.group({
      jobTitle: [work.jobTitle, Validators.required],
      company: [work.company, Validators.required],
      location: [work.location, Validators.required],
      startDate: [formatDate(work.startDate, 'yyyy-MM-dd', 'en'), Validators.required],
      endDate: [formatDate(work.endDate, 'yyyy-MM-dd', 'en'), Validators.required],
      responsibilities: this.fb.array(work.responsibilities.map(res => this.fb.control(res))),
      achievements: this.fb.array(work.achievements.map(ach => this.fb.control(ach)))
    })));

    resume.projects.forEach(project => this.projects.push(this.fb.group({
      projectName: [project.projectName, Validators.required],
      description: [project.description, Validators.required],
      rolesResponsibilities: this.fb.array(project.rolesResponsibilities.map(role => this.fb.control(role))),
      technologiesUsed: this.fb.array(project.technologiesUsed.map(tech => this.fb.control(tech)))
    })));

    resume.certifications.forEach(cert => this.certifications.push(this.fb.group({
      certificationName: [cert.certificationName, Validators.required],
      issuingOrganization: [cert.issuingOrganization, Validators.required],
      dateEarned:[formatDate(cert.dateEarned, 'yyyy-MM-dd', 'en'), Validators.required],
    })));

    resume.languages.forEach(lang => this.languages.push(this.fb.group({
      languageName: [lang.languageName, Validators.required],
      proficiencyLevel: [lang.proficiencyLevel, Validators.required]
    })));

  }

  //GETTERS FOR FORM ARRAYS - THIS IS BETTER FOR REUSABILITY AND READABLITY
  get skills(): FormArray {
    return this.resumeForm.get('skills') as FormArray;
  }

  get education(): FormArray {
    return this.resumeForm.get('education') as FormArray;
  }

  get workExperience(): FormArray {
    return this.resumeForm.get('workExperience') as FormArray;
  }

  getWorkExperienceResponsibilities(workIndex: number): FormArray {
    return this.workExperience.at(workIndex).get('responsibilities') as FormArray;
  }

  getWorkExperienceAchievements(workIndex: number): FormArray {
    return this.workExperience.at(workIndex).get('achievements') as FormArray;
  }

  get projects(): FormArray {
    return this.resumeForm.get('projects') as FormArray;
  }

  getProjectRolesResponsibilties(projectIndex: number): FormArray {
    return this.projects.at(projectIndex).get('rolesResponsibilities') as FormArray;
  }

  getProjectTechnologiesUsed(projectIndex: number): FormArray {
    return this.projects.at(projectIndex).get('technologiesUsed') as FormArray;
  }

  get certifications(): FormArray {
    return this.resumeForm.get('certifications') as FormArray;
  }

  get languages(): FormArray {
    return this.resumeForm.get('languages') as FormArray;
  }


  //METHODS TO ADD NEW FORM CONTROLS
  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  addEducation() {
    this.education.push(this.fb.group({
      degree: ['', Validators.required],
      school: ['', Validators.required],
      major: ['', Validators.required],
      graduationYear: [null, Validators.required]
    }));
  }

  addWorkExperience() {
    this.workExperience.push(this.fb.group({
      jobTitle: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      responsibilities: this.fb.array([]),
      achievements: this.fb.array([])
    }));
  }

  addResponsibility(workIndex: number) {
    this.getWorkExperienceResponsibilities(workIndex).push(this.fb.control(''));
  }

  addAchievement(workIndex: number) {
    this.getWorkExperienceAchievements(workIndex).push(this.fb.control(''));
  }

  addProject() {
    this.projects.push(this.fb.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      rolesResponsibilities: this.fb.array([]),
      technologiesUsed: this.fb.array([])
    }));
  }

  addRoleResponsibility(projectIndex: number) {
    this.getProjectRolesResponsibilties(projectIndex).push(this.fb.control(''));
  }

  addTechnology(projectIndex: number) {
    this.getProjectTechnologiesUsed(projectIndex).push(this.fb.control(''));
  }

  addCertification() {
    this.certifications.push(this.fb.group({
      certificationName: ['', Validators.required],
      issuingOrganization: ['', Validators.required],
      dateEarned: [null, Validators.required]
    }));
  }

  addLanguage() {
    this.languages.push(this.fb.group({
      languageName: ['', Validators.required],
      proficiencyLevel: ['', Validators.required]
    }));
  }

  //FORM SUBMIT HANDLER
  onSubmit(): void {
    // Check if the form is valid before proceeding
    // Skills Array - remove empty string


    if (this.resumeForm.valid) {
      // Update the resume object with form values
      const updatedResume= {
        ...this.resume,
        ...this.resumeForm.value
      };
      this.formSubmitted.emit(updatedResume);
    } else {
      this.resumeForm.markAllAsTouched();
    }
  }

  cancelEditMode(): void {
    this.cancelEdit.emit();
  }

}






