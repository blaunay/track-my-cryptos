import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CryptoMonnaie } from './model/crypto.monnaie.enum';
import { InfoCrypto } from './model/info.crypto';

@Injectable({
  providedIn: 'root'
})
export class CryptoDataService {

  private infosCryptos$ = new Subject<InfoCrypto[]>();

  constructor(private http: HttpClient) { }

  get infosCryptos(): Observable<InfoCrypto[]> {
    return this.infosCryptos$.asObservable();
  }

  actualiserValeursCrypto(): void {
    this.http.get<any>(environment.urlBackend, {
      params: {
        'symbol': CryptoMonnaie.BTC + ',' + CryptoMonnaie.ALGO,
        'convert': 'CAD'
      },
      observe: 'response'
    }).subscribe((response: any) => {
      this.infosCryptos$.next(response.body);
    });
  }
}
