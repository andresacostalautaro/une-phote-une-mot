import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HistoriqueEntry } from './models';

@Injectable({
  providedIn: 'root'
})
export class Partage {
  private _historique = new BehaviorSubject<HistoriqueEntry[]>([]);
  readonly historique$ = this._historique.asObservable();

  ajouterEntree(entry: HistoriqueEntry) {
    const actuel = this._historique.getValue();
    this._historique.next([...actuel, entry]);
  }
}
