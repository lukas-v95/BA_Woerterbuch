import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
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
import { URIHelper } from '../../uri-helper';

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  availableLanguages;

  constructor(
    private datePipe: DatePipe,
    private http: HttpClient
  ) {
    //this.createDialectEntry();
  }

  employeeList: AngularFireList<any>;
  newEntry: Dialect;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    language: new FormControl("", Validators.required),
    dialectEntry: new FormControl("", Validators.required),
    partOfSpeech: new FormControl(""),
    linguisticUsage: new FormControl("")
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      language: 0,
      dialectEntry: "",
      partOfSpeech: [],
      linguisticUsage: []
    });
  }

  getEmployees() {
    this.getLanguages();

  }

  updateEmployee(employee) {
    this.employeeList.update(employee.$key, {
      language: employee.language,
      dialectEntry: employee.fullName,
      partOfSpeech: employee.email,
      linguisticUsage: employee.mobile,
      city: employee.city,
      //gender: employee.gender,

      //isPermanent: employee.isPermanent
    });
  }

  deleteEmployee($key: string) {
    this.employeeList.remove($key);
  }

  populateForm(employee) {
    // für was ist das?
    this.form.setValue(_.omit(employee, "departmentName"));
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
      .post(URIHelper.getBaseUrl() + "dialect/createDialectEntry", postData, {
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
