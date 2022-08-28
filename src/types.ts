import { RequestHandler, ParamsDictionary } from "express-serve-static-core";
import QueryString from "qs";
import { Request } from "express";

export type RouteHandler = RequestHandler<
  ParamsDictionary,
  any,
  any,
  QueryString.ParsedQs
>;

// export type Req<T> = Request<
//   ParamsDictionary,
//   any,
//   any,
//   QueryString.ParsedQs
// > & {
//   userId?: string;
//   body: T;
// };

export interface IRequest<T> extends Request {
  body: T;
  userId?: string;
}

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

export enum ClothSizes {
  XXS = 0,
  XS = 1,
  S = 2,
  M = 3,
  L = 4,
  XL = 5,
  XXL = 6,
}

export enum ShoeSizes {
  XXS = 0,
  XS = 1,
  S = 2,
  M = 3,
  L = 4,
  XL = 5,
  XXL = 6,
}

export enum OrderStatus {
  PENDING = 0,
  ACCEPTED = 1,
  PREPARING = 2,
  READY_FOR_DELIVERY = 3,
  DISPATCHED = 4,
  DELIVERED = 5,
  REJECTED = 6,
  REFUNDED = 7,
  CANCELLED = 8,
}

export interface OrderProduct {
  id: string;
  price: number;
  count: number;
  total: number;
}

export type SizeType = "cloth" | "shoe";
