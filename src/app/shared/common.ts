import { IconOptions } from "leaflet";

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
  status: string;
  create_at: Date;
  user_id: string;
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

export interface Shop {
  City: string;
  CustCode: string;
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

export interface Access {
  name: string;
}

export interface UserLog {
  user_id: string;
  task: string;
  version: string;
}

export interface PopoverItem {
  title: string,
  value: any,
  selected?: boolean
}

export interface MapView {
  lng: number,
  lat: number,
  zoom: number,
}

// ENUMS
export enum Languages {
  EN,
  FR,
}

// Language
export class Language {
  Customer_History: {
    TitLe: string;
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
}
