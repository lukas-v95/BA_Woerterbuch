
import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import * as _ from "lodash";
import { DatePipe } from "@angular/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Entry, PartOfSpeech, LinguisticUsage } from "./entry";
import { ILanguage } from "./language";
import { Dialect } from "./dialect";
import { Headers, RequestOptions } from "@angular/http";
import { NotificationService } from "./notification.service";

@Injectable({
  providedIn: "root"
})
export class DialectService {

  displayedPartOfSpeechs = ['Nomen', 'Verb', 'Adjektiv', 'Artikel', 'Pronomen', 'Numeral', 'Adverb', 'Präposition', 'Konjunktion','Interjektion'];
  partOfSpeechs =          ['NOUN', 'VERB', 'ADJECTIVE', 'ARTICLE', 'PRONOUN', 'NUMERAL', 'ADVERB', 'PREPOSITION', 'CONJUNCTION', 'INTERJECTION'];

  displayedLinguisticUsages = ['science', 'tech', 'med', 'bio', 'jobs', 'educ', 'ling', 'acad', 'econ', 'bot', 'comm'];
  linguisticUsages =          ['SCIENCE', 'TECH', 'MED', 'BIO', 'JOBS', 'EDUC', 'LING', 'ACAD', 'ECON', 'BOT', 'COMM'];
  // init nicht vorhandene werte mit false!

  availableLanguages;
  currentEntrySynonyms;



  employeeList: AngularFireList<any>;
  newEntry: Dialect;



  myLanguagesGroup: FormGroup = new FormGroup({
    languages: new FormControl("")
  });

  myGroup: FormGroup = new FormGroup({
    $key: new FormControl(null),
    language: new FormControl("", Validators.required),
    dialectEntry: new FormControl("", Validators.required),
    partOfSpeech: new FormArray([
      new FormControl(false), // noun
      new FormControl(false), // verb
      new FormControl(false), // adj
      new FormControl(false), // art
      new FormControl(false), // pronoun
      new FormControl(false), // numeral
      new FormControl(false), // adv
      new FormControl(false), // prep
      new FormControl(false), // conj
      new FormControl(false), // interj

    ]),
    linguisticUsage: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),

    ]),
    
    // linguisticUsage: new FormArray[],
   // linguisticUsage: new FormControl(""),   // entry, partofspeech, lingUSage, synony, synonym adden
    synonyms: new FormControl(null),
    addSynonyms: new FormControl(""),
  });

  // ::::::::::::::::::::::CONSTRUCTOR!!!!:::::::::::::::::::::::::::::
  constructor(
    private datePipe: DatePipe,
    private http: HttpClient,
    private notificationService: NotificationService
  ) { }
  // ::::::::::::::::::::::CONSTRUCTOR!!!!:::::::::::::::::::::::::::::


  initMyLanguagesGroup() {
    this.myLanguagesGroup.setValue({
      languages: "Dummylanguage"
    })
  }

  initializeFormGroup() {
    this.myGroup.setValue({
      $key: null,
      language: "",
      dialectEntry: "",
      partOfSpeech: [false, false, false, false,false, false, false, false, false, false],
      linguisticUsage: [false,false,false,false,false,false,false,false,false,false,false],
      synonyms: null,
      addSynonyms: ""

    });
  }

  // populates form:
  setEditFormGroup(language: string, formAdapterArray: any, jsonData: any){
    // TODO fiill form completely!
console.log(formAdapterArray, "sollte nicht leer sein!!")
console.log("synonymData: ", jsonData.dialect.synonymObjectList);
    this.currentEntrySynonyms = jsonData.dialect.SynonymObjectList

    this.myGroup.setValue({
      $key: null,
      language: language,
      dialectEntry: jsonData.dialect.dialectEntry, // formData.dialect.dialectEntry,

      partOfSpeech: formAdapterArray[0],
      linguisticUsage: formAdapterArray[1],
      
      synonyms: ( [] = Array.of((jsonData.dialect.synonymObjectList).json)),
      addSynonyms: ""

    });

  }

  getEmployees() {
    this.getLanguages();

  }

  updateEmployee(employee) {
    console.error("logging employee: ", employee);


    this.employeeList.update(employee.$key, {


      language: employee.language,
      dialectEntry: employee.dialectEntry,
      partOfSpeech: employee.partOfSpeech,
      linguisticUsage: employee.linguisticUsage,
      synonyms: employee.synonyms,
      addSynonyms: employee.addSynonyms
      //gender: employee.gender,

      //isPermanent: employee.isPermanent
    });
  }

  // delete dialectEntry
  deleteDialectEntry(language: string, id: string) {
    console.log("deleting entry with id: ", id, "from language ", language);
    let params = new HttpParams()
      .set("language", language)
      .set("id", id);
    return this.http.delete("http://localhost:8090/dialect/deleteEntryById", {
      params: params
    }).toPromise()
      .then((data: any) => {
        console.log("data: ");

        console.log(data);
        this.json = data.json;
        console.log("json: ");
        console.log(this.json);
      })
      .catch(err => {
        if (err.status === 200 || err.status === 201) {
          this.notificationService.warn('! Deleted successfully');

          return;
        }

        if (err.status === 401 || err.status === 403) {
          console.error("You may have no internet connection");
          this.notificationService.warn('! You may have no internet connection.');
        }
        if (err.status === 500) {
          console.error("Server error. Please contact Lukas", err.status);
          this.notificationService.warn('! The Server seems to have problems atm');
        }

        return;
      });
  }


  populateForm(employee) {
    // für was ist das?
    this.myGroup.setValue(_.omit(employee, "departmentName"));


  }

  // get request. working
  getLanguages(): Observable<ILanguage[]> {
    return this.http.get<ILanguage[]>(
      "http://localhost:8090/german/getAllLanguages"
    );
  }

  // get request with params:
  getCompleteSearchResults(
    paramValueLangA,
    paramValueLangB,
    paramValueSearchCriteria
  ): Observable<Entry[]> {
    let params = new HttpParams()
      .set("languageA", paramValueLangA)
      .set("languageB", paramValueLangB)
      .set("searchCriteria", paramValueSearchCriteria);

    return this.http
      .get<Entry[]>("http://localhost:8090/dialect/getCompleteEntryList", {
        params: params
      })
      .pipe(
        map((entries: Entry[]) => entries.map(entries => new Entry(entries)))
      );
  }


  // get request with params:
  getAllDialectEntries(
    dialectLanguage
  ): Observable<Dialect[]> {
    let params = new HttpParams()
      .set("language", dialectLanguage);

    return this.http
      .get<Dialect[]>("http://localhost:8090/dialect/getAllDialectEntries", {
        params: params
      })
      .pipe(
        map((entries: Dialect[]) => entries.map(dialectEntries => new Dialect(dialectEntries)))
      );
  }





  json;

  // working!!!!!!!!!!!!!!!!!
  createDialectEntry(newEntry) {
    console.log("inserting new Entry:::::::::::", newEntry);

    let postData = {
      //test: 'my content',
      dialectId: null,
      dialectEntry: newEntry.dialectEntry,

      partOfSpeech: {
        partOfSpeechs: JSON.parse(JSON.stringify(newEntry.partOfSpeech))
      },

      linguisticUsage: {
        linguisticUsages: JSON.parse(JSON.stringify(newEntry.linguisticUsage))
      },

      refToGermanId: null
    };

    let params = new HttpParams().set("dialectLanguage", newEntry.language);
    this.http
      .post("http://localhost:8090/dialect/createDialectEntry", postData, {
        params: params
      })
      .toPromise()
      .then((data: any) => {
        console.log("data: ");

        console.log(data);
        this.json = data.json;
        console.log("json: ");
        console.log(this.json);
      })
      .catch(err => {
        if (err.status === 200 || err.status === 201) {
          console.log("Created entry. ", err.status);

          return;
        }

        if (err.status === 401 || err.status === 403) {
          console.error("You may have no internet connection");
        }
        if (err.status === 500) {
          console.error("Server error. Please contact Lukas", err.status);
        }

        return;
      });
  }

}
