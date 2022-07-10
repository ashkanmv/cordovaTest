import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Language, Languages } from './common';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  languageChanged = new Subject<boolean>();
  static _language: any;
  public get selectedLanguage(): string { return localStorage.getItem('selectedLanguage') }
  public get selectedLanguageEnum(): string { return this.selectedLanguage == 'FR' ? Languages[Languages.FR] : Languages[Languages.EN] }
  public get language(): Language { return LanguageService._language[this.selectedLanguageEnum] }

  constructor(private http: HttpClient, private storageService: StorageService) { }

  loadLanguage() {
    return this.http.get<any>('/assets/language.json').pipe(tap(event => LanguageService._language = event));
  }
}
