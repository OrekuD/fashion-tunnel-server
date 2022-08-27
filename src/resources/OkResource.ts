export default class OkResource {
  private data: string = "";

  constructor(data?: string) {
    this.data = data || "";
  }

  toJSON() {
    return {
      status: 200,
      message: "ok",
      data: this.data,
    };
  }
}
