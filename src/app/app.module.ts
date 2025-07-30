import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';
import { Nav } from './nav/nav';
import { RouterModule } from '@angular/router';
import { NavButton } from './nav/nav-button/nav-button';
import { NavBar} from './nav/bar/bar';
import { LesNations } from './les-nations/les-nations';
import { LesDrapeaux } from './les-nations/les-drapeaux/les-drapeaux';
import { FormsModule } from '@angular/forms';
import { LHistorique } from './les-nations/l-historique/l-historique';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    App,
    Nav,
    NavButton,
    NavBar,
    LesNations,
    LesDrapeaux,
    LHistorique
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'les-nations', component: LesNations}
    ]),
    FormsModule,
    HttpClientModule
  ],
  bootstrap: [App]
})
export class AppModule {}
