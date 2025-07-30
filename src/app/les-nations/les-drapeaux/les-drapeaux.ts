import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PartageService } from '../partage';

interface Nation {
  code: string;
  index: number;
  nom: string;
  capital: string;
  gentil: string;
  hom: string;
  fem: string;
}

@Component({
  selector: 'app-les-drapeaux',
  templateUrl: './les-drapeaux.html',
  standalone: false,
  styleUrls: ['./les-drapeaux.scss']
})
export class LesDrapeaux implements OnInit {
  nations: Nation[] = [];
  randomizedNations: Nation[] = [];
  currentIndex: number = 0;

  userAnswer1: string = '';
  userAnswer2: string = '';
  userAnswer3: string = '';
  userAnswer4: string = '';
  userAnswer5: string = '';

  resultMessage: string = '';

  constructor(private http: HttpClient, private partage: PartageService) {}

  ngOnInit(): void {
    this.http.get<Nation[]>('assets/nations.json').subscribe(data => {
      this.nations = data;
      this.randomizedNations = this.shuffle([...data]);
      this.partage.setTotalQuestions(this.randomizedNations.length);
    });
  }

  get flagUrl(): string {
    const code = this.randomizedNations[this.currentIndex]?.code ?? '';
    return `assets/les drapeaux/${code}.svg`;
  }

  valider(): void {
    const expected = this.randomizedNations[this.currentIndex];
    if (!expected) return;

    const normalize = (str: string) =>
      str?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

    const u1 = normalize(this.userAnswer1);
    const u2 = normalize(this.userAnswer2);
    const u3 = normalize(this.userAnswer3);
    const u4 = normalize(this.userAnswer4);
    const u5 = normalize(this.userAnswer5);

    const okNom = u1 === normalize(expected.nom);
    const okCapital = u2 === normalize(expected.capital);
    const okGentil = u3 === normalize(expected.gentil);
    const okHom = u4 === normalize(expected.hom);
    const okFem = u5 === normalize(expected.fem);

    const correct = okNom && okCapital && okGentil && okHom && okFem;

    this.resultMessage = correct
      ? "✅ Tout est correct !"
      : "❌ Certaines réponses sont incorrectes.";

    this.partage.addToHistorique({
      flag: this.flagUrl,
      reponse: this.userAnswer1,
      correct
    });

    if (correct && this.currentIndex < this.randomizedNations.length - 1) {
      this.currentIndex++;
      this.clearInputs();
    }
  }
  sauter(): void {
    // Agregar el país actual al historial como incorrecto
    this.partage.addToHistorique({
      flag: this.flagUrl,
      reponse: this.userAnswer1,
      correct: false
    });

    // Avanzar al siguiente país (si queda)
    if (this.currentIndex < this.randomizedNations.length - 1) {
      this.currentIndex++;
      this.clearInputs();
      this.resultMessage = '';
    } else {
      this.resultMessage = "✅ Fin du jeu !";
    }
  }


  private clearInputs(): void {
    this.userAnswer1 = '';
    this.userAnswer2 = '';
    this.userAnswer3 = '';
    this.userAnswer4 = '';
    this.userAnswer5 = '';
  }

  private shuffle(array: Nation[]): Nation[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
