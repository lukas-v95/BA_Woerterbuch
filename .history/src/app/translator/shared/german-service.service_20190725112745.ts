import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { German } from './german';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { NotificationService } from './notification.service';
import { URIHelper } from '../../../uri-helper';



@Injectable({
  providedIn: 'root'
})
export class GermanServiceService {

  constructor(private http: HttpClient,
    private notificationService: NotificationService) { }


  germanEntryForm: FormGroup = new FormGroup({
    germanId: new FormControl({ value: 'germanId', disabled: true }, Validators.required),
    germanEntry: new FormControl({ value: 'germanEntry', disabled: false}, [Validators.required, Validators.minLength(2)]),
    reverseTranslations: new FormControl(""),
  });

  initGermanForm() {
    this.germanEntryForm.setValue({
      germanId: "",
      germanEntry: "",
      reverseTranslations: "",
    });
  }

  setGermanForm(german: German) {
    this.germanEntryForm.setValue({
      germanId: german.germanId,
      germanEntry: german.germanEntry,
      reverseTranslations: german.reverseTranslations,
    });
  }

  clearGermanForm(){
    this.germanEntryForm.patchValue({
      germanEntry: "",
    });
  }


  // get request. working
  getAllGermanEntries(): Observable<German[]> {
    return this.http.get<German[]>(
      URIHelper.getBaseUrl() + "german/getAllGermanEntries"
    );
  }

  updateEntry(updatedGermanEntry: German) {


    // actual request:
    let params = new HttpParams()
      .set("germanId", updatedGermanEntry.germanId)
      .set("germanEntry", updatedGermanEntry.germanEntry);

    this.http.put(URIHelper.getBaseUrl() + "german/updateGermanEntryById", null, {
      params: params
    }).toPromise()
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



  deleteGermanEntry(id: string) {
    let params = new HttpParams()
      .set("id", id);
    return this.http.delete(URIHelper.getBaseUrl() + "german/deleteEntryById", {
      params: params
    }).toPromise()
      .then((data: any) => {
      })
      .catch(err => {
        this.errorMsgHandler(err);
      });
  }



   createNewGermanEntry(german: German) {
    let postData = {
      //test: 'my content',
      germanId: null,
      germanEntry: german.germanEntry,
    };

    this.http
      .post(URIHelper.getBaseUrl() + "german/createGermanEntry", postData, {
      })
      .toPromise()
      .then((data: any) => {
      })
      .catch(err => {
        this.errorMsgHandler(err);
      });
  }
}
