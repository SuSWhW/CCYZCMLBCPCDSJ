//=============================================================================
// CommonMoveRoute.js (Ver.1.0.0)
//=============================================================================
// [Release Note]
// 2017 Jul 11: Ver1.0.0 First Release

/*:
 * @plugindesc Set events' move routing by common event
 * @author Sasuke KANNAZUKI(Thx to terunon)
 *
 * @help
 * [Summary]
 * Set events' move route to a common event
 * In order to reduce the burden of setting each event's description,
 * write a routine to common event and call from many events.
 * 
 * The remarkable point of writing move route to common event,
 * it enables to execute any event commands to the move route.
 *
 * Since the execution is not by event commands list but by move route,
 * you can set event commands list when the event invokes.
 *
 * [Example of setting method]
 * You can set by 'Plugin Command', 'Script', or 'Move Routing -> Script'.
 * When you want to set Common Event #4 to Event whose id is 19's move route,
 * set like following:
 * ** Plugin Command **
 * CommonMoveRoute 19 4       // most standard notation
 * toCommon 19 4              // the same as above
 * ** Script **
 * this.toCommon(4);          // set move route to this event.
 * this.commandRoute(4);      // the same as above
 * this.toCommon2(19, 4);     // most standard notation
 * this.commandRoute2(19, 4); // the same as above
 * ** 'Script' in Move Routing**
 * this.toCommon(4);          // set move route to the event set at the command
 * this.commandRoute(4);      // the same as above
 * ** NOTE **
 * At commands all of above, you cannot set Player as callee.
 * 
 * [Example of advanced setting method 1]
 * On above commans, you can set common event id and event id not only number,
 * but also following notation.
 * - V10, V25 and so on: the value of variable number whose id is after V.
 * - common event name, or event name: the id that the name has.
 *   But you cannot this notation whose name has white space.
 * ** The example in Script **
 * this.toCommon2('Aooni', 'randomMove');
 *   set common event named randomMove as the move route whose event name is
 *   'Aooni'.
 * ** The example of Plugin Command **
 * CommonMoveRoute V15 V20
 *   set common event whose id is variable #20 as the move route the event id
 *   is variable #10.
 *
 * [Example of advanced setting method 2]
 * put one more parameter to above commands, the parameter is evaluated by
 * the function eval(), and when the result is false, skip the execution.
 * ** The Examples **
 * CommonMoveRoute 19 4 true
 * this.toCommon2(19, 4, $gameSwitches.value(15));
 *
 * [Hint and note of setting commands]
 * - When you run the event command that takes wait in the common event,
 *   the event may often move original custom move.
 *   So if you execute command with wait, check the event's custom move route.
 * - You can call another common event on the above commands in common event.
 *   i.e. move route common event can do nesting.
 *   but make sure to avoid cyclic calling. If nesting depth become 100,
 *   it will invoke error.
 *
 * [Additional Information]
 * - You need not to terminate move route common event. For example,
 *   repeat move route, or setting loop that never exit.
 *   The movement will stop when the event's page is changed.
 * - If the move route common event is terminated, the event restart original
 *   route moving.
 *
 * [License]
 * This plugin is the refine version of terunon's TN_commonMoveRoute.js.
 * You can get the pluin at https://forum.tkool.jp/index.php?threads/146/
 * (Japanese site). Very thanks to terunon.
 * 
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */
/*:ja
 * @plugindesc ???????????????????????????????????????????????????????????????????????????????????????
 * @author ??????????????????????????????terunon???
 *
 * @help
 * ?????????
 * ?????????????????????????????????????????????????????????????????????????????????????????????????????????
 * ???????????????????????????????????????
 * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
 *
 * ??????????????????????????????????????????????????????????????????????????????????????????????????????
 * ?????????????????????????????????????????????????????????????????????????????????
 *
 * ?????????????????????????????????????????????????????????????????????????????????????????????
 * ??????????????????????????????????????????????????????????????????????????????????????????
 *
 * ???????????????????????????????????????
 * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
 * ?????????????????????ID19?????????4?????????????????????????????????????????????????????????????????????
 * ???????????????????????????????????????????????????????????????
 * ??????????????????????????????
 * CommonMoveRoute 19 4       // ??????
 * toCommon 19 4              // ??????
 * ????????????????????????????????????????????????
 * this.toCommon(4);          // ?????????????????????????????????????????????????????????
 * this.commandRoute(4);      // ??????
 * this.toCommon2(19, 4);     // ????????????ID19???????????????????????????
 * this.commandRoute2(19, 4); // ??????
 * ??????????????????????????????????????????????????????????????????????????????????????????
 * this.toCommon(4);          // ??????????????????????????????????????????????????????????????????
 * this.commandRoute(4);      // ??????
 * ?????????????????????
 * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
 *
 * ??????????????????????????????????????????
 * ?????????????????????????????????????????????????????????????????????????????????????????????????????????
 * ???V10 ??? V25 ??????????????????V??????????????????????????????ID????????????????????????
 * ???????????????ID ?????????????????????????????????????????????ID ?????????????????????????????????
 *   ????????????????????????
 * ?????????????????????????????????
 * ????????????????????????????????????????????????????????????
 * this.toCommon2('??????', '??????????????????');
 *   ????????????????????????????????????????????????????????????????????????????????????????????????????????????
 *   ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
 *   ????????????????????????
 * ?????????????????????????????????????????????????????????????????????
 * CommonMoveRoute V15 V20
 *   ??????ID15????????????ID?????????????????????????????????V20??????????????????????????????
 *   ????????????????????????????????????
 *
 * ??????????????????????????????????????????
 * ????????????????????????????????????true ??? false ??? ???????????????????????????
 * ??????????????? eval ??????????????????false ?????????????????????????????????????????????????????????
 * ???????????????
 * CommonMoveRoute 19 4 true
 * this.toCommon2(19, 4, $gameSwitches.value(15));
 *
 * ??????????????????????????????
 * ??????????????????????????????????????????????????????????????????????????????????????????????????????
 *   ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
 *   ??????????????????????????????????????????????????????????????????????????????????????????
 * ????????????????????????????????????????????????????????????????????????????????????????????????????????????
 *   ????????????(???????????????????????????)????????????????????????????????????????????????????????????
 *   100????????????????????????????????????????????????????????????????????????????????????????????????
 * 
 * ???????????????
 * ????????????????????????????????????????????????????????????????????????????????????????????????
 * ????????????????????????????????????????????????????????????????????????????????????????????????
 * ?????????????????????????????????????????????????????????
 * ???????????????????????????????????????????????????????????????????????????????????????????????????
 * ????????????????????????????????????????????????????????????????????????????????????
 * ????????????????????????????????????,????????????????????????
 * ?????????????????????????????????????????????????????????????????????????????????????????????????????????
 * ?????????????????????????????????????????????
 * ???????????????????????????????????????????????????????????????????????????????????????????????????
 *   ?????????????????????????????????????????????????????????????????????????????????
 * ??????????????????????????????????????????????????????????????????????????????????????????????????????
 *
 * ????????????????????????
 * ???????????????????????????terunon(????????????????????????)?????? TN_commonMoveRoute.js ???
 * ??????????????????????????????????????????????????????????????????????????????????????????
 * terunon??????????????????????????????
 *
 * ???????????????????????? MIT ???????????????????????????????????????
 * ????????????????????????????????????
 * http://opensource.org/licenses/mit-license.php
 */

(function() {
  //
  // process plugin commands
  //
  var _Game_Interpreter_pluginCommand =
   Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (['CommonMoveRoute', 'toCommon'].contains(command)) {
      this.toCommon2(args[0], args[1]);
    }
  };

  //
  // routine for process parameters
  //
  var getCommonEventIdWhoseNameIs = function (name) {
    for (var i = 1; i < $dataCommonEvents.length; i++) {
      var commonEvent = $dataCommonEvents[i];
      if (commonEvent && commonEvent.name === name) {
        return i;
      }
    }
    return 0;
  };

  var getCommonEventId = function (notation) {
    var reg;
    if (reg = (/^(V?)([0-9]+)/i).exec(String(notation))) {
      return reg[1] ? $gameVariables.value(+reg[2]) : +reg[2];
    }
    return getCommonEventIdWhoseNameIs(notation);
  };

    var getEventIdWhoseNameIs = function (name) {
    var arr = $gameMap.events().filter(function (event) {
      return event.event().name === name;
    });
    return arr[0] ? arr[0].eventId() : 0;
  };

  var getEventId = function (notation) {
    var reg;
    if (reg = (/^(V?)([0-9]+)/i).exec(String(notation))) {
      return reg[1] ? $gameVariables.value(+reg[2]) : +reg[2];
    }
    return getEventIdWhoseNameIs(notation);
  };

  var checkFlag = function(notation) {
    return notation == null || !!eval(notation);
  };

  //
  // initialize this plugin's original variables in class
  //
  var _Game_Event_initMembers = Game_Event.prototype.initMembers;
  Game_Event.prototype.initMembers = function() {
    _Game_Event_initMembers.call(this);
    this._originalMoveType = null;
    this._moveRouteInterpreter = null;
    this.resetMoveRouteByCommon();
  };

  Game_Event.prototype.isInCommonMoveRoute = function() {
    return this._moveRouteByCommon;
  };

  Game_Event.prototype.setMoveRouteByCommon = function () {
    this._moveRouteByCommon = true;
  };

  Game_Event.prototype.resetMoveRouteByCommon = function () {
    this._moveRouteByCommon = false;
  };

  //
  // memorize moveType because it needs change temporaly to 3(=custom).
  //
  Game_Event.prototype._restoreMoveType = function() {
    if (this.isInCommonMoveRoute()) {
      if (this._moveType !== 3) {
        this._moveRouteInterpreter = null;
      }
      this._originalMoveType = this._moveType;
      this._moveType = 3;
    }
  };

  Game_Event.prototype._resumeMoveType = function() {
    if (!this.isInCommonMoveRoute()) {
      if (this._moveRouteInterpreter._index > 0) {
        this._moveType = this._originalMoveType;
        this._originalMoveType = null;
      }
    }
  };

  //
  // call from event command 'Script' or 'Set Movement Route'
  //
  Game_Interpreter.prototype.commandRoute = 
  Game_Interpreter.prototype.toCommon = function (commonIdNote, flag) {
    if (!checkFlag(flag)) {
      return;
    }
    var eventId = this.eventId();
    if (eventId) {
      $gameMap.event(eventId).toCommon(commonIdNote);
    }
  };

  Game_Interpreter.prototype.commandRoute2 = 
  Game_Interpreter.prototype.toCommon2 = function (eventIdNote, commonIdNote,
   flag) {
    if (!checkFlag(flag)) {
      return;
    }
    var eventId = getEventId(eventIdNote);
    if (eventId) {
      $gameMap.event(eventId).toCommon(commonIdNote);
    }
  };

  Game_Event.prototype.commandRoute =
  Game_Event.prototype.toCommon = function(notation, flag) {
    if (!checkFlag(flag)) {
      return;
    }
    var commonId = getCommonEventId(notation);
    var common;
    if (commonId && (common = $dataCommonEvents[commonId])) {
      this._setMoveRouteToCommon(common);
    }
  };

  //
  // create new move route interpreter
  //
  Game_Event.prototype._setMoveRouteToCommon = function (commonEvent) {
    this.setMoveRouteByCommon();
    this._restoreMoveType();
    if (!this._moveRouteInterpreter) {
      this._moveRouteInterpreter = new Game_Interpreter();
      this._moveRouteInterpreter.setup(commonEvent.list, this.eventId());
    } else {
      this._moveRouteInterpreter.setupYoungestChild(commonEvent.list,
       this.eventId());
    }
  };

  Game_Interpreter.prototype.setupYoungestChild = function(list, eventId) {
    if (this._childInterpreter) {
      this._childInterpreter.setupYoungestChild(list, eventId);
    } else {
      this._childInterpreter = new Game_Interpreter(this._depth + 1);
      this._childInterpreter.setup(list, eventId);
    }
  };

  //
  // update new move route interpreter
  //
  var _Game_Event_update = Game_Event.prototype.update;
  Game_Event.prototype.update = function () {
    _Game_Event_update.call(this);
    this.updateMoveRouteInterpreter();
  };

  Game_Event.prototype.updateMoveRouteInterpreter = function () {
    if (this._moveRouteInterpreter) {
      this._moveRouteInterpreter.update();
    }
  };

  var _Game_Event_updateRoutineMove = Game_Event.prototype.updateRoutineMove;
  Game_Event.prototype.updateRoutineMove = function() {
    if (this._moveRouteInterpreter) {
      var interpreter = this._moveRouteInterpreter;
      if (!interpreter.isRunning()) {
        this._moveRouteInterpreter = null;
      }
    }
    _Game_Event_updateRoutineMove.call(this);
  };

  var _Game_Event_forceMoveRoute = Game_Event.prototype.forceMoveRoute;
  Game_Event.prototype.forceMoveRoute = function(moveRoute) {
    if (this.isInCommonMoveRoute()) {
      this.setMoveRoute(moveRoute);
      this._bindForceMoveRoute();
      return;
    }
    _Game_Event_forceMoveRoute.call(this, moveRoute);
  };

  var _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
  Game_Event.prototype.setupPageSettings = function() {
    _Game_Event_setupPageSettings.call(this);
    this._moveRouteInterpreter = null;
  };

  //
  // set move route forcing
  //
  Game_Event.prototype._bindForceMoveRoute = function () {
    this._originalMoveRouteForcing = this._moveRouteForcing;
    this._moveRouteForcing = true;
  };

  Game_Event.prototype._releaseForceMoveRoute = function () {
    this._moveRouteForcing = this._originalMoveRouteForcing;
  };

  //
  // finish movement by common event and restart original self movement
  //
  var _Game_Interpreter_terminate = Game_Interpreter.prototype.terminate;
  Game_Interpreter.prototype.terminate = function() {
    var event = $gameMap.event(this.eventId());
    if (event) {
      if (event.isInCommonMoveRoute()) {
        event.resetMoveRouteByCommon();
        event._resumeMoveType();
        event._releaseForceMoveRoute();
      }
    }
    this._index = 0;
    _Game_Interpreter_terminate.call(this);
  };

})();
