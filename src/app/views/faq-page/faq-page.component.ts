import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifierService } from "angular-notifier";

declare let $: any;

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.css'],
})
export class FaqPageComponent implements OnInit {

  private readonly notifier: NotifierService;

  sendError: string;
  successMessage: string;
  showErrorMessage: boolean;
  showSuccessMessage: boolean;

  userEmail;
  subjectLine;
  content;

  emailOwner: FormGroup = new FormGroup({
    userEmail: new FormControl(null),
    subjectLine: new FormControl(null),
    content: new FormControl(null)
  });

  constructor(private notifierService: NotifierService
  ) { this.notifier = notifierService; }

  ngOnInit(): void {
    $('.ui.accordion').accordion();
  }

  toggleModal() {
    $('#emailModal').modal('toggle');
    this.emailOwner.reset();
  }

  sendEmail() {
    this.userEmail = (document.getElementById('userEmail') as HTMLInputElement).value;
    this.subjectLine = (document.getElementById('subjectLine') as HTMLInputElement).value;
    this.content = (document.getElementById('content') as HTMLInputElement).value;

    alert('add code to send email here\n\nemail: ' + this.userEmail + '\nsubject line: ' + this.subjectLine + '\ncontent: ' + this.content);

    // call service here, test for error and success, display msg for 3 seconds and then close modal

    this.notifier.notify("error", "testing error msg");
    this.notifier.notify("success", "testing success msg");

    setTimeout(() => { this.toggleModal(); }, 1500);
  }
}
