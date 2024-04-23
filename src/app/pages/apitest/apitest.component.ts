import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';

// import { WindowRefService } from 'src/app/core/services';

import { Observable, Subject, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-apitest',
  templateUrl: './apitest.component.html',
  styleUrls: ['./apitest.component.scss'],
})
export class ApitestComponent implements OnInit {
  public categoricalQuestion = {
    self_awareness: [
      '1, self-awareness question number 1',
      '2, self-awareness question number 2',
      '3, self-awareness question number 3',
    ],
    family: [
      '1, family question number 1',
      '2, family question number 2',
      '3, family question number 3',
    ],
    wealth: [],
    health: [],
    numerology: [],
    travel: [],
    business: [],
  };

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  public SearchCountryField = SearchCountryField;
  public CountryISO = CountryISO;
  public PhoneNumberFormat = PhoneNumberFormat;
  public preferredCountries: CountryISO[] = [
    CountryISO.India,
    CountryISO.UnitedStates,
  ];

  public questionSet = { category: '', index: 0 };

  public question =
    'Question will appear here,Question will appear here,Question will  appear here,Question will appear here,Question will appear here,Question will appear here,Question will appear here,Questionwill appear here,Question will appear here,Question will appear here';

  public answerText = '';

  // Firebase
  public windowRef: any;
  public formStep: number = 1;
  public loading: boolean = false;

  public signUpForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    gender: [null, [Validators.required]],
    dateOfBirth: [null, [Validators.required]],
    birthTime: [null, [Validators.required]],
    birthPlace: ['', [Validators.required]],
  });
  public signUpFormSubmitted: boolean = false;

  public basicDetails: any;

  public categoryForm: FormGroup = this.formBuilder.group({
    category: [null, [Validators.required]],
  });
  public categoryFormSubmitted: boolean = false;

  options: any[] = [];

  movies$: Observable<any>;
  moviesLoading = false;
  moviesInput$ = new Subject<string>();
  selectedMovie: any;
  minLengthTerm = 3;

  constructor(
    // public windowRefService: WindowRefService,
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadMovies();
    localStorage.removeItem('basic_details');
  }

  trackByFn(item: any) {
    return item.imdbID;
  }

  loadMovies() {
    this.movies$ = // default items
      this.moviesInput$.pipe(
        filter((res) => {
          return res !== null && res.length >= this.minLengthTerm;
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => (this.moviesLoading = true)),
        switchMap((term) => {
          return this.getMovies(term).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => (this.moviesLoading = false))
          );
        })
      );
  }

  getMovies(term: string = null): Observable<any> {
    const httpOptions = {
      headers: {
        'X-RapidAPI-Key': 'caeb00ca62msh82e7ceb1a80bcabp142705jsnc0b4069afb3e',
        'X-RapidAPI-Host': 'place-autocomplete1.p.rapidapi.com',
      },
      params: { input: term, radius: '500' },
    };
    return this.http
      .get<any>(
        `https://place-autocomplete1.p.rapidapi.com/autocomplete/json`,
        httpOptions
      )
      .pipe(
        map((resp) => {
          if (resp.Error) {
            throwError(resp.Error);
          } else {
            return resp.predictions;
          }
        })
      );
  }

  get signUpFrm() {
    return this.signUpForm.controls;
  }

  search = (text$: any) => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchText) => {
        const httpOptions = {
          headers: {
            'X-RapidAPI-Key':
              'caeb00ca62msh82e7ceb1a80bcabp142705jsnc0b4069afb3e',
            'X-RapidAPI-Host': 'place-autocomplete1.p.rapidapi.com',
          },
          params: { input: 'new', radius: '500' },
        };
        return this.http.get<any[]>(
          `https://place-autocomplete1.p.rapidapi.com/autocomplete/json`,
          httpOptions
        );
      }),
      tap((data) => {
        this.options = [data]; // Update options array with data from API response
      })
    );
  };

  goBackToSignUp(): void {
    let data = JSON.parse(localStorage.getItem('basic_details')!);
    this.signUpForm.patchValue(data);
    this.formStep = 1;
  }

  createProfileInRegistration(): void {
    this.signUpFormSubmitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    let formValues = this.signUpForm.value;
    formValues['dateOfBirth'] = new Date(
      formValues['dateOfBirth'].year,
      formValues['dateOfBirth'].month - 1,
      formValues['dateOfBirth'].day
    );
    formValues['birthPlace'] = formValues['birthPlace'].description;
    // format birthtime
    const hour = formValues['birthTime']?.hour?.toString().padStart(2, '0');
    const minute = formValues['birthTime']?.minute?.toString().padStart(2, '0');
    const second = formValues['birthTime']?.second?.toString().padStart(2, '0');
    const formattedTime = `${hour}:${minute}:${second} ${
      formValues['birthTime']?.hour >= 12 ? 'PM' : 'AM'
    }`;
    //////////////////
    formValues['birthTime'] = formattedTime;
    this.formStep = 2;
    localStorage.setItem('basic_details', JSON.stringify(formValues));
  }

  getAnswer(): void {
    console.log("this i get answers")
    let data = JSON.parse(localStorage.getItem('basic_details'));
    this.http
      .post<any>(
        `http://127.0.0.1:8000/asc_personality?birthdate=${data?.dateOfBirth}&birthtime=${data?.birthTime}&birthlocation=${data?.birthPlace}' `,
        {}
      )
      .pipe(
        map((resp) => {
          if (resp.Error) {
            throwError(resp.Error);
          } else {
            this.answerText = resp.message;
          }
        })
      );
  }

  setQuestion(): void {
    this.question =
      this.categoricalQuestion[this.questionSet.category][
        this.questionSet.index
      ];
  }

  getNextQuestion() {
    let currentQuestionIndex =
      (this.questionSet.index + 1) %
      this.categoricalQuestion[this.questionSet.category].length;
    this.questionSet.index = currentQuestionIndex;
    this.setQuestion();
  }

  getPreviousQuestion() {
    let currentQuestionIndex =
      (this.questionSet.index -
        1 +
        this.categoricalQuestion[this.questionSet.category].length) %
      this.categoricalQuestion[this.questionSet.category].length;
    this.questionSet.index = currentQuestionIndex;
    this.setQuestion();
  }

  backToCategory(): void {
    this.formStep = 2;
    let data = localStorage.getItem('basic_details');
  }

  selectCategory(): void {
    if (this.categoryForm.invalid) {
      return;
    }
    let formValues = this.categoryForm.value;
    this.questionSet = { category: formValues?.category, index: 0 };
    this.setQuestion();
    this.formStep = 3;
  }
}
