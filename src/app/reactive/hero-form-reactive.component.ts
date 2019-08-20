/* tslint:disable: member-ordering forin */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { Observable } from 'rxjs';
import { merge } from 'rxjs';

@Component({
  selector: 'app-hero-form-reactive',
  templateUrl: './hero-form-reactive.component.html'
})
export class HeroFormReactiveComponent implements OnInit {

  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  hero = {
    option1: '', option2: '', option3: '', option4: '', input1: '',
    input2: '', input3: '', name: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0]
  };

  heroForm: FormGroup;

  checkOption1: boolean;
  checkOption2: boolean;
  checkOption3: boolean;

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

    console.log('init');

    this.refreshOption1();
    this.refreshOption2();
    this.refreshOption3();
    this.refreshInput();
  }

  // getter method used to create an shorthand way in validation
  get option1() { return this.heroForm.get('option1'); }
  get option2() { return this.heroForm.get('option2'); }
  get option3() { return this.heroForm.get('option3'); }
  get option4() { return this.heroForm.get('option4'); }
  get input1() { return this.heroForm.get('input1'); }
  get input2() { return this.heroForm.get('input2'); }
  get input3() { return this.heroForm.get('input3'); }

  refreshOption1(): void {
    // const mergedOption1 = merge(this.option2.valueChanges, this.option3.valueChanges, this.option4.valueChanges);
    const mergedOption1 = merge(this.option1.valueChanges, this.option2.valueChanges, this.option3.valueChanges, this.option4.valueChanges);
    mergedOption1.subscribe(val => {
      if (this.option2.dirty || this.option3.dirty || this.option4.dirty) {
        // to break the checkOption1(), thereby hidden the error msg while option1 has value but another input field doesn't have value.
        if (this.option1.value !== '') {
          this.checkOption1 = false;
        } else if (this.option2.value !== '' || this.option3.value !== '' || this.option4.value !== '') {
          // this.option1.setValidators(Validators.required);
          let d = new Date();
          let n = d.getMilliseconds();
          console.log('option1 is required ' + n);
          console.log(this.option1.errors);
          this.checkOption1 = true;
        } else {
          this.checkOption1 = false;
        }
      } else {
        this.checkOption1 = false;
      }
    });
  }

  refreshOption2(): void {
    // const mergedOption2 = merge(this.option3.valueChanges, this.option4.valueChanges);
    const mergedOption2 = merge(this.option1.valueChanges, this.option2.valueChanges, this.option3.valueChanges, this.option4.valueChanges);
    mergedOption2.subscribe(() => {
      if (this.option3.dirty || this.option4.dirty) {
        if (this.option2.value !== '') {
          this.checkOption2 = false; // X
        } else if (this.option3.value !== '' || this.option4.value !== '') {
          this.checkOption2 = true;
          this.option2.setValidators(Validators.required);
          // this.option2.updateValueAndValidity();
          this.option2.patchValue(this.option2.value, {emitEvent: false} );
          let d = new Date();
          let n = d.getMilliseconds();
          console.log('option2 is required ' + n);
          console.log(this.option2.errors);
        } else {
          this.option2.clearValidators();
          this.option2.patchValue(this.option2.value, {emitEvent: false} );
          this.checkOption2 = false;
        }
      } else {
        this.checkOption2 = false;
      }
    });
  }

  refreshOption3(): void {
    const mergedOption3 = merge(this.option1.valueChanges, this.option2.valueChanges, this.option3.valueChanges, this.option4.valueChanges);
    mergedOption3.subscribe(() => {
      if (this.option4.dirty) {
        if (this.option3.value !== '') {
          this.checkOption3 = false;
        } else if (this.option4.value !== '') {
          this.option3.setValidators(Validators.required);
          this.option3.patchValue(this.option3.value, {emitEvent: false} );
          // this.option3.updateValueAndValidity();
          let d = new Date();
          let n = d.getMilliseconds();
          console.log('option3 is required ' + n);
          console.log(this.option3.errors);
          this.checkOption3 = true;
        } else {
          this.option2.clearValidators();
          this.option3.clearValidators();
          // this.option2.updateValueAndValidity();
          // this.option3.updateValueAndValidity();
          this.option2.patchValue(this.option2.value, {emitEvent: false} );
          this.option3.patchValue(this.option3.value, {emitEvent: false} );
          this.checkOption3 = false;
          console.log('clear');
        }
      } else {
          this.checkOption3 = false;
      }
    });
  }

  /*
  on or before angular v.6
  Observable.merge(
    [ control1.valueChanges,
      control2.valueChanges ]
  ).subscribe(() => {
    // do your computation
  });
  after v.6
  merge(...)
  */

  refreshInput(): void {
    console.log('refreshInput()');
    /*
    this.input1.valueChanges.subscribe( val => {
      console.log('input1 changed + ' + val);
    });
    */
    const merged = merge(this.input1.valueChanges, this.input2.valueChanges, this.input3.valueChanges);
    console.log(merged);
    merged.subscribe(val => {
      if ((this.input1.value === '') && (this.input2.value === '') && (this.input3.value === '')) {
        this.isInput = false;
      } else {
        this.isInput = true;
      }
    });
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
