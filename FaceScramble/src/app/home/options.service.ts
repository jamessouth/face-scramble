import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class OptionsService {

  // Observable string sources
  private defaultColor = new BehaviorSubject('#000000');
  private defaultWidth = new BehaviorSubject(2);
  private defaultHeight = new BehaviorSubject(2);
  // private missionConfirmedSource = new Subject<string>();

  // Observable string streams
  currentColor$ = this.defaultColor.asObservable();
  currentWidth$ = this.defaultWidth.asObservable();
  currentHeight$ = this.defaultHeight.asObservable();
  // missionConfirmed$ = this.missionConfirmedSource.asObservable();

  // Service message commands
  // announceMission(mission: string) {
  //   this.missionAnnouncedSource.next(mission);
  // }

  changeColor(color: string) {
    this.defaultColor.next(color);
  }
  changeWidth(width: number) {
    this.defaultWidth.next(width);
  }
  changeHeight(height: number) {
    this.defaultHeight.next(height);
  }
}
