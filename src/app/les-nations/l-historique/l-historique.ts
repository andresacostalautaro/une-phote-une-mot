import { Component, OnInit } from '@angular/core';
import { PartageService } from '../partage';
import { HistoriqueEntry } from '../partage';

@Component({
  selector: 'app-l-historique',
  templateUrl: './l-historique.html',
  standalone: false,
  styleUrls: ['./l-historique.scss']
})
export class LHistorique implements OnInit {
  historique: HistoriqueEntry[] = [];
  scoreText: string = '0/0';

  constructor(private partage: PartageService) {}

  ngOnInit(): void {
    this.historique = this.partage.historique;
    this.partage.score$.subscribe(value => {
      this.scoreText = value;
    });
  }
}
