import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(private dateParser: NgbDateParserFormatter) { }

  public parseDate(date: string): NgbDateStruct {
    if (!date) {
      return null;
    }
    return this.dateParser.parse(date);
  }

  public formatDate(date: NgbDateStruct): string {
    if (!date) {
      return '';
    }
    return this.dateParser.format(date);
  }
}
