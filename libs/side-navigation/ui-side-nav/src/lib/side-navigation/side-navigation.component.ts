import {Component, inject} from '@angular/core';
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
import {MatList, MatListItem, MatListItemTitle, MatNavList} from "@angular/material/list";
import {MatLine} from "@angular/material/core";

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
    RouterLinkActive
  ],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.css'
})
export class SideNavigationComponent {

  router = inject(Router);
  protected readonly TREE_DATA = TREE_DATA;


  navigateTo(route: string){
    this.router.navigate([route]);
  }


}
