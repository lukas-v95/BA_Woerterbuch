import { CreateDialectLanguageComponent } from '../dialect/create-dialect-language/create-dialect-language.component';
import { AddSynonymComponent } from './../dialect/add-synonym/add-synonym.component';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ILanguage } from './../../shared/language';
import { PartOfSpeech } from './../../shared/entry';


import { NotificationService } from '../../shared/notification.service';
import { DialectService } from '../../shared/dialect.service';
import { DialectComponent } from '../dialect/dialect.component';
import { Dialect } from '../../shared/dialect';
import { CreateDialectEntryComponent } from '../dialect/create-dialect-entry/create-dialect-entry.component';
import { AddGermanReferenceComponent } from '../dialect/add-german-reference/add-german-reference.component';
import { DeleteSynonymComponent } from '../dialect/delete-synonym/delete-synonym.component';


@Component({
  selector: 'app-dialect-list',
  templateUrl: './dialect-list.component.html',
  styleUrls: ['./dialect-list.component.css']
})
export class DialectListComponent implements OnInit {

  showTableContent = false;
  partOfSpeechs = ['NOUN', 'VERB', 'ADJECTIVE', 'ARTICLE', 'PRONOUN', 'NUMERAL', 'ADVERB', 'PREPOSITION', 'CONJUNCTION', 'INTERJECTION'];
  linguisticUsages = ['SCIENCE', 'TECH', 'MED', 'BIO', 'JOBS', 'EDUC', 'LING', 'ACAD', 'ECON', 'BOT', 'COMM'];

  availableLanguages: ILanguage[];
  selectedLanguage: string;

  constructor(public service: DialectService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['dialectEntry', 'dialectId', 'partOfSpeech', 'linguisticUsage', 'synonyms', 'synonymsCB', 'germanRef', 'modifyReferences', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  entryList: {};

  currentViewData: Dialect[];
  panelOpenState = false;
  buttonActive;
  userInput;



  ngOnInit() {
    this.fetchLanguages();
    //this.populateForm();
    //this.createFormInputs();

  }


  fetchLanguages() {

    this.service.getLanguages()
      .subscribe((resp: ILanguage[]) => {
        this.availableLanguages = resp;
      });
  }

  onSearchClear() {
    this.searchKey = "";
  }


  buttonControl(filterValue){
    if(filterValue.length < 4){
      this.buttonActive = false;
    } else {
      this.buttonActive = true;
    }
  }


  onCreateDialectEntry() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = "60%";
    let dialogRef = this.dialog.open(CreateDialectEntryComponent, {
      maxWidth: '70vw',
      maxHeight: '95vh',
      height: '90%',
      width: '70%',
    });

    dialogRef.afterClosed().subscribe( () => {
      this.ngOnInit();
    });
  }


  onCreateDialectLanguage(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = "60%";
    let dialogRef = this.dialog.open(CreateDialectLanguageComponent, {

     /* maxWidth: '20vw',
      maxHeight: '40vh',
      height: '40%',
      width: '20%',
      */
     maxWidth: '40vw',
      maxHeight: '80vh',
      height: '80%',
      width: '40%',
    });

    dialogRef.afterClosed().subscribe( () => {
      this.ngOnInit();
    });
  }


  onEdit(row) {
    let adaptedArray = this.formControlAdapter(row);

    this.service.initializeFormEditDialect();
    this.service.setEditFormGroup(this.selectedLanguage, adaptedArray, row);


    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = "60%";

    let dialogRef = this.dialog.open(DialectComponent, {
      maxWidth: '70vw',
      maxHeight: '70vh',
      height: '70%',
      width: '70%',
      data: {
        selectedLanguage: this.selectedLanguage,
        dialectId: row.dialect.dialectId,
        previousEntryData: row,
        previousViewData: this.currentViewData,
      }
    });

    dialogRef.afterClosed().subscribe( () => {
      this.ngOnInit();
    });
  }

    onClear() {
      this.userInput = "";
     }


  onDelete($key) {

    let language = "dornbirnerisch";
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteDialectEntry(language, $key.dialect.dialectId);
    };
    //this.notificationService.warn('! Deleted successfully');

  }

  // returns a form array with true or false for each index,
  //depending on if resp. json entry is present 
  formControlAdapter(row) {

    let partOfSpeechArray = row.dialect.partOfSpeech.partOfSpeechs;
    let adaptedPartOfSpeechArray = new Array<boolean>(this.partOfSpeechs.length);
    adaptedPartOfSpeechArray.fill(false);



    for (let i = 0; i < partOfSpeechArray.length; i++) {
      for (let j = 0; j < this.partOfSpeechs.length; j++) {
        if (this.partOfSpeechs[j] === partOfSpeechArray[i]) {
          adaptedPartOfSpeechArray[j] = true;
        }
      }

    }
    // return adaptedPartOfSpeechArray;
    let linguisticUsageArray = row.dialect.linguisticUsage.linguisticUsages;
    let adaptedLinguisticUsageArray = new Array<boolean>(this.linguisticUsages.length);
    adaptedLinguisticUsageArray.fill(false);

    for (let i = 0; i < linguisticUsageArray.length; i++) {
      for (let j = 0; j < this.linguisticUsages.length; j++) {
        if (this.linguisticUsages[j] === linguisticUsageArray[i]) {
          adaptedLinguisticUsageArray[j] = true;
        }
      }


    }
    let array = [adaptedPartOfSpeechArray, adaptedLinguisticUsageArray];
    return array;
  }

  fetchDialectData() {
    this.showTableContent = true;
    this.getAllDialectEntries();
  }

  getAllDialectEntries() {
    this.service.getAllDialectEntries(this.selectedLanguage)
      .subscribe((resp: Dialect[]) => {

        this.currentViewData = resp;
        this.listData = new MatTableDataSource<Dialect>(this.currentViewData);


        // filter:
        this.listData.sort = this.sort;
        this.listData.filterPredicate = (data, filter): boolean => {
          const dataStr = data.dialect.dialectEntryLowerCase + data.dialect.dialectId + data.dialect.refToGermanId;
          return dataStr.indexOf(filter) !== -1;
        };

        // enable sorting:
        // Sorting ascending/descending on icon click:
        this.listData.sortingDataAccessor = (item, property) => {
          if (property === 'dialectEntry') {
            return item.dialect.dialectEntry;
          } else if (property === 'dialectId') {
            return item.dialect.dialectId;
          } else if (property === 'synonym') {
            return item.dialect.synonymObjectList.entryName;
          } else {
            return item[property];
          }
        };
        // enable pagination
        this.listData.paginator = this.paginator;
      });
  }
  
  applyFilter() {
    this.searchKey.toLowerCase();
    console.log(this.searchKey);
    console.log("--> ", this.searchKey.toLowerCase());
    
    this.listData.filter = this.searchKey.trim(); // this.searchKey.trim().toLowerCase()
  }


  addSynonym(entry) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = "60%";
    let dialogRef = this.dialog.open(AddSynonymComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: {
        language: this.selectedLanguage,
        dialectId: entry.dialect.dialectId,
      }

    });

    dialogRef.afterClosed().subscribe( () => {
      this.ngOnInit();
    });

  }

  removeSynonym(entry) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialogRef = this.dialog.open(DeleteSynonymComponent, {
      maxWidth: '40vw',
      maxHeight: '40vh',
      height: '40%',
      width: '40%',
      data: {
        language: this.selectedLanguage,
        entry: entry,
      }
    });

    dialogRef.afterClosed().subscribe( () => {
      this.getAllDialectEntries();

    });
  }

  addGermanRef(entry) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialogRef = this.dialog.open(AddGermanReferenceComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      height: '80%',
      width: '80%',
      data: {
        language: this.selectedLanguage,
        dialectId: entry.dialect.dialectId,
      }
    });

    dialogRef.afterClosed().subscribe( () => {
      this.ngOnInit();
    });
  }

  removeGermanRef(entry) {
    if (!(entry.dialect.refToGermanId === null || entry.dialect.refToGermanId === "")) {
      if (confirm(`Möchtest du die deutsche Referenz dieses Eintrags wirklich löschen ?
Die Referenz auf diesen Eintrag wird auch im deutschen Eintrag entfernt.`)) {
        this.service.removeGermanRefFromDialect(this.selectedLanguage, entry.dialect.dialectId);
      }
    } else {
      confirm("there is no German Ref to delete!");
    }
  }
}

