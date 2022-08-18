export default class OkResource {
  toJSON() {
    return {
      status: 200,
      message: "ok",
    };
  }
}
