/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import {
  getHTML5TagProvider,
  getAngularTagProvider,
  getIonicTagProvider,
  IHTMLTagProvider,
  ITagSet,
  collectTagsDefault,
	collectAttributesDefault
} from '../parser/htmlTags';
import { getRazorTagProvider } from '../parser/razorTags';

export class TagProviderCollection {
  private _tagProviders: IHTMLTagProvider[];

  constructor(tagProviders: IHTMLTagProvider[]) {
    this._tagProviders = [
      getHTML5TagProvider(),
      getAngularTagProvider(),
      getIonicTagProvider(),
      getRazorTagProvider(),
      ...tagProviders
    ];
  }

  get tagProviders() {
    return this._tagProviders;
  }

  addTagProviders(tagProviders: IHTMLTagProvider[]) {
    this._tagProviders = this._tagProviders.concat(tagProviders);
    return this;
  }
}

const defaultCollection = new TagProviderCollection([]);

export function getAllTagProviders() {
  return defaultCollection.tagProviders;
}
export function addTagProviders(tagProviders: IHTMLTagProvider[]) {
  return defaultCollection.addTagProviders(tagProviders);
}
export function addTagDefinitions(tagSet: ITagSet) {
  const provider: IHTMLTagProvider = {
    getId: () => 'wc',
    isApplicable: () => true,
    collectTags: (collector: (tag: string, label: string) => void) => collectTagsDefault(collector, tagSet),
    collectAttributes: (tag: string, collector: (attribute: string, type?: string) => void) => { collectAttributesDefault(tag, collector, tagSet, []) },
    collectValues: (tag: string, attribute: string, collector: (value: string) => void) => {}
  };
  defaultCollection.addTagProviders([provider]);
}
