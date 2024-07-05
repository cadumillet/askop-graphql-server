import jwt, { JwtPayload } from "jsonwebtoken";
import { Users } from "../database";
import { User } from "../types/resolvers";
import { ObjectId } from "mongodb";

type JwtUser = User & JwtPayload;

const secret = process.env.JWT_SECRET || "";

export const getUserFromToken = async (token: string) => {
  try {
    const tokenUser = jwt.verify(token, secret) as JwtUser;
    const userId = new ObjectId(tokenUser._id);
    return Users.findOne({ _id: userId });
  } catch (error) {
    return null;
  }
};

export const generateToken = (payload: any) => {
  return jwt.sign(payload, secret, {
    expiresIn: "1h",
  });
};
