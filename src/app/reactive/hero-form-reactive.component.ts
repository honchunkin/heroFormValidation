/* tslint:disable: member-ordering forin */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-hero-form-reactive',
  templateUrl: './hero-form-reactive.component.html'
})
export class HeroFormReactiveComponent implements OnInit {

  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  hero = { option1: '', option2: '', option3: '', option4: '', input1: '',
  input2: '', input3: '', name: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0] };

  heroForm: FormGroup;

  // checkOption3: boolean;
  isInput: boolean;

  ngOnInit(): void {
    this.heroForm = new FormGroup({
      option1: new FormControl(this.hero.option1),
      option2: new FormControl(this.hero.option2),
      option3: new FormControl(this.hero.option3), // Validators.required
      option4: new FormControl(this.hero.option4),
      input1: new FormControl(this.hero.input1),
      input2: new FormControl(this.hero.input2),
      input3: new FormControl(this.hero.input3),
      name: new FormControl(this.hero.name, [
        Validators.required,
        Validators.minLength(4),
        forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]),
      alterEgo: new FormControl(this.hero.alterEgo),
      power: new FormControl(this.hero.power, Validators.required)
    });
    // this.refreshOption3();
    console.log('init');
  }

  /* Since ngOnInit lifeCycle only compile at the first time, so wait for further discussion
refreshOption3(): void {
  console.log('hi');
  if (this.option4.dirty) {
    if (this.option3.value !== '') {
      this.checkOption3 = false;
    } else if (this.option4.value !== '') {
      this.checkOption3 = true;
    } else {
      this.checkOption3 = false;
    }
  } else {
    this.checkOption3 = false;
  }
}
*/

  // getter method used to create an shorthand way in validation
  get option1() { return this.heroForm.get('option1'); }
  get option2() { return this.heroForm.get('option2'); }
  get option3() { return this.heroForm.get('option3'); }
  get option4() { return this.heroForm.get('option4'); }
  get input1() { return this.heroForm.get('input1'); }
  get input2() { return this.heroForm.get('input2'); }
  get input3() { return this.heroForm.get('input3'); }

  get checkOption1() {
    if (this.option2.dirty || this.option3.dirty || this.option4.dirty) {
      // to break the checkOption1(), thereby hidden the error msg while option1 has value but another input field doesn't have value.
      if (this.option1.value !== '') {
        return false;
      } else if (this.option2.value !== '' || this.option3.value !== '' || this.option4.value !== '') {
        // this.option1.setValidators(Validators.required);
        let d = new Date();
        let n = d.getMilliseconds();
        console.log('option1 is required ' + n);
        console.log(this.option1.errors);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get checkOption2() {
    if (this.option3.dirty || this.option4.dirty) {
      if (this.option2.value !== '') {
        return false;
      } else if (this.option3.value !== '' || this.option4.value !== '') {
        this.option2.setValidators(Validators.required);
        this.option2.updateValueAndValidity();
        let d = new Date();
        let n = d.getMilliseconds();
        console.log('option2 is required ' + n);
        console.log(this.option2.errors);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get checkOption3() {
    if (this.option4.dirty) {
      if (this.option3.value !== '') {
        return false;
      } else if (this.option4.value !== '') {
        this.option3.setValidators(Validators.required);
        this.option3.updateValueAndValidity();
        let d = new Date();
        let n = d.getMilliseconds();
        console.log('option3 is required ' + n);
        console.log(this.option3.errors);
        return true;
      } else {
        this.option2.clearValidators();
        this.option3.clearValidators();
        this.option2.updateValueAndValidity();
        this.option3.updateValueAndValidity();
        return false;
      }
    } else {
      return false;
    }
  }

  get checkInput() {
    if ((this.input1.value === '') && (this.input2.value === '') && (this.input3.value === '')) {
      this.isInput = false;
      // console.log('isInput: ' + this.isInput);
      return true;
    } else {
      this.isInput = true;
      // console.log('isInput: ' + this.isInput);
      return false;
    }
  }

  get name() { return this.heroForm.get('name'); }

  get power() { return this.heroForm.get('power'); }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    if (this.isInput === false) {
      return;
    }
    if (this.heroForm.invalid) {
      return;
    }
    console.warn(this.heroForm.value);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
