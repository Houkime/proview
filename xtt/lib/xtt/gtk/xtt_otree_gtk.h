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
 **/

#ifndef xtt_otree_gtk_h
#define xtt_otree_gtk_h

#include <gtk/gtk.h>

#ifndef xtt_otree_h
#include "xtt_otree.h"
#endif


/* xtt_otree.h -- Object tree viewer */


class XttOTreeGtk : public XttOTree {
 public:
  XttOTreeGtk( GtkWidget *parent_wid, void *xn_parent_ctx, const char *title, pwr_tAttrRef *xn_itemlist, 
	       int xn_item_cnt, unsigned int xn_options,
	       pwr_tStatus (*action_cb)( void *, pwr_tAttrRef *));
  virtual ~XttOTreeGtk();
};


#endif