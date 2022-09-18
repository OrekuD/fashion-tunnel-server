export default class SummaryResource {
  private income: number;
  private customers: number;
  private orders: number;

  constructor(income: number, customers: number, orders: number) {
    this.income = income;
    this.customers = customers;
    this.orders = orders;
  }

  toJSON() {
    return {
      income: this.income,
      customers: this.customers,
      orders: this.orders,
    };
  }
}
