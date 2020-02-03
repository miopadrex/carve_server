export const typeDefs = ["type ChangePasswordResponse {\n  ok: Boolean!\n  status: String\n  token: String\n}\n\ntype Mutation {\n  ChangePassword(email: String, phoneNumber: String, password: String!): ChangePasswordResponse!\n  ChangePasswordConfirm(password: String): ChangePasswordConfirmResponse!\n  EditProfile(email: String!, name: String, phoneNumber: String!, kakaoPlusId: String!, instaId: String!, avatar: String, gender: String, age: Int): EditProfileResponse!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(name: String!, email: String!, password: String!, phoneNumber: String, kakaoPlusId: String, instaId: String, avatar: String, gender: String, age: Int, isTatooist: Boolean): EmailSignUpResponse!\n  KaKaoLogin(kakaoAuthId: String!, name: String, email: String, gender: String, avatar: String): KaKaoLoginResponse!\n  NaverLogin(naverAuthId: String!, name: String, email: String, avatar: String, gender: String): NaverLoginResponse!\n  RequestLoginEmailVerify(email: String): RequestLoginEmailVerifyResponse!\n  RequestPasswordResetEmailVerify(email: String): RequestPasswordResetEmailVerifyResponse!\n  ResetEmailVerifyComplete(email: String, key: String): ResetEmailVerifyCompleteResponse\n  SignEmailVerifyComplete(key: String!): SignEmailVerifyCompleteResponse\n}\n\ntype ChangePasswordConfirmResponse {\n  ok: Boolean!\n  status: String\n}\n\ntype EditProfileResponse {\n  ok: Boolean!\n  status: String\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  status: String!\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  status: String!\n  token: String\n}\n\ntype GetEmailResponse {\n  ok: Boolean\n  status: String\n  email: String\n}\n\ntype Query {\n  GetEmail(phoneNumber: String): GetEmailResponse!\n  GetMyProfile: User!\n}\n\ntype KaKaoLoginResponse {\n  ok: Boolean!\n  status: String\n  token: String\n}\n\ntype NaverLoginResponse {\n  ok: Boolean!\n  status: String\n  token: String\n}\n\ntype RequestLoginEmailVerifyResponse {\n  ok: Boolean!\n  status: String\n}\n\ntype RequestPasswordResetEmailVerifyResponse {\n  ok: Boolean\n  status: String\n}\n\ntype ResetEmailVerifyCompleteResponse {\n  ok: Boolean\n  status: String\n  token: String\n}\n\ntype SignEmailVerifyCompleteResponse {\n  ok: Boolean!\n  status: String!\n}\n\ntype User {\n  id: String!\n  name: String!\n  email: String!\n  password: String\n  phoneNumber: String!\n  kakaoAuthId: String\n  kakaoPlusId: String\n  naverAuthId: String\n  instaId: String\n  avatar: String\n  gender: String\n  age: Int\n  isTatooist: Boolean!\n  rule: String\n  createdAt: String\n  updatedAt: String\n}\n\ntype Verification {\n  id: String!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetEmail: GetEmailResponse;
  GetMyProfile: User;
}

export interface GetEmailQueryArgs {
  phoneNumber: string | null;
}

export interface GetEmailResponse {
  ok: boolean | null;
  status: string | null;
  email: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string | null;
  phoneNumber: string;
  kakaoAuthId: string | null;
  kakaoPlusId: string | null;
  naverAuthId: string | null;
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
  ChangePassword: ChangePasswordResponse;
  ChangePasswordConfirm: ChangePasswordConfirmResponse;
  EditProfile: EditProfileResponse;
  EmailSignIn: EmailSignInResponse;
  EmailSignUp: EmailSignUpResponse;
  KaKaoLogin: KaKaoLoginResponse;
  NaverLogin: NaverLoginResponse;
  RequestLoginEmailVerify: RequestLoginEmailVerifyResponse;
  RequestPasswordResetEmailVerify: RequestPasswordResetEmailVerifyResponse;
  ResetEmailVerifyComplete: ResetEmailVerifyCompleteResponse | null;
  SignEmailVerifyComplete: SignEmailVerifyCompleteResponse | null;
}

export interface ChangePasswordMutationArgs {
  email: string | null;
  phoneNumber: string | null;
  password: string;
}

export interface ChangePasswordConfirmMutationArgs {
  password: string | null;
}

export interface EditProfileMutationArgs {
  email: string;
  name: string | null;
  phoneNumber: string;
  kakaoPlusId: string;
  instaId: string;
  avatar: string | null;
  gender: string | null;
  age: number | null;
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
  kakaoPlusId: string | null;
  instaId: string | null;
  avatar: string | null;
  gender: string | null;
  age: number | null;
  isTatooist: boolean | null;
}

export interface KaKaoLoginMutationArgs {
  kakaoAuthId: string;
  name: string | null;
  email: string | null;
  gender: string | null;
  avatar: string | null;
}

export interface NaverLoginMutationArgs {
  naverAuthId: string;
  name: string | null;
  email: string | null;
  avatar: string | null;
  gender: string | null;
}

export interface RequestLoginEmailVerifyMutationArgs {
  email: string | null;
}

export interface RequestPasswordResetEmailVerifyMutationArgs {
  email: string | null;
}

export interface ResetEmailVerifyCompleteMutationArgs {
  email: string | null;
  key: string | null;
}

export interface SignEmailVerifyCompleteMutationArgs {
  key: string;
}

export interface ChangePasswordResponse {
  ok: boolean;
  status: string | null;
  token: string | null;
}

export interface ChangePasswordConfirmResponse {
  ok: boolean;
  status: string | null;
}

export interface EditProfileResponse {
  ok: boolean;
  status: string | null;
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

export interface RequestLoginEmailVerifyResponse {
  ok: boolean;
  status: string | null;
}

export interface RequestPasswordResetEmailVerifyResponse {
  ok: boolean | null;
  status: string | null;
}

export interface ResetEmailVerifyCompleteResponse {
  ok: boolean | null;
  status: string | null;
  token: string | null;
}

export interface SignEmailVerifyCompleteResponse {
  ok: boolean;
  status: string;
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
