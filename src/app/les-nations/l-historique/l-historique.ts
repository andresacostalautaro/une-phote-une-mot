import { Component, OnInit } from '@angular/core';
import { HistoriqueEntry } from '../models';
import { Partage } from '../partage';

@Component({
  selector: 'app-l-historique',
  templateUrl: './l-historique.html',
  standalone: false,
  styleUrls: ['./l-historique.scss']
})
export class LHistorique implements OnInit {
  historique: HistoriqueEntry[] = [];

  constructor(private partage: Partage) {}

  ngOnInit(): void {
    this.partage.historique$.subscribe(h => this.historique = h);
  }
}
