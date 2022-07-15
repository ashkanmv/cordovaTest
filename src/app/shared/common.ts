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

export interface GetUserChildrenResponse {
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
export interface GetAllChildrenUserResponse {
  id: number;
  FullName: string;
  group: string;
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

export interface GetSalesmenLocationResponse {
  id: string;
  lat: number;
  lng: number;
  user_id: string;
  route_name: string;
  visitor_code: string;
  provider: string;
  time: string;
  accuracy: number;
  speed?: any;
  altitude?: any;
  bearing?: any;
  location_provider: number;
  uuid: string;
  status: string;
  create_at: Date;
  Name: string;
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

export interface PageDetail {
  index: number;
  key: string;
  routerLink: string;
  imgSrc: string;
  title: string;
  display : string;
}

export interface AutoLogin {
  userName: string;
  password: string;
  uuid: string;
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

export enum ThemeColors {
  green = 1,
  yellow,
  red,
  purple,
  blue
}

// Language
export class Language {
  Connection_error: string;
  Gps_error: string;
  Loading: string;
  Server_no_value: string;
  Submit: string;
  Main_Page: string;
  Main_Page_Search: string;
  Customer_History: {
    Title: string;
    gps: string;
    Shop_name: string;
    Shop_code: number;
    Shop_type: string;
    Tell: number;
    SR: string;
    Address: string;
    DC: string;
    Route: string;
    Customer: string;
    sales: string;
    PPED: string;
    Samples: string;
    Qty: string;
    Kg: string;
    msg_no_customer: string;
    searching: string;
    notFound: string;
    typeToSearchText: string;
    searchPlaceholder: string;
    could_not_fetch_cities: string;
    could_not_fetch_Avgs: string;
    could_not_fetch_routes: string;
    no_value: string;
  };
  Questionnaire: {
    Title: string;
    Input_select_DC: string;
    Input_select_route: string;
    Input_select_routeDaily: string;
    Input_select_customer: string;
    Input_select_customer_Category: string;
    Submit_button: string;
    Msg_answer_neccesary: string;
    Msg_image_neccesary: string;
    Msg_submit: string;
    Msg_update: string;
    DC: string;
    Route: string;
    RouteDaily: string;
    Customer: string;
    CustomerCategory: string;
  };
  Gps_Tracking: {
    Title: string;
    Description: string;
    Planned_Not_Invoiced_Yet: string;
    Planned_and_Invoiced: string;
    OOP_invoiced: string;
    Visited_Not_Buy: string;
    sr: string;
    Truck: string;
    Input_select_date: string;
    Input_select_RSM: string;
    Input_select_ASM: string;
    Input_select_SSV: string;
    Input_select_SR: string;
    Radio_input_show_truck: string;
    Radio_input_show_SR: string;
    No_Value: string;
    NO_SR_Value: string;
    NO_SR_Points: string;
  };
  Customer_nearby: {
    Title: string;
    Description: string;
    Normal_Customer: string;
    Promotion_Customer: string;
    PPED_MoreThan_5Per: string;
    NOT_Buy_2_Weeks: string;
    NOT_Buy_2_Weeks_PPED: string;
  };
  Score_Card: {
    Title: string;
    Segment_category: string;
    Segment_channel: string;
    Segment_categoryPer: string;
    Segment_channelPer: string;
    Radio_input_sales: string;
    Radio_input_PPED: string;
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
    loginBtn:string
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
    Title: string;
  };
  Loading_Truck_Status: {
    Title: string;
    date_title: string;
    Group: string;
    Route: string;
    Load: string;
    Sale: string;
    PPED: string;
    Remain: string;
    SKU: string;
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
    Group: string;
    NoValueSelected: string;
    NoUserAvailable: string;
    RequestError: string;
  };
  Sales_hourly_Day_And_Sales_Office: {
    Title: string;
    group: string;
    DSD_Hourly_City: string;
    DSD_Hourly_Days: string;
  };
  Sales_Compare_Tracking_Hourly: {
    Title: string;
    group: string;
  };
  Max_PPED: {
    Title: string;
    group: string;
    perRoute: string;
    perCustomer: string;
    custmerNumber: string;
    cluster: string;
    storeName: string;
    sale: string;
    pped: string;
    per: string;
    routeCode: string;
    visitorName: string;
  }
  Today_Planned_Not_Buying: {
    Title: string;
    group: string;
    Route: string;
    Visitor: string;
    Count: string;
    Name: string;
    Number: string;
    Address: string;
  }
  DailyStatus: {
    Title: string;
    group: string;
    Tablet: string;
    Truck: string;
  }
  News: {
    Title: string;
    Loading: string;
    EndOfNotifications: string;
    NotificationDeleted: string;
    cancel: string;
    edit: string;
    confirm: string;
    editText: string;
    enterText: string;
  }
  Add_Edit_News: {
    AddPhoto: string;
    Camera: string;
    Gallery: string;
    ItemName: string;
    Title: string;
    Description: string;
    Submit: string;
    OutOfType: string;
    NewsCreated: string;
    NewsUpdated: string;
  }
  Online_Daily_Sales: {
    Title: string;
    group: string;
    UserIdNotFound: string;
    dsd: string;
    NON_DSD: string;
    Route: string;
    Pln: string;
    Inv: string;
    per: string;
    oor: string;
    Total: string;
    NotINV: string;
    Sale: string;
    PPED: string;
    Visitor: string;
    Driver: string;
  }
  Trace_Salesman: {
    NoLocationFound: string;
    Title: string;
    rsm: string;
    asm: string;
    ssv: string;
    sr: string;
  }
  logOut: {
    areYouSure: string;
    message: string;
    logOut: string;
    cancel: string;
  }
  Menu: {
    en: string;
    fa: string;
    MainPage: string;
    Profile: string;
    ContactUs: string;
    AboutUs: string;
    Setting: string;
    LogOut: string;
  }
  Setting: {
    Title: string;
    Language: string;
    Theme: string;
    help: string;
    frequently_asked_questions: string;
    description_video: string;
  }
  Contact_Us: {
    Title: string;
    Support: string;
    Send_Message: string;
    tell: string;
    sell: string;
    Name: string;
    Your_Message: '';
    msg_empty: string;
    msg_sent: string;
  }
  Profile: {
    Title: string;
    Send_Message: string;
    Current_password: string;
    New_password: string;
    Re_enter_new_password: string;
    Password_Miss_Match: string;
    FillAllFields: string;
    PasswordChanged: string;
  }
  About_Us: {
    Title: string;
    Powered_by: string;
    for: string;
    Your_version: string;
    copyright: string;
    Terms_of_Use: string;
    Privacy_Policy: string;
    Update_New_Version: string;
  }
  Language: {
    Title: string;
    Select: string;
    en: string;
    fa: string;
  }
  MainPage: {
    Customer_History: string;
    questionnaire: string;
    Notification: string;
    gpsTracking: string;
    Online_Daily_Sale: string;
    Customer_Nearby: string;
    Salesmen_Location: string;
    Trace_Salesman: string;
    Daily_Status: string;
    Today_Planned_Not_Buying: string;
    Loading_Truck_Status: string;
    Score_Cards: string;
    Online_Sales_Hourly: string;
    Online_Sales_for_days_Hourly: string;
    Sales_Campare_Tracking_Hourly: string;
    Sales_Hourly_Day_and_Sales_Office: string;
    Max_PPED: string;
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
