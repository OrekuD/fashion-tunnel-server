import { Chart } from "../types";

export default class SummaryResource {
  private income: number;
  private customers: number;
  private orders: number;
  private products: number;
  private chart: Array<Chart>;

  constructor(
    income: number,
    customers: number,
    orders: number,
    products: number,
    chart: Array<Chart>
  ) {
    this.income = income;
    this.customers = customers;
    this.orders = orders;
    this.products = products;
    this.chart = chart;
  }

  toJSON() {
    return {
      income: this.income,
      customers: this.customers,
      orders: this.orders,
      products: this.products,
      chart: this.chart,
    };
  }
}
