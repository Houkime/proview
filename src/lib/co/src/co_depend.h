/* 
 * Proview   Open Source Process Control.
 * Copyright (C) 2005-2016 SSAB EMEA AB.
 *
 * This file is part of Proview.
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
 * along with Proview. If not, see <http://www.gnu.org/licenses/>
 *
 * Linking Proview statically or dynamically with other modules is
 * making a combined work based on Proview. Thus, the terms and 
 * conditions of the GNU General Public License cover the whole 
 * combination.
 *
 * In addition, as a special exception, the copyright holders of
 * Proview give you permission to, from the build function in the
 * Proview Configurator, combine Proview with modules generated by the
 * Proview PLC Editor to a PLC program, regardless of the license
 * terms of these modules. You may copy and distribute the resulting
 * combined work under the terms of your choice, provided that every 
 * copy of the combined work is accompanied by a complete copy of 
 * the source code of Proview (the version used to produce the 
 * combined work), being distributed under the terms of the GNU 
 * General Public License plus this exception.
 */

#ifndef co_depend_h
#define co_depend_h

/* co_depend.h -- Print build dependencies */


#include <stdio.h>
#include <string>
#include <vector>
#include "pwr.h"

using namespace std;

class CoDepend { 
 private:
  vector<string> depend;
  pwr_tFileName filename;
  pwr_tFileName	dependfile;

 public:
  CoDepend()
    {
      strcpy( filename, "");
      strcpy( dependfile, "");
    }
  void add( const char *dname);
  void set_dependfile( char *dname) {strncpy( dependfile, dname, sizeof(dependfile));}
  void set_filename( char *fname) {strncpy( filename, fname, sizeof(filename));}
  void print();
};

#endif