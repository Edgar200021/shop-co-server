import { Types } from "mongoose";

//declare namespace Express {
//  export interface Request {
//    user?: {
//      id: Types.ObjectId;
//    };
//  }
//}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: Types.ObjectId;
      };
    }
  }
}
