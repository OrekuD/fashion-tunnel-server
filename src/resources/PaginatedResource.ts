import { PaginatedMeta } from "../types";

export default class PaginatedResource {
  private meta: PaginatedMeta;
  private list: Array<any>;

  constructor(meta: PaginatedMeta, list: Array<any>) {
    this.meta = meta;
    this.list = list;
  }

  toJSON() {
    return {
      meta: this.meta,
      list: this.list,
    };
  }
}
