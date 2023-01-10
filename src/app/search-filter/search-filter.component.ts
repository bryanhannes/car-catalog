import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarFilter } from '../model/car-filter';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css'],
  imports: [FormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterComponent {
  @Input() public name?: string;
  @Input() public brand?: string;
  @Input() public color?: string;

  @Output() public readonly filterChanged = new EventEmitter<CarFilter>();

  public updateName(event: KeyboardEvent): void {
    let value = (event.target as HTMLInputElement).value;

    if (value === '') {
      value = null;
    }

    this.filterChanged.emit({ name: value });
  }

  public updateBrand(value: string): void {
    this.filterChanged.emit({ brand: value });
  }

  public updateColor(value: string): void {
    this.filterChanged.emit({ color: value });
  }
}
