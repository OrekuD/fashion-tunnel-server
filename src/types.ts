import { RequestHandler, ParamsDictionary } from "express-serve-static-core";
import QueryString from "qs";
import { Request } from "express";

export type RouteHandler = RequestHandler<
  ParamsDictionary,
  any,
  any,
  QueryString.ParsedQs
>;

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

export interface OrderStatusTimeStamp {
  status: OrderStatus;
  time: string;
}

export enum Events {
  USER_ADDRESS_CREATE = "user:address:create", // done
  USER_ORDER_CREATE = "user:order:create", // done
  USER_PROFILE_UPDATE = "user:profile:update", // done
  USER_FAVOURITE_ITEM = "user:favourite:item", // done
  ORDER_STATUS_CHANGE = "order:status:change",
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
  PROCESSING = 2,
  DISPATCHED = 3,
  DELIVERED = 4,
  REJECTED = 5,
  CANCELLED = 6,
}

export interface OrderProduct {
  id: string;
  price: number;
  count: number;
  total: number;
}

export interface Address {
  id: string;
  name: string;
  addressLine: string;
  postalCode: string;
}

export interface DetailedOrderProduct {
  id: string;
  price: number;
  count: number;
  total: number;
  name: string;
  description: string;
  extraInfo: string;
  gender: ProductGender;
  productQuantity: number;
  images: Array<string>;
  sizeType: SizeType;
  productCategory: ProductCategories;
}

export type SizeType = "cloth" | "shoe";
