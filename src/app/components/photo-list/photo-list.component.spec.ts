import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoBoardService } from 'src/app/shared/components/photo-board/photo-board.service';
import { buildPhotoList } from 'src/app/shared/components/photo-board/test/BuildPhotoList';
import { __importStar } from 'tslib';
import { PhotoListComponent } from './photo-list.component';
import { PhotosListModule } from './photo-list.module';
import { of } from 'rxjs';

describe(PhotoListComponent.name, () => {

  let fixture: ComponentFixture<PhotoListComponent>;
  let component: PhotoListComponent;
  let service: PhotoBoardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotosListModule, HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PhotoBoardService);
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it('(D) Should display board when data arrives', () => {
    const photos = buildPhotoList();
    spyOn(service, 'getPhotos').and.returnValue(of(photos));
    fixture.detectChanges();
    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('loader');
    expect(board).withContext('Should display board').not.toBeNull();
    expect(loader).withContext('Should not display board').toBeNull;
  });

  it('(D) Should display board while waiting for data', () => {
    const photos = buildPhotoList();
    spyOn(service, 'getPhotos').and.returnValue(of(null));
    fixture.detectChanges();
    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('loader');
    expect(board).withContext('Should not display board').toBeNull();
    expect(loader).withContext('Should display loader').not.toBeNull;
  });
});
