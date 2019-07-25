import { Component, OnInit, ViewChild, ContentChild, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Entry } from '../shared/entry';
import { DialectService } from '../shared/dialect.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-unregistered-search',
  templateUrl: './unregistered-search.component.html',
  styleUrls: ['./unregistered-search.component.css']
})
export class UnregisteredSearchComponent implements OnInit {
 // @Input() languages = { tester: String }
 // @Output() notifySearchPressed: EventEmitter<FormInformation> = new EventEmitter<FormInformation>();

  formGroup: FormGroup;
  titleAlert = 'This field is required';
  typesafeEntries: Entry[];
  searchInfos: FormInformation;
  availableLanguages: any;
  difOptions: boolean = true;

 listData: MatTableDataSource<any>;
 displayedColumns: string[] = ['searched', 'german', 'dialectEntry', 'partOfSpeech', 'linguisticUsage', 'synonyms'];

 @ViewChild (MatSort) sort: MatSort;
 @ViewChild (MatPaginator) paginator: MatPaginator;


 constructor(private formBuilder: FormBuilder, private service: DialectService) {}


  ngOnInit() {
    this.performRestGetLanguages();

    // consume rest api
    this.createForm();

    //this.formGroup.get('name').markAsTouched();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({

      'languageControl1': ["", Validators.required],
      'languageControl2': ["", Validators.required],
      'searchString': ["", Validators.required],
      // 'validate': ''
    });
  }


  get searchString() {
    return this.formGroup.get('searchString');
  }

  onSubmit() {
    this.getEntryList(
      this.formGroup.get('languageControl1').value,
      this.formGroup.get('languageControl2').value,
      this.formGroup.get('searchString').value
    );
    console.log(this.formGroup.get('languageControl1').value, "<--------");
  }

  getEntryList(lang1: string, lang2: string, searchString: string) {
    console.error(lang1, lang2, searchString);
    
    this.service.getCompleteSearchResults(lang1, lang2, searchString)
      .subscribe((resp: Entry[]) => {

      this.typesafeEntries = resp;
      console.log("searchResult:")
      this.listData = new MatTableDataSource<Entry>(this.typesafeEntries);
      this.listData.sort = this.sort;
      console.log(this.listData);

      // enable sorting
      this.listData.sortingDataAccessor = (item, property) => {
        if (property === 'dialectEntry') {
          return item.dialectB.dialectEntry;
        } else if (property === 'german') {
          return item.german.germanEntry;
        } else {
          return item[property];
        }
      };
      // enable pagination
      this.listData.paginator = this.paginator;

    });
  }

  performRestGetLanguages() {
    this.service.getLanguages()
      .subscribe((data: {}) => this.availableLanguages = data);
      console.log(this.availableLanguages)
  }
  /*
   // same as above:
    performRestGetLanguages() {
      this.userService.getLanguages()
        .subscribe(data => this.availableLanguages = data);
    }
  */


 checkDifferentOptions(option){
   console.log(option);
  if(this.formGroup.get('languageControl1').value === this.formGroup.get('languageControl2').value){
    this.difOptions = false;
  } else {
    this.difOptions = true;
  }

 }


 onCreate(){
   console.error("TO implement!!")
 }



}

export interface FormInformation {
  language1: string;
  language2: string;
  searchString: string;
}
