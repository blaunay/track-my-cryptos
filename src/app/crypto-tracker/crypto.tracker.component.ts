import { Component, OnInit } from '@angular/core';
import { CryptoDataService } from '../crypto.data.service';
import { InfoCrypto } from '../model/info.crypto';

@Component({
  selector: 'crypto-tracker',
  templateUrl: './crypto.tracker.component.html',
  styleUrls: ['./crypto.tracker.component.scss']
})
export class CryptoTrackerComponent implements OnInit {
  
  displayedColumns = ['monnaie', 'prixUnite', 'quantite', 'cout', 'valeur', 'gain'];
  prixCryptos: InfoCrypto[] = [];

  coutInitialTotal = 0;
  valeurTotale = 0;
  gainTotal = 0;

  constructor(private service: CryptoDataService) { }

  ngOnInit(): void {
    this.service.infosCryptos.subscribe((nouveauPrix: InfoCrypto[]) => {
      this.prixCryptos = Object.assign([], nouveauPrix);
      this.coutInitialTotal = this.prixCryptos.reduce((acc,val)=> acc + val.initialCost, 0);
      this.valeurTotale = this.prixCryptos.reduce((acc,val)=> acc + val.quantity*val.unitPrice, 0);
      this.gainTotal = this.prixCryptos.reduce((acc,val)=> acc + val.gain, 0);
    });
    this.service.actualiserValeursCrypto();
  }

  actualiser(): void {
    this.reinitialiserTableau();
    this.service.actualiserValeursCrypto();
  }

  private reinitialiserTableau(): void {
    this.prixCryptos = [];
    this.coutInitialTotal = 0;
    this.valeurTotale = 0;
    this.gainTotal = 0;
  }
}
