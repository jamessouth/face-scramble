import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Image } from "tns-core-modules/ui/image";

@Injectable()
export class OptionsService {

  // Observable string sources
  private defaultColor = new BehaviorSubject('#000000');
  private defaultSize = new BehaviorSubject(2);
  private defaultImage = new BehaviorSubject(new Image());
  // private defaultWidth = new BehaviorSubject(2);
  // private defaultHeight = new BehaviorSubject(2);
  // private missionConfirmedSource = new Subject<string>();

  // Observable string streams
  currentColor$ = this.defaultColor.asObservable();
  currentSize$ = this.defaultSize.asObservable();
  currentImage$ = this.defaultImage.asObservable();
  // currentWidth$ = this.defaultWidth.asObservable();
  // currentHeight$ = this.defaultHeight.asObservable();
  // missionConfirmed$ = this.missionConfirmedSource.asObservable();

  // Service message commands
  // announceMission(mission: string) {
  //   this.missionAnnouncedSource.next(mission);
  // }

  changeColor(color: string): void {
    this.defaultColor.next(color);
  }
  changeSize(size: number): void {
    this.defaultSize.next(size);
  }
  changeImage(image: Image): void {
    this.defaultImage.next(image);
  }
  // changeWidth(width: number) {
  //   this.defaultWidth.next(width);
  // }
  // changeHeight(height: number) {
  //   this.defaultHeight.next(height);
  // }
}
