//=============================================================================
// BattleEnemyStateEvent.js
// ----------------------------------------------------------------------------
// (C) 2019 astral
//
// ----------------------------------------------------------------------------
// Version
// 0.1.0 2019/04/27 
// 0.0.1 2019/04/27 試作版
/*:
 * 
 * @plugindesc 敵キャラステート付与時のイベント拡張
 * @author astral
 * 
 * @param Battle Common Event id
 * @text コモンイベント
 * @desc バトルイベントとして実行させるコモンイベント番号です。
 * @type common_event
 * @default 0
 * 
 * 
 * @param States
 * @text 対象ステート
 * @desc イベント起動の対象ステートとなるステートを指定します。複数指定可能で、未設定の場合全てを対象とします。
 * @type state[]
 * @default []
 * 
 * @param Target Troop
 * @text 対象敵グループ
 * @desc イベント起動の対象敵グループとなるIDを指定します。複数指定可能で、未設定の場合全てを対象とします。
 * @type troop[]
 * @default []
 * 
 * @param Target Enemy
 * @text 対象敵キャラ
 * @desc イベント起動の対象敵キャラとなるIDを指定します。複数指定可能で、未設定の場合全てを対象とします。
 * @type enemy[]
 * @default []
 * 
 * @help
 * 
 * 敵キャラに対象ステートが付与された場合、
 * 指定したコモンイベントをバトルイベントとして実行させます。
 * 
 * ステートが付与されず戦闘不能となった場合には、発動しません。
 * 
 * 
 * 
 * プラグインコマンド
 * 
 * 
 * 敵キャラ情報 敵グループ 10
 *  変数10番に出現中の敵グループIDを代入します。
 * 
 * 敵キャラ情報 起動敵キャラ 10
 *  変数10番にイベント起動の対象となった、敵キャラのIDを代入します。
 * 
 * 敵キャラ情報 起動敵キャラ位置 10
 *  変数10番にイベント起動の対象となった、敵キャラの位置(#1の数字のみ)を代入します。
 * 
 * 敵キャラ情報 起動ステート 10
 *  変数10番にイベント起動の対象となった、ステートのIDを代入します。
 *  複数のステートが同時に付与された場合は、最後のステートIDのみになります。
 * 
 * 
 * 敵キャラ情報 id 10 1
 *  変数10番に#1の敵キャラを対象に、IDを代入します
 * 
 * 敵キャラ情報 名前 10 1
 *  変数10番に#1の敵キャラを対象に、（A・Bなどを含む）名前を代入します
 * 
 * 敵キャラ情報 オリジナル名 10 1
 *  変数10番に#1の敵キャラを対象に、データベース上の名前を代入します
 * 
 * 敵キャラ情報 ステート 10 1 4
 *  スイッチ10番に#1の敵キャラを対象に、4番のステート状態でオン・オフします
 * 
 * 
 * 敵キャラの#1～#8はイベントコマンドと同じ意味で、出現順に指定します。
 * 存在しない場合は、変数は0が代入され、スイッチはオフになります。
 * 
 * 制御文字が使用可能です。
 * 
 * 
 */


(function () {
    'use strict';

    var param = (function (parameters){
        var $ = JSON.parse(JSON.stringify(parameters, function(key, value) {
            try {
                return JSON.parse(value);
            } catch (e) {
                return value;
            }
        }));
        return {
            enemyStateCommonId:toNumber($['Battle Common Event id']),
            targetStates:$['States'],
            targetTroop:$['Target Troop'],
            targetEnemy:$['Target Enemy'],
            
            isCallCommon:function(stateId, enemyId, troopId) {
                if (!this.isTroop(troopId)) return false;
                if (!this.isEnemy(enemyId)) return false;
                if (!this.isState(stateId)) return false;
                return true;
            },
            
            isState:function(id) {
                if (this.targetStates.length === 0) return true;
                if (this.targetStates.indexOf(id) >= 0) return true;
                return false;
            },
            
            isTroop:function(id) {
                if (this.targetTroop.length === 0) return true;
                if (this.targetTroop.indexOf(id) >= 0) return true;
                return false;
            },
            
            isEnemy:function(id) {
                if (this.targetEnemy.length === 0) return true;
                if (this.targetEnemy.indexOf(id) >= 0) return true;
                return false;
            },
        };

    })(PluginManager.parameters('BattleEnemyStateEvent'));

    var _Game_Troop_clear = Game_Troop.prototype.clear;
    Game_Troop.prototype.clear = function() {
        _Game_Troop_clear.apply(this, arguments);
        this._reserveCommonEvents = []
        this._trigerCommonState = 0;
        this._trigerCommonEnemyId = 0;
        this._trigerCommonIndex = 0;
    };

    var _Game_Troop_setupBattleEvent = Game_Troop.prototype.setupBattleEvent;
    Game_Troop.prototype.setupBattleEvent = function() {
        this.setupCommonBattleEvent();
        _Game_Troop_setupBattleEvent.apply(this, arguments);
    };

    Game_Troop.prototype.setupCommonBattleEvent = function() {
        if (this._interpreter.isRunning()) return;
        if ($gameTemp.isCommonEventReserved()) return;
        var events = $gameTroop._reserveCommonEvents;
        if (events.length > 0) {
            $gameTemp.reserveCommonEvent(events.shift());
        };
    };

    Game_Troop.prototype.reserveBattleCommonEvent = function(eventId) {
        var events = this._reserveCommonEvents;
        if (events.indexOf(eventId) < 0) {
            events.push(eventId);
        };
    };

    Game_Troop.prototype.battleCommonTrigger = function(eventId, stateId, enemyId, index) {
        this.reserveBattleCommonEvent(eventId)
        this._trigerCommonState = stateId;
        this._trigerCommonEnemyId = enemyId;
        this._trigerCommonIndex = index;
    };

    var _Game_BattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
    Game_BattlerBase.prototype.addNewState = function(stateId) {
        if (this.isEnemy() && $gameParty.inBattle()) {
            var enemyId = this._enemyId;
            if (param.isCallCommon(stateId, enemyId, $gameTroop._troopId)) {
                $gameTroop.battleCommonTrigger(param.enemyStateCommonId, stateId, enemyId, this.index());
            }
        }
        _Game_BattlerBase_addNewState.apply(this, arguments);
    };
    
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        var commandName = command.toLowerCase();
        if (commandName === 'enemyinfo' || commandName === '敵キャラ情報') {
            switch (args[0].toLowerCase()) {
                case 'id':
                    var enemy = getEnemy(args[2]);
                    setVariable(args[1], enemy && enemy._enemyId || 0);
                    break;
                case 'name':
                case '名前':
                    var enemy = getEnemy(args[2]);
                    setVariable(args[1], enemy && enemy.name() || 0);
                    break;
                case 'originalname':
                case 'オリジナル名':
                case 'オリジナル名前':
                    var enemy = getEnemy(args[2]);
                    setVariable(args[1], enemy && enemy.originalName() || 0);
                    break;
                case 'state':
                case 'ステート':
                    var enemy = getEnemy(args[2]);
                    var stateId = convertEscapeVariable(args[3]);
                    setSwitch(args[1], enemy && enemy.isStateAffected(+stateId));
                    break;
                case 'troop':
                case '敵グループ':
                    setVariable(args[1], $gameTroop._troopId || 0);
                    break;
                case 'triggerstate':
                case '起動ステート':
                    setVariable(args[1], $gameTroop._trigerCommonState || 0);
                    break;
                case 'triggerenemy':
                case '起動敵キャラ':
                    setVariable(args[1], $gameTroop._trigerCommonEnemyId || 0);
                    break;
                case 'triggerindex':
                case '起動敵キャラ位置':
                    setVariable(args[1], $gameTroop._trigerCommonIndex + 1 || 0);
                    break;
                default:
                    break;
            }
        }
    };

    function getEnemy(index) {
        if (!$gameParty.inBattle()) return 0;
        var i = convertEscapeVariable(index);
        return $gameTroop.members()[i - 1];
    };

    function setVariable(id, value) {
        var variableId = convertEscapeVariable(id);
        $gameVariables.setValue(variableId, value);
    };


    function setSwitch(id, value) {
        var sid = convertEscapeVariable(id);
        $gameSwitches.setValue(sid, !!value);
    };

    var convertEscapeVariable = function(text) {
        if (typeof text !== 'string') return text;
        text = text.replace(/\\/g, '\x1b');
        text = text.replace(/\x1b\x1b/g, '\\');
        text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
            return $gameVariables.value(parseInt(arguments[1]));
        }.bind(this));
        text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
            return $gameVariables.value(parseInt(arguments[1]));
        }.bind(this));
        return text;
    };


    function isNumber(val) {return typeof val === 'number';};

    function toNumber(val) {
        return isNumber(val) ? val : parseInt(val) || 0;
    };

    function isString(val) {return typeof val === 'string';};
    
    function toString(val, d) {
        return isString(val) ? val : d || '';
    };

})();