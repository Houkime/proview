"use strict";

const GLOW__TERMINATED = 21001;
const GLOW__SUBTERMINATED = 21003;
const GLOW__NO_PROPAGATE = 21005;

const DRAW_MP = 6;
const DRAW_TYPE_SIZE = 9;
const DRAW_FONT_SIZE = 9;
const DRAWOFFSET = 2;
const TREND_MAX_CURVES = 11;
const TABLE_MAX_COL = 30;

enum GlowType {
  Boolean,
  Int,
  Double,
  String,
  DynType1,
  ActionType1,
  Direction,
  Color,
  Tone,
  ToneOrColor,
  TraceColor,
  Access,
  Cycle,
  MB3Action,
  Relief,
  InputFocusMark,
  TextSize,
  Adjustment,
  Font,
  Gradient,
  HotIndication,
  AnnotType,
  DynType2,
  ActionType2,
  AppMotion
}

enum CtxType {
  Glow,
  Brow,
  Grow,
  ColPal,
  Curve
}

enum SelectPolicy {
  Surround = 5,
  Partial,
  Both,
}

enum MB3Action {
  No,
  Close,
  PopupMenu,
  Both,
}

enum TextSize {
  Eight = 0,
  Ten = 1,
  Twelve = 2,
  Fourteen = 4,
  Eighteen = 6,
  TwentyFour = 8,
}

enum TextCoding {
  ISO8859_1,
  UTF_8
}

enum LineType {
  Solid,
  Dashed1,
  Dashed2,
  Dashed3,
  Dotted,
  DotDashed1,
  DotDashed2
}

enum ObjectType {
  NoObject,
  Node,
  Con,
  Rect,
  Line,
  Arc,
  Text,
  ConPoint,
  Annot,
  NodeClass,
  ConClass,
  Arrow,
  Pixmap,
  AnnotPixmap,
  Radiobutton,
  Frame,
  GrowRect,
  GrowLine,
  GrowArc,
  GrowConPoint,
  GrowSubAnnot,
  PolyLine,
  GrowPolyLine,
  Point,
  GrowNode,
  GrowAnnot,
  GrowText,
  GrowBar,
  GrowTrend,
  GrowSlider,
  GrowImage,
  NodeGroup,
  GrowGroup,
  GrowAxis,
  GrowRectRounded,
  GrowConGlue,
  GrowMenu,
  GrowWindow,
  GrowScrollBar,
  GrowTable,
  GrowFolder,
  GrowXYCurve,
  GrowAxisArc,
  GrowPie,
  GrowBarChart,
  GrowToolbar,
  GrowBarArc
}

enum Direction {
  Center,
  Right,
  Left,
  Up,
  Down
}

enum Adjustment {
  Center,
  Right,
  Left
}

enum Dir {
  Vertical,
  Horizontal
}

enum Vis {
  Visible,
  Invisible,
  Dimmed
}

enum NodeGroup {
  Common,
  Document,
  Trace
}

enum ConGroup {
  Common,
  Trace
}

enum AnnotType {
  OneLine,
  MultiLine
}

enum Cycle {
  Inherit,
  Slow,
  Fast
}

enum ConType {
  Straight,
  Fixed,
  AllFixed,
  Routed,
  StepDiv,
  StepConv,
  TransDiv,
  TransConv,
  StraightOneArrow,
  Reference
}

enum Corner {
  Rounded,
  Right
}

enum Visible {
  Full,
  Partial,
  Top,
  Bottom,
  Left,
  Right
}

enum Font {
  Helvetica,
  Times,
  NewCenturySchoolbook,
  Courier,
  LucidaSans,
  _,
  No = 9999,
}

enum Relief {
  Up,
  Down
}

enum Gradient {
  No,
  HorizontalUp,
  HorizontalDown,
  HorizontalTube1,
  HorizontalTube2,
  VerticalLeft,
  VerticalRight,
  VerticalTube1,
  VerticalTube2,
  DiagonalUpperLeft,
  DiagonalLowerLeft,
  DiagonalUpperRight,
  DiagonalLowerRight,
  DiagonalUpTube,
  DiagonalDownTube,
  Globe,
  RadialCenter,
  RadialUpperLeft,
  RadialLowerLeft,
  RadialUpperRight,
  RadialLowerRight
}

enum HotIndication {
  No,
  LineWidth,
  DarkColor,
  LightColor
}

enum AppMotion {
  Scroll,
  Slider,
  Both
}

enum DrawType {
  Line,
  LineRed,
  LineGray,
  Color4,
  Color5,
  Color6,
  Color7,
  Color8,
  Color9,
  Color10,
  Color11,
  Color12,
  Color13,
  Color14,
  Color15,
  Color16,
  Color17,
  Color18,
  Color19,
  Color20,
  Color21,
  Color22,
  Color23,
  Color24,
  Color25,
  Color26,
  Color27,
  Color28,
  Color29,
  Color30,
  Color31,
  Color32,
  Color33,
  Color34,
  Color35,
  Color36,
  Color37,
  Color38,
  Color39,
  Color40,
  Color41,
  Color42,
  Color43,
  Color44,
  Color45,
  Color46,
  Color47,
  Color48,
  Color49,
  Color50,
  Color51,
  Color52,
  Color53,
  Color54,
  Color55,
  Color56,
  Color57,
  Color58,
  Color59,
  Color60,
  Color61,
  Color62,
  Color63,
  Color64,
  Color65,
  Color66,
  Color67,
  Color68,
  Color69,
  Color70,
  Color71,
  Color72,
  Color73,
  Color74,
  Color75,
  Color76,
  Color77,
  Color78,
  Color79,
  Color80,
  Color81,
  Color82,
  Color83,
  Color84,
  Color85,
  Color86,
  Color87,
  Color88,
  Color89,
  Color90,
  Color91,
  Color92,
  Color93,
  Color94,
  Color95,
  Color96,
  Color97,
  Color98,
  Color99,
  Color100,
  Color101,
  Color102,
  Color103,
  Color104,
  Color105,
  Color106,
  Color107,
  Color108,
  Color109,
  Color110,
  Color111,
  Color112,
  Color113,
  Color114,
  Color115,
  Color116,
  Color117,
  Color118,
  Color119,
  Color120,
  Color121,
  Color122,
  Color123,
  Color124,
  Color125,
  Color126,
  Color127,
  Color128,
  Color129,
  Color130,
  Color131,
  Color132,
  Color133,
  Color134,
  Color135,
  Color136,
  Color137,
  Color138,
  Color139,
  Color140,
  Color141,
  Color142,
  Color143,
  Color144,
  Color145,
  Color146,
  Color147,
  Color148,
  Color149,
  Color150,
  Color151,
  Color152,
  Color153,
  Color154,
  Color155,
  Color156,
  Color157,
  Color158,
  Color159,
  Color160,
  Color161,
  Color162,
  Color163,
  Color164,
  Color165,
  Color166,
  Color167,
  Color168,
  Color169,
  Color170,
  Color171,
  Color172,
  Color173,
  Color174,
  Color175,
  Color176,
  Color177,
  Color178,
  Color179,
  Color180,
  Color181,
  Color182,
  Color183,
  Color184,
  Color185,
  Color186,
  Color187,
  Color188,
  Color189,
  Color190,
  Color191,
  Color192,
  Color193,
  Color194,
  Color195,
  Color196,
  Color197,
  Color198,
  Color199,
  Color200,
  Color201,
  Color202,
  Color203,
  Color204,
  Color205,
  Color206,
  Color207,
  Color208,
  Color209,
  Color210,
  Color211,
  Color212,
  Color213,
  Color214,
  Color215,
  Color216,
  Color217,
  Color218,
  Color219,
  Color220,
  Color221,
  Color222,
  Color223,
  Color224,
  Color225,
  Color226,
  Color227,
  Color228,
  Color229,
  Color230,
  Color231,
  Color232,
  Color233,
  Color234,
  Color235,
  Color236,
  Color237,
  Color238,
  Color239,
  Color240,
  Color241,
  Color242,
  Color243,
  Color244,
  Color245,
  Color246,
  Color247,
  Color248,
  Color249,
  Color250,
  Color251,
  Color252,
  Color253,
  Color254,
  Color255,
  Color256,
  Color257,
  Color258,
  Color259,
  Color260,
  Color261,
  Color262,
  Color263,
  Color264,
  Color265,
  Color266,
  Color267,
  Color268,
  Color269,
  Color270,
  Color271,
  Color272,
  Color273,
  Color274,
  Color275,
  Color276,
  Color277,
  Color278,
  Color279,
  Color280,
  Color281,
  Color282,
  Color283,
  Color284,
  Color285,
  Color286,
  Color287,
  Color288,
  Color289,
  Color290,
  Color291,
  Color292,
  Color293,
  Color294,
  Color295,
  Color296,
  Color297,
  Color298,
  Color299,
  Color300,
  LineErase,
  LineDashed,
  LineDashedRed,
  TextHelvetica,
  TextHelveticaBold,
  TextHelveticaErase,
  TextHelveticaEraseBold,
  Color__,
  CustomColor1 = 310,
  CustomColor2 = 314,
  CustomColor3 = 318,
  CustomColor4 = 322,
  CustomColor5 = 326,
  CustomColor6 = 330,
  CustomColor7 = 334,
  CustomColor8 = 338,
  CustomColor9 = 342,
  CustomColor10 = 346,
  CustomColor11 = 350,
  CustomColor12 = 354,
  CustomColor13 = 358,
  CustomColor14 = 362,
  CustomColor15 = 366,
  CustomColor16 = 370,
  CustomColor17 = 374,
  CustomColor18 = 378,
  CustomColor19 = 382,
  CustomColor20 = 386,
  CustomColor21 = 390,
  CustomColor22 = 394,
  CustomColor23 = 398,
  CustomColor24 = 402,
  CustomColor25 = 406,
  CustomColor26 = 410,
  CustomColor27 = 414,
  CustomColor28 = 418,
  CustomColor29 = 422,
  CustomColor30 = 426,
  CustomColor31 = 430,
  CustomColor32 = 434,
  CustomColor33 = 438,
  CustomColor34 = 442,
  CustomColor35 = 446,
  CustomColor36 = 450,
  CustomColor37 = 454,
  CustomColor38 = 458,
  CustomColor39 = 462,
  CustomColor40 = 466,
  CustomColor41 = 470,
  CustomColor42 = 474,
  CustomColor43 = 478,
  CustomColor44 = 482,
  CustomColor45 = 486,
  CustomColor46 = 490,
  CustomColor47 = 494,
  CustomColor48 = 498,
  CustomColor49 = 502,
  CustomColor50 = 506,
  CustomColor51 = 510,
  CustomColor52 = 514,
  CustomColor53 = 518,
  CustomColor54 = 522,
  CustomColor55 = 524,
  CustomColor56 = 530,
  CustomColor57 = 534,
  CustomColor58 = 538,
  CustomColor59 = 542,
  CustomColor60 = 546,
  CustomColor61 = 550,
  CustomColor62 = 554,
  CustomColor63 = 558,
  CustomColor64 = 562,
  CustomColor65 = 566,
  CustomColor66 = 570,
  CustomColor67 = 574,
  CustomColor68 = 578,
  CustomColor69 = 582,
  CustomColor70 = 586,
  CustomColor71 = 590,
  CustomColor72 = 594,
  CustomColor73 = 598,
  CustomColor74 = 602,
  CustomColor75 = 606,
  CustomColor76 = 610,
  CustomColor77 = 614,
  CustomColor78 = 618,
  CustomColor79 = 622,
  CustomColor80 = 626,
  CustomColor81 = 630,
  CustomColor82 = 634,
  CustomColor83 = 638,
  CustomColor84 = 642,
  CustomColor85 = 646,
  CustomColor86 = 650,
  CustomColor87 = 654,
  CustomColor88 = 658,
  CustomColor89 = 662,
  CustomColor90 = 666,
  CustomColor__ = 670,
  _ = 670,
  Inherit = 9999,
  No = 10000,

  FillHighlight = 173,
  LineHighlight = 175,
  ColorYellow = 114,
  ColorRed = 176,
  DarkGray = 29,
  MediumGray = 24,
  LightGray = 20,
}

enum DrawTone {
  No,
  Gray,
  YellowGreen,
  Yellow,
  Orange,
  Red,
  Magenta,
  Blue,
  Seablue,
  Green,
  DarkGray,
  DarkYellowGreen,
  DarkYellow,
  DarkOrange,
  DarkRed,
  DarkMagenta,
  DarkBlue,
  DarkSeablue,
  DarkGreen,
  LightGray,
  LightYellowGreen,
  LightYellow,
  LightOrange,
  LightRed,
  LightMagenta,
  LightBlue,
  LightSeablue,
  LightGreen,
  GrayHighSaturation,
  YellowGreenHighSaturation,
  YellowHighSaturation,
  OrangeHighSaturation,
  RedHighSaturation,
  MagentaHighSaturation,
  BlueHighSaturation,
  SeablueHighSaturation,
  GreenHighSaturation,
  DarkGrayHighSaturation,
  DarkYellowGreenHighSaturation,
  DarkYellowHighSaturation,
  DarkOrangeHighSaturation,
  DarkRedHighSaturation,
  DarkMagentaHighSaturation,
  DarkBlueHighSaturation,
  DarkSeablueHighSaturation,
  DarkGreenHighSaturation,
  LightGrayHighSaturation,
  LightYellowGreenHighSaturation,
  LightYellowHighSaturation,
  LightOrangeHighSaturation,
  LightRedHighSaturation,
  LightMagentaHighSaturation,
  LightBlueHighSaturation,
  LightSeablueHighSaturation,
  LightGreenHighSaturation,
  GrayLowSaturation,
  YellowGreenLowSaturation,
  YellowLowSaturation,
  OrangeLowSaturation,
  RedLowSaturation,
  MagentaLowSaturation,
  BlueLowSaturation,
  SeablueLowSaturation,
  GreenLowSaturation,
  DarkGrayLowSaturation,
  DarkYellowGreenLowSaturation,
  DarkYellowLowSaturation,
  DarkOrangeLowSaturation,
  DarkRedLowSaturation,
  DarkMagentaLowSaturation,
  DarkBlueLowSaturation,
  DarkSeablueLowSaturation,
  DarkGreenLowSaturation,
  LightGrayLowSaturation,
  LightYellowGreenLowSaturation,
  LightYellowLowSaturation,
  LightOrangeLowSaturation,
  LightRedLowSaturation,
  LightMagentaLowSaturation,
  LightBlueLowSaturation,
  LightSeablueLowSaturation,
  LightGreenLowSaturation,
  _
}

enum ScaleType {
  LowerLeft,
  LowerRight,
  UpperRight,
  UpperLeft,
  Left,
  Up,
  Right,
  Down,
  Center,
  FixPoint,
  No
}

enum RotationPoint {
  LowerLeft,
  LowerRight,
  UpperRight,
  UpperLeft,
  Center,
  FixPoint,
  Zero
}

enum TraceType {
  Boolean,
  Int32,
  Float32,
  User
}

enum MenuItem {
  Button,
  ButtonDisabled,
  PulldownMenu
}

enum UserdataCbType {
  Node,
  Ctx,
  NodeClass
}

enum SaveMode {
  Edit,
  Trace,
  SubGraph,
  ReadConfigOnly
}

enum GlowSave {
  Comment = 0,
  Ctx = 1,
  Array = 2,
  NodeClass = 3,
  ConClass = 4,
  Rect = 5,
  Line = 6,
  Point = 7,
  Arc = 8,
  Text = 9,
  Node = 10,
  Con = 11,
  ConPoint = 12,
  Annot = 13,
  Arrow = 14,
  Pixmap = 15,
  AnnotPixmap = 16,
  Radiobutton = 17,
  Frame = 18,
  GrowRect = 19,
  GrowLine = 20,
  GrowConPoint = 21,
  GrowCtx = 22,
  GrowSubAnnot = 23,
  GrowArc = 24,
  PolyLine = 25,
  GrowPolyLine = 26,
  GrowNode = 27,
  Transform = 28,
  GrowAnnot = 29,
  GrowText = 30,
  GrowBar = 31,
  GrowTrend = 32,
  GrowSlider = 33,
  GrowImage = 34,
  GrowGroup = 35,
  NodeGroup = 36,
  GrowAxis = 37,
  GrowRectRounded = 38,
  GrowConGlue = 39,
  GrowWindow = 40,
  GrowFolder = 41,
  GrowTable = 42,
  GrowXYCurve = 43,
  GrowAxisArc = 44,
  GrowPie = 45,
  GrowBarChart = 46,
  GrowToolbar = 47,
  CustomColors = 48,
  GrowBarArc = 49,
  End = 99,
  Ctx_zoom_factor_x = 100,
  Ctx_base_zoom_factor = 101,
  Ctx_offset_x = 102,
  Ctx_offset_y = 103,
  Ctx_nav_zoom_factor_x = 104,
  Ctx_print_zoom_factor = 105,
  Ctx_nav_offset_x = 106,
  Ctx_nav_offset_y = 107,
  Ctx_x_right = 108,
  Ctx_x_left = 109,
  Ctx_y_high = 110,
  Ctx_y_low = 111,
  Ctx_window_width = 112,
  Ctx_window_height = 113,
  Ctx_nav_window_width = 114,
  Ctx_nav_window_height = 115,
  Ctx_nav_rect_ll_x = 116,
  Ctx_nav_rect_ll_y = 117,
  Ctx_nav_rect_ur_x = 118,
  Ctx_nav_rect_ur_y = 119,
  Ctx_nav_rect_hot = 120,
  Ctx_name = 121,
  Ctx_user_highlight = 122,
  Ctx_a_nc = 123,
  Ctx_a_cc = 124,
  Ctx_a = 125,
  Ctx_grid_size_x = 126,
  Ctx_grid_size_y = 127,
  Ctx_grid_on = 128,
  Ctx_draw_delta = 129,
  Ctx_refcon_width = 130,
  Ctx_refcon_height = 131,
  Ctx_refcon_textsize = 132,
  Ctx_refcon_linewidth = 133,
  Ctx_grow = 134,
  Ctx_zoom_factor_y = 135,
  Ctx_nav_zoom_factor_y = 136,
  Ctx_version = 137,
  Ctx_hot_indication = 138,
  Ctx_tiptext_size = 139,
  Ctx_app_motion = 140,
  Ctx_color_theme = 141,
  Ctx_comment = 199,
  Array_a = 200,
  NodeClass_nc_name = 300,
  NodeClass_a = 301,
  NodeClass_group = 302,
  NodeClass_dynamic = 303,
  NodeClass_dynamicsize = 304,
  NodeClass_arg_cnt = 305,
  NodeClass_argname = 306,
  NodeClass_argtype = 307,
  NodeClass_dyn_type1 = 308,
  NodeClass_dyn_color1 = 309,
  NodeClass_no_con_obstacle = 310,
  NodeClass_slider = 311,
  NodeClass_java_name = 312,
  NodeClass_dyn_color2 = 313,
  NodeClass_next_nodeclass = 314,
  NodeClass_animation_count = 315,
  NodeClass_cycle = 316,
  NodeClass_y0 = 317,
  NodeClass_y1 = 318,
  NodeClass_x0 = 319,
  NodeClass_x1 = 320,
  NodeClass_dyn_action_type1 = 321,
  NodeClass_dyn_color3 = 322,
  NodeClass_dyn_color4 = 323,
  NodeClass_dyn_attr1 = 324,
  NodeClass_dyn_attr2 = 325,
  NodeClass_dyn_attr3 = 326,
  NodeClass_dyn_attr4 = 327,
  NodeClass_input_focus_mark = 328,
  NodeClass_userdata_cb = 329,
  NodeClass_dyn_type2 = 330,
  NodeClass_dyn_action_type2 = 331,
  NodeClass_recursive_trace = 332,
  ConClass_cc_name = 400,
  ConClass_con_type = 401,
  ConClass_corner = 402,
  ConClass_draw_type = 403,
  ConClass_line_width = 404,
  ConClass_arrow_width = 405,
  ConClass_arrow_length = 406,
  ConClass_round_corner_amount = 407,
  ConClass_group = 408,
  Rect_draw_type = 500,
  Rect_line_width = 501,
  Rect_ll = 502,
  Rect_ur = 503,
  Rect_display_level = 504,
  Rect_fill = 505,
  Line_draw_type = 600,
  Line_line_width = 601,
  Line_p1 = 602,
  Line_p2 = 603,
  Point_x = 700,
  Point_y = 701,
  Arc_angle1 = 800,
  Arc_angle2 = 801,
  Arc_draw_type = 802,
  Arc_line_width = 803,
  Arc_ll = 804,
  Arc_ur = 805,
  Arc_fill = 806,
  Text_text_size = 900,
  Text_draw_type = 901,
  Text_text = 902,
  Text_p = 903,
  Text_color_drawtype = 904,
  Node_nc = 1000,
  Node_pos = 1001,
  Node_n_name = 1002,
  Node_annotsize = 1003,
  Node_annotv = 1004,
  Node_refcon_cnt = 1005,
  Node_x_right = 1006,
  Node_x_left = 1007,
  Node_y_high = 1008,
  Node_y_low = 1009,
  Node_trace_data1 = 1010,
  Node_trace_data2 = 1011,
  Node_trace_attr_type = 1012,
  Node_obst_x_right = 1013,
  Node_obst_x_left = 1014,
  Node_obst_y_high = 1015,
  Node_obst_y_low = 1016,
  Node_trace_color = 1017,
  Node_trace_data3 = 1018,
  Node_trace_data4 = 1019,
  Node_trace_data5 = 1020,
  Node_trace_data6 = 1021,
  Node_trace_data7 = 1022,
  Node_trace_data8 = 1023,
  Node_trace_data9 = 1024,
  Node_trace_data10 = 1025,
  Node_access = 1026,
  Node_trace_color2 = 1027,
  Node_cycle = 1028,
  Node_ref_object = 1029,
  Con_x_right = 1100,
  Con_x_left = 1101,
  Con_y_high = 1102,
  Con_y_low = 1103,
  Con_cc = 1104,
  Con_dest_node = 1105,
  Con_source_node = 1106,
  Con_dest_conpoint = 1107,
  Con_source_conpoint = 1108,
  Con_dest_direction = 1109,
  Con_source_direction = 1110,
  Con_line_a = 1111,
  Con_arc_a = 1112,
  Con_arrow_a = 1113,
  Con_ref_a = 1114,
  Con_p_num = 1115,
  Con_l_num = 1116,
  Con_a_num = 1117,
  Con_arrow_num = 1118,
  Con_ref_num = 1119,
  Con_point_x = 1120,
  Con_point_y = 1121,
  Con_source_ref_cnt = 1122,
  Con_dest_ref_cnt = 1123,
  Con_c_name = 1124,
  Con_trace_object = 1125,
  Con_trace_attribute = 1126,
  Con_trace_attr_type = 1127,
  Con_temporary_ref = 1128,
  Con_border = 1129,
  Con_shadow = 1130,
  ConPoint_number = 1200,
  ConPoint_direction = 1201,
  ConPoint_p = 1202,
  ConPoint_trace_attribute = 1203,
  ConPoint_trace_attr_type = 1204,
  ConPoint_trf = 1205,
  Annot_number = 1300,
  Annot_draw_type = 1301,
  Annot_text_size = 1302,
  Annot_p = 1303,
  Annot_annot_type = 1304,
  Annot_display_level = 1305,
  Annot_color_drawtype = 1306,
  Annot_font = 1307,
  Annot_protect = 1308,
  Arrow_arrow_width = 1400,
  Arrow_arrow_length = 1401,
  Arrow_draw_type = 1402,
  Arrow_line_width = 1403,
  Arrow_p_dest = 1404,
  Arrow_p1 = 1405,
  Arrow_p2 = 1406,
  GrowRect_x_right = 1900,
  GrowRect_x_left = 1901,
  GrowRect_y_high = 1902,
  GrowRect_y_low = 1903,
  GrowRect_n_name = 1904,
  GrowRect_rect_part = 1905,
  GrowRect_dynamic = 1906,
  GrowRect_dynamicsize = 1907,
  GrowRect_original_border_drawtype = 1908,
  GrowRect_original_fill_drawtype = 1909,
  GrowRect_fill_drawtype = 1910,
  GrowRect_border = 1911,
  GrowRect_trf = 1912,
  GrowRect_shadow_width = 1913,
  GrowRect_relief = 1914,
  GrowRect_shadow = 1915,
  GrowRect_shadow_contrast = 1916,
  GrowRect_disable_shadow = 1917,
  GrowRect_invisible = 1918,
  GrowRect_fixcolor = 1919,
  GrowRect_fixposition = 1920,
  GrowRect_gradient = 1921,
  GrowRect_gradient_contrast = 1922,
  GrowRect_disable_gradient = 1923,
  GrowRect_bgcolor_gradient = 1924,
  GrowRect_background_drawtype = 1925,
  GrowRect_fill_eq_background = 1926,
  GrowLine_x_right = 2000,
  GrowLine_x_left = 2001,
  GrowLine_y_high = 2002,
  GrowLine_y_low = 2003,
  GrowLine_n_name = 2004,
  GrowLine_line_part = 2005,
  GrowLine_dynamic = 2006,
  GrowLine_dynamicsize = 2007,
  GrowLine_trf = 2008,
  GrowLine_original_border_drawtype = 2009,
  GrowLine_line_type = 2010,
  GrowConPoint_x_right = 2100,
  GrowConPoint_x_left = 2101,
  GrowConPoint_y_high = 2102,
  GrowConPoint_y_low = 2103,
  GrowConPoint_n_name = 2104,
  GrowConPoint_arc = 2105,
  GrowConPoint_conpoint_part = 2106,
  GrowCtx_conpoint_num_cnt = 2200,
  GrowCtx_objectname_cnt = 2201,
  GrowCtx_name = 2202,
  GrowCtx_background_color = 2203,
  GrowCtx_dynamic = 2204,
  GrowCtx_dynamicsize = 2205,
  GrowCtx_arg_cnt = 2206,
  GrowCtx_argname = 2207,
  GrowCtx_argtype = 2208,
  GrowCtx_x0 = 2209,
  GrowCtx_y0 = 2210,
  GrowCtx_x1 = 2211,
  GrowCtx_y1 = 2212,
  GrowCtx_path_cnt = 2213,
  GrowCtx_path = 2214,
  GrowCtx_dyn_type1 = 2215,
  GrowCtx_dyn_color1 = 2216,
  GrowCtx_no_con_obstacle = 2217,
  GrowCtx_slider = 2218,
  GrowCtx_subgraph = 2219,
  GrowCtx_java_name = 2220,
  GrowCtx_dyn_color2 = 2221,
  GrowCtx_next_subgraph = 2222,
  GrowCtx_animation_count = 2223,
  GrowCtx_scantime = 2224,
  GrowCtx_animation_scantime = 2225,
  GrowCtx_java_width = 2226,
  GrowCtx_background_image = 2227,
  GrowCtx_background_tiled = 2228,
  GrowCtx_double_buffered = 2229,
  GrowCtx_is_javaapplet = 2230,
  GrowCtx_is_javaapplication = 2231,
  GrowCtx_fast_scantime = 2232,
  GrowCtx_cycle = 2233,
  GrowCtx_mb3_action = 2234,
  GrowCtx_translate_on = 2235,
  GrowCtx_dyn_action_type1 = 2236,
  GrowCtx_dyn_color3 = 2237,
  GrowCtx_dyn_color4 = 2238,
  GrowCtx_dyn_attr1 = 2239,
  GrowCtx_dyn_attr2 = 2240,
  GrowCtx_dyn_attr3 = 2241,
  GrowCtx_dyn_attr4 = 2242,
  GrowCtx_input_focus_mark = 2243,
  GrowCtx_userdata_cb = 2244,
  GrowCtx_bitmap_fonts = 2245,
  GrowCtx_dyn_type2 = 2246,
  GrowCtx_dyn_action_type2 = 2247,
  GrowCtx_recursive_trace = 2248,
  GrowCtx_customcolors = 2249,
  GrowSubAnnot_x_right = 2300,
  GrowSubAnnot_x_left = 2301,
  GrowSubAnnot_y_high = 2302,
  GrowSubAnnot_y_low = 2303,
  GrowSubAnnot_n_name = 2304,
  GrowSubAnnot_text = 2305,
  GrowSubAnnot_rect = 2306,
  GrowSubAnnot_annot_part = 2307,
  GrowSubAnnot_trf = 2308,
  GrowSubAnnot_adjustment = 2309,
  GrowArc_x_right = 2400,
  GrowArc_x_left = 2401,
  GrowArc_y_high = 2402,
  GrowArc_y_low = 2403,
  GrowArc_n_name = 2404,
  GrowArc_arc_part = 2405,
  GrowArc_dynamic = 2406,
  GrowArc_dynamicsize = 2407,
  GrowArc_original_border_drawtype = 2408,
  GrowArc_original_fill_drawtype = 2409,
  GrowArc_fill_drawtype = 2410,
  GrowArc_border = 2411,
  GrowArc_trf = 2412,
  GrowArc_shadow_width = 2413,
  GrowArc_relief = 2414,
  GrowArc_shadow = 2415,
  GrowArc_shadow_contrast = 2416,
  GrowArc_disable_shadow = 2417,
  GrowArc_gradient = 2418,
  GrowArc_gradient_contrast = 2419,
  GrowArc_disable_gradient = 2420,
  GrowArc_fixcolor = 2421,
  GrowArc_fixposition = 2422,
  GrowArc_background_drawtype = 2423,
  GrowArc_fill_eq_background = 2424,
  PolyLine_draw_type = 2500,
  PolyLine_line_width = 2501,
  PolyLine_a_points = 2502,
  PolyLine_fill = 2503,
  PolyLine_closed_line = 2504,
  GrowPolyLine_x_right = 2600,
  GrowPolyLine_x_left = 2601,
  GrowPolyLine_y_high = 2602,
  GrowPolyLine_y_low = 2603,
  GrowPolyLine_n_name = 2604,
  GrowPolyLine_polyline_part = 2605,
  GrowPolyLine_dynamic = 2606,
  GrowPolyLine_dynamicsize = 2607,
  GrowPolyLine_original_border_drawtype = 2608,
  GrowPolyLine_original_fill_drawtype = 2609,
  GrowPolyLine_fill_drawtype = 2610,
  GrowPolyLine_border = 2611,
  GrowPolyLine_trf = 2612,
  GrowPolyLine_fill_eq_border = 2613,
  GrowPolyLine_shadow_width = 2614,
  GrowPolyLine_relief = 2615,
  GrowPolyLine_shadow = 2616,
  GrowPolyLine_shadow_contrast = 2617,
  GrowPolyLine_disable_shadow = 2618,
  GrowPolyLine_fill_eq_light = 2619,
  GrowPolyLine_fill_eq_shadow = 2620,
  GrowPolyLine_fixcolor = 2621,
  GrowPolyLine_fixposition = 2622,
  GrowPolyLine_gradient = 2623,
  GrowPolyLine_gradient_contrast = 2624,
  GrowPolyLine_disable_gradient = 2625,
  GrowPolyLine_fill_eq_bglight = 2626,
  GrowPolyLine_fill_eq_bgshadow = 2627,
  GrowPolyLine_fill_eq_background = 2628,
  GrowPolyLine_background_drawtype = 2629,
  GrowNode_node_part = 2700,
  GrowNode_dynamic = 2701,
  GrowNode_dynamicsize = 2702,
  GrowNode_original_border_drawtype = 2703,
  GrowNode_original_fill_drawtype = 2704,
  GrowNode_fill_drawtype = 2705,
  GrowNode_draw_type = 2706,
  GrowNode_trf = 2707,
  GrowNode_original_color_tone = 2708,
  GrowNode_color_tone = 2709,
  GrowNode_original_color_lightness = 2710,
  GrowNode_color_lightness = 2711,
  GrowNode_original_color_intensity = 2712,
  GrowNode_color_intensity = 2713,
  GrowNode_original_color_shift = 2714,
  GrowNode_color_shift = 2715,
  GrowNode_arg_cnt = 2716,
  GrowNode_argv = 2717,
  GrowNode_argsize = 2718,
  GrowNode_line_width = 2719,
  GrowNode_invisible = 2720,
  GrowNode_userdata_cb = 2721,
  GrowNode_original_text_drawtype = 2722,
  GrowNode_text_drawtype = 2723,
  GrowNode_shadow = 2724,
  GrowNode_flip_horizontal = 2725,
  GrowNode_flip_vertical = 2726,
  GrowNode_gradient = 2727,
  GrowNode_text_type = 2728,
  GrowNode_text_font = 2729,
  GrowNode_disable_cb = 2730,
  GrowNode_original_background_drawtype = 2731,
  GrowNode_background_drawtype = 2732,
  Transform_a11 = 2800,
  Transform_a12 = 2801,
  Transform_a13 = 2802,
  Transform_a21 = 2803,
  Transform_a22 = 2804,
  Transform_a23 = 2805,
  Transform_rotation = 2806,
  GrowAnnot_adjustment = 2901,
  GrowAnnot_annot_part = 2907,
  GrowAnnot_trf = 2908,
  GrowText_x_right = 3000,
  GrowText_x_left = 3001,
  GrowText_y_high = 3002,
  GrowText_y_low = 3003,
  GrowText_n_name = 3004,
  GrowText_text_part = 3005,
  GrowText_dynamic = 3006,
  GrowText_dynamicsize = 3007,
  GrowText_original_color_drawtype = 3008,
  GrowText_trf = 3009,
  GrowText_font = 3010,
  GrowText_adjustment = 3011,
  GrowBar_max_value = 3100,
  GrowBar_min_value = 3101,
  GrowBar_bar_value = 3102,
  GrowBar_bar_drawtype = 3103,
  GrowBar_direction = 3104,
  GrowBar_rect_part = 3105,
  GrowBar_trace_data1 = 3106,
  GrowBar_trace_data2 = 3107,
  GrowBar_trace_attr_type = 3108,
  GrowBar_trace_color = 3109,
  GrowBar_bar_bordercolor = 3110,
  GrowBar_bar_borderwidth = 3111,
  GrowBar_trace_data3 = 3112,
  GrowBar_trace_data4 = 3113,
  GrowBar_trace_data5 = 3114,
  GrowBar_trace_data6 = 3115,
  GrowBar_trace_data7 = 3116,
  GrowBar_trace_data8 = 3117,
  GrowBar_trace_data9 = 3118,
  GrowBar_trace_data10 = 3119,
  GrowBar_access = 3120,
  GrowBar_cycle = 3121,
  GrowBar_ref_object = 3122,
  GrowBar_userdata_cb = 3123,
  GrowTrend_y_max_value_0 = 3200,
  GrowTrend_y_min_value_0 = 3201,
  GrowTrend_curve_drawtype_0 = 3202,
  GrowTrend_rect_part = 3203,
  GrowTrend_trace_data1 = 3204,
  GrowTrend_trace_data2 = 3205,
  GrowTrend_trace_attr_type = 3206,
  GrowTrend_trace_color = 3207,
  GrowTrend_horizontal_lines = 3208,
  GrowTrend_vertical_lines = 3209,
  GrowTrend_fill_curve = 3210,
  GrowTrend_curve_fill_drawtype_0 = 3211,
  GrowTrend_no_of_points = 3212,
  GrowTrend_curve_width = 3213,
  GrowTrend_scan_time = 3214,
  GrowTrend_y_max_value_1 = 3215,
  GrowTrend_y_min_value_1 = 3216,
  GrowTrend_curve_drawtype_1 = 3217,
  GrowTrend_curve_fill_drawtype_1 = 3218,
  GrowTrend_trace_data3 = 3219,
  GrowTrend_trace_data4 = 3220,
  GrowTrend_trace_data5 = 3221,
  GrowTrend_trace_data6 = 3222,
  GrowTrend_trace_data7 = 3223,
  GrowTrend_trace_data8 = 3224,
  GrowTrend_trace_data9 = 3225,
  GrowTrend_trace_data10 = 3226,
  GrowTrend_access = 3227,
  GrowTrend_cycle = 3228,
  GrowTrend_ref_object = 3229,
  GrowTrend_userdata_cb = 3230,
  GrowTrend_x_max_value_0 = 3231,
  GrowTrend_x_min_value_0 = 3232,
  GrowTrend_x_max_value_1 = 3233,
  GrowTrend_x_min_value_1 = 3234,
  GrowTrend_mode = 3235,
  GrowSlider_grownode_part = 3300,
  GrowSlider_direction = 3301,
  GrowSlider_max_value = 3302,
  GrowSlider_min_value = 3303,
  GrowSlider_max_pos = 3304,
  GrowSlider_min_pos = 3305,
  GrowImage_x_right = 3400,
  GrowImage_x_left = 3401,
  GrowImage_y_high = 3402,
  GrowImage_y_low = 3403,
  GrowImage_n_name = 3404,
  GrowImage_image_filename = 3405,
  GrowImage_dynamic = 3406,
  GrowImage_dynamicsize = 3407,
  GrowImage_trf = 3408,
  GrowImage_display_level = 3409,
  GrowImage_ll = 3410,
  GrowImage_ur = 3411,
  GrowImage_color_tone = 3412,
  GrowImage_color_lightness = 3413,
  GrowImage_color_intensity = 3414,
  GrowImage_color_shift = 3415,
  GrowImage_fixposition = 3416,
  GrowGroup_grownode_part = 3500,
  GrowGroup_nc = 3501,
  NodeGroup_nodeclass_part = 3600,
  GrowAxis_max_value = 3700,
  GrowAxis_min_value = 3701,
  GrowAxis_rect_part = 3702,
  GrowAxis_lines = 3703,
  GrowAxis_longquotient = 3704,
  GrowAxis_valuequotient = 3705,
  GrowAxis_format = 3706,
  GrowAxis_text_size = 3707,
  GrowAxis_text_drawtype = 3708,
  GrowAxis_text_color_drawtype = 3709,
  GrowAxis_userdata_cb = 3710,
  GrowRectRounded_x_right = 3800,
  GrowRectRounded_x_left = 3801,
  GrowRectRounded_y_high = 3802,
  GrowRectRounded_y_low = 3803,
  GrowRectRounded_n_name = 3804,
  GrowRectRounded_rect_part = 3805,
  GrowRectRounded_dynamic = 3806,
  GrowRectRounded_dynamicsize = 3807,
  GrowRectRounded_original_border_drawtype = 3808,
  GrowRectRounded_original_fill_drawtype = 3809,
  GrowRectRounded_fill_drawtype = 3810,
  GrowRectRounded_border = 3811,
  GrowRectRounded_trf = 3812,
  GrowRectRounded_round_amount = 3813,
  GrowRectRounded_shadow_width = 3814,
  GrowRectRounded_relief = 3815,
  GrowRectRounded_shadow = 3816,
  GrowRectRounded_shadow_contrast = 3817,
  GrowRectRounded_disable_shadow = 3818,
  GrowRectRounded_gradient = 3819,
  GrowRectRounded_gradient_contrast = 3820,
  GrowRectRounded_disable_gradient = 3821,
  GrowRectRounded_fixposition = 3822,
  GrowConGlue_line_width_up = 3900,
  GrowConGlue_line_width_down = 3901,
  GrowConGlue_line_width_left = 3902,
  GrowConGlue_line_width_right = 3903,
  GrowConGlue_node_part = 3904,
  GrowConGlue_border = 3905,
  GrowWindow_file_name = 4000,
  GrowWindow_rect_part = 4001,
  GrowWindow_userdata_cb = 4002,
  GrowWindow_scrollbar_width = 4003,
  GrowWindow_vertical_scrollbar = 4004,
  GrowWindow_horizontal_scrollbar = 4005,
  GrowWindow_scrollbar_color = 4006,
  GrowWindow_scrollbar_bg_color = 4007,
  GrowWindow_window_scale = 4008,
  GrowWindow_owner = 4009,
  GrowFolder_folders = 4100,
  GrowFolder_text_size = 4101,
  GrowFolder_text_drawtype = 4102,
  GrowFolder_text_color_drawtype = 4103,
  GrowFolder_header_height = 4104,
  GrowFolder_window_part = 4105,
  GrowFolder_color_selected = 4106,
  GrowFolder_color_unselected = 4107,
  GrowFolder_folder_file_names1 = 4120,
  GrowFolder_folder_text1 = 4121,
  GrowFolder_folder_scale1 = 4122,
  GrowFolder_folder_v_scrollbar1 = 4123,
  GrowFolder_folder_h_scrollbar1 = 4124,
  GrowFolder_folder_file_names2 = 4125,
  GrowFolder_folder_text2 = 4126,
  GrowFolder_folder_scale2 = 4127,
  GrowFolder_folder_v_scrollbar2 = 4128,
  GrowFolder_folder_h_scrollbar2 = 4129,
  GrowFolder_folder_file_names3 = 4130,
  GrowFolder_folder_text3 = 4131,
  GrowFolder_folder_scale3 = 4132,
  GrowFolder_folder_v_scrollbar3 = 4133,
  GrowFolder_folder_h_scrollbar3 = 4134,
  GrowFolder_folder_file_names4 = 4135,
  GrowFolder_folder_text4 = 4136,
  GrowFolder_folder_scale4 = 4137,
  GrowFolder_folder_v_scrollbar4 = 4138,
  GrowFolder_folder_h_scrollbar4 = 4139,
  GrowFolder_folder_file_names5 = 4140,
  GrowFolder_folder_text5 = 4141,
  GrowFolder_folder_scale5 = 4142,
  GrowFolder_folder_v_scrollbar5 = 4143,
  GrowFolder_folder_h_scrollbar5 = 4144,
  GrowFolder_folder_file_names6 = 4145,
  GrowFolder_folder_text6 = 4146,
  GrowFolder_folder_scale6 = 4147,
  GrowFolder_folder_v_scrollbar6 = 4148,
  GrowFolder_folder_h_scrollbar6 = 4149,
  GrowFolder_folder_file_names7 = 4150,
  GrowFolder_folder_text7 = 4151,
  GrowFolder_folder_scale7 = 4152,
  GrowFolder_folder_v_scrollbar7 = 4153,
  GrowFolder_folder_h_scrollbar7 = 4154,
  GrowFolder_folder_file_names8 = 4155,
  GrowFolder_folder_text8 = 4156,
  GrowFolder_folder_scale8 = 4157,
  GrowFolder_folder_v_scrollbar8 = 4158,
  GrowFolder_folder_h_scrollbar8 = 4159,
  GrowFolder_folder_file_names9 = 4160,
  GrowFolder_folder_text9 = 4161,
  GrowFolder_folder_scale9 = 4162,
  GrowFolder_folder_v_scrollbar9 = 4163,
  GrowFolder_folder_h_scrollbar9 = 4164,
  GrowFolder_folder_file_names10 = 4165,
  GrowFolder_folder_text10 = 4166,
  GrowFolder_folder_scale10 = 4167,
  GrowFolder_folder_v_scrollbar10 = 4168,
  GrowFolder_folder_h_scrollbar10 = 4169,
  GrowFolder_folder_file_names11 = 4170,
  GrowFolder_folder_text11 = 4171,
  GrowFolder_folder_scale11 = 4172,
  GrowFolder_folder_v_scrollbar11 = 4173,
  GrowFolder_folder_h_scrollbar11 = 4174,
  GrowFolder_folder_file_names12 = 4175,
  GrowFolder_folder_text12 = 4176,
  GrowFolder_folder_scale12 = 4177,
  GrowFolder_folder_v_scrollbar12 = 4178,
  GrowFolder_folder_h_scrollbar12 = 4179,
  GrowFolder_folder_owner1 = 4180,
  GrowFolder_folder_owner2 = 4181,
  GrowFolder_folder_owner3 = 4182,
  GrowFolder_folder_owner4 = 4183,
  GrowFolder_folder_owner5 = 4184,
  GrowFolder_folder_owner6 = 4185,
  GrowFolder_folder_owner7 = 4186,
  GrowFolder_folder_owner8 = 4187,
  GrowFolder_folder_owner9 = 4188,
  GrowFolder_folder_owner10 = 4189,
  GrowFolder_folder_owner11 = 4190,
  GrowFolder_folder_owner12 = 4191,
  GrowTable_rect_part = 4200,
  GrowTable_userdata_cb = 4202,
  GrowTable_scrollbar_width = 4203,
  GrowTable_vertical_scrollbar = 4204,
  GrowTable_horizontal_scrollbar = 4205,
  GrowTable_scrollbar_color = 4206,
  GrowTable_scrollbar_bg_color = 4207,
  GrowTable_window_scale = 4208,
  GrowTable_rows = 4209,
  GrowTable_columns = 4210,
  GrowTable_header_row = 4211,
  GrowTable_header_column = 4212,
  GrowTable_text_size = 4213,
  GrowTable_text_drawtype = 4214,
  GrowTable_header_row_height = 4215,
  GrowTable_row_height = 4216,
  GrowTable_text_color_drawtype = 4217,
  GrowTable_header_text_size = 4218,
  GrowTable_header_text_drawtype = 4219,
  GrowTable_header_text_color = 4220,
  GrowTable_header_text_bold = 4221,
  GrowTable_options = 4222,
  GrowTable_font = 4223,
  GrowTable_column_width1 = 4240,
  GrowTable_header_text1 = 4241,
  GrowTable_column_width2 = 4242,
  GrowTable_header_text2 = 4243,
  GrowTable_column_width3 = 4244,
  GrowTable_header_text3 = 4245,
  GrowTable_column_width4 = 4246,
  GrowTable_header_text4 = 4247,
  GrowTable_column_width5 = 4248,
  GrowTable_header_text5 = 4249,
  GrowTable_column_width6 = 4250,
  GrowTable_header_text6 = 4251,
  GrowTable_column_width7 = 4252,
  GrowTable_header_text7 = 4253,
  GrowTable_column_width8 = 4254,
  GrowTable_header_text8 = 4255,
  GrowTable_column_width9 = 4256,
  GrowTable_header_text9 = 4257,
  GrowTable_column_width10 = 4258,
  GrowTable_header_text10 = 4259,
  GrowTable_column_width11 = 4260,
  GrowTable_header_text11 = 4261,
  GrowTable_column_width12 = 4262,
  GrowTable_header_text12 = 4263,
  GrowTable_select_drawtype = 4264,
  GrowTable_column_adjustment1 = 4265,
  GrowTable_column_adjustment2 = 4266,
  GrowTable_column_adjustment3 = 4267,
  GrowTable_column_adjustment4 = 4268,
  GrowTable_column_adjustment5 = 4269,
  GrowTable_column_adjustment6 = 4270,
  GrowTable_column_adjustment7 = 4271,
  GrowTable_column_adjustment8 = 4272,
  GrowTable_column_adjustment9 = 4273,
  GrowTable_column_adjustment10 = 4274,
  GrowTable_column_adjustment11 = 4275,
  GrowTable_column_adjustment12 = 4276,
  GrowXYCurve_trend_part = 4300,
  GrowAxisArc_max_value = 4400,
  GrowAxisArc_min_value = 4401,
  GrowAxisArc_arc_part = 4402,
  GrowAxisArc_lines = 4403,
  GrowAxisArc_linelength = 4404,
  GrowAxisArc_longquotient = 4405,
  GrowAxisArc_valuequotient = 4406,
  GrowAxisArc_format = 4407,
  GrowAxisArc_text_size = 4408,
  GrowAxisArc_text_drawtype = 4409,
  GrowAxisArc_text_color_drawtype = 4410,
  GrowAxisArc_userdata_cb = 4411,
  GrowPie_arc_part = 4500,
  GrowPie_sectors = 4501,
  GrowPie_min_value = 4502,
  GrowPie_max_value = 4503,
  GrowPie_sector_color1 = 4504,
  GrowPie_sector_color2 = 4505,
  GrowPie_sector_color3 = 4506,
  GrowPie_sector_color4 = 4507,
  GrowPie_sector_color5 = 4508,
  GrowPie_sector_color6 = 4509,
  GrowPie_sector_color7 = 4510,
  GrowPie_sector_color8 = 4511,
  GrowPie_sector_color9 = 4512,
  GrowPie_sector_color10 = 4513,
  GrowPie_sector_color11 = 4514,
  GrowPie_sector_color12 = 4515,
  GrowPie_sector_size1 = 4516,
  GrowPie_sector_size2 = 4517,
  GrowPie_sector_size3 = 4518,
  GrowPie_sector_size4 = 4519,
  GrowPie_sector_size5 = 4520,
  GrowPie_sector_size6 = 4521,
  GrowPie_sector_size7 = 4522,
  GrowPie_sector_size8 = 4523,
  GrowPie_sector_size9 = 4524,
  GrowPie_sector_size10 = 4525,
  GrowPie_sector_size11 = 4526,
  GrowPie_sector_size12 = 4527,
  GrowPie_userdata_cb = 4528,
  GrowBarChart_rect_part = 4600,
  GrowBarChart_bars = 4601,
  GrowBarChart_barsegments = 4602,
  GrowBarChart_min_value = 4603,
  GrowBarChart_max_value = 4604,
  GrowBarChart_bar_color1 = 4605,
  GrowBarChart_bar_color2 = 4606,
  GrowBarChart_bar_color3 = 4607,
  GrowBarChart_bar_color4 = 4608,
  GrowBarChart_bar_color5 = 4609,
  GrowBarChart_bar_color6 = 4610,
  GrowBarChart_bar_color7 = 4611,
  GrowBarChart_bar_color8 = 4612,
  GrowBarChart_bar_color9 = 4613,
  GrowBarChart_bar_color10 = 4614,
  GrowBarChart_bar_color11 = 4615,
  GrowBarChart_bar_color12 = 4616,
  GrowBarChart_vertical_lines = 4617,
  GrowBarChart_horizontal_lines = 4618,
  GrowBarChart_userdata_cb = 4619,
  GrowBarChart_line_color = 4620,
  GrowToolbar_grownode_part = 4700,
  GrowToolbar_nc = 4701,
  CustomColors_colors_size = 4800,
  CustomColors_colors = 4801,
  CustomColors_colortheme_lightness = 4802,
  CustomColors_is_default_colortheme = 4803,
  GrowBarArc_max_value = 4900,
  GrowBarArc_min_value = 4901,
  GrowBarArc_bar_width = 4902,
  GrowBarArc_bar_value = 4903,
  GrowBarArc_bar_drawtype = 4904,
  GrowBarArc_direction = 4905,
  GrowBarArc_arc_part = 4906,
  GrowBarArc_bar_bordercolor = 4907,
  GrowBarArc_bar_borderwidth = 4908,
  GrowBarArc_userdata_cb = 4909,
  GrowBarArc_bar_direction = 4910,
}

enum Position {
  Absolute,
  Relative
}

enum MoveRestriction {
  VerticalSlider,
  HorizontalSlider,
  Disable
}

enum EventType {
  Object,
  Menu,
  Toolbar,
  Table,
  CustomColor,
  Signal
}

enum Event {
  Null,
  MB1Click,
  MB1DoubleClick,
  MB1Press,
  MB2Click,
  MB2DoubleClick,
  MB2Press,
  MB1ClickShift,
  MB1DoubleClickShift,
  MB1PressShift,
  MB2ClickShift,
  MB2DoubleClickShift,
  MB2PressShift,
  MB1ClickCtrl,
  MB1DoubleClickCtrl,
  MB1PressCtrl,
  MB2ClickCtrl,
  MB2DoubleClickCtrl,
  MB2PressCtrl,
  MB1ClickShiftCtrl,
  MB1DoubleClickShiftCtrl,
  MB1PressShiftCtrl,
  MB2ClickShiftCtrl,
  MB2DoubleClickShiftCtrl,
  MB2PressShiftCtrl,
  MB3Click,
  MB3Press,
  ButtonRelease,
  ButtonMotion,
  Exposure,
  Enter,
  Leave,
  CursorMotion,
  Init,
  PasteSequenceStart,
  PasteSequenceEnd,
  VisibilityUnobscured,
  VisibilityObscured,
  SelectClear,
  ObjectMoved,
  ObjectDeleted,
  AnnotationInput,
  Radiobutton,
  Key_Return,
  Key_Up,
  Key_Down,
  Key_Right,
  Key_Left,
  Key_PageUp,
  Key_PageDown,
  Key_BackSpace,
  Key_PF1,
  Key_PF2,
  Key_PF3,
  Key_PF4,
  CreateGrowObject,
  GrowDynamics,
  SliderMoveStart,
  SliderMoveEnd,
  SliderMoved,
  HotRequest,
  MB1Down,
  MB1Up,
  MB2Down,
  MB2Up,
  MB3Down,
  MB3Up,
  Key_Tab,
  Map,
  Unmap,
  Resized,
  Translate,
  TipText,
  Key_Ascii,
  InputFocusLost,
  InputFocusGained,
  InputFocusInit,
  Key_CtrlAscii,
  Key_ShiftTab,
  Key_Escape,
  MenuActivated,
  MenuCreate,
  MenuDelete,
  ScrollUp,
  ScrollDown,
  AnteUndo,
  PostUndo,
  Signal
}

class GlowFillLevelLimits {
  status;
  direction;
  min;
  max;
}

class GlowEvent {
  event = 0;
  type = 0;
  x = 0;
  y = 0;
  object = null;
}

class GlowEventMenu extends GlowEvent {
  item = 0;
}

class GlowEventTable extends GlowEvent {
  column = 0;
  row = 0;
}

class GlowEventToolbar extends GlowEvent {
  category = 0;
  idx = 0;
}

class GlowSliderInfo {
  direction;
  max_value;
  min_value;
  max_position;
  min_position;
}

class MenuInfoItem {
  text;
  type;
  occupied = false;
}

class GlowMenuInfo {
  item = Array<MenuInfoItem>(32);

  constructor() {
    for (let i = 0; i < 32; i++) {
      this.item[i] = new MenuInfoItem();
    }
  }
}

class GlowBackgroundObject {
  background;
  direction;
  max;
  min;
  sts;
}

class GlowShadowInfo {
  drawtype;
  x;
  y;
}