/*
 * ProviewR   Open Source Process Control.
 * Copyright (C) 2005-2019 SSAB EMEA AB.
 *
 * This file is part of ProviewR.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 2 of
 * the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with ProviewR. If not, see <http://www.gnu.org/licenses/>
 *
 * Linking ProviewR statically or dynamically with other modules is
 * making a combined work based on ProviewR. Thus, the terms and
 * conditions of the GNU General Public License cover the whole
 * combination.
 *
 * In addition, as a special exception, the copyright holders of
 * ProviewR give you permission to, from the build function in the
 * ProviewR Configurator, combine ProviewR with modules generated by the
 * ProviewR PLC Editor to a PLC program, regardless of the license
 * terms of these modules. You may copy and distribute the resulting
 * combined work under the terms of your choice, provided that every
 * copy of the combined work is accompanied by a complete copy of
 * the source code of ProviewR (the version used to produce the
 * combined work), being distributed under the terms of the GNU
 * General Public License plus this exception.
 */

/* rt_plc_macro_div.h -- Runtime environment  -  PLC
   Contains macros for object that does not fit anywhere else.
   This code is used in the PLC-program environment.  */

#define Backup_init(object, data) strcpy(&(object->DataName), data);

/*_*
  @aref windowplc WindowPlc
*/
#define windowplc_exec(object)                                                 \
  if (object->ScanOff)                                                         \
    return;

/*_*
  @aref windowcond WindowCond
*/
#define windowcond_exec(object)                                                \
  if (object->ScanOff)                                                         \
    return;

/*_*
  @aref windoworderact WindowOrderact
*/
#define windoworderact_exec(object)                                            \
  if (object->ScanOff)                                                         \
    return;

/*_*
  @aref windowsubstep WindowSubstep
*/
#define windowsubstep_exec(object)                                             \
  if (object->ScanOff)                                                         \
    return;

/*_*
  @aref scantime ScanTime
*/
#define ScanTime_exec(object) object->Time = *object->ScanTime;

/*_*
  @aref firstscan FirstScan
*/
#define FirstScan_exec(object) object->Status = tp->first_scan;

/*_*
  @aref iosimulflag IOSimulFlag
*/
#define IOSimulFlag_exec(object)                                               \
  if (tp->pp->IOHandler)                                                       \
    object->Status = tp->pp->IOHandler->IOSimulFlag;

/*_*
  @aref abs Abs
*/
#define Abs_exec(object, in) object->ActVal = ABS(in);

/*_*
  @aref iabs IAbs
*/
#define IAbs_exec(object, in) object->ActVal = ABS(in);

/*_*
  @aref sin Sin
*/
#define Sin_exec(object, in)                                                   \
  object->ActVal = object->FactorVal * sinf(object->FactorIn * in);

/*_*
  @aref sin Cos
*/
#define Cos_exec(object, in)                                                   \
  object->ActVal = object->FactorVal * cosf(object->FactorIn * in);

/*_*
  @aref sin Tan
*/
#define Tan_exec(object, in)                                                   \
  object->ActVal = object->FactorVal * tanf(object->FactorIn * in);

/*_*
  @aref asin ASin
*/
#define ASin_exec(object, in)                                                  \
  object->ActVal = object->FactorVal * asinf(object->FactorIn * in);

/*_*
  @aref sin ACos
*/
#define ACos_exec(object, in)                                                  \
  object->ActVal = object->FactorVal * acosf(object->FactorIn * in);

/*_*
  @aref sin ATan
*/
#define ATan_exec(object, in)                                                  \
  object->ActVal = object->FactorVal * atanf(object->FactorIn * in);

/*_*
  @aref sqrt Sqrt
*/
#define Sqrt_exec(object, in)                                                  \
  object->ActVal = object->FactorVal * sqrtf(object->FactorIn * in);

/*_*
  @aref even Even
*/
#define Even_exec(object, in) object->Status = ((in & 1) == 0);

/*_*
  @aref odd Odd
*/
#define Odd_exec(object, in) object->Status = ((in & 1) != 0);

/*_*
  @aref ln Ln
*/
#define Ln_exec(object, in)                                                    \
  object->ActVal = object->FactorVal * logf(object->FactorIn * in);

/*_*
  @aref log Log
*/
#define Log_exec(object, in)                                                   \
  object->ActVal = object->FactorVal * log10f(object->FactorIn * in);

/*_*
  @aref exp Exp
*/
#define Exp_exec(object, in)                                                   \
  object->ActVal = object->FactorVal * expf(object->FactorIn * in);

/*_*
  @aref bwand BwAnd
*/
#define BwAnd_exec(t, o) o->Status = *o->In1P & *o->In2P;

/*_*
  @aref bwor BwOr
*/
#define BwOr_exec(t, o) o->Status = *o->In1P | *o->In2P;

/*_*
  @aref bwand BwInv
*/
#define BwInv_exec(t, o) o->Out = ~(*o->InP);

/*_*
  @aref getdatap GetDatap
*/
#define GetDatap_exec(object, in) memcpy(&object->Out, &in, 12);

/*_*
  @aref getdatarefp GetDataRefp
*/
#define GetDataRefp_exec(object, in)                                           \
  memcpy(&object->ActVal, &in, sizeof(object->ActVal));

/*_*
  @aref getdatainput GetDatainput
*/
#define GetDataInput_exec(object, in)                                          \
  if (in)                                                                      \
    memcpy(&object->OutDataP, in, 12);

/*_*
  @aref pulsetrain PulseTrain
*/
#define PulseTrain_exec(o)                                                     \
  o->P30s = (tp->before_scan.tv_sec / 15) & 1 ? 1 : 0;                         \
  o->P10s = (tp->before_scan.tv_sec / 5) & 1 ? 1 : 0;                          \
  o->P5s                                                                       \
      = ((tp->before_scan.tv_sec * 10 + tp->before_scan.tv_nsec / 100000000)   \
            / 25)                                                              \
          & 1                                                                  \
      ? 1                                                                      \
      : 0;                                                                     \
  o->P2s = tp->before_scan.tv_sec & 1 ? 1 : 0;                                 \
  o->P1s = (tp->before_scan.tv_nsec / 500000000) & 1 ? 1 : 0;                  \
  o->P500ms = (tp->before_scan.tv_nsec / 250000000) & 1 ? 1 : 0;               \
  o->P200ms = (tp->before_scan.tv_nsec / 100000000) & 1 ? 1 : 0;               \
  o->P100ms = (tp->before_scan.tv_nsec / 50000000) & 1 ? 1 : 0;                \
  o->P50ms = (tp->before_scan.tv_nsec / 25000000) & 1 ? 1 : 0;                 \
  o->P20ms = (tp->before_scan.tv_nsec / 10000000) & 1 ? 1 : 0;                 \
  o->P10ms = (tp->before_scan.tv_nsec / 5000000) & 1 ? 1 : 0;                  \
  o->P5ms = (tp->before_scan.tv_nsec / 2500000) & 1 ? 1 : 0;                   \
  o->P2ms = (tp->before_scan.tv_nsec / 1000000) & 1 ? 1 : 0;                   \
  o->P1ms = (tp->before_scan.tv_nsec / 500000) & 1 ? 1 : 0;
