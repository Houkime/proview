enum Database {
  Gdh,
  User,
  Local,
  Ccm
}

class LocalSub {
  valueFloat = 0;
  valueInt = 0;
  valueBoolean = false;
  valueString = null;
  occupied = true;
  refCount = 0;
  name;
  typeId;
  refId;
  owner;

  constructor(owner, name, typeId, refId) {
    this.name = name;
    this.typeId = typeId;
    this.refId = refId;
    this.owner = owner;
  }

  ref() {
    this.refCount++;
  }

  unref() {
    this.refCount--;
  }

  getRefCount() {
    return this.refCount;
  }
}

const strToTypeId = {
  "boolean": Type.Boolean,
  "float32": Type.Float32,
  "float64": Type.Float64,
  "char": Type.Char,
  "int8": Type.Int8,
  "int16": Type.Int16,
  "int32": Type.Int32,
  "int64": Type.Int64,
  "uint8": Type.UInt8,
  "uint16": Type.UInt16,
  "uint32": Type.UInt32,
  "uint64": Type.UInt64,
  "objid": Type.Objid,
  "time": Type.Time,
  "deltatime": Type.DeltaTime,
  "attrref": Type.AttrRef,
  "status": Type.Status,
  "netstatus": Type.NetStatus,
  "enum": Type.Enum,
  "mask": Type.Mask,
  "bit": Type.Bit,
  "string": Type.String
};

class GraphLocalDb {
  subscriptions = [];
  subscriptionCount = 1;

  constructor() {
    // Insert dummy first
    this.subscriptions[0] = null;
  }

  refObjectInfo(owner, attributeName) {
    let typeId = this.getTypeId(attributeName);
    let name = this.getName(attributeName);
    if (typeId === 0) {
      return 0;
    }

    let id = this.nameToId(owner, name);
    let sub;
    if (id === -1) {
      id = this.subscriptionCount;
      sub = new LocalSub(owner, name, typeId, id);
      this.subscriptions[id] = sub;
      this.subscriptionCount++;
    } else {
      sub = this.subscriptions[id];
    }
    sub.ref();
    return id;
  }

  unrefObjectInfo(id) {
    let sub = this.subscriptions[id];
    if (sub) {
      sub.unref();
      if (sub.getRefCount() <= 0) {
        this.subscriptions[id] = null;
      }
    }
  }

  getObjectRefInfo(id) {
    let sub = this.subscriptions[id];
    if (sub) {
      return (sub.value || 0);
    }
    return 0;
  }

  getObjectInfo(owner, attributeName) {
    let name = this.getName(attributeName);
    let id = this.nameToId(owner, name);
    if (id === -1) {
      return new CdhrNumber(0, 2);
    }
    return new CdhrNumber(this.subscriptions[id].value || 0, 1);
  }

  setObjectInfo(owner, attributeName, value) {
    let name = this.getName(attributeName);
    let id = this.nameToId(owner, name);
    if (id === -1) {
      this.refObjectInfo(owner, attributeName);
      id = this.subscriptionCount - 1;
    }
    this.subscriptions[id].value = value;
    return 1;
  }

  toggleObjectInfo(owner, attributeName) {
    let name = this.getName(attributeName);
    let id = this.nameToId(owner, name);
    if (id === -1) {
      return 2;
    }
    this.subscriptions[id].value = !this.subscriptions[id].value;
    return 1;
  }

  nameToId(owner, name) {
    return this.subscriptions.findIndex(function (sub) {
      return (sub !== null && owner === sub.owner &&
          name.toUpperCase() === sub.name.toUpperCase());
    });
  }

  getName(attrName) {
    if (attrName.substring(0, 7) === "$local.") {
      attrName = attrName.substring(7);
    }
    let idx1 = attrName.indexOf("##");
    if (idx1 !== -1) {
      return attrName.substring(0, idx1);
    }
    return attrName;
  }

  getTypeId(attrName) {
    let suffix;
    let idx1 = attrName.indexOf("##");
    if (idx1 < 0) {
      return Type.Boolean;
    }

    idx1 += 2;
    let idx2 = attrName.indexOf('#', idx1);
    if (idx2 < 0) {
      suffix = attrName.substring(idx1).toUpperCase();
    } else {
      suffix = attrName.substring(idx1, idx2).toUpperCase();
    }
    let idx2 = attrName.indexOf('#', idx1);
    if (idx2 < 0) {
      suffix = attrName.substring(idx1).toUpperCase();
    } else {
      suffix = attrName.substring(idx1, idx2).toUpperCase();
    }

    suffix = suffix.toLowerCase();
    if (strToTypeId.hasOwnProperty(suffix)) {
      return strToTypeId[suffix];
    }
    if (suffix.startsWith("string")) {
      return Type.String;
    }
    return 0;
  }
}

class Graph {
  appl: Appl;
  ctx;
  baseCtx;
  gdraw;
  gdh;
  ldb;
  currentSlider;
  scan_time = 0.6;
  fast_scan_time = 0.15;
  animation_scan_time = 0.15;
  slow_scan_cnt = 0;
  fast_scan_cnt = 0;
  ctxStack = new Array(10);
  ctxStackCnt = 0;
  clickActive = 0;
  priv = 0;
  timer: number;
  frame: GrowFrame;

  constructor(appl) {
    this.appl = appl;
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
      // Firefox is not os fast...
      this.scan_time = 1;
      this.fast_scan_time = 1;
      this.animation_scan_time = 1;
    }

    this.frame = new GrowFrame(this);
    this.priv = Number(sessionStorage.getItem("pwr_privilege"));

    this.frame.readGrowWeb(this.frame.get_filename(), this.read_cb);
    this.ldb = new GraphLocalDb();

    // Set init values for Ge demo
    this.ldb.setObjectInfo(this,
        "$local.Demo-Ge-Dynamics-ScrollingText-ScrollingText.ActualValue##String80",
        "ProviewR");
    this.ldb.setObjectInfo(this,
        "$local.Demo-Ge-Subgraphs-DynamicAxis-Av2.ActualValue##Float32", 100);
    this.ldb.setObjectInfo(this,
        "$local.Demo-Ge-Subgraphs-DynamicAxisArc-Av2.ActualValue##Float32", 100);
  }

  read_cb(lines, row) {
    this.frame.read_func(this.ctx, lines, row);
    this.frame.register_events(this.baseCtx);
    if (this.frame.nogdh) {
      this.priv = 5;
      this.ctx.traceConnect();
      this.trace_cyclic();
    } else {
      this.gdh = new Gdh(this.gdh_init_cb);
    }
  }

  gdh_init_cb() {
    if (this.priv === null) {
      this.gdh.login("", "").then(this.login_cb);
    }

    this.ctx.traceConnect();
    this.gdh.refObjectInfoList().then(e => this.trace_cyclic());
  }

  login_cb(res) {
    console.log("Login:", res.sts, res.value);
    this.priv = (res.sts & 1) ? res.value : 0;
  }

  trace_cyclic() {
    if (this.frame.nogdh) {
      this.trace_scan();
    } else {
      this.gdh.getRefObjectInfoAll(this.trace_scan);
    }
  }

  trace_scan() {
    this.scan_time = this.ctx.scantime;
    this.fast_scan_time = this.ctx.fast_scantime;
    this.animation_scan_time = this.ctx.animation_scantime;

    this.ctx.traceScan();
    // if ( this.slow_scan_cnt == 0 || this.fast_scan_cnt == 0)
    this.ctx.draw();

    this.slow_scan_cnt++;
    if (this.slow_scan_cnt >= (this.scan_time / this.animation_scan_time)) {
      this.slow_scan_cnt = 0;
    }

    this.fast_scan_cnt++;
    if (this.fast_scan_cnt >=
        (this.fast_scan_time / this.animation_scan_time)) {
      this.fast_scan_cnt = 0;
    }

    this.timer = setTimeout(this.trace_cyclic, 1000 * this.animation_scan_time);
  }

  growUserdataOpen(lines, row, ctx, type) {
    let ret = new UserdataCbReturn();

    if (type === UserdataCbType.Ctx || type === UserdataCbType.Node || type === UserdataCbType.NodeClass) {
      if (type === UserdataCbType.Ctx && lines[row] !== "1") {
        ret.row = row - 1;
        ret.userdata = null;
        return ret;
      }
      let dyn = new Dyn(this);
      ret.userdata = dyn;
      ret.row = dyn.open(lines, row);
    }
    return ret;
  }

  event_handler(e) {
    let ctx_popped = false;
    let dyn;
    let o;

    if (e.object) {
      ctx_popped = this.ctxPop(e.object.ctx);
    }

    switch (e.event) {
      case Event.MB1Click:
        if (!(e.object instanceof GrowMenu)) {
          // Close any open menu, if not click in menu
          let event = new GlowEventMenu();
          event.event = Event.MenuDelete;
          event.type = EventType.Menu;
          event.object = null;

          let list = this.ctx.get_object_list();
          for (let i = 0; i < list.size(); i++) {
            o = list.get(i);
            if ((o instanceof GrowNode || o instanceof GrowGroup) && o !== e.object) {
              dyn = o.getUserData();
              if (dyn !== null) {
                dyn.action(o, event);
              }
              let old_size = list.size();
              list = this.ctx.get_object_list();
              if (old_size !== list.size()) { // Something is deleted
                break;
              }
            }
          }
        }
        // Note! no break
      case Event.MB1Up:
      case Event.MB1Down:
      case Event.MB1DoubleClick:
      case Event.MB3Press:
      case Event.SliderMoveStart:
      case Event.SliderMoveEnd:
      case Event.SliderMoved:
      case Event.Signal:
        if (e.object !== null) {
          let sts;
          dyn = e.object.getUserData();
          if (dyn !== null) {
            sts = dyn.action(e.object, e);
          }
        }
        break;
      case Event.MenuActivated:
      case Event.MenuCreate:
      case Event.MenuDelete:
        let list = this.ctx.get_object_list();
        for (let i = 0; i < list.size(); i++) {
          o = list.get(i);
          if (o instanceof GrowNode || o instanceof GrowGroup) {
            dyn = o.getUserData();
            if (dyn !== null) {
              let sts = dyn.action(o, e);
              if (sts === GLOW__TERMINATED) {
                return;
              }

              // Check if anything is deleted
              let old_size = list.size();
              list = this.ctx.get_object_list();
              if (old_size !== list.size()) {
                break;
              }
            }
          }
        }
        break;
      default:
        break;
    }
    if (ctx_popped) {
      this.ctxPush();
    }
  }

  ctxPop(nctx) {
    if (this.ctx === nctx) {
      return false;
    }

    if (this.ctxStackCnt >= 10) {
      console.log("** Graph ctx stack overflow");
      return false;
    }
    this.ctxStack[this.ctxStackCnt] = this.ctx;
    this.ctxStackCnt++;
    this.ctx = nctx;
    return true;
  }

  ctxPush() {
    if (this.ctxStackCnt > 0) {
      --this.ctxStackCnt;
      this.ctx = this.ctxStack[this.ctxStackCnt];
    }
  }

  getCtx() {
    return this.ctx;
  }

  setSubwindowSource(name, source, owner) {
    let ctx = this.ctx;
    if (this.ctxStackCnt > 0) {
      ctx = this.ctxStack[this.ctxStackCnt - 1];
    }
    ctx.setSubwindowSource(name, source, owner);
  }


  setClickActive(active) {
    this.clickActive = active;
  }

  getClickActive() {
    return this.clickActive;
  }

  stringToType(str) {
    let idx;
    if ((idx = str.indexOf('#')) !== -1) {
      str = str.substring(0, idx);
    }

    str = str.toLowerCase();
    if (strToTypeId.hasOwnProperty(str)) {
      return strToTypeId[str];
    }
    if (str.startsWith("string")) {
      return Type.String;
    }
    return 0;
  }

  stringToIndex(str) {
    let idx1, idx2;
    if ((idx1 = str.indexOf('[')) !== -1 && (idx2 = str.indexOf(']')) !== -1 &&
        idx2 > idx1) {
      let index = parseInt(str.substring(idx1 + 1, idx2), 10);
      if (isNaN(index)) {
        console.log("Element syntax error, " + str);
        return 1;
      }
      return index;
    }
    return 1;
  }

  parseAttrName(name) {
    if (name === null) {
      return null;
    }

    let idx, tidx, eidx;
    let pname = new DynParsedAttrName();

    let str = name.trim();

    if ((idx = str.indexOf("$local.")) !== -1) {
      if ((tidx = str.indexOf('#')) === -1) {
        pname.name = str.substring(idx + 1);
      } else {
        pname.name = str.substring(idx + 7, tidx);
        let type = str.substring(tidx).toUpperCase();
        if (type === "##FLOAT32") {
          pname.type = Type.Float32;
        } else if (type === "##FLOAT64") {
          pname.type = Type.Float64;
        } else if (type === "##INT32") {
          pname.type = Type.Int32;
        } else if (type === "##BOOLEAN") {
          pname.type = Type.Boolean;
        } else {
          pname.type = Type.String;
        }
      }
      if (str.substring(0, 1) === "!") {
        str = str.substring(1);
        str = str.trim();
        pname.inverted = true;
      } else {
        pname.inverted = false;
      }

      pname.database = Database.Local;
      pname.tname = name;
      return pname;
    }

    if ((idx = str.indexOf("$ccm.")) !== -1) {
      if ((tidx = str.indexOf('#')) === -1) {
        pname.name = str.substring(idx + 1);
      } else {
        pname.name = str.substring(idx + 5, tidx);
        let type2 = str.substring(tidx).toUpperCase();
        if (type2 === "##FLOAT32") {
          pname.type = Type.Float32;
        } else if (type2 === "##INT32") {
          pname.type = Type.Int32;
        } else if (type2 === "##BOOLEAN") {
          pname.type = Type.Boolean;
        } else {
          pname.type = Type.String;
        }
      }
      if (str.substring(0, 1) === "!") {
        str = str.substring(1);
        str = str.trim();
        pname.inverted = true;
      } else {
        pname.inverted = false;
      }

      pname.database = Database.Ccm;
      pname.tname = String(pname.name);
      return pname;
    }


    if ((idx = str.indexOf("$object")) !== -1) {
      if (this.appl !== null) {
        let oname = this.ctx.getOwner();
        str = str.substring(0, idx) + oname + str.substring(idx + 7);
      }
    }

    pname.tname = String(str);

    if ((idx = str.indexOf('[')) === -1) {
      if ((eidx = str.lastIndexOf('#')) !== -1 && str.charAt(eidx - 1) !== '#') {
        pname.elements = parseInt(str.substring(eidx + 1), 10);
        if (isNaN(pname.elements)) {
          pname.elements = 1;
        }
        str = str.substring(0, eidx);
      } else {
        pname.elements = 1;
      }
    } else {
      pname.index = this.stringToIndex(str);
      pname.elements = 1;
    }

    if ((tidx = str.indexOf("##")) === -1) {
      pname.type = 0;
    } else {
      if (str.toLowerCase().substring(tidx + 2, tidx + 5) === "bit") {
        let typestr = str.substring(tidx + 2);
        let bit = this.stringToIndex(typestr);
        pname.bitmask = 1 << bit;
        str = str.substring(0, tidx + 5);
      }

      pname.type = this.stringToType(str.substring(tidx + 2));
      str = str.substring(0, tidx);
    }

    if (str.substring(0, 1) === "!") {
      str = str.substring(1);
      str = str.trim();
      pname.inverted = true;
      pname.tname = pname.tname.substring(1);
      pname.tname = pname.tname.trim();
    } else {
      pname.inverted = false;
    }

    pname.database = Database.Gdh;
    pname.name = str;

    return pname;
  }

  getLdb() {
    return this.ldb;
  }

  getGdh() {
    return this.gdh;
  }

  isAuthorized(access) {
    return !!(this.priv & access);
    // return appl.isAuthorized( access);
  }

  traceConnect(object) {
    let ctx_popped = false;

    if (object.ctx !== this.ctx) {
      ctx_popped = this.ctxPop(object.ctx);
    }

    if (object.userdata === null) {
      if (ctx_popped) {
        this.ctxPush();
      }
      return;
    }

    let dyn = object.userdata;
    if (object instanceof GrowNode) {
      let dyn_type1 = object.getClassDynType1();

      if ((((dyn_type1 & DynType1.HostObject) !== 0 &&
              (dyn.dyn_type1 & DynType1.Inherit) !== 0)) ||
          (dyn.dyn_type1 & DynType1.HostObject) !== 0) {
        let nodeclass_dyn = object.getClassUserData();
        dyn.setTotal(null);
        if (nodeclass_dyn !== null) {
          let old_dyn = dyn;
          dyn = new Dyn(this);
          dyn.merge(old_dyn);
          dyn.total_dyn_type1 |= DynType1.HostObject;
          dyn.merge(nodeclass_dyn);
          if (old_dyn.cycle !== Cycle.Inherit) {
            dyn.cycle = old_dyn.cycle;
          }
          if (!(old_dyn.action_type1 === ActionType1.Inherit &&
                  old_dyn.action_type2 === 0)) {
            dyn.access = old_dyn.access;
          }
          object.userdata = dyn;
          dyn.setTotal(object);
        }
      }
    }

    object.userdata.connect(object);

    if (ctx_popped) {
      this.ctxPush();
    }
  }

  traceDisconnect(o) {
    if (o.userdata !== null) {
      o.userdata.disconnect(o);
    }
  }

  traceScan(o) {
    if (o.userdata !== null) {
      let dyn = o.userdata;

      if (dyn.cycle === Cycle.Inherit) {
        return 1;
      }
      if (dyn.cycle === Cycle.Slow && this.slow_scan_cnt !== 0 &&
          !(dyn.total_dyn_type1 & DynType1.Animation ||
              dyn.total_dyn_type2 & DynType2.ScrollingText)) {
        return 1;
      }
      if (dyn.cycle === Cycle.Fast && this.fast_scan_cnt !== 0 &&
          !(dyn.total_dyn_type1 & DynType1.Animation ||
              dyn.total_dyn_type2 & DynType2.ScrollingText)) {
        return 1;
      }

      o.userdata.scan(o);
    }
  }

  openValueInputDialog(dyn, text, elem) {
    let value = prompt(text, "");
    if (value) {
      dyn.valueInputAction(elem, value);
    }
  }

  openConfirmDialog(dyn, text, object) {
    if (appl) {
      appl.openConfirmDialog(dyn, text, object);
    }
  }

  getScanTime() {
    return this.scan_time;
  }

  getFastScanTime() {
    return this.fast_scan_time;
  }

  getAnimationScanTime() {
    return Math.min(this.scan_time, this.animation_scan_time);
  }

  setScanTime(scan_time) {
    this.scan_time = scan_time;
  }

  setFastScanTime(fast_scan_time) {
    this.fast_scan_time = fast_scan_time;
  }

  setAnimationScanTime(animation_scan_time) {
    this.animation_scan_time = animation_scan_time;
  }

  command(cmd) {
    if (this.appl) {
      return this.appl.command(cmd);
    }
    return 0;
  }

  script(script) {
    if (this.appl) {
      return this.appl.script(script);
    }
    return 0;
  }

  closeGraph() {
    window.close();
  }

  getCommand(cmd) {
    let str = cmd;
    let idx;

    while ((idx = str.indexOf("$object")) !== -1) {
      if (appl !== null) {
        let oname = this.ctx.getOwner();
        str = str.substring(0, idx) + oname + str.substring(idx + 7);
      }
    }
    return str;
  }

  setCurrentSlider(slider) {
    this.currentSlider = slider;
  }

  getCurrentSlider() {
    return this.currentSlider;
  }

  loadCtx(file, read_cb) {
    return this.frame.readGrowWindow(file, read_cb);
  }

  getReferenceName(name) {
    // TODO
    return null;
  }
}