/* 
 * Proview   Open Source Process Control.
 * Copyright (C) 2005-2015 SSAB EMEA AB.
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


package jpwr.app;
import java.io.*;
import java.util.*;

/**
   Flow triangle element.
*/
public class FlowTriangle extends FlowRect {

  public FlowTriangle( FlowCmn cmn) {
    super(cmn);
  }

  public void open( BufferedReader reader) {
    String line;
    StringTokenizer token;
    boolean end = false;

    try {
      while( (line = reader.readLine()) != null) {
	token = new StringTokenizer(line);
	int key = new Integer(token.nextToken()).intValue();
	if ( cmn.debug) System.out.println( "line : " + key);

	switch ( key) {
	case Flow.eSave_Triangle_rect_part:
	  super.open(reader);
	  break;
	case Flow.eSave_End:
	  end = true;
	  break;
	default:
	  System.out.println( "Syntax error in FlowTriangle");
	  break;
	}
	if ( end)
	  break;
      }
    } catch ( Exception e) {
      System.out.println( "IOExeption FlowTriangle");
    }
  }

  public void draw(  FlowPoint p, FlowNodeIfc node, boolean highlight) {
	  int color;
	  
	  if ( fill != 0) {
	      int dtype;
	      if ( node != null && node.getFillColor() != Flow.eDrawType_Inherit)
		  dtype = node.getFillColor();
	      else
		  dtype = draw_type;

	      switch ( dtype) {
	      case Flow.eDrawType_LineRed: 
		  color = Plow.COLOR_RED;
		  break;
	      case Flow.eDrawType_Green: 
		  color = Plow.COLOR_GREEN;
		  break;
	      case Flow.eDrawType_Yellow: 
		  color = Plow.COLOR_YELLOW;
		  break;
	      default:
		  color = Plow.COLOR_GRAY;
	      }
	      cmn.gdraw.triangle(color, true, 
				 (float)((ll.x + p.x) * cmn.zoom_factor - cmn.offset_x), 
				 (float)((ur.y + p.y) * cmn.zoom_factor - cmn.offset_y),
				 (float)(((ll.x + ur.x)/2 + p.x) * cmn.zoom_factor - cmn.offset_x), 
				 (float)((ll.y + p.y) * cmn.zoom_factor - cmn.offset_y),
				 (float)((ur.x + p.x) * cmn.zoom_factor - cmn.offset_x), 
				 (float)((ur.y + p.y) * cmn.zoom_factor - cmn.offset_y));

	  }
	  color = Plow.COLOR_BLACK;
	  if ( highlight)
	      color = Plow.COLOR_RED;
	  cmn.gdraw.triangle(color, false, 
			     (float)((ll.x + p.x) * cmn.zoom_factor - cmn.offset_x), 
			     (float)((ur.y + p.y) * cmn.zoom_factor - cmn.offset_y),
			     (float)(((ll.x + ur.x)/2 + p.x) * cmn.zoom_factor - cmn.offset_x), 
			     (float)((ll.y + p.y) * cmn.zoom_factor - cmn.offset_y),
			     (float)((ur.x + p.x) * cmn.zoom_factor - cmn.offset_x), 
			     (float)((ur.y + p.y) * cmn.zoom_factor - cmn.offset_y));
  }
}












