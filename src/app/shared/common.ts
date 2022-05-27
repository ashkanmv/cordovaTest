export class Cities {
  City: string;
  route: number;
}

export class Customer {
  ADDRESS: string;
  City: string;
  CustCode: string;
  CustTYPE: string;
  PointLatitude: string;
  PointLongitude: string;
  RouteCode: string;
  Tel: string;
  Visitor: string;
  VisitorCode: string;
  custName: string;
  routename: string;
  ssv: string;
}

export interface Marker {
  latitude: number;
  longitude: number;
  description?: string;
}

export interface LoginResponse {
  route_name: string;
  route_code: string;
  FullName: string;
  user_id: string;
  Equivalent_User_ID: string;
  userType: number;
  access: Access[];
  hasbusinesserror: number;
  Message: string;
}

export interface Access {
  name: string;
}

export interface UserLog {
  user_id: string,
  task: string,
  version: string
}



// ENUMS
export enum Languages {
  EN,
  FA
}




// Language
export class Language {
  Customer_History: {
    TitLe: string;
  }
  Questionnaire: {
    "Title": string;
    "Input-select-DC": string;
    "Input-select-route": string;
    "Input-select-routeDaily": string;
    "Input-select-customer": string;
    "Input-select-customer-Category": string;
    "Input-text-store": string;
    "Input-text-customer-name": string;
    "Input-text-address": string;
    "Radio-input-breakfast": string;
    "Radio-input-breakfast-yes": string;
    "Radio-input-breakfast-no": string;
    "Submit-button": string;
  }
  Gps_Tracking: {
    "Title": string;
    "Description": string;
    "Planned(Not_Invoiced_Yet)": string;
    "Planned&Invoiced": string;
    "OOP_invoiced": string;
    "Visited_Not_Buy": string;
    "SR": string;
    "TRUCK": string;
    "Input-select-date": string;
    "Input-select-RSM": string;
    "Input-select-ASM": string;
    "Input-select-SSV": string;
    "Input-select-SR": string;
    "Radio-input-show-truck": string;
    "Radio-input-show-SR": string;
  }
  Customer_nearby: {
    "Title": string;
    "Description": string;
    "Normal_Customer": string;
    "Promotion_Customer": string;
    "PPED_>_5%": string;
    "NOT_Buy_2_Weeks": string;
    "Not_Buy_2_Weeks_&_PPED_>_5%": string;
    "TRUCK": string;
    "Input-select-date": string;
    "Input-select-RSM": string;
    "Input-select-ASM": string;
    "Input-select-SSV": string;
    "Input-select-SR": string;
    "Radio-input-show-truck": string;
    "Radio-input-show-SR": string;
  }
  Score_Card: {
    "Title": string;
    "Segment-category": string;
    "Segment-channel": string;
    "Segment-category%": string;
    "Segment-channel%": string;
    "Radio-input-sales": string;
    "Radio-input-PPED": string;
  }
  login: {
    "title": string;
    "username": string;
    "password": string;
    "submit": string;
    "UserPassIncorrect": string;
    "RememberMe": string;
  }
}