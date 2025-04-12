// @flow

// declare var document: Document
declare var Intl: {
  NumberFormat: Class<Intl$NumberFormat>,
  // Add other Intl properties as needed
}

declare class Intl$NumberFormat {
  constructor(locales?: string | Array<string>, options?: Object): void;
  format(value: number): string;
}
