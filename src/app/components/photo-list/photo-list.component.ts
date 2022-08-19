import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/shared/components/photo-board/photo';
import { PhotoBoardService } from 'src/app/shared/components/photo-board/photo-board.service';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent {
  public photos$: Observable<Photo[]>;
  public circleSpinner = {
    faCircleNotch
  }

  constructor(private photoBoardService: PhotoBoardService) {}
  ngOnInit(): void {
    this.photos$ = this.photoBoardService.getPhotos();
  }
}
