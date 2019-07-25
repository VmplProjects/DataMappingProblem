import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class XmlService {
    public getXmlKeys(result): string[] {
    let keys = Object.keys(result);
    let currentElement = result;
    while (!(currentElement[keys[0]] instanceof Array)) {
      currentElement = currentElement[keys[0]];
      keys = Object.keys(currentElement);
    }
    currentElement = currentElement[keys[0]][0];
    keys = Object.keys(currentElement);
    const allKeys = this.recursiveFindAllAttrs(currentElement).filter(
      (item, i, all) => item !== "$" && item !== "_" && all.indexOf(item) === i
    );

    return allKeys;
  }

  private recursiveFindAllAttrs(elem): string[] {
    if (typeof elem !== typeof Object()) return [];
    let keys = Object.keys(elem);
    let res = elem instanceof Array ? [] : keys;

    for (let i = 0; i < keys.length; i++) {
      let curRes = this.recursiveFindAllAttrs(elem[keys[i]]);
      res = res.concat(curRes);
    }
    return res;
  }
}
