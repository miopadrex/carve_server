export const typeDefs = ["type EditEstimateResponse {\n  ok: Boolean!\n  status: String\n  EditEstimate: Estimate\n}\n\ntype Mutation {\n  EditEstimate(estimateId: String, size: String, part: String, want_Location_1_City: String, want_Location_1_Detail: String, want_Location_2_City: String, want_Location_2_Detail: String, requirements: String, deleteId: [String!], createUrl: [String!]): EditEstimateResponse\n  RequestEstimate(images: [String!]!, size: String!, part: String!, want_Location_1_City: String, want_Location_1_Detail: String, want_Location_2_City: String, want_Location_2_Detail: String, requirements: String): RequestEstimateResponse\n  SearchEstimate(term: String!): [Estimate!]\n  UpdateEstimate(estimateId: String, status: StatusOption!, sgEstimateId: String): UpdateEstimateResponse\n  ToggleFav(tattooId: String, tattooistId: String): ToggleFavResponse!\n  RequestReservation(tattooId: String!, date: String, requirements: String): RequestReservationResponse!\n  UpdateReservationStatus(reservationId: String, status: StatusOption!): Reservation\n  CreateTattooReview(contents: String!, grade: Int!, images: [String!], tattooId: String, tattooistId: String): CreateTattooReviewResponse\n  EditReview(action: ACTIONS, reviewId: String, contents: String, grade: Int, deleteId: [String], createUrl: [String]): EditReviewResponse\n  EditSgEstimate(SgEstimateId: String, suggestions: String, location: String, price: String, worksTime: String): EditSgEstimateResponse\n  SuggestionEstimate(estimateId: String, suggestions: String, location: String, price: String, worksTime: String): SuggestionEstimateResponse\n  EditTattoo(id: String!, title: String, contents: String, price: String, genre: String, subject: String, part: String, size: String, numberOfTask: String, workTime: String, action: String!, deleteId: [String], createUrl: [String]): EditTattooResponse\n  UploadTattoo(title: String!, contents: String!, price: String!, genre: String!, subject: String!, part: String!, size: String!, numberOfTask: String!, workTime: String!, payCard: Boolean, payDivision: Boolean, images: [String!]): UploadTattooResponse!\n  EditTattooist(storeName: String, location: String, parking: Boolean): EditTattooistResponse!\n  ToggleTattooist(kakaoPlusId: String, instaId: String, storeName: String, location: String, locationCity: String, locationDetail: String): ToggleTattooistResponse\n  ChangePassword(email: String, phoneNumber: String, password: String!): ChangePasswordResponse!\n  ChangePasswordConfirm(password: String): ChangePasswordConfirmResponse!\n  CompleteSmsVerify(phoneNumber: String!, key: String!): CompleteSmsVerifyResponse\n  EditProfile(email: String!, name: String, phoneNumber: String!, avatar: String, gender: String, age: String, storeName: String, location: String, locationCity: String, locationDetail: String, kakaoPlusId: String, instaId: String): EditProfileResponse!\n  EditTattooistProfile(phoneNumber: String, storeName: String, location: String, locationCity: String, locationDetail: String, kakaoPlusId: String, instaId: String): EditTattooistProfileResponse!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(name: String!, email: String!, password: String!, phoneNumber: String, kakaoPlusId: String, instaId: String, avatar: String, gender: String, age: Int, isTatooist: Boolean): EmailSignUpResponse!\n  KaKaoLogin(kakaoAuthId: String!, name: String, email: String, emailVerfied: Boolean, avatar: String, phoneNumber: String): KaKaoLoginResponse!\n  NaverLogin(naverAuthId: String!, name: String, email: String, avatar: String, gender: String): NaverLoginResponse!\n  RequestLoginEmailVerify(email: String): RequestLoginEmailVerifyResponse!\n  RequestPasswordResetEmailVerify(email: String): RequestPasswordResetEmailVerifyResponse!\n  RequestSmsVerify(phoneNumber: String!): RequestSmsVerifyResponse\n  ResetEmailVerifyComplete(email: String, key: String): ResetEmailVerifyCompleteResponse\n  SignEmailVerifyComplete(email: String!, key: String!): SignEmailVerifyCompleteResponse\n  SocialSignUp(kakaoAuthId: String!, name: String, email: String, avatar: String, emailVerfied: Boolean, phoneNumber: String, gender: String): SocialSignUpRespones\n}\n\ntype Subscription {\n  EstimateSgSubscrpiton(estimateId: String!): SgEstimate\n  EstimateSubscription(estimateId: String!): Estimate\n  ReservationStatusSubscription(reservationId: String!): Reservation\n}\n\ntype Query {\n  GetEstimate(estimateId: String): Estimate\n  GetMyEstimateList: [Estimate!]\n  GetReservation(reservationId: String): GetReservationResponse\n  GetReview(reviewId: String): GetReviewResponse\n  GetSgEstimate(esSgtimateLId: String): SgEstimate\n  CategorySearchTattoo(term: String): CategorySearchTattooResponse\n  GetBasicTattoos: GetBasicTattoosResponse\n  GetGuaranteeTattoos: GetGuaranteeTattoosResponse\n  GetMyTattoo(pageNumber: Int!, items: Int!): [Tattoo!]\n  GetRecomendTattoos: GetRecomendTattoosResponse\n  GetTattoo(tattooId: String): GetTattooResponse\n  TextSearchTattoo(term: String): TextSearchTattooResponse\n  GetBasicTattooists: GetBasicTattooistsResponse\n  GetGuaranteeTattooists: GetGuaranteeTattooistsResponse\n  GetRecommendTattooists: GetRecommendTattooistsResponse\n  GetTattooist(tattooistId: String): GetTattooistResponse\n  TextSearchTattooist(term: String): TextSearchTattooistResponse\n  GetEmail(phoneNumber: String): GetEmailResponse!\n  GetMyProfile: User!\n}\n\ntype RequestEstimateResponse {\n  ok: Boolean!\n  status: String\n  estimate: Estimate\n}\n\ntype UpdateEstimateResponse {\n  ok: Boolean!\n  status: String\n  estimate: Estimate\n}\n\nenum StatusOption {\n  REQUESTING\n  ACCEPTED\n  CANCELED\n  WORKING\n  FINISHED\n  REQUESTING\n  ACCEPTED\n  CANCELED\n  WORKING\n  FINISHED\n}\n\ntype Estimate {\n  id: String!\n  status: String\n  images: [File!]\n  size: String\n  part: String\n  location: String\n  want_Location_1_City: String\n  want_Location_1_Detail: String\n  want_Location_2_City: String\n  want_Location_2_Detail: String\n  price: String\n  worksTime: String\n  requirements: String\n  requestUser: User\n  tattooist: User\n  sgEstimate: [SgEstimate!]\n  createdAt: String\n  updatedAt: String\n}\n\ntype ToggleFavResponse {\n  ok: Boolean!\n  status: String\n}\n\ntype Fav {\n  id: String!\n  writeUser: User!\n  tattoo: Tattoo\n  tattooist: User\n  createdAt: String\n  updatedAt: String\n}\n\ntype File {\n  id: String!\n  url: String!\n  tattoo: Tattoo\n  tattooReview: Review\n  estimate: Estimate\n  createdAt: String\n  updatedA: String\n}\n\ntype GetReservationResponse {\n  ok: Boolean\n  status: String\n  reservation: Reservation\n}\n\ntype RequestReservationResponse {\n  ok: Boolean!\n  status: String\n  reservation: Reservation\n}\n\ntype Reservation {\n  id: String!\n  status: String\n  requestUser: User!\n  tattooist: User!\n  tattoo: Tattoo!\n  date: String\n  requirements: String\n  createdAt: String\n  updatedAt: String\n}\n\ntype CreateTattooReviewResponse {\n  ok: Boolean!\n  status: String\n  review: Review!\n}\n\ntype EditReviewResponse {\n  ok: Boolean!\n  status: String\n  editreview: Review\n}\n\nenum ACTIONS {\n  EDIT\n  DELETE\n}\n\ntype GetReviewResponse {\n  ok: Boolean!\n  status: String\n  review: Review\n}\n\ntype Review {\n  id: String!\n  contents: String!\n  grade: Int!\n  images: [File!]\n  writeUser: User!\n  tattoo: Tattoo\n  tattooist: User\n  createdAt: String\n  updatedAt: String\n}\n\ntype EditSgEstimateResponse {\n  ok: Boolean!\n  status: String\n  sgEstimate: SgEstimate\n}\n\ntype SuggestionEstimateResponse {\n  ok: Boolean\n  status: String\n  sgEstimate: SgEstimate\n}\n\ntype SgEstimate {\n  id: String!\n  estimate: Estimate\n  suggestions: String\n  location: String\n  price: String\n  worksTime: String\n  isSelect: Boolean\n  tattooist: User\n  createdAt: String\n  updatedAt: String\n}\n\ntype CategorySearchTattooResponse {\n  ok: Boolean!\n  status: String\n  tattoos: [Tattoo!]\n}\n\ntype EditTattooResponse {\n  ok: Boolean!\n  status: String\n  tattoo: Tattoo\n}\n\ntype GetBasicTattoosResponse {\n  ok: Boolean!\n  status: String\n  tattoo: [Tattoo!]\n}\n\ntype GetGuaranteeTattoosResponse {\n  ok: Boolean!\n  status: String\n  tattoo: [Tattoo!]\n}\n\ntype GetRecomendTattoosResponse {\n  ok: Boolean!\n  status: String\n  tattoo: [Tattoo!]\n}\n\ntype GetTattooResponse {\n  ok: Boolean!\n  status: String\n  tattoo: Tattoo\n}\n\ntype TextSearchTattooResponse {\n  ok: Boolean!\n  status: String\n  tattoos: [Tattoo!]\n}\n\ntype UploadTattooResponse {\n  ok: Boolean!\n  status: String\n  tattoo: Tattoo\n}\n\ntype Tattoo {\n  id: String!\n  title: String!\n  contents: String!\n  price: String!\n  genre: String!\n  subject: String!\n  part: String!\n  size: String!\n  numberOfTask: String!\n  workTime: String!\n  isFav: Boolean!\n  favsCount: Int\n  images: [File]\n  payCard: Boolean\n  payDivision: Boolean\n  writeUser: User!\n  favs: [Fav!]\n  reviews: [Review!]\n  reviewsCount: Int\n  reservations: [Reservation!]\n  reservationCount: Int\n  createdAt: String\n  updatedAt: String\n}\n\ntype EditTattooistResponse {\n  ok: Boolean!\n  status: String\n  tattooist: User\n}\n\ntype GetBasicTattooistsResponse {\n  ok: Boolean!\n  status: String\n  tattooists: [User!]\n}\n\ntype GetGuaranteeTattooistsResponse {\n  ok: Boolean!\n  status: String\n  tattooists: [User!]\n}\n\ntype GetRecommendTattooistsResponse {\n  ok: Boolean!\n  status: String\n  tattooists: [User!]\n}\n\ntype GetTattooistResponse {\n  ok: Boolean!\n  status: String\n  tattooist: User\n}\n\ntype TextSearchTattooistResponse {\n  ok: Boolean!\n  status: String\n  tattooist: [User!]\n}\n\ntype ToggleTattooistResponse {\n  ok: Boolean\n  status: String\n}\n\ntype ChangePasswordResponse {\n  ok: Boolean!\n  status: String\n  token: String\n}\n\ntype ChangePasswordConfirmResponse {\n  ok: Boolean!\n  status: String\n}\n\ntype CompleteSmsVerifyResponse {\n  ok: Boolean\n  status: String\n}\n\ntype EditProfileResponse {\n  ok: Boolean!\n  status: String\n}\n\ntype EditTattooistProfileResponse {\n  ok: Boolean!\n  status: String\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  status: String!\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  status: String!\n  token: String\n}\n\ntype GetEmailResponse {\n  ok: Boolean\n  status: String\n  email: String\n}\n\ntype KaKaoLoginResponse {\n  ok: Boolean!\n  status: String\n  token: String\n  user: User\n}\n\ntype NaverLoginResponse {\n  ok: Boolean!\n  status: String\n  token: String\n}\n\ntype RequestLoginEmailVerifyResponse {\n  ok: Boolean!\n  status: String\n}\n\ntype RequestPasswordResetEmailVerifyResponse {\n  ok: Boolean\n  status: String\n}\n\ntype RequestSmsVerifyResponse {\n  ok: Boolean\n  status: String\n}\n\ntype ResetEmailVerifyCompleteResponse {\n  ok: Boolean\n  status: String\n  token: String\n}\n\ntype SignEmailVerifyCompleteResponse {\n  ok: Boolean!\n  status: String!\n}\n\ntype SocialSignUpRespones {\n  ok: Boolean\n  status: String\n  token: String\n  user: User\n}\n\ntype User {\n  id: String!\n  name: String!\n  email: String!\n  password: String\n  phoneNumber: String!\n  phoneVerfied: Boolean\n  emailVerfied: Boolean\n  kakaoAuthId: String!\n  kakaoPlusId: String\n  naverAuthId: String\n  instaId: String\n  avatar: String\n  gender: String\n  age: String\n  reservationsAsUser: [Reservation!]\n  reservationAsUserCount: Int\n  estimateRequestUser: [Estimate!]\n  estimateRequestUserCount: Int\n  writeFavs: [Review!]\n  writeFavsCount: Int\n  writeReviews: [Review!]\n  writeReviewsCount: Int\n  rule: String\n  isTattooist: Boolean!\n  isFav: Boolean!\n  storeName: String\n  location: String\n  locationCity: String\n  locationDetail: String\n  parking: Boolean\n  guarantee: Boolean\n  recommendation: Boolean\n  reservationsAsTatooist: [Reservation!]\n  reservationsAsTatooistCount: Int\n  tattooistEstimate: [Estimate!]\n  tattooistEstimateCount: Int\n  asReviews: [Review!]\n  asReviewCount: Int\n  tattoos: [Tattoo!]\n  tattooCount: Int\n  favs: [Fav!]\n  favsCount: Int!\n  createdAt: String\n  updatedAt: String\n}\n\ntype Verification {\n  id: String!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetEstimate: Estimate | null;
  GetMyEstimateList: Array<Estimate>;
  GetReservation: GetReservationResponse | null;
  GetReview: GetReviewResponse | null;
  GetSgEstimate: SgEstimate | null;
  CategorySearchTattoo: CategorySearchTattooResponse | null;
  GetBasicTattoos: GetBasicTattoosResponse | null;
  GetGuaranteeTattoos: GetGuaranteeTattoosResponse | null;
  GetMyTattoo: Array<Tattoo>;
  GetRecomendTattoos: GetRecomendTattoosResponse | null;
  GetTattoo: GetTattooResponse | null;
  TextSearchTattoo: TextSearchTattooResponse | null;
  GetBasicTattooists: GetBasicTattooistsResponse | null;
  GetGuaranteeTattooists: GetGuaranteeTattooistsResponse | null;
  GetRecommendTattooists: GetRecommendTattooistsResponse | null;
  GetTattooist: GetTattooistResponse | null;
  TextSearchTattooist: TextSearchTattooistResponse | null;
  GetEmail: GetEmailResponse;
  GetMyProfile: User;
}

export interface GetEstimateQueryArgs {
  estimateId: string | null;
}

export interface GetReservationQueryArgs {
  reservationId: string | null;
}

export interface GetReviewQueryArgs {
  reviewId: string | null;
}

export interface GetSgEstimateQueryArgs {
  esSgtimateLId: string | null;
}

export interface CategorySearchTattooQueryArgs {
  term: string | null;
}

export interface GetMyTattooQueryArgs {
  pageNumber: number;
  items: number;
}

export interface GetTattooQueryArgs {
  tattooId: string | null;
}

export interface TextSearchTattooQueryArgs {
  term: string | null;
}

export interface GetTattooistQueryArgs {
  tattooistId: string | null;
}

export interface TextSearchTattooistQueryArgs {
  term: string | null;
}

export interface GetEmailQueryArgs {
  phoneNumber: string | null;
}

export interface Estimate {
  id: string;
  status: string | null;
  images: Array<File>;
  size: string | null;
  part: string | null;
  location: string | null;
  want_Location_1_City: string | null;
  want_Location_1_Detail: string | null;
  want_Location_2_City: string | null;
  want_Location_2_Detail: string | null;
  price: string | null;
  worksTime: string | null;
  requirements: string | null;
  requestUser: User | null;
  tattooist: User | null;
  sgEstimate: Array<SgEstimate>;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface File {
  id: string;
  url: string;
  tattoo: Tattoo | null;
  tattooReview: Review | null;
  estimate: Estimate | null;
  createdAt: string | null;
  updatedA: string | null;
}

export interface Tattoo {
  id: string;
  title: string;
  contents: string;
  price: string;
  genre: string;
  subject: string;
  part: string;
  size: string;
  numberOfTask: string;
  workTime: string;
  isFav: boolean;
  favsCount: number | null;
  images: Array<File> | null;
  payCard: boolean | null;
  payDivision: boolean | null;
  writeUser: User;
  favs: Array<Fav>;
  reviews: Array<Review>;
  reviewsCount: number | null;
  reservations: Array<Reservation>;
  reservationCount: number | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string | null;
  phoneNumber: string;
  phoneVerfied: boolean | null;
  emailVerfied: boolean | null;
  kakaoAuthId: string;
  kakaoPlusId: string | null;
  naverAuthId: string | null;
  instaId: string | null;
  avatar: string | null;
  gender: string | null;
  age: string | null;
  reservationsAsUser: Array<Reservation>;
  reservationAsUserCount: number | null;
  estimateRequestUser: Array<Estimate>;
  estimateRequestUserCount: number | null;
  writeFavs: Array<Review>;
  writeFavsCount: number | null;
  writeReviews: Array<Review>;
  writeReviewsCount: number | null;
  rule: string | null;
  isTattooist: boolean;
  isFav: boolean;
  storeName: string | null;
  location: string | null;
  locationCity: string | null;
  locationDetail: string | null;
  parking: boolean | null;
  guarantee: boolean | null;
  recommendation: boolean | null;
  reservationsAsTatooist: Array<Reservation>;
  reservationsAsTatooistCount: number | null;
  tattooistEstimate: Array<Estimate>;
  tattooistEstimateCount: number | null;
  asReviews: Array<Review>;
  asReviewCount: number | null;
  tattoos: Array<Tattoo>;
  tattooCount: number | null;
  favs: Array<Fav>;
  favsCount: number;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Reservation {
  id: string;
  status: string | null;
  requestUser: User;
  tattooist: User;
  tattoo: Tattoo;
  date: string | null;
  requirements: string | null;
  createdAt: string | null;
  updatedAt: string | null;
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

export interface Fav {
  id: string;
  writeUser: User;
  tattoo: Tattoo | null;
  tattooist: User | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface SgEstimate {
  id: string;
  estimate: Estimate | null;
  suggestions: string | null;
  location: string | null;
  price: string | null;
  worksTime: string | null;
  isSelect: boolean | null;
  tattooist: User | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface GetReservationResponse {
  ok: boolean | null;
  status: string | null;
  reservation: Reservation | null;
}

export interface GetReviewResponse {
  ok: boolean;
  status: string | null;
  review: Review | null;
}

export interface CategorySearchTattooResponse {
  ok: boolean;
  status: string | null;
  tattoos: Array<Tattoo>;
}

export interface GetBasicTattoosResponse {
  ok: boolean;
  status: string | null;
  tattoo: Array<Tattoo>;
}

export interface GetGuaranteeTattoosResponse {
  ok: boolean;
  status: string | null;
  tattoo: Array<Tattoo>;
}

export interface GetRecomendTattoosResponse {
  ok: boolean;
  status: string | null;
  tattoo: Array<Tattoo>;
}

export interface GetTattooResponse {
  ok: boolean;
  status: string | null;
  tattoo: Tattoo | null;
}

export interface TextSearchTattooResponse {
  ok: boolean;
  status: string | null;
  tattoos: Array<Tattoo>;
}

export interface GetBasicTattooistsResponse {
  ok: boolean;
  status: string | null;
  tattooists: Array<User>;
}

export interface GetGuaranteeTattooistsResponse {
  ok: boolean;
  status: string | null;
  tattooists: Array<User>;
}

export interface GetRecommendTattooistsResponse {
  ok: boolean;
  status: string | null;
  tattooists: Array<User>;
}

export interface GetTattooistResponse {
  ok: boolean;
  status: string | null;
  tattooist: User | null;
}

export interface TextSearchTattooistResponse {
  ok: boolean;
  status: string | null;
  tattooist: Array<User>;
}

export interface GetEmailResponse {
  ok: boolean | null;
  status: string | null;
  email: string | null;
}

export interface Mutation {
  EditEstimate: EditEstimateResponse | null;
  RequestEstimate: RequestEstimateResponse | null;
  SearchEstimate: Array<Estimate>;
  UpdateEstimate: UpdateEstimateResponse | null;
  ToggleFav: ToggleFavResponse;
  RequestReservation: RequestReservationResponse;
  UpdateReservationStatus: Reservation | null;
  CreateTattooReview: CreateTattooReviewResponse | null;
  EditReview: EditReviewResponse | null;
  EditSgEstimate: EditSgEstimateResponse | null;
  SuggestionEstimate: SuggestionEstimateResponse | null;
  EditTattoo: EditTattooResponse | null;
  UploadTattoo: UploadTattooResponse;
  EditTattooist: EditTattooistResponse;
  ToggleTattooist: ToggleTattooistResponse | null;
  ChangePassword: ChangePasswordResponse;
  ChangePasswordConfirm: ChangePasswordConfirmResponse;
  CompleteSmsVerify: CompleteSmsVerifyResponse | null;
  EditProfile: EditProfileResponse;
  EditTattooistProfile: EditTattooistProfileResponse;
  EmailSignIn: EmailSignInResponse;
  EmailSignUp: EmailSignUpResponse;
  KaKaoLogin: KaKaoLoginResponse;
  NaverLogin: NaverLoginResponse;
  RequestLoginEmailVerify: RequestLoginEmailVerifyResponse;
  RequestPasswordResetEmailVerify: RequestPasswordResetEmailVerifyResponse;
  RequestSmsVerify: RequestSmsVerifyResponse | null;
  ResetEmailVerifyComplete: ResetEmailVerifyCompleteResponse | null;
  SignEmailVerifyComplete: SignEmailVerifyCompleteResponse | null;
  SocialSignUp: SocialSignUpRespones | null;
}

export interface EditEstimateMutationArgs {
  estimateId: string | null;
  size: string | null;
  part: string | null;
  want_Location_1_City: string | null;
  want_Location_1_Detail: string | null;
  want_Location_2_City: string | null;
  want_Location_2_Detail: string | null;
  requirements: string | null;
  deleteId: Array<string>;
  createUrl: Array<string>;
}

export interface RequestEstimateMutationArgs {
  images: Array<string>;
  size: string;
  part: string;
  want_Location_1_City: string | null;
  want_Location_1_Detail: string | null;
  want_Location_2_City: string | null;
  want_Location_2_Detail: string | null;
  requirements: string | null;
}

export interface SearchEstimateMutationArgs {
  term: string;
}

export interface UpdateEstimateMutationArgs {
  estimateId: string | null;
  status: StatusOption;
  sgEstimateId: string | null;
}

export interface ToggleFavMutationArgs {
  tattooId: string | null;
  tattooistId: string | null;
}

export interface RequestReservationMutationArgs {
  tattooId: string;
  date: string | null;
  requirements: string | null;
}

export interface UpdateReservationStatusMutationArgs {
  reservationId: string | null;
  status: StatusOption;
}

export interface CreateTattooReviewMutationArgs {
  contents: string;
  grade: number;
  images: Array<string>;
  tattooId: string | null;
  tattooistId: string | null;
}

export interface EditReviewMutationArgs {
  action: ACTIONS | null;
  reviewId: string | null;
  contents: string | null;
  grade: number | null;
  deleteId: Array<string> | null;
  createUrl: Array<string> | null;
}

export interface EditSgEstimateMutationArgs {
  SgEstimateId: string | null;
  suggestions: string | null;
  location: string | null;
  price: string | null;
  worksTime: string | null;
}

export interface SuggestionEstimateMutationArgs {
  estimateId: string | null;
  suggestions: string | null;
  location: string | null;
  price: string | null;
  worksTime: string | null;
}

export interface EditTattooMutationArgs {
  id: string;
  title: string | null;
  contents: string | null;
  price: string | null;
  genre: string | null;
  subject: string | null;
  part: string | null;
  size: string | null;
  numberOfTask: string | null;
  workTime: string | null;
  action: string;
  deleteId: Array<string> | null;
  createUrl: Array<string> | null;
}

export interface UploadTattooMutationArgs {
  title: string;
  contents: string;
  price: string;
  genre: string;
  subject: string;
  part: string;
  size: string;
  numberOfTask: string;
  workTime: string;
  payCard: boolean | null;
  payDivision: boolean | null;
  images: Array<string>;
}

export interface EditTattooistMutationArgs {
  storeName: string | null;
  location: string | null;
  parking: boolean | null;
}

export interface ToggleTattooistMutationArgs {
  kakaoPlusId: string | null;
  instaId: string | null;
  storeName: string | null;
  location: string | null;
  locationCity: string | null;
  locationDetail: string | null;
}

export interface ChangePasswordMutationArgs {
  email: string | null;
  phoneNumber: string | null;
  password: string;
}

export interface ChangePasswordConfirmMutationArgs {
  password: string | null;
}

export interface CompleteSmsVerifyMutationArgs {
  phoneNumber: string;
  key: string;
}

export interface EditProfileMutationArgs {
  email: string;
  name: string | null;
  phoneNumber: string;
  avatar: string | null;
  gender: string | null;
  age: string | null;
  storeName: string | null;
  location: string | null;
  locationCity: string | null;
  locationDetail: string | null;
  kakaoPlusId: string | null;
  instaId: string | null;
}

export interface EditTattooistProfileMutationArgs {
  phoneNumber: string | null;
  storeName: string | null;
  location: string | null;
  locationCity: string | null;
  locationDetail: string | null;
  kakaoPlusId: string | null;
  instaId: string | null;
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
  emailVerfied: boolean | null;
  avatar: string | null;
  phoneNumber: string | null;
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

export interface RequestSmsVerifyMutationArgs {
  phoneNumber: string;
}

export interface ResetEmailVerifyCompleteMutationArgs {
  email: string | null;
  key: string | null;
}

export interface SignEmailVerifyCompleteMutationArgs {
  email: string;
  key: string;
}

export interface SocialSignUpMutationArgs {
  kakaoAuthId: string;
  name: string | null;
  email: string | null;
  avatar: string | null;
  emailVerfied: boolean | null;
  phoneNumber: string | null;
  gender: string | null;
}

export interface EditEstimateResponse {
  ok: boolean;
  status: string | null;
  EditEstimate: Estimate | null;
}

export interface RequestEstimateResponse {
  ok: boolean;
  status: string | null;
  estimate: Estimate | null;
}

export type StatusOption = "REQUESTING" | "ACCEPTED" | "CANCELED" | "WORKING" | "FINISHED";

export interface UpdateEstimateResponse {
  ok: boolean;
  status: string | null;
  estimate: Estimate | null;
}

export interface ToggleFavResponse {
  ok: boolean;
  status: string | null;
}

export interface RequestReservationResponse {
  ok: boolean;
  status: string | null;
  reservation: Reservation | null;
}

export interface CreateTattooReviewResponse {
  ok: boolean;
  status: string | null;
  review: Review;
}

export type ACTIONS = "EDIT" | "DELETE";

export interface EditReviewResponse {
  ok: boolean;
  status: string | null;
  editreview: Review | null;
}

export interface EditSgEstimateResponse {
  ok: boolean;
  status: string | null;
  sgEstimate: SgEstimate | null;
}

export interface SuggestionEstimateResponse {
  ok: boolean | null;
  status: string | null;
  sgEstimate: SgEstimate | null;
}

export interface EditTattooResponse {
  ok: boolean;
  status: string | null;
  tattoo: Tattoo | null;
}

export interface UploadTattooResponse {
  ok: boolean;
  status: string | null;
  tattoo: Tattoo | null;
}

export interface EditTattooistResponse {
  ok: boolean;
  status: string | null;
  tattooist: User | null;
}

export interface ToggleTattooistResponse {
  ok: boolean | null;
  status: string | null;
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

export interface CompleteSmsVerifyResponse {
  ok: boolean | null;
  status: string | null;
}

export interface EditProfileResponse {
  ok: boolean;
  status: string | null;
}

export interface EditTattooistProfileResponse {
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
  user: User | null;
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

export interface RequestSmsVerifyResponse {
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

export interface SocialSignUpRespones {
  ok: boolean | null;
  status: string | null;
  token: string | null;
  user: User | null;
}

export interface Subscription {
  EstimateSgSubscrpiton: SgEstimate | null;
  EstimateSubscription: Estimate | null;
  ReservationStatusSubscription: Reservation | null;
}

export interface EstimateSgSubscrpitonSubscriptionArgs {
  estimateId: string;
}

export interface EstimateSubscriptionSubscriptionArgs {
  estimateId: string;
}

export interface ReservationStatusSubscriptionSubscriptionArgs {
  reservationId: string;
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
