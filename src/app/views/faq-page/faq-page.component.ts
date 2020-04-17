import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare let $: any;

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.css']
})
export class FaqPageComponent implements OnInit {
  sendError:string;
  successMessage:string;
  showErrorMessage:boolean;
  showSuccessMessage:boolean;

  userEmail;
  subjectLine;
  content;

  emailOwner: FormGroup = new FormGroup({
    userEmail: new FormControl(null),
    subjectLine: new FormControl(null),
    content: new FormControl(null)
  })

  constructor() { }

  ngOnInit(): void {
    $('.ui.accordion').accordion();
  }

  toggleModal() {
    $('#emailModal').modal('toggle');
  }

  sendEmail() {
    this.userEmail = (<HTMLInputElement>document.getElementById("userEmail")).value;
    this.subjectLine = (<HTMLInputElement>document.getElementById("subjectLine")).value;
    this.content = (<HTMLInputElement>document.getElementById("content")).value;

    alert("add code to send email here\n\nemail: " + this.userEmail + "\nsubject line: " + this.subjectLine + "\ncontent: " + this.content);

    // call service here, test for error and success, display msg for 3 seconds and then close modal
    this.sendError = "Testing error message.";
    this.successMessage = "Testing success message.";

    this.showErrorMessage = true;
    setTimeout(() => { this.showErrorMessage = false; this.showSuccessMessage = true; }, 2000);
    setTimeout(() => { this.showSuccessMessage = false; this.toggleModal(); }, 4000);

    this.emailOwner.reset();
  }
}
