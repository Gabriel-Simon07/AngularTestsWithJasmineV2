import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { PhotoListComponent } from 'src/app/components/photo-list/photo-list.component';
import { PhotosListModule } from 'src/app/components/photo-list/photo-list.module';
import { Photo } from './photo';
import { PhotoBoardMockService } from './photo-board-mock.service';
import { PhotoBoardService } from './photo-board.service';
import { buildPhotoList } from './test/BuildPhotoList';

describe(PhotoListComponent.name + 'MOCK PROVIDER', () => {

  let fixture: ComponentFixture<PhotoListComponent>;
  let component: PhotoListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotosListModule, HttpClientModule],
      providers: [{
        provide: PhotoBoardService,
        useClass: PhotoBoardMockService
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it('(D) Should display board when data arrives', () => {
    fixture.detectChanges();
    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('loader');
    expect(board).withContext('Should display board').not.toBeNull();
    expect(loader).withContext('Should not display board').toBeNull;
  });
});
