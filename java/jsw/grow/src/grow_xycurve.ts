class GrowXYCurve extends GrowTrend {
  constructor(ctx) {
    super(ctx);
  }

  open(lines, row) {
    let i;
    for (i = row; i < lines.length; i++) {
      let tokens = lines[i].split(' ');
      let key = parseInt(tokens[0], 10);

      switch (key) {
        case GlowSave.GrowXYCurve:
          break;
        case GlowSave.GrowXYCurve_trend_part:
          i = super.open(lines, i + 1);
          break;
        case GlowSave.End:
          return i;
        default:
          console.log("Syntax error in GrowXYCurve");
          break;
      }
    }

    return i;
  }

  set_xy_range_x(curve, min, max) {
    if (curve > TREND_MAX_CURVES || curve < 0) {
      return;
    }
    if (curve === 0) {
      if (this.display_x_mark1 !== 0) {
        let mark = (this.x_mark1 - this.ll.x) *
            (this.x_max_value[0] - this.x_min_value[0]) /
            (this.ur.x - this.ll.x) + this.x_min_value[0];
        this.x_mark1 =
            this.ll.x + (mark - min) / (max - min) * (this.ur.x - this.ll.x);
      }
      if (this.display_x_mark2 !== 0) {
        let mark = (this.x_mark2 - this.ll.x) *
            (this.x_max_value[0] - this.x_min_value[0]) /
            (this.ur.x - this.ll.x) + this.x_min_value[0];
        this.x_mark2 =
            this.ll.x + (mark - min) / (max - min) * (this.ur.x - this.ll.x);
      }
    }
    this.x_max_value[curve] = max;
    this.x_min_value[curve] = min;
  }

  set_xy_range_y(curve, min, max) {
    if (curve > TREND_MAX_CURVES || curve < 0) {
      return;
    }

    if (curve === 0) {
      if (this.display_y_mark1 !== 0) {
        let mark = this.y_min_value[0] - (this.y_mark1 - this.ur.y) *
            (this.y_max_value[0] - this.y_min_value[0]) / (this.ur.y - this.ll.y);
        this.y_mark1 =
            this.ur.y - (mark - min) / (max - min) * (this.ur.y - this.ll.y);
      }
      if (this.display_y_mark2 !== 0) {
        let mark = this.y_min_value[0] - (this.y_mark2 - this.ur.y) *
            (this.y_max_value[0] - this.y_min_value[0]) / (this.ur.y - this.ll.y);
        this.y_mark2 =
            this.ur.y - (mark - min) / (max - min) * (this.ur.y - this.ll.y);
      }
    }

    this.y_max_value[curve] = max;
    this.y_min_value[curve] = min;
  }

  set_xy_noofcurves(noofcurves) {
    this.curve_cnt = noofcurves;
  }

  set_xy_curve_color(curve, curve_color, fill_color) {
    if (curve > TREND_MAX_CURVES || curve < 0) {
      return;
    }
    this.curve_drawtype[curve] = curve_color;
    this.curve_fill_drawtype[curve] = fill_color;
  }

  set_xy_data(y_data, x_data, curve_idx, data_points) {
    if (curve_idx > TREND_MAX_CURVES || curve_idx < 0) {
      return;
    }

    this.no_of_points = Math.max(2, this.no_of_points);
    let cpoints = Math.min(this.no_of_points, data_points);
    if (this.fill_curve !== 0) {
      cpoints += 2;
    }

    this.curve_width =
        Math.min(DRAW_TYPE_SIZE, Math.max(1, this.curve_width));

    let pointarray = new Array(cpoints);
    let j = curve_idx;
    let idx = 0;
    for (let i = 0; i < cpoints; i++) {
      let point_p = new Point();
      pointarray[i] = new Point();
      if (this.fill_curve === 0) {
        idx = i;
        if (this.y_max_value[j] !== this.y_min_value[j]) {
          point_p.y = this.ur.y - (y_data[idx] - this.y_min_value[j]) /
              (this.y_max_value[j] - this.y_min_value[j]) *
              (this.ur.y - this.ll.y);
        }
        point_p.y = clamp(point_p.y, this.ll.y, this.ur.y);

        if (this.x_max_value[j] !== this.x_min_value[j]) {
          point_p.x = this.ll.x + (x_data[idx] - this.x_min_value[j]) /
              (this.x_max_value[j] - this.x_min_value[j]) *
              (this.ur.x - this.ll.x);
        }
        point_p.x = clamp(point_p.x, this.ll.x, this.ur.x);
      } else {
        if (i === 0) {
          if (this.x_max_value[j] !== this.x_min_value[j]) {
            point_p.x = this.ll.x + (x_data[idx] - this.x_min_value[j]) /
                (this.x_max_value[j] - this.x_min_value[j]) *
                (this.ur.x - this.ll.x);
          }
          point_p.x = clamp(point_p.x, this.ll.x, this.ur.x);

          point_p.y = this.ur.y;
          idx--;
        } else if (i === cpoints - 1) {
          if (this.x_max_value[j] !== this.x_min_value[j]) {
            point_p.x = this.ll.x + (x_data[idx - 1] - this.x_min_value[j]) /
                (this.x_max_value[j] - this.x_min_value[j]) *
                (this.ur.x - this.ll.x);
          }
          point_p.x = clamp(point_p.x, this.ll.x, this.ur.x);

          point_p.y = this.ur.y;
        } else {
          if (this.y_max_value[j] !== this.y_min_value[j]) {
            point_p.y = this.ur.y - (y_data[idx] - this.y_min_value[j]) /
                (this.y_max_value[j] - this.y_min_value[j]) *
                (this.ur.y - this.ll.y);
          }
          point_p.y = clamp(point_p.y, this.ll.y, this.ur.y);

          if (this.x_max_value[j] !== this.x_min_value[j]) {
            point_p.x = this.ll.x + (x_data[idx] - this.x_min_value[j]) /
                (this.x_max_value[j] - this.x_min_value[j]) *
                (this.ur.x - this.ll.x);
          }
          point_p.x = clamp(point_p.x, this.ll.x, this.ur.x);
        }
      }
      idx++;
    }

    let dt = (this.curve_drawtype[j] === DrawType.Inherit) ? this.draw_type : this.curve_drawtype[j];
    let dt_fill = (this.curve_fill_drawtype[j] === DrawType.Inherit) ? this.draw_type : this.curve_fill_drawtype[j];

    this.ctx.nodraw++;
    this.curve[j] = new GrowPolyline(this.ctx, "", pointarray, cpoints,
        dt, this.curve_width, 0, this.fill_curve, 1,
        0, dt_fill);
    this.ctx.nodraw--;
    this.draw();
  }
}