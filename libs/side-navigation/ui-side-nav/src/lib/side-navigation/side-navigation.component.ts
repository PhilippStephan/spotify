import {Component, computed, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {
  MatNestedTreeNode,
  MatTree,
  MatTreeNestedDataSource,
  MatTreeNode,
  MatTreeNodeDef, MatTreeNodeOutlet,
  MatTreeNodeToggle
} from "@angular/material/tree";
import {MatIcon} from "@angular/material/icon";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatButton, MatIconButton} from "@angular/material/button";
import {RouterNode, TREE_DATA} from "./TREE_DATA";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatList, MatListItem, MatListItemIcon, MatListItemTitle, MatNavList} from "@angular/material/list";
import {MatLine} from "@angular/material/core";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatTooltip} from "@angular/material/tooltip";
import {timeout} from "rxjs";
import {NgClass} from "@angular/common";

@Component({
  selector: 'side-nav-side-navigation',
  standalone: true,
  imports: [
    MatTreeNode,
    MatIcon,
    MatTreeNodeDef,
    MatTree,
    MatTreeNodeToggle,
    MatIconButton,
    MatNestedTreeNode,
    MatTreeNodeOutlet,
    MatButton,
    MatList,
    MatListItem,
    MatNavList,
    MatListItemTitle,
    RouterLink,
    MatLine,
    RouterLinkActive,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatAccordion,
    MatListItemIcon,
    MatTooltip,
    NgClass
  ],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss',
})
export class SideNavigationComponent {

  sideNavCollapsed = signal(false);

  @Input() set collapsed(val: boolean){
    this.sideNavCollapsed.set(val);
  }

  @Output()
  newEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  router = inject(Router);
  protected readonly TREE_DATA = TREE_DATA;
  menuItems = signal<RouterNode[]>(TREE_DATA);

  toggleContent(): void {
    if(this.sideNavCollapsed()){
      console.log("event")
      this.newEvent.emit(true);
    }
  }

  navigateTo(route: string){
    this.router.navigate([route]);
  }


}
