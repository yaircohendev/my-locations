import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogTypes } from '../../models/locations.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() selectedCategory: string | null;
  @Output() openDialog = new EventEmitter<DialogTypes>();

  constructor() {}

  ngOnInit(): void {}
}
