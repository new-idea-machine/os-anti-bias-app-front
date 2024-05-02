export interface Resume {

  id:string;
  title:string;
  summary: String;
  skills: [String];
  education: [
    {
      degree: String,
      school: String,
      major: String,
      graduationYear: Number,
    }
  ];
  workExperience: [
    {
      jobTitle: String,
      company: String,
      location: String,
      startDate: Date,
      endDate: Date,
      responsibilities: [String],
      achievements: [String],
    },
  ];
  projects: [
    {
      projectName: String,
      description: String,
      rolesResponsibilities: [String],
      technologiesUsed: [String],
    },
  ];
  certifications: [
    {
      certificationName: String,
      issuingOrganization: String,
      dateEarned: Date,
    },
  ];
  languages: [
    {
      languageName: String,
      proficiencyLevel: String,
    },
  ];
  references: [ {
    referenceName: String,
    relationship: String,
    contactInformation: String,
  }];
  contactInformation: {
    phoneNumber: String,
    emailAddress: String,
    linkedInProfile: String,
    otherSocialMedia: String,
  }

}