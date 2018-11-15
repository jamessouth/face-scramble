import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class OptionsService {

  // Observable string sources
  private defaultColor = new BehaviorSubject('#ffffff');
  // private missionConfirmedSource = new Subject<string>();

  // Observable string streams
  currentColor$ = this.defaultColor.asObservable();
  // missionConfirmed$ = this.missionConfirmedSource.asObservable();

  // Service message commands
  // announceMission(mission: string) {
  //   this.missionAnnouncedSource.next(mission);
  // }

  changeColor(color: string) {
    this.defaultColor.next(color);
  }
}
