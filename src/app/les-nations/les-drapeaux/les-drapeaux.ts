import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Partage } from '../partage';
import { HistoriqueEntry } from '../models';

interface Nation {
  code: string;
  nom: string;
}

@Component({
  selector: 'app-les-drapeaux',
  templateUrl: './les-drapeaux.html',
  styleUrls: ['./les-drapeaux.scss'],
  standalone: false
})
export class LesDrapeaux implements OnInit {
  userAnswer = '';
  nations: Nation[] = [];
  current!: Nation;

  constructor(private partage: Partage, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Nation[]>('/assets/nations.json').subscribe(data => {
      this.nations = data;
      this.choisirAleatoire();
    });
  }

  get flagUrl(): string {
    return `/assets/les drapeaux/${this.current.code}.svg`;
  }

  valider() {
    const entry: HistoriqueEntry = {
      flag: this.flagUrl,
      reponse: this.userAnswer.trim(),
      correct: this.userAnswer.trim().toLowerCase() === this.current.nom
    };
    this.partage.ajouterEntree(entry);
    this.userAnswer = '';
    this.choisirAleatoire();
  }

  choisirAleatoire() {
    const i = Math.floor(Math.random() * this.nations.length);
    this.current = this.nations[i];
  }
}
