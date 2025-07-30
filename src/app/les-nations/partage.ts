import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface HistoriqueEntry {
  flag: string;
  reponse: string;
  correct: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PartageService {
  private _historique: HistoriqueEntry[] = [];
  private _scoreText = new BehaviorSubject<string>('0/0');
  private _total = 0;

  get historique(): HistoriqueEntry[] {
    return this._historique;
  }

  get score$() {
    return this._scoreText.asObservable();
  }

  setTotalQuestions(total: number): void {
    this._total = total;
    this.updateScore();
  }

  addToHistorique(entry: HistoriqueEntry): void {
    this._historique.push(entry);
    this.updateScore();
  }

  private updateScore(): void {
    const correct = this._historique.filter(h => h.correct).length;
    this._scoreText.next(`${correct}/${this._total}`);
  }
}
