//=============================================================================
// Pon_BattleGainVariable2.js
//=============================================================================
//Copyright (c) 2020 Ponpoko Neruson
//Released under the MIT license
//https://opensource.org/licenses/mit-license.php
//
//連絡先	:ponpokonerusontanuki@gmail.com
//2020/03/02 1.01 倍率を設定できるようにした
//                変数への加算以外にコードを評価できるようにした
//                加算値をevalで取得できるようにした
//2020/03/01 1.00 作成
/*:
 * @plugindesc 戦闘勝利時に指定の変数に倒した敵に設定した値を加算します。
 * @author ぽんぽこねるそん
 *
 * @help  <使い方>
 * パラメータを設定して敵キャラのメモ欄に<設定文字列:加算値>と記述してください。
 * 加算値には加算したい値を入れてください。
 *
 * ex.設定文字列が[100番の変数に加算するよ]で15加算するようにする場合
 * <100番の変数に加算するよ:15>
 *
 *1.01から加算値の倍率を設定できるようになりました。
 *特徴を持つオブジェクトのメモ欄に<設定文字列:倍率>と記述して
 *戦闘メンバーがそのオブジェクトを持っていると
 *(装備なら装備している、ステートならかかっている等)
 *適用されます。
 *
 *最終的な倍率は戦闘メンバー全員のものを乗算したものになります。
 *また最終的な加算値は端数切捨てになっています。
 *
 *ex.設定文字列が[100番の変数に加算するよの倍率]で1.25倍にする場合
 * <100番の変数に加算するよの倍率:1.25>
 *
 *1.01から変数へ加算する代わりに設定したコードを評価できるようになりました。
 *コードを評価する場合はVariableIdをなしにして
 *Scriptにコードを記述してください。
 *valueで加算値を取得できます。
 *
 *@param 設定
 * @type struct<GainVariable>[]
 * @default []
 * @desc 設定を追加してください
 *
 *@param 加算値取得方法
 * @type boolean
 * @on 数値(基本)
 * @off スクリプト(上級者向け)
 * @default true
 * @desc 敵キャラに設定する加算値の取得方法
 *スクリプトにするとコードとして評価します
 *
 */
/*~struct~GainVariable:
 * @param VariableId
 * @type variable
 * @default 100
 * @desc 戦闘勝利時に加算する変数の番号
 *なしにすると設定されたコードを評価します
 * 
 * @param SwitchId
 * @type switch
 * @default 0
 * @desc 変数への加算を許可するスイッチの番号
 *ON:加算する OFF:加算しない なしで常に加算する
 *
 * @param Script
 * @type note
 * @default 
 * @desc VariableIdがなしの時に戦闘勝利時に実行するスクリプトのコード
 *valueで加算値を取得できます
 * 
 * @param MetaName
 * @type string
 * @default 加算変数n
 * @desc 加算する値の取得用文字列
 *敵キャラのメモ欄に<設定文字列:加算値>の形で記述
 *
 * @param RateMeta
 * @type string
 * @default 加算変数n倍率
 * @desc 加算値倍率の取得用文字列
 *特徴を持つオブジェクトのメモ欄に<設定文字列:倍率>の形で記述
 *倍率は戦闘メンバー全員のものを乗算したものです
 *
 * @param PlusMessage
 * @type string
 * @default 変数を %1 手に入れた！
 * @desc 戦闘勝利時に変数への加算値が0より多い時に表示するメッセージ
 *空白にすると非表示になります
 *
 * @param MinusMessage
 * @type string
 * @default 変数が %1 減少した！
 * @desc 戦闘勝利時に変数への加算値が0未満の時に表示するメッセージ
 *空白にすると非表示になります (%1には絶対値が入ります)
 *
*/

var addValueMethod = JSON.parse(PluginManager.parameters('Pon_BattleGainVariable2')["加算値取得方法"])
var enemyGainVariableData = JSON.parse(PluginManager.parameters('Pon_BattleGainVariable2')["設定"]).map(function(data) {;
  data = JSON.parse(data);
  data.VariableId = Number(data.VariableId) || 0;
  data.SwitchId = Number(data.SwitchId) || 0;
  data.Script = data.Script.replace(/^\"|\"$/gm, "");
  data.Script = data.Script.replace(/\\n/gm, "\n");
  return data;
});
(function() {
//=============================================================================
// 変数に加算する値の取得
//=============================================================================
Game_Enemy.prototype.variableValue = function(metaName) {
    return (addValueMethod ? (Number(this.enemy().meta[metaName]) || 0) : eval(this.enemy().meta[metaName]));
};
//=============================================================================
// metaNameのメタデータを持つオブジェクトの配列を取得
//=============================================================================
Game_BattlerBase.prototype.metaTraitObjects = function(metaName) {
    return this.traitObjects().filter(function(obj) { return obj.meta[metaName]});
};
//=============================================================================
// 特徴を持つオブジェクトのメタデータmetaNameの値の配列を取得
//=============================================================================
Game_BattlerBase.prototype.metaTraitValues = function(metaName) {
    return this.metaTraitObjects(metaName).map(function(obj) { return obj.meta[metaName]});
};
//=============================================================================
// 特徴を持つオブジェクトのメタデータmetaNameの総乗計算
//=============================================================================
Game_BattlerBase.prototype.metaTraitValuesPi = function(metaName) {
    return this.metaTraitValues(metaName).reduce(function(r, value) {
        return r * (Number(value) || 1);
    }, 1);
};
//=============================================================================
// 変数に加算する値の合計を取得
//=============================================================================
Game_Troop.prototype.variablesValueTotal = function() {
    var array = this.gainVariableData().map(function( data ) {
      data.GainValue = Math.trunc(this.metaVariableValueTotal(data.MetaName) * $gameParty.gainVariableRate(data.RateMeta));
      data.Message = (data.GainValue > 0) ? data.PlusMessage : data.MinusMessage;
      return data
    }, this);
    return array.filter( function( value ) {return value.GainValue !== 0});
};
//=============================================================================
// 変数への加算を許可されているデータの配列を取得
//=============================================================================
Game_Troop.prototype.gainVariableData = function() {
    return enemyGainVariableData.filter( function( data ) {return this.isGainVariable(data.VariableId, data.SwitchId, data.Script)}, this);
};
//=============================================================================
// 戦闘不能の敵キャラのmetaNameの変数への加算値の総和を取得
//=============================================================================
Game_Troop.prototype.metaVariableValueTotal = function(metaName) {
    return this.deadMembers().reduce(function(r, enemy) { return r + enemy.variableValue(metaName) }, 0);
};
//=============================================================================
// 変数に加算していいか判定
//=============================================================================
Game_Troop.prototype.isGainVariable = function(variableId, switchId, script) {
    return (variableId > 0 || script) && (switchId <= 0 || $gameSwitches.value(switchId))
};
//=============================================================================
// 変数への加算値の倍率を取得
//=============================================================================
Game_Party.prototype.gainVariableRate = function(metaName) {
    return this.battleMembers().reduce(function(r, actor) {return r * actor.metaTraitValuesPi(metaName)}, 1);
};
//=============================================================================
// 戦闘勝利時に獲得するものを作成
//=============================================================================
var _BattleManager_makeRewards = BattleManager.makeRewards;
BattleManager.makeRewards = function() {
    _BattleManager_makeRewards.call(this);
    this._rewards.variablesValue = $gameTroop.variablesValueTotal();
};
//=============================================================================
// 獲得したものを表示
//=============================================================================
BattleManager.displayRewards = function() {
    this.displayExp();
    this.displayGold();
    this.displayVariablesValue();
    this.displayDropItems();
};
//=============================================================================
// 変数に加算した値を表示
//=============================================================================
BattleManager.displayVariablesValue = function() {
    this._rewards.variablesValue.filter( function( data ) {return data.Message}).forEach(function( data ) {
        var text = data.Message.format(Math.abs(data.GainValue));
        $gameMessage.add('\\.' + text);
    });
};
//=============================================================================
// 獲得する処理
//=============================================================================
var _BattleManager_gainRewards = BattleManager.gainRewards;
BattleManager.gainRewards = function() {
    _BattleManager_gainRewards.call(this);
    this.gainVariablesValue();
};
//=============================================================================
// 変数への加算とスクリプトの処理
//=============================================================================
BattleManager.gainVariablesValue = function() {
    this._rewards.variablesValue.forEach(function( data ) {
      if (data.VariableId > 0){
        this.gainVariableValue(data);
      } else {
        this.gainVariableScript(data);
      };
    }, this);
};
//=============================================================================
// 変数に加算する処理(通常)
//=============================================================================
BattleManager.gainVariableValue = function(data) {
    var value = $gameVariables.value(data.VariableId) + data.GainValue;
    $gameVariables.setValue(data.VariableId, value);
};
//=============================================================================
// 変数に加算する処理(スクリプト)
//=============================================================================
BattleManager.gainVariableScript = function(data) {
    var value = data.GainValue;
    eval(data.Script);
};
})();