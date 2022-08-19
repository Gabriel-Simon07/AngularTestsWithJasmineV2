import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Photo } from './photo';
import { PhotoBoardService } from './photo-board.service';
import { buildPhotoList } from './test/BuildPhotoList';

@Injectable()
export class PhotoBoardMockService extends PhotoBoardService{
  public getPhotos(): Observable<Photo[]> {
    return of(buildPhotoList());
  }
}
