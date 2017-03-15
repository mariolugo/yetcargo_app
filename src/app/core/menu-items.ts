import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'orders',
    name: 'Ordenes en curso',
    type: 'link',
    icon: 'event'
  },
  {
    state: 'history',
    name: 'Historial',
    type: 'link',
    icon: 'list'
  },
  {
    state: 'profile',
    name: 'Mi perfil',
    type: 'link',
    icon: 'person'
  },
//   {
//     state: 'privacy',
//     name: 'Políticas de privacidad',
//     type: 'link',
//     icon: 'person'
//   }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}