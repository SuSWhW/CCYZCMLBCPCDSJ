//=============================================================================
// Pon_BattleGainVariable.js
//=============================================================================
//Copyright (c) 2020 Ponpoko Neruson
//Released under the MIT license
//https://opensource.org/licenses/mit-license.php
//
//連絡先	:ponpokonerusontanuki@gmail.com
//2020/03/01 1.00 作成
//2020/03/01 1.01 加算を許可するスイッチの追加とメッセージが空白なら非表示にするように
/*:
 * @plugindesc 戦闘勝利時に指定の変数に倒した敵に設定した値を加算します。
 * @author ぽんぽこねるそん
 *
 * @help  <使い方>
 * パラメータを設定して敵キャラのメモ欄に<獲得変数値:n>と記述してください。
 * nには加算したい値を入れてください。
 * ex.15加算するようにする場合
 * <獲得変数値:15>
 *
 * @param 加算する変数
 * @type variable
 * @default 100
 * @desc 戦闘勝利時に加算する変数の番号
 *
 * @param 変数への加算を許可するスイッチ
 * @type switch
 * @default 100
 * @desc ON:加算する OFF:加算しない
 *なしで常に許可します
 *
 * @param 獲得メッセージ
 * @type string
 * @default 変数を %1 手に入れた！
 * @desc 戦闘勝利時に変数に加算した時に表示するメッセージ
 *空白にすると非表示になります
 */



var enemyVariableId = PluginManager.parameters('Pon_BattleGainVariable')["加算する変数"];
var enemyGainSwitchId = PluginManager.parameters('Pon_BattleGainVariable')["変数への加算を許可するスイッチ"];
var enemyVariableMsg = PluginManager.parameters('Pon_BattleGainVariable')["獲得メッセージ"];

(function() {
//=============================================================================
// 変数に加算する値の取得
//=============================================================================
Game_Enemy.prototype.variableValue = function() {
    return Number(this.enemy().meta["獲得変数値"]) || 0;
};
//=============================================================================
// 変数に加算する値の合計を取得
//=============================================================================
Game_Troop.prototype.variableValueTotal = function() {
    if(enemyVariableId <= 0 || (enemyGainSwitchId > 0 && !$gameSwitches.value(enemyGainSwitchId))){return 0};
    return this.deadMembers().reduce(function(r, enemy) {
        return r + enemy.variableValue();
    }, 0);
};
//=============================================================================
// 戦闘勝利時に獲得するものを作成
//=============================================================================
var _BattleManager_makeRewards = BattleManager.makeRewards;
BattleManager.makeRewards = function() {
    _BattleManager_makeRewards.call(this);
    this._rewards.variableValue = $gameTroop.variableValueTotal();
};
//=============================================================================
// 獲得したものを表示
//=============================================================================
BattleManager.displayRewards = function() {
    this.displayExp();
    this.displayGold();
    this.displayVariableValue();
    this.displayDropItems();
};
//=============================================================================
// 変数に加算した値を表示
//=============================================================================
BattleManager.displayVariableValue = function() {
    var value = this._rewards.variableValue;
    if (value !== 0 && enemyVariableMsg) {
        var text = enemyVariableMsg.format(value);
        $gameMessage.add('\\.' + text);
    }
};
//=============================================================================
// 獲得する処理
//=============================================================================
var _BattleManager_gainRewards = BattleManager.gainRewards;
BattleManager.gainRewards = function() {
    _BattleManager_gainRewards.call(this);
    this.gainVariableValue();
};
//=============================================================================
// 変数に加算する処理
//=============================================================================
BattleManager.gainVariableValue = function() {
    if(enemyVariableId <= 0){return};
    var value = $gameVariables.value(enemyVariableId) + this._rewards.variableValue;
    $gameVariables.setValue(enemyVariableId, value);
};
})();