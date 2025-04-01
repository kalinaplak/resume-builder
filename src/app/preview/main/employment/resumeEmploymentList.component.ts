import { Component, Input } from '@angular/core';

@Component({
	selector: 'resume-employment-list',
	template: `
		@if(sectionTitle && entries?.length){ 
			<div class="underline">{{sectionTitle}}</div> 
		}
		<ul class="ml-8">
			@for(entry of entries; track entry){
				<li class="list-disc list-outside">{{ entry }}</li>
			}
		</ul>
	`
})

export class ResumeEmploymentListComponent {
  @Input({ required: true }) sectionTitle: string | undefined;
  @Input({ required: true }) entries: string[] | undefined = [];
}