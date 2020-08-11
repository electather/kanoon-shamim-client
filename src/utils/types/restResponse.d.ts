declare module 'userResponse' {
  export enum InsuranceType {
    IRAN_INSURANCE = 'IRAN_INSURANCE',
    KOSAR_INSURANCE = 'KOSAR_INSURANCE',
  }

  export interface Info {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    melliCode: string;
    address: string;
    melliCardScanFront?: FileResponse;
    melliCardScanBack?: FileResponse;
    payrollScan?: FileResponse;
  }

  export interface UserData {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    firstName: string;
    lastName: string;
    role: 'SECRETARY' | 'DOCTOR' | 'ADMIN';
    phone: string;
    avatar?: FileResponse;
    info?: Info;
    melliCode: string;
    creator?: UserData;
    vehicles?: VehicleResponse[];
    tpi?: TPIResponse[];
    bi?: BodyInsuranceResponse[];
  }

  export interface UserDataMinimal {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: FileResponse;
    melliCode: string;
    creatorId?: string;
    phone: string;
  }

  export interface VehicleResponse {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    ownerName: string;
    ownerLastName: string;
    engineNumber: string;
    chassisNumber: string;
    plateFirstTwoNumbers: string;
    plateLetter: string;
    plateLastThreeNumbers: string;
    plateIRNumber: string;
    insurer?: UserData;
    insurerId?: string;
    creatorId?: string;
    tpi?: TPIResponse[];
    bodyInsurance?: BodyInsuranceResponse[];
    creator?: UserData;
  }

  export interface TPIResponse {
    id: string;
    bimeNumber: string;
    startDate: Date;
    endDate: Date;
    isCash: boolean;
    fullAmount: number;
    insurer: UserData;
    insurerId?: string;
    vehicle: VehicleResponse;
    insurance: InsuranceType;
    attachment: FileResponse;
    createdAt: Date;
    updatedAt: Date;
    creatorId?: string;
    creator?: UserData;
  }

  export interface BodyInsuranceResponse {
    id: string;
    bimeNumber: string;
    startDate: Date;
    endDate: Date;
    isCash: boolean;
    fullAmount: number;
    insurer: UserData;
    insurerId?: string;
    vehicle: VehicleResponse;
    insurance: InsuranceType;
    attachment: FileResponse;
    createdAt: Date;
    updatedAt: Date;
    creatorId?: string;
    creator?: UserData;
  }

  export interface Paginated<T> {
    readonly data: T[];
    readonly meta: PageMeta;
  }

  export interface Token {
    expiresIn: number;
    accessToken: string;
  }

  export interface UserResponse {
    user: UserData;
    token: Token;
  }

  export interface PageMeta {
    readonly page: number;
    readonly take: number;
    readonly itemCount: number;
    readonly pageCount: number;
  }

  export interface ErrorResponse {
    readonly statusCode?: number;
    readonly message: string | string[];
    readonly error?: string;
  }
  export interface StatDetailsDto {
    readonly totalValue: number;
    readonly commission: number;
    readonly avgValue: number;
    readonly avgCommission: number;
    readonly count: number;
    readonly date?: Date;
  }

  export type IntervalTypes =
    | 'hour'
    | 'day'
    | 'week'
    | 'month'
    | 'quarter'
    | 'year';

  export interface StatsIntervalDto {
    readonly dailyStats: StatDetailsDto[];
    readonly interval: IntervalTypes;
  }

  export interface StatsTotalDto {
    readonly totalValue: number;
    readonly commission: number;
    readonly avgValue: number;
    readonly avgCommission: number;
    readonly count: number;
    readonly startDate?: string;
    readonly endDate?: string;
  }

  export interface OneLookDto {
    tpiCount: number;
    bodyInsuranceCount: number;
    totalCommission: number;
  }

  // **NEW
  export interface FileResponse {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description?: any;
    creator: unknown;
    url: string;
  }

  export interface SessionResponse {
    sessionStatus: 'done' | 'failed';
    sessionNotes?: string;
    sessionFiles?: FileResponse[];
    doctor: UserData;
    doctorId?: string;
    client: UserData;
    clientId?: string;
    startDate: Date;
    endDate: Date;
    amount: number;
    creator?: UserData;
    creatorId?: string;
    createdAt: Date;
    updatedAt: Date;
    id: string;
  }
}
