import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { DialectService } from '../../../shared/dialect.service';
import { NotificationService } from '../../../shared/notification.service';
import { DialectComponent } from '../../dialect/dialect.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Dialect } from '../../../shared/dialect';
import { ILanguage } from '../../../shared/language';
import { GermanServiceService } from '../../../shared/german-service.service';
import { German } from '../../../shared/german';
import { GermanListComponent } from '../german-list.component';


@Component({
  selector: 'app-new-german-entry',
  templateUrl: './new-german-entry.component.html',
  styleUrls: ['./new-german-entry.component.css']
})
export class NewGermanEntryComponent implements OnInit {


  isChecked: boolean;

  displayedPartOfSpeechs =  ['Nomen', 'Verb', 'Adjektiv', 'Artikel', 'Pronomen', 'Numeral', 'Adverb', 'Präposition', 'Konjunktion', 'Interjektion'];
  partOfSpeechs =           ['NOUN', 'VERB', 'ADJECTIVE', 'ARTICLE', 'PRONOUN', 'NUMERAL', 'ADVERB', 'PREPOSITION', 'CONJUNCTION', 'INTERJECTION'];

  currentPartOfSpeechState: boolean[] = [];
  currentLinguisticUsageState: boolean[] = [];


  displayedLinguisticUsages = ['science', 'tech', 'med', 'bio', 'jobs', 'educ', 'ling', 'acad', 'econ', 'bot', 'comm'];
  linguisticUsages = ['SCIENCE', 'TECH', 'MED', 'BIO', 'JOBS', 'EDUC', 'LING', 'ACAD', 'ECON', 'BOT', 'COMM'];
  selectedDisplayedLinguisticUsages;



  orderForm: FormGroup;
  items: FormArray;
  tempArray;


  constructor(
    public service: GermanServiceService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<GermanListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }




  // ###########################################
  newEntry: German;
  germanId: string;
  selectedLanguage: string;
  updatedEntryName: string;
  previousEntryData: German;
  previousViewData: German[]; // update for callback!



  ngOnInit() { }

  onClear() {
    this.service.germanEntryForm.reset();
    this.service.initGermanForm();
  }

  onSubmit() {
    if (this.service.germanEntryForm.valid) { // ! löschen!
      this.updatedEntryName = this.service.germanEntryForm.value.germanEntry;
      console.log(this.updatedEntryName, "updated entry <----")
      this.service.createNewGermanEntry(this.service.germanEntryForm.value);
      this.onClose();
    }
  }

  onClose() {
    this.service.germanEntryForm.reset();
    this.service.initGermanForm();
    this.dialogRef.close(this.previousViewData);
  }


  onEditEntry() {
    console.log("aus onEditEntry aus editgermanentry.comp.ts")
  }

  partOfSpeechAdapter(data) {
    // TODO
  }


  onNgModelChange(event) {
    console.warn('on ng model change delete this method?', event);
  }

  // required!
  selectionChange(event) {
    this.isChecked = event.selected;
    //console.error("ist selected?: ", event.selected);

  }

  //required!
  onPartOfSpeechCheckBoxCheck(index) {
    this.currentPartOfSpeechState[index] = this.isChecked;
  }

  //required!
  onLinguisticUsageCheckBoxCheck(index) {
    this.currentLinguisticUsageState[index] = this.isChecked;
  }
}

