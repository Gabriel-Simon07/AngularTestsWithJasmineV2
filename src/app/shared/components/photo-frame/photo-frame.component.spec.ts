import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Key } from 'protractor';
import { PhotoFrameComponent } from './photo-frame.component';
import { PhotoFrameModule } from './photo-frame.module';

describe(PhotoFrameComponent.name, () => {
  let fixture: ComponentFixture<PhotoFrameComponent> = null;
  let component: PhotoFrameComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoFrameModule]
    }).compileComponents;

    fixture = TestBed.createComponent(PhotoFrameComponent);
    component = fixture.componentInstance;
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`#${PhotoFrameComponent.prototype.like.name} should trigger
  (@Output liked) once when called multiple times within debounce time`, fakeAsync(() => {
    fixture.detectChanges();
    let times = 0;
    component.liked.subscribe(() => times++);
    component.like();
    component.like();
    tick(500);
    expect(times).toBe(1);
  }));

  it(`#${PhotoFrameComponent.prototype.like.name} should trigger
  (@Output liked) two time when called outside debounce time`, fakeAsync(() => {
    fixture.detectChanges();
    let times = 0;
    component.liked.subscribe(() => times++);
    component.like();
    tick(500);
    component.like();
    tick(500);
    expect(times).toBe(2);
  }));

  it(`(D) Should display number of likes when likes (@Output likes) is incremented`,() => {
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges();
    const element: HTMLSpanElement = fixture.nativeElement.querySelector('.like-counter');
    expect(element.textContent.trim()).toBe('1');
  });

  it(`(D) Should update aria-label when (@Input likes) is incremented`, () => {
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('1: people liked');
  });

  it(`(D) Should hava aria-label with 0 (@Input likes)`, () => {
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('0: people liked');
  });

  it(`(D) Should display image with src and description when bound to properties`, done => {
    const description = 'some description';
    const src = 'http://somesite.com/img.jpg';
    component.src = src;
    component.description = description;
    fixture.detectChanges();
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img.getAttribute('src')).toBe(src);
    expect(img.getAttribute('alt')).toBe(description);
    done();
  });

  it(`(D) Should display number of likes when clicked`, () => {
    fixture.detectChanges();
    component.liked.subscribe(() => {
      component.likes++;
      fixture.detectChanges();
      const counterElement = HTMLElement = fixture.nativeElement.querySelector('.like-counter');
      expect(counterElement.textContent.trim()).toBe('1');
    });
    const likeWidgetContainer: HTMLElement = fixture.nativeElement.querySelector('.like-widget-container');
    likeWidgetContainer.click();
  });

  it(`(D) Should display number of likes when ENTER key is pressed`, done => {
    fixture.detectChanges();
    component.liked.subscribe(() => {
      component.likes++;
      fixture.detectChanges();
      const counterElement = HTMLElement = fixture.nativeElement.querySelector('.like-counter');
      expect(counterElement.textContent.trim()).toBe('1');
      done();
    });
    const likeWidgetContainer: HTMLElement = fixture.nativeElement.querySelector('.like-widget-container');
    const event = new KeyboardEvent('keyup', {key: 'Enter'});
    likeWidgetContainer.dispatchEvent(event);
  });
});
