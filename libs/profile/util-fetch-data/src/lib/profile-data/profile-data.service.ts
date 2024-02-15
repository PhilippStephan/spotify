import {inject, Injectable, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {BehaviorSubject, filter, map, Observable, Subscription, switchMap, tap} from "rxjs";
import {RequestDataService} from "auth/api-data-access";
import {USER_INTERFACE} from "shared/domain";

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService{

}
