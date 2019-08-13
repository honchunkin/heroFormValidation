/* tslint:disable: member-ordering forin */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';

@Component({
  selector: 'app-hero-form-reactive',
  templateUrl: './hero-form-reactive.component.html'
})
export class HeroFormReactiveComponent implements OnInit {

  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  hero = { option1: '', option2: '', option3: '', option4: '', name: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0] };

  heroForm: FormGroup;

  ngOnInit(): void {
    this.heroForm = new FormGroup({
      'option1': new FormControl(this.hero.option1),
      'option2': new FormControl(this.hero.option2),
      'option3': new FormControl(this.hero.option3),
      'option4': new FormControl(this.hero.option4),
      'name': new FormControl(this.hero.name, [
        Validators.required,
        Validators.minLength(4),
        forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]),
      'alterEgo': new FormControl(this.hero.alterEgo),
      'power': new FormControl(this.hero.power, Validators.required)
    });
  }

  // getter method used to create an shorthand way in validation
  get option1() { return this.heroForm.get('option1'); }
  get option2() { return this.heroForm.get('option2'); }
  get option3() { return this.heroForm.get('option3'); }
  get option4() { return this.heroForm.get('option4'); }

  get checkOption1() {
    if (this.option2.dirty || this.option3.dirty || this.option4.dirty) {
      return true;
    } else {
      return false;
    }
  }

  get checkOption2() {
    if (this.option3.dirty || this.option4.dirty) {
      return true;
    } else {
      return false;
    }
  }

  get checkOption3() {
    if (this.option4.dirty) {
      return true;
    } else {
      return false;
    }
  }

  get name() { return this.heroForm.get('name'); }

  get power() { return this.heroForm.get('power'); }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
