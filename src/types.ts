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

export class DeviceTypes {
  static readonly ANDROID = "android";
  static readonly IOS = "ios";
  static readonly WEB = "web";
}

export enum ProductCategories {
  TSHIRT = 0,
  SHOES = 1,
  HOODIE = 2,
  DRESSES = 3,
  TROUSERS = 4,
  JACKET = 5,
}

export enum ProductGender {
  WOMEN = 0,
  MEN = 1,
  UNISEX = 2,
}

export type SizeType = "cloth" | "shoe";
