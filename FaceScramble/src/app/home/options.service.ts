import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Image } from "tns-core-modules/ui/image";

@Injectable()
export class OptionsService {
  private defaultColor = new BehaviorSubject('#000000');
  private defaultSize = new BehaviorSubject(2);
  private defaultImage = new BehaviorSubject(new Image());

  currentColor$ = this.defaultColor.asObservable();
  currentSize$ = this.defaultSize.asObservable();
  currentImage$ = this.defaultImage.asObservable();

  changeColor(color: string): void {
    this.defaultColor.next(color);
  }
  changeSize(size: number): void {
    this.defaultSize.next(size);
  }
  changeImage(image: Image): void {
    this.defaultImage.next(image);
  }
}
