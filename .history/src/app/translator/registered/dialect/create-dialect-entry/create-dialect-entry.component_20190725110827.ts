

import { ILanguage } from '../../../shared/language';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { DialectService } from '../../../shared/dialect.service';
import { NotificationService } from '../../../shared/notification.service';
import { DialectComponent } from '../dialect.component';

@Component({
  selector: 'app-create-dialect-entry',
  templateUrl: './create-dialect-entry.component.html',
  styleUrls: ['./create-dialect-entry.component.css']
})
export class CreateDialectEntryComponent implements OnInit {

  availableLanguages: ILanguage[];

  displayedPartOfSpeechs = ['Nomen', 'Verb', 'Adjektiv', 'Artikel', 'Pronomen', 'Numeral', 'Adverb', 'Präposition', 'Konjunktion', 'Interjektion'];
  partOfSpeechs =           ['NOUN', 'VERB', 'ADJECTIVE', 'ARTICLE', 'PRONOUN', 'NUMERAL', 'ADVERB', 'PREPOSITION', 'CONJUNCTION', 'INTERJECTION'];

  displayedLinguisticUsages = ['science', 'tech', 'med', 'bio', 'jobs', 'educ', 'ling', 'acad', 'econ', 'bot', 'comm'];
  linguisticUsages = ['SCIENCE', 'TECH', 'MED', 'BIO', 'JOBS', 'EDUC', 'LING', 'ACAD', 'ECON', 'BOT', 'COMM'];


  constructor(public service: DialectService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<DialectComponent>) { }

  ngOnInit() {
    this.service.getLanguages()
        .subscribe((resp: ILanguage[]) => {
        this.availableLanguages = resp;
      });
  }

  onClear() {
    this.service.formCreateDialect.reset();
    this.service.initializeCreateDialectEntryForm();
    this.notificationService.success(':: Submitted successfully');
  }

  onSubmit() {
    if (this.service.formCreateDialect.valid) {
      this.service.createNewDialectEntry(this.service.formCreateDialect.value);
      this.onClose();
    }
  }

  onClose() {
    this.service.formCreateDialect.reset();
    this.service.initializeCreateDialectEntryForm();
    this.dialogRef.close();
  }
}
