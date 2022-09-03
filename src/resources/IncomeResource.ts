export default class IncomeResource {
  private total: number;

  constructor(total: number) {
    this.total = total;
  }

  toJSON() {
    return {
      total: this.total,
    };
  }
}
