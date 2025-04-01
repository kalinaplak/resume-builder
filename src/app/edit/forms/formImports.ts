import { FormsModule } from "@angular/forms";
import { EducationDataFormComponent } from "./educationDataForm.component";
import { EmploymentDataFormComponent } from "./employmentDataForm.component";
import { HobbiesDataFormComponent } from "./hobbiesDataForm.component";
import { LanguagesDataFormComponent } from "./languagesDataForm.component";
import { ProfileDataFormComponent } from "./profileDataForm.component";
import { SkillsDataFormComponent } from "./skillsDataForm.component";
import { WebsitesDataFormComponent } from "./websitesDataForm.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

export const dataForms = [
  ProfileDataFormComponent,
  EmploymentDataFormComponent,
  EducationDataFormComponent,
  SkillsDataFormComponent,
  WebsitesDataFormComponent,
  LanguagesDataFormComponent,
  HobbiesDataFormComponent
];

export const dataFormsUtils = [
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatButtonModule,
  MatIconModule,
];