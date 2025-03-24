import { Component, Input } from '@angular/core';
import { DateRangeComponent } from '../../../shared/components/dateRange.component';

@Component({
	selector: 'resume-employment-header',
	imports: [DateRangeComponent],
	template: `
		@if(history){
			<h3>{{ history.position }} at {{ history.employer }}, {{ history.city }}</h3>
			<date-range [startDate]="history.startDate" [endDate]="history.endDate" />
		}
	`
})
export class ResumeEmploymentHistoryHeaderComponent {
	@Input({ required: true }) history: EmploymentDataEntry | undefined;

}