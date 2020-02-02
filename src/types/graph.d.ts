export const typeDefs = ["type CompleteEmailVerifyResponse {\n  ok: Boolean!\n  status: String!\n}\n\ntype Mutation {\n  CompleteEmailVerify(key: String!): CompleteEmailVerifyResponse\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(name: String!, email: String!, password: String!, phoneNumber: String, kakaoId: String, instaId: String, avatar: String, gender: String, age: Int, isTatooist: Boolean): EmailSignUpResponse!\n  KaKaoLogin(id: String!, name: String, email: String, gender: String, avatar: String): KaKaoLoginResponse!\n  NaverLogin(id: String!, name: String, avatar: String, gender: String): NaverLoginResponse!\n  RequestEmailVerify: RequestEmailVerifyResponse\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  status: String!\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  status: String!\n  token: String\n}\n\ntype KaKaoLoginResponse {\n  ok: Boolean!\n  status: String\n  token: String\n}\n\ntype NaverLoginResponse {\n  ok: Boolean!\n  status: String\n  token: String\n}\n\ntype RequestEmailVerifyResponse {\n  ok: Boolean!\n  status: String\n}\n\ntype User {\n  id: String!\n  name: String!\n  email: String!\n  password: String\n  phoneNumber: String!\n  kakaoId: String\n  kakaoPlusId: String\n  instaId: String\n  avatar: String\n  gender: String\n  age: Int\n  isTatooist: Boolean!\n  rule: String\n  createdAt: String\n  updatedAt: String\n}\n\ntype Query {\n  user: User!\n}\n\ntype Verification {\n  id: String!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string | null;
  phoneNumber: string;
  kakaoId: string | null;
  kakaoPlusId: string | null;
  instaId: string | null;
  avatar: string | null;
  gender: string | null;
  age: number | null;
  isTatooist: boolean;
  rule: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Mutation {
  CompleteEmailVerify: CompleteEmailVerifyResponse | null;
  EmailSignIn: EmailSignInResponse;
  EmailSignUp: EmailSignUpResponse;
  KaKaoLogin: KaKaoLoginResponse;
  NaverLogin: NaverLoginResponse;
  RequestEmailVerify: RequestEmailVerifyResponse | null;
}

export interface CompleteEmailVerifyMutationArgs {
  key: string;
}

export interface EmailSignInMutationArgs {
  email: string;
  password: string;
}

export interface EmailSignUpMutationArgs {
  name: string;
  email: string;
  password: string;
  phoneNumber: string | null;
  kakaoId: string | null;
  instaId: string | null;
  avatar: string | null;
  gender: string | null;
  age: number | null;
  isTatooist: boolean | null;
}

export interface KaKaoLoginMutationArgs {
  id: string;
  name: string | null;
  email: string | null;
  gender: string | null;
  avatar: string | null;
}

export interface NaverLoginMutationArgs {
  id: string;
  name: string | null;
  avatar: string | null;
  gender: string | null;
}

export interface CompleteEmailVerifyResponse {
  ok: boolean;
  status: string;
}

export interface EmailSignInResponse {
  ok: boolean;
  status: string;
  token: string | null;
}

export interface EmailSignUpResponse {
  ok: boolean;
  status: string;
  token: string | null;
}

export interface KaKaoLoginResponse {
  ok: boolean;
  status: string | null;
  token: string | null;
}

export interface NaverLoginResponse {
  ok: boolean;
  status: string | null;
  token: string | null;
}

export interface RequestEmailVerifyResponse {
  ok: boolean;
  status: string | null;
}

export interface Verification {
  id: string;
  target: string;
  payload: string;
  key: string;
  verified: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}
