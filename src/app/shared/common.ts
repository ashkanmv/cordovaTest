import {
  IconOptions,
  LatLngLiteral,
  LatLngTuple,
  PolylineOptions,
} from 'leaflet';

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

export class Questioncat {
  CatName: string;
  EnglishTitle: string;
  IsActive: boolean;
  IsDeleted: boolean;
  Mod_DT: Date;
  Mod_User: number;
  QusCatID: number;
}

export interface Question {
  id: number;
  text: string;
  type: string;
  has_image: boolean;
  order: number;
  language: string;
  need_answer: boolean;
  answer_text: string;
  status: string;
  create_at: Date;
  user_id: string;
  pic: any;
  answers: any;
  typeId: number;
  Mod_DT: Date;
  Mod_User: number;
  QuestionID: number;
  CategoryID: number;
}

export interface Marker {
  latitude: number;
  longitude: number;
  description?: string;
  icon: IconOptions;
  customerCode?: number;
}

export interface Polyline {
  latLng: LatLngTuple[];
  options: PolylineOptions;
}

export interface News {
  id: string;
  title: string;
  pic: string;
  text: string;
  type: string;
  status: string;
  create_at: Date;
  Mod_DT: Date;
  Mod_User: number;
}

export interface GetSales2ByCatSkuResponse {
  Channels: string;
  Today: number;
  MTD: number;
  RunRate: number;
  "FM Projection": number;
}

export interface GetSrRouteResponse {
  routecode: string;
  routename: string;
}

export interface getSales1ByChannelResponse {
  Category: string;
  Today: number;
  MTD: number;
  RunRate: number;
  "FM Projection": number;
}

export interface GetVehicleByRouteTimeResponse {
  Latitude: number;
  Longitude: number;
  Speed: any;
  Temp: any;
  TruckNo: any;
  DateTime: any;
}

export interface GetSrInfoResponse {
  Name: string;
  Route: string;
  Total_Planed: number;
  Total_Visited: number;
  Total_Invoiced: number;
  Total_Oor: number;
  Total_Visited_Not_Buy: number;
  First_Invoiced: string;
  Last_Invoiced: string;
  Max_Gap_Invoiced: string;
  Time_To_Route: string;
  Last_invoiced_To_wh: string;
  Dim_Id: string;
  FromDate: Date;
  ToDate: Date;
  mod_cd: Date;
  UserID: string;
  RouteCode: string;
  BrokerID: string;
}

export interface getSrSalesUsersResponse {
  Route: string;
  Visitor: string;
  Driver: string;
  Pln: number;
  Inv: number;
  '%': string;
  OOR: number;
  Total: number;
  NotINV: number;
  Sale: number;
  PPED: number;
}

export interface getVPByRouteResponse {
  id: string;
  lat: number;
  lng: number;
  user_id: string;
  route_name: string;
  visitor_code: string;
  provider: string;
  time: string;
  accuracy: number;
  speed: number;
  altitude: number;
  bearing?: any;
  location_provider: number;
  uuid: string;
  status: string;
  Create_At_Sys: Date;
  create_at: Date;
  Dim_Id: string;
  FromDate: Date;
  ToDate: Date;
  mod_cd: Date;
  UserID: string;
  RouteCode: string;
  BrokerID: string;
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

export interface getUserCildrenResponse {
  Uid: number;
  Fromdate: Date;
  Todate: Date;
  id: string;
  PartyID: string;
  ParentID: string;
  userType: number;
  FirstName: string;
  LastName: string;
  LandLine: string;
  CellNumber: string;
  username: string;
  password: string;
  status: string;
  create_at: Date;
  Mod_DT: Date;
  Mod_User: number;
  isSystemUser?: any;
  Equivalent_User_ID: string;
  name: string;
  FullName: string;
}

export interface GetInvoicedResponse {
  CustCode: number;
  DocDate: string;
  Date: string;
  DocNo: string;
  Name: string;
  GranteeName: string;
  Street: string;
  Tel: string;
  SaleKG: number;
  InvCode: string;
  PointLatitude: string;
  PointLongitude: string;
  IsPlan: boolean;
}

export interface Shop {
  City: string;
  CustCode: number;
  PointLatitude: string;
  PointLongitude: string;
  custName: string;
  CustTYPE: string;
  ADDRESS: string;
  Tel: string;
  routename: string;
  RouteCode: string;
  VisitorCode: string;
  Visitor: string;
  TwoWeek: number;
  SixWeekPPED: number;
  MonthPromotion: number;
  Distance: number;
}

export interface VisitedNotBuyResponse {
  City: string;
  CustCode: number;
  PointLatitude: string;
  PointLongitude: string;
  custName: string;
  CustTYPE: string;
  ADDRESS: string;
  Tel: string;
  routename: string;
  RouteCode: string;
  VisitorCode: string;
  Visitor: string;
}

export interface Access {
  name: string;
}

export interface UserLog {
  user_id: string;
  task: string;
  version: string;
}

export interface PopoverItem {
  title: string;
  value: any;
  selected?: boolean;
}

export interface MapView {
  lng: number;
  lat: number;
  zoom: number;
}

// ENUMS
export enum Languages {
  EN,
  FR,
}

// Language
export class Language {
  Customer_History: {
    Title: string;
    gps: string;
    Shop_name: string;
    Shop_code: number;
    Shop_type: string;
    Tell: number;
    SR: string;
    Address: string;
  };
  Questionnaire: {
    Title: string;
    Input_select_DC: string;
    Input_select_route: string;
    Input_select_routeDaily: string;
    Input_select_customer: string;
    Input_select_customer_Category: string;
    Input_text_store: string;
    Input_text_customer_name: string;
    Input_text_address: string;
    Radio_input_breakfast: string;
    Radio_input_breakfast_yes: string;
    Radio_input_breakfast_no: string;
    Submit_button: string;
  };
  Gps_Tracking: {
    Title: string;
    Description: string;
    'Planned(Not_Invoiced_Yet)': string;
    'Planned&Invoiced': string;
    OOP_invoiced: string;
    Visited_Not_Buy: string;
    SR: string;
    TRUCK: string;
    'Input-select-date': string;
    'Input-select-RSM': string;
    'Input-select-ASM': string;
    'Input-select-SSV': string;
    'Input-select-SR': string;
    'Radio-input-show-truck': string;
    'Radio-input-show-SR': string;
  };
  Customer_nearby: {
    Title: string;
    Description: string;
    Normal_Customer: string;
    Promotion_Customer: string;
    'PPED_>_5%': string;
    NOT_Buy_2_Weeks: string;
    'Not_Buy_2_Weeks_&_PPED_>_5%': string;
    TRUCK: string;
    'Input-select-date': string;
    'Input-select-RSM': string;
    'Input-select-ASM': string;
    'Input-select-SSV': string;
    'Input-select-SR': string;
    'Radio-input-show-truck': string;
    'Radio-input-show-SR': string;
  };
  Score_Card: {
    Title: string;
    'Segment-category': string;
    'Segment-channel': string;
    'Segment-category%': string;
    'Segment-channel%': string;
    'Radio-input-sales': string;
    'Radio-input-PPED': string;
    group: string;
  };
  login: {
    title: string;
    username: string;
    password: string;
    submit: string;
    UserPassIncorrect: string;
    RememberMe: string;
    PoweredBy: string;
    serial: string;
  };
  theme: {
    title: string;
    dark: string;
    light: string;
    select: string;
    automatic_dark_mode: string;
    text_size: string;
    bold_text: string;
    theme_color: string;
  };
  DatePicker: {
    confirm: string;
    reset: string;
    from: string;
    to: string;
    title: string;
  };
  Loading_Truck_Status: {
    Title: string;
    date_title: string;
  };
  Online_Sales_Hourly: {
    Title: string;
    perKilo: String;
    perInvoices: string;
    group: string;
  };
  Online_Sale_Days_Hourly: {
    Title: string;
    perKilo: String;
    perInvoices: string;
    group: string;
  };
  Salesmen_Location: {
    Title: string;
    managerRed: string;
    managerGreen: string;
    managerYellow: string;
    managerBlue: string;
  };
  Sales_hourly_Day_And_Sales_Office: {
    Title: string;
    group: string;
  };
  Sales_Compare_Tracking_Hourly: {
    Title: string;
    group: string;
  };
  Max_PPED: {
    Title: string;
    group: string;
  }
  Today_Planned_Not_Buying: {
    Title: string;
    group: string;
  }
  DailyStatus: {
    Title: string;
    group: string;
  }
  News: {
    Title: string;
    Loading: string;
    EndOfNotifications: string;
    NotificationDeleted: string;
  }
  Add_Edit_News: {
    Camera : string;
    Gallery : string;
    Title : string;
    Text : string;
    Submit : string;
    OutOfType : string;
  }
}

export class CommonUtility {
  static getInvoicedDate(selected_date: any) {
    let year = selected_date.getFullYear().toString();
    let month = selected_date.getMonth() + 1;
    if (month < 10) {
      month = '0' + (selected_date.getMonth() + 1).toString();
    } else {
      month = (selected_date.getMonth() + 1).toString();
    }
    let day = selected_date.getDate();
    if (day < 10) {
      day = '0' + selected_date.getDate().toString();
    } else {
      day = selected_date.getDate().toString();
    }
    return year + month + day;
  }
}
