import { stringify } from 'querystring';


import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
//import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import * as _ from "lodash";
import { DatePipe } from "@angular/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Entry, PartOfSpeech, LinguisticUsage } from "./entry";
import { ILanguage } from "./language";
import { Dialect } from "./dialect";
import { German } from "../shared/german";
import { Headers, RequestOptions } from "@angular/http";
import { NotificationService } from "./notification.service";
import { URIHelper } from '../../../uri-helper';

@Injectable({
  providedIn: "root"
})
export class DialectService {


  // #################################################################################################################################
  // #################################################################################################################################
  // CREATE ENTRY SECTION:
  // working!!!!!!!!!!!!!!!!!


  formCreateDialect: FormGroup = new FormGroup({
    $key: new FormControl(null),
    language: new FormControl("", Validators.required),
    dialectEntry: new FormControl("", Validators.required),
    partOfSpeech: new FormControl(null),
    linguisticUsage: new FormControl(null)
  });

  initializeCreateDialectEntryForm() {
    this.formCreateDialect.setValue({
      $key: null,
      language: 0,
      dialectEntry: "",
      partOfSpeech: [],
      linguisticUsage: []
    });
  }



  json;

  // working!!!!!!!!!!!!!!!!!
  createNewDialectEntry(newEntry) {
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
    };

    let params = new HttpParams().set("dialectLanguage", newEntry.language);
    this.http
      .post(URIHelper.getBaseUrl() + "dialect/createDialectEntry", postData, {
        params: params
      })
      .toPromise()
      .then((data: any) => {

        this.json = data.json;
      })
      .catch(err => {
        this.errorMsgHandler(err);
      });
  }



  // #################################################################################################################################
  // #################################################################################################################################

  synonymArr: any[] = [null, null];
  refToGerman: string;

  displayedPartOfSpeechs = ['Nomen', 'Verb', 'Adjektiv', 'Artikel', 'Pronomen', 'Numeral', 'Adverb', 'Präposition', 'Konjunktion', 'Interjektion'];
  partOfSpeechs = ['NOUN', 'VERB', 'ADJECTIVE', 'ARTICLE', 'PRONOUN', 'NUMERAL', 'ADVERB', 'PREPOSITION', 'CONJUNCTION', 'INTERJECTION'];

  displayedLinguisticUsages = ['science', 'tech', 'med', 'bio', 'jobs', 'educ', 'ling', 'acad', 'econ', 'bot', 'comm'];
  linguisticUsages = ['SCIENCE', 'TECH', 'MED', 'BIO', 'JOBS', 'EDUC', 'LING', 'ACAD', 'ECON', 'BOT', 'COMM'];
  // init nicht vorhandene werte mit false!

  availableLanguages;
  currentEntrySynonyms;



  employeeList;
  newEntry: Dialect;



  myLanguagesGroup: FormGroup = new FormGroup({
    languages: new FormControl("")
  });



  formEditDialectEntry: FormGroup = new FormGroup({
    $key: new FormControl({ value: 'dialectEntryId', disabled: true }, Validators.required),
    language: new FormControl({ value: 'dialectLanguage', disabled: true }, Validators.required),
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
      languages: "Dummylanguage"  // wird evtl nicht benötigt!
    })
  }

  initializeFormEditDialect() {
    this.formEditDialectEntry.setValue({
      $key: "",
      language: "",
      dialectEntry: "",
      partOfSpeech: [false, false, false, false, false, false, false, false, false, false],
      linguisticUsage: [false, false, false, false, false, false, false, false, false, false, false],

    });
  }

  // populates form:
  setEditFormGroup(language: string, formAdapterArray: any, jsonData: any) {

    // TODO fiill form completely!
    this.convertJsonToArray(jsonData); // delete
    this.currentEntrySynonyms = jsonData.dialect.synonymObjectList // wird evtl nicht benötigt! TODO

    this.refToGerman = (jsonData.dialect.refToGermanId);
    if (this.refToGerman == null) {
      this.refToGerman = "";
    }

    this.formEditDialectEntry.setValue({
      $key: JSON.stringify(jsonData.dialect.dialectId), // jsonData.entryId
      language: language,
      dialectEntry: jsonData.dialect.dialectEntry, // formData.dialect.dialectEntry,

      partOfSpeech: formAdapterArray[0],
      linguisticUsage: formAdapterArray[1],

      /*
            synonyms: ([] = Array.of((jsonData.dialect.synonymObjectList).json)),
            addSynonyms: "",
      
            fields: ([] = Array.of((this.fields))), //JSON.parse(JSON.stringify(this.fields)),  // new
      */
    });
  }


  convertJsonToArray(jsonData) {
    let tempArray = jsonData.dialect.synonymObjectList;
    let synId = [];
    let synName = [];

    for (let i in tempArray) {
      synId[i] = tempArray[i].entryId;
      synName[i] = tempArray[i].entryName;
    }

    //let myArr: any [] = [synId, synName];
    this.synonymArr[0] = synId;
    this.synonymArr[1] = synName;


    return this.synonymArr;
  }

  getEmployees() {
    this.getLanguages();

  }

  updateEmployee(employee) {

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
    let params = new HttpParams()
      .set("language", language)
      .set("id", id);
    return this.http.delete(URIHelper.getBaseUrl() + "dialect/deleteEntryById", {
      params: params
    }).toPromise()
      .then((data: any) => {
        this.json = data.json;
      })
      .catch(err => {
        this.errorMsgHandler(err);
      });
  }


  populateForm(employee) {
    // für was ist das?
    this.formEditDialectEntry.setValue(_.omit(employee, "departmentName"));


  }

  // get request. working
  getLanguages(): Observable<ILanguage[]> {
    return this.http.get<ILanguage[]>(
      URIHelper.getBaseUrl() + "german/getAllLanguages"
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
      .get<Entry[]>(URIHelper.getBaseUrl() + "dialect/getCompleteEntryList", {
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
      .get<Dialect[]>(URIHelper.getBaseUrl() + "dialect/getAllDialectEntries", {
        params: params
      })
      .pipe(
        map((entries: Dialect[]) => entries.map(dialectEntries => new Dialect(dialectEntries)))
      );
  }




  addBidirectionalSynonym(dialectLanguage: string, entryId1: string, entryId2: string) {



    let params1 = new HttpParams()
      .set("dialectLanguage", dialectLanguage)
      .set("id1", entryId1)
      .set("id2", entryId2);


    this.http
      .post(URIHelper.getBaseUrl() + "dialect/addBidirectionalSynonyms", null, {
        params: params1
      })
      .toPromise()
      .then((data: any) => {

      })
      .catch(err => {
        this.errorMsgHandler(err);
      });
  }


  errorMsgHandler(err) {

    if (err.status === 200 || err.status === 201) {
      console.log("Created entry. ", err.status);
      this.notificationService.success("saved successfully");

      return;
    }
    if (err.staus === 400) {
      console.error("400 Sometging went wrong")
      this.notificationService.warn("400: Something went wrong");
    }
    if (err.status === 404) {
      console.error("404 Not found")
      this.notificationService.warn("404: Not found");
    }
    if (err.status === 401 || err.status === 403) {
      console.error("You may have no internet connection");
      this.notificationService.warn("You may have no internet connection");
    }
    if (err.status === 500) {
      console.error("Server error. Please contact admin", err.status);
      this.notificationService.warn("Server error. Please contact admin");

    }
    return;
  }



  addBidirectionalReference(dialectLanguage: string, dialectId: string, germanId: string) {

    let params = new HttpParams()
      .set("dialectLanguage", dialectLanguage)
      .set("dialectId", dialectId)
      .set("germanId", germanId);

    this.http
      .post(URIHelper.getBaseUrl() + "dialect/addBiDirectionalRef", null, {
        params: params
      })
      .toPromise()
      .then((data: any) => {
      })
      .catch(err => {
        this.errorMsgHandler(err);
      });
  }



  addReferencesCompleteSet(
    dialectLanguageA: string,
    dialectIdA: string,
    dialectLanguageB: string,
    dialectIdB: string,
    germanId: string) {
    let params = new HttpParams()
      .set("dialectLanguageA", dialectLanguageA)
      .set("dialectIdA", dialectIdA)
      .set("dialectLanguageB", dialectLanguageB)
      .set("dialectIdB", dialectIdB)
      .set("germanId", germanId);

    this.http
      .post(URIHelper.getBaseUrl() + "dialect/addReferencesCompleteSet", null, {
        params: params
      })
      .toPromise()
      .then((data: any) => {
      })
      .catch(err => {
        this.errorMsgHandler(err);
      });
  }

  getAllGermanEntries() {
    let params = new HttpParams()

    return this.http
      .get<German[]>(URIHelper.getBaseUrl() + "german/getAllGermanEntries")
      .pipe(
        map((entries: German[]) => entries.map(germanEntries => new German(germanEntries)))
      );
  }


  removeBidirectionalSynonyms(dialectLanguage: string, id1: string, id2: string) {
    let params = new HttpParams()
      .set("dialectLanguage", dialectLanguage)
      .set("id1", id1)
      .set("id2", id2);

    return this.http.delete(URIHelper.getBaseUrl() + "dialect/removeBidirectionalSynonyms", {
      params: params
    }).toPromise()
      .then((data: any) => {
        this.json = data.json;
      })
      .catch(err => {
        this.errorMsgHandler(err);
      });
  }

  removeGermanRefFromDialect(language, id) {
    let params = new HttpParams()
      .set("dialectCollection", language)
      .set("dialectId", id);

    return this.http.delete(URIHelper.getBaseUrl() + "dialect/deleteGermanRefFromDialect", {
      params: params
    }).toPromise()
      .then((data: any) => {
        this.json = data.json;
      })
      .catch(err => {
        this.errorMsgHandler(err);
      });
  }

  editDialectData(language, requestBody) {
    //URIHelper.getBaseUrl() + "dialect/updateDialectEntry     dialectLanguage     body


    let postData = {

      dialectId: null,
      //dialectEntry: newEntry.dialectEntry,

      partOfSpeech: {
        // partOfSpeechs: JSON.parse(JSON.stringify(newEntry.partOfSpeech))
      },

      linguisticUsage: {
        //   linguisticUsages: JSON.parse(JSON.stringify(newEntry.linguisticUsage))
      },
    };
  }


  updateEntry(language: string, entry: Dialect) {

    let postData = {
      //test: 'my content',
      dialectId: entry.dialect.dialectId,
      dialectEntry: entry.dialect.dialectEntry,

      partOfSpeech: {
        partOfSpeechs: JSON.parse(JSON.stringify(entry.dialect.partOfSpeech.partOfSpeechs))
      },

      linguisticUsage: {
        linguisticUsages: JSON.parse(JSON.stringify(entry.dialect.linguisticUsage.linguisticUsages))
      },

      synonymObjectList: JSON.parse(JSON.stringify(entry.dialect.synonymObjectList)),


      refToGermanId: entry.dialect.refToGermanId,
      germanEntry: entry.dialect.germanEntry,
    };

    // actual request:
    let params = new HttpParams()
      .set("dialectLanguage", language);

    this.http.put(URIHelper.getBaseUrl() + "dialect/updateDialectEntry", postData, {
      params: params
    }).toPromise()
      .then((data: any) => {
        this.json = data.json;
      })
      .catch(err => {
        this.errorMsgHandler(err);
      });
  }



  // working!!!!!!!!!!!!!!!!!
  createNewLanguage(languageName: string) {


    let params = new HttpParams().set("language", languageName);
    this.http
      .post(URIHelper.getBaseUrl() + "dialect/createDialectLanguage", null, {
        params: params
      })
      .toPromise()
      .then((data: any) => {

        this.json = data.json;
      })
      .catch(err => {
        this.errorMsgHandler(err);
      });
  }

}
