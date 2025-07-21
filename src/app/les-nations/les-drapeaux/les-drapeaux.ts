import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Partage } from '../partage';
import { HistoriqueEntry } from '../models';

interface Nation {
  code: string;
  index: number;
  nom: string;
}

@Component({
  selector: 'app-les-drapeaux',
  templateUrl: './les-drapeaux.html',
  styleUrls: ['./les-drapeaux.scss'],
  standalone: false
})
export class LesDrapeaux implements OnInit {
  userAnswer: string = '';
  nations: Nation[] = [];
  current!: Nation;

  private indicesRestants: number[] = [];

  constructor(
    private partage: Partage,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get<Nation[]>('/assets/nations.json').subscribe(data => {
      this.nations = data;
      this.resetIndices();
      this.choisirAleatoire();
    });
  }

  get flagUrl(): string {
    return `/assets/les drapeaux/${this.current.code}.svg`;
  }

  valider(): void {
    const reponse = this.userAnswer.trim().toLowerCase();
    const estCorrect = reponse === this.current.nom;

    const entry: HistoriqueEntry = {
      flag: this.flagUrl,
      reponse: this.userAnswer.trim(),
      correct: estCorrect
    };

    this.partage.ajouterEntree(entry);
    this.userAnswer = '';
    this.choisirAleatoire();
  }

  choisirAleatoire(): void {
    if (this.indicesRestants.length === 0) {
      this.resetIndices();
    }

    const index = this.indicesRestants.pop()!;
    this.current = this.nations[index];
  }

  private resetIndices(): void {
    const total = this.nations.length;
    this.indicesRestants = Array.from({ length: total }, (_, i) => i);

    // Mezclar los índices aleatoriamente (Fisher-Yates)
    for (let i = total - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.indicesRestants[i], this.indicesRestants[j]] = [this.indicesRestants[j], this.indicesRestants[i]];
    }
  }
}
