import { RequestHandler, ParamsDictionary } from "express-serve-static-core";
import QueryString from "qs";
import { Request } from "express";

export type RouteHandler = RequestHandler<
  ParamsDictionary,
  any,
  any,
  QueryString.ParsedQs
>;

export type Req = Request<ParamsDictionary, any, any, QueryString.ParsedQs> & {
  userId?: string;
};

export default class DeviceTypes {
  static readonly ANDROID = "android";
  static readonly IOS = "ios";
  static readonly WEB = "web";
}
