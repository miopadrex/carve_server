export const typeDefs = ["type GetFavTattooResponse {\n  ok: Boolean!\n  status: String\n  tattoo: [Tattoo!]!\n}\n\ntype Query {\n  GetFavTattoo: GetFavTattooResponse\n  GetFavTattooist: GetFavTattooistResponse\n  CategorySearchTattoo(term: String): CategorySearchTattooResponse\n  GetGuaranteeTattoo: GetGuaranteeTattooResponse\n  GetRecomendTattoo: GetRecomendTattooResponse\n  GetTattoo: GetTattooResponse\n  TextSearchTattoo(term: String): TextSearchTattooResponse\n  GetEmail(phoneNumber: String): GetEmailResponse!\n  GetMyProfile: User!\n}\n\ntype GetFavTattooistResponse {\n  ok: Boolean!\n  status: String\n  tattooist: [User!]!\n}\n\ntype Fav {\n  id: String!\n  writeUser: User!\n  tattoo: Tattoo\n  tattooist: User\n  createdAt: String\n  updatedAt: String\n}\n\ntype File {\n  id: String!\n  url: String!\n  tattoo: Tattoo\n  tattooReview: Review\n  createdAt: String\n  updatedA: String\n}\n\ntype Reservation {\n  id: String!\n  Status: String!\n  requestUser: User!\n  tattooist: User!\n  tatoo: Tattoo!\n  createdAt: String\n  updatedAt: String\n}\n\ntype Review {\n  id: String!\n  contents: String!\n  grade: Int!\n  images: [File!]\n  writeUser: User!\n  tattoo: Tattoo\n  tattooist: User\n  createdAt: String\n  updatedAt: String\n}\n\ntype CategorySearchTattooResponse {\n  ok: Boolean!\n  status: String\n  tattoos: [Tattoo!]\n}\n\ntype EditTattooResponse {\n  ok: Boolean!\n  status: String\n}\n\ntype Mutation {\n  EditTattoo(id: String!, title: String, contents: String, price: Int, genre: String, subject: String, part: String, size: String, numberOfTask: String, workTime: String, sale: Boolean, action: ACTIONS!, deleteId: [String], createUrl: [String]): EditTattooResponse\n  UploadTattoo(title: String!, contents: String!, price: Int!, genre: String!, subject: String!, part: String!, size: String!, numberOfTask: String!, workTime: String!, sale: Boolean!, images: [String!]): UploadTattooResponse!\n  ChangePassword(email: String, phoneNumber: String, password: String!): ChangePasswordResponse!\n  ChangePasswordConfirm(password: String): ChangePasswordConfirmResponse!\n  EditProfile(email: String!, name: String, phoneNumber: String!, kakaoPlusId: String!, instaId: String!, avatar: String, gender: String, age: Int): EditProfileResponse!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(name: String!, email: String!, password: String!, phoneNumber: String, kakaoPlusId: String, instaId: String, avatar: String, gender: String, age: Int, isTatooist: Boolean): EmailSignUpResponse!\n  KaKaoLogin(kakaoAuthId: String!, name: String, email: String, gender: String, avatar: String): KaKaoLoginResponse!\n  NaverLogin(naverAuthId: String!, name: String, email: String, avatar: String, gender: String): NaverLoginResponse!\n  RequestLoginEmailVerify(email: String): RequestLoginEmailVerifyResponse!\n  RequestPasswordResetEmailVerify(email: String): RequestPasswordResetEmailVerifyResponse!\n  ResetEmailVerifyComplete(email: String, key: String): ResetEmailVerifyCompleteResponse\n  SignEmailVerifyComplete(key: String!): SignEmailVerifyCompleteResponse\n}\n\nenum ACTIONS {\n  EDIT\n  DELETE\n}\n\ntype GetGuaranteeTattooResponse {\n  ok: Boolean!\n  status: String\n  tattoo: [Tattoo!]!\n}\n\ntype GetRecomendTattooResponse {\n  ok: Boolean!\n  status: String\n  tattoo: [Tattoo]\n}\n\ntype GetTattooResponse {\n  ok: Boolean!\n  status: String\n  tattoo: [Tattoo!]!\n}\n\ntype TextSearchTattooResponse {\n  ok: Boolean!\n  status: String\n  tattoos: [Tattoo!]\n}\n\ntype UploadTattooResponse {\n  ok: Boolean!\n  status: String\n  tattoo: Tattoo\n}\n\ntype Tattoo {\n  id: String!\n  title: String!\n  contents: String!\n  price: Int!\n  genre: String!\n  subject: String!\n  part: String!\n  size: String!\n  numberOfTask: String!\n  workTime: String!\n  sale: Boolean!\n  isFav: Boolean!\n  favsCount: Int\n  images: [File]\n  writeUser: User!\n  favs: [Fav!]\n  reviews: [Review!]\n  reviewsCount: Int\n  reservations: [Reservation!]\n  reservationCount: Int\n  createdAt: String\n  updatedAt: String\n}\n\ntype ChangePasswordResponse {\n  ok: Boolean!\n  status: String\n  token: String\n}\n\ntype ChangePasswordConfirmResponse {\n  ok: Boolean!\n  status: String\n}\n\ntype EditProfileResponse {\n  ok: Boolean!\n  status: String\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  status: String!\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  status: String!\n  token: String\n}\n\ntype GetEmailResponse {\n  ok: Boolean\n  status: String\n  email: String\n}\n\ntype KaKaoLoginResponse {\n  ok: Boolean!\n  status: String\n  token: String\n}\n\ntype NaverLoginResponse {\n  ok: Boolean!\n  status: String\n  token: String\n}\n\ntype RequestLoginEmailVerifyResponse {\n  ok: Boolean!\n  status: String\n}\n\ntype RequestPasswordResetEmailVerifyResponse {\n  ok: Boolean\n  status: String\n}\n\ntype ResetEmailVerifyCompleteResponse {\n  ok: Boolean\n  status: String\n  token: String\n}\n\ntype SignEmailVerifyCompleteResponse {\n  ok: Boolean!\n  status: String!\n}\n\ntype User {\n  id: String!\n  name: String!\n  email: String!\n  password: String\n  phoneNumber: String!\n  kakaoAuthId: String\n  kakaoPlusId: String\n  naverAuthId: String\n  instaId: String\n  avatar: String\n  gender: String\n  age: Int\n  isTattooist: Boolean!\n  rule: String\n  storeName: String\n  location: String\n  guarantee: Boolean\n  recommendation: Boolean\n  reservationsAsTatooist: Reservation\n  reservationsAsTatooistCount: Int\n  reservationsAsUser: Reservation\n  reservationAsUserCount: Int\n  reservationAsCount: Int\n  writeReviews: [Review!]\n  writeFavs: [Review!]\n  tattoos: [Tattoo!]\n  tattooCount: Int!\n  asReviews: [Review!]\n  asReviewCount: Int!\n  isFav: Boolean!\n  favs: [Fav!]\n  favsCount: Int!\n  createdAt: String\n  updatedAt: String\n}\n\ntype Verification {\n  id: String!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetFavTattoo: GetFavTattooResponse | null;
  GetFavTattooist: GetFavTattooistResponse | null;
  CategorySearchTattoo: CategorySearchTattooResponse | null;
  GetGuaranteeTattoo: GetGuaranteeTattooResponse | null;
  GetRecomendTattoo: GetRecomendTattooResponse | null;
  GetTattoo: GetTattooResponse | null;
  TextSearchTattoo: TextSearchTattooResponse | null;
  GetEmail: GetEmailResponse;
  GetMyProfile: User;
}

export interface CategorySearchTattooQueryArgs {
  term: string | null;
}

export interface TextSearchTattooQueryArgs {
  term: string | null;
}

export interface GetEmailQueryArgs {
  phoneNumber: string | null;
}

export interface GetFavTattooResponse {
  ok: boolean;
  status: string | null;
  tattoo: Array<Tattoo>;
}

export interface Tattoo {
  id: string;
  title: string;
  contents: string;
  price: number;
  genre: string;
  subject: string;
  part: string;
  size: string;
  numberOfTask: string;
  workTime: string;
  sale: boolean;
  isFav: boolean;
  favsCount: number | null;
  images: Array<File> | null;
  writeUser: User;
  favs: Array<Fav>;
  reviews: Array<Review>;
  reviewsCount: number | null;
  reservations: Array<Reservation>;
  reservationCount: number | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface File {
  id: string;
  url: string;
  tattoo: Tattoo | null;
  tattooReview: Review | null;
  createdAt: string | null;
  updatedA: string | null;
}

export interface Review {
  id: string;
  contents: string;
  grade: number;
  images: Array<File>;
  writeUser: User;
  tattoo: Tattoo | null;
  tattooist: User | null;
  createdAt: string | null;
  updatedAt: string | null;
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
  isTattooist: boolean;
  rule: string | null;
  storeName: string | null;
  location: string | null;
  guarantee: boolean | null;
  recommendation: boolean | null;
  reservationsAsTatooist: Reservation | null;
  reservationsAsTatooistCount: number | null;
  reservationsAsUser: Reservation | null;
  reservationAsUserCount: number | null;
  reservationAsCount: number | null;
  writeReviews: Array<Review>;
  writeFavs: Array<Review>;
  tattoos: Array<Tattoo>;
  tattooCount: number;
  asReviews: Array<Review>;
  asReviewCount: number;
  isFav: boolean;
  favs: Array<Fav>;
  favsCount: number;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Reservation {
  id: string;
  Status: string;
  requestUser: User;
  tattooist: User;
  tatoo: Tattoo;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Fav {
  id: string;
  writeUser: User;
  tattoo: Tattoo | null;
  tattooist: User | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface GetFavTattooistResponse {
  ok: boolean;
  status: string | null;
  tattooist: Array<User>;
}

export interface CategorySearchTattooResponse {
  ok: boolean;
  status: string | null;
  tattoos: Array<Tattoo>;
}

export interface GetGuaranteeTattooResponse {
  ok: boolean;
  status: string | null;
  tattoo: Array<Tattoo>;
}

export interface GetRecomendTattooResponse {
  ok: boolean;
  status: string | null;
  tattoo: Array<Tattoo> | null;
}

export interface GetTattooResponse {
  ok: boolean;
  status: string | null;
  tattoo: Array<Tattoo>;
}

export interface TextSearchTattooResponse {
  ok: boolean;
  status: string | null;
  tattoos: Array<Tattoo>;
}

export interface GetEmailResponse {
  ok: boolean | null;
  status: string | null;
  email: string | null;
}

export interface Mutation {
  EditTattoo: EditTattooResponse | null;
  UploadTattoo: UploadTattooResponse;
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

export interface EditTattooMutationArgs {
  id: string;
  title: string | null;
  contents: string | null;
  price: number | null;
  genre: string | null;
  subject: string | null;
  part: string | null;
  size: string | null;
  numberOfTask: string | null;
  workTime: string | null;
  sale: boolean | null;
  action: ACTIONS;
  deleteId: Array<string> | null;
  createUrl: Array<string> | null;
}

export interface UploadTattooMutationArgs {
  title: string;
  contents: string;
  price: number;
  genre: string;
  subject: string;
  part: string;
  size: string;
  numberOfTask: string;
  workTime: string;
  sale: boolean;
  images: Array<string>;
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

export type ACTIONS = "EDIT" | "DELETE";

export interface EditTattooResponse {
  ok: boolean;
  status: string | null;
}

export interface UploadTattooResponse {
  ok: boolean;
  status: string | null;
  tattoo: Tattoo | null;
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
