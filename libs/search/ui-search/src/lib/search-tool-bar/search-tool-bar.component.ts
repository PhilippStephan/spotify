import {Component, EventEmitter, Output} from '@angular/core';
import {TREE_DATA} from "side-navigation/ui-side-nav";
import {MatIcon} from "@angular/material/icon";
import {MatLine} from "@angular/material/core";
import {MatListItem, MatNavList} from "@angular/material/list";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {SEARCH_OPTIONS} from "./SEARCH_OPTIONS";
import {MatButton} from "@angular/material/button";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";

@Component({
  selector: 'search-search-tool-bar',
  standalone: true,
  imports: [
    MatIcon,
    MatLine,
    MatListItem,
    MatNavList,
    RouterLink,
    RouterLinkActive,
    MatButton,
    MatButtonToggleGroup,
    MatButtonToggle
  ],
  templateUrl: './search-tool-bar.component.html',
  styleUrl: './search-tool-bar.component.css'
})
export class SearchToolBarComponent {

  @Output()
  newEvent: EventEmitter<string | null> = new EventEmitter<string | null>();

  protected readonly SEARCH_OPTIONS = SEARCH_OPTIONS;

}
