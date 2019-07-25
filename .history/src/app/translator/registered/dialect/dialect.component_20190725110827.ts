
import { PartOfSpeech } from './../../shared/entry';
import { MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort, MatDialogRef } from '@angular/material';
import { NotificationService } from '../../shared/notification.service';
import { DialectService } from '../../shared/dialect.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ILanguage } from '../../shared/language';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, ControlValueAccessor } from '@angular/forms';
import { Dialect } from '../../shared/dialect';
import { stringify } from 'querystring';

@Component({
  selector: 'app-dialect',
  templateUrl: './dialect.component.html',
  styleUrls: ['./dialect.component.css']
})
export class DialectComponent implements OnInit {
  
  availableLanguages: ILanguage[];
  isChecked: boolean;

  displayedPartOfSpeechs = ['Nomen', 'Verb', 'Adjektiv', 'Artikel', 'Pronomen', 'Numeral', 'Adverb', 'Präposition', 'Konjunktion', 'Interjektion'];
  partOfSpeechs = ['NOUN', 'VERB', 'ADJECTIVE', 'ARTICLE', 'PRONOUN', 'NUMERAL', 'ADVERB', 'PREPOSITION', 'CONJUNCTION', 'INTERJECTION'];

  currentPartOfSpeechState: boolean[] = [];
  currentLinguisticUsageState: boolean[] = [];


  displayedLinguisticUsages = ['science', 'tech', 'med', 'bio', 'jobs', 'educ', 'ling', 'acad', 'econ', 'bot', 'comm'];
  linguisticUsages = ['SCIENCE', 'TECH', 'MED', 'BIO', 'JOBS', 'EDUC', 'LING', 'ACAD', 'ECON', 'BOT', 'COMM'];
  selectedDisplayedLinguisticUsages;

  orderForm: FormGroup;
  items: FormArray;
  tempArray;

  // ::::::::::::::::::::::CONSTRUCTOR!!!!:::::::::::::::::::::::::::::
  constructor(
    public service: DialectService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<DialectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  // ::::::::::::::::::::::CONSTRUCTOR!!!!:::::::::::::::::::::::::::::


  newEntry: Dialect;
  dialectId: string;
  selectedLanguage: string;
  updatedEntryName: string;
  previousEntryData: Dialect;
  previousViewData: Dialect[]; // update for callback!



  ngOnInit() {
    this.selectedLanguage = this.data.selectedLanguage;
    this.dialectId = this.data.dialectId;
    this.previousEntryData = this.data.previousEntryData;
    this.previousViewData = this.data.previousViewData;

    this.initCheckboxes();
    this.service.getLanguages()
      .subscribe((resp: ILanguage[]) => {
        this.availableLanguages = resp;
      });
  }

  onClear() {
    this.service.formEditDialectEntry.reset();
    this.service.initializeFormEditDialect();
  }

  onSubmit() {

    if (this.service.formEditDialectEntry.valid) { // ! löschen!
      this.updatedEntryName = this.service.formEditDialectEntry.value.dialectEntry;
      this.updateData();
      this.service.updateEntry(this.selectedLanguage, this.previousEntryData);
      this.updatePreviousViewCallback();
      this.onClose();
    }
  }

  updateData() {
    let grammar = this.parseBoolArraysToStringArrays();
    this.previousEntryData.dialect.dialectEntry = this.service.formEditDialectEntry.value.dialectEntry;
    this.previousEntryData.dialect.partOfSpeech.partOfSpeechs = JSON.parse(JSON.stringify(grammar[0]));
    this.previousEntryData.dialect.linguisticUsage.linguisticUsages = JSON.parse(JSON.stringify(grammar[1]));
  }

  updatePreviousViewCallback() {

    for (let i = 0; i < this.previousViewData.length; i++) {
      if (this.previousViewData[i].dialect.dialectId === this.dialectId) {
        this.previousViewData[i].dialect = this.previousEntryData.dialect;
      }
    }
  }

  parseBoolArraysToStringArrays(): Array<Array<string>> {

    // how many indizes are checked?
    let partOfSpeechCounter = 0;
    for (let i = 0; i < this.currentPartOfSpeechState.length; ++i) {
      if (this.currentPartOfSpeechState[i] === true) {
        partOfSpeechCounter++;
      }
    }

    let tempPartOfSpeechArr: string[] = new Array(partOfSpeechCounter).fill('');

    // fill first array:
    partOfSpeechCounter = 0;
    for (let i = 0; i < this.currentPartOfSpeechState.length; i++) {
      if (this.currentPartOfSpeechState[i] === true) {
        // add elements from service to new tempArr:
        tempPartOfSpeechArr[partOfSpeechCounter] = this.service.partOfSpeechs[i];
        partOfSpeechCounter++;
      }
    }

    // second part:
    let linguisicUsageCounter = 0;
    for (let i = 0; i < this.currentLinguisticUsageState.length; i++) {
      if (this.currentLinguisticUsageState[i] === true) {
        linguisicUsageCounter++;
      }
    }
    let tempLinguisticUsageArr: string[] = new Array(linguisicUsageCounter).fill('error');

    // fill second array:
    linguisicUsageCounter = 0;
    for (let i = 0; i < this.currentLinguisticUsageState.length; i++) {
      if (this.currentLinguisticUsageState[i] === true) {
        // add elements from service to new Array:
        tempLinguisticUsageArr[linguisicUsageCounter] = this.service.linguisticUsages[i];
        linguisicUsageCounter++;
      }
    }

    let arrContainer = new Array(2);
    arrContainer[0] = tempPartOfSpeechArr;
    arrContainer[1] = tempLinguisticUsageArr;

    return arrContainer;
  }

  onClose() {
    this.service.formEditDialectEntry.reset();
    this.service.initializeFormEditDialect();
    this.dialogRef.close(this.previousViewData);
  }


  onEditEntry() {
    console.log("aus onEditEntry aus dialect.comp.ts")
  }

  partOfSpeechAdapter(data) {
    // TODO
  }

  onDeleteSynonymEntry() {
    console.log("TODO ");
  }



  editPartyRolesSubmit() {

  }

  initCheckboxes() {
    let partOfSpeechs = this.service.formEditDialectEntry.get('partOfSpeech').value; // .get([j]).value
    let linguisticUsages = this.service.formEditDialectEntry.get('linguisticUsage').value;

    this.currentPartOfSpeechState = new Array(this.partOfSpeechs.length).fill(false);
    this.currentLinguisticUsageState = new Array(this.linguisticUsages.length).fill(false);


    for (let i = 0; i < partOfSpeechs.length; i++) {
      this.currentPartOfSpeechState[i] = partOfSpeechs[i];
      //console.warn(partOfSpeechs[i]);
    }

    for (let i = 0; i < linguisticUsages.length; i++) {
      this.currentLinguisticUsageState[i] = linguisticUsages[i];
    }
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
