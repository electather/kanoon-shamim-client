declare module 'userRequest' {
  export interface CreateUser {
    ownerName: string;
    lastName: string;
    melliCode: string;
    phone: string;
    address: string;
    avatarId: string;
    melliCardScanFrontId: string;
    melliCardScanBackId: string;
    payrollScanId: string;
  }

  export interface CreateVehicle {
    issuerId: string;
    ownerName: string;
    ownerLastName: string;
    address: string;
    engineNumber: string;
    chassisNumber: string;
    plateFirstTwoNumbers: string;
    plateLetter: string;
    plateLastThreeNumbers: string;
    plateIRNumber: string;
    attachmentId: string;
  }

  export interface CreateTPI {
    bimeNumber: string;
    startDate: string;
    endDate: string;
    isCash: boolean;
    fullAmount: number;
    insurerId: string;
    vehicleId: string;
    insurance: string;
    attachmentId: string;
  }

  export interface CreateBodyInsurance {
    bimeNumber: string;
    startDate: string;
    endDate: string;
    isCash: boolean;
    fullAmount: number;
    insurerId: string;
    vehicleId: string;
    insurance: string;
    attachmentId: string;
  }
}
