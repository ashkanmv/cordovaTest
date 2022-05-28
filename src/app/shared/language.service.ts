import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Language, Languages } from './common';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  static _language: Language;
  public get selectedLanguage(): Languages { return Languages[localStorage.getItem('selectedLanguage') || Languages.EN] }
  public get language(): Language { return LanguageService._language[this.selectedLanguage] }

  constructor(private http: HttpClient, private storageService: StorageService) { }

  loadLanguage() {
    return this.http.get<any>('/assets/language.json').pipe(tap(event => LanguageService._language = event));
  }
}