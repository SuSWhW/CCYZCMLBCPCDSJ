//=============================================================================
// MPP_MovePos.js
//=============================================================================
// Copyright (c) 2015 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【ver.1.0】指定座標まで自動で移動させるスクリプトの追加。
 * @author 木星ペンギン
 *
 * @help [移動ルートの設定]内のスクリプト:
 *   this.movePos(x, y)           # 座標(x, y)に向かって移動します。
 *   this.movePos(x, y, skip)
 * 
 *   skip で true を設定した場合、移動できなかった時点で移動を中断します。
 * 
 * ●注意
 *  ・[移動ルートの設定]のオプションにある[移動できない場合は飛ばす]には
 *    チェックを入れないでください。
 *  
 *  ・プラグインパラメータで指定できる移動できる[Search Limit(移動できる距離)]が
 *    一度に移動できる最大距離です。
 *    現在位置からこの数値以上に遠い座標を指定することはできません。
 *    一度で移動するのではなく複数回に分けて移動させてください。
 *    
 *  ・[Search Limit(移動できる距離)]を増やすことで一度に移動できる距離を
 *    増やせますが、処理が重くなります。
 * 
 * ================================
 * 制作 : 木星ペンギン
 * URL : http://woodpenguin.blog.fc2.com/
 * 
 * @param Search Limit
 * @desc 移動できる距離
 * @default 12
 *
 */

(function() {

var parameters = PluginManager.parameters('MPP_MovePos');

var searchLimit = Number(parameters['Search Limit']);

Game_Character.prototype.movePos = function(x, y, skippable) {
    skippable = skippable || false;
    var direction = this.findDirectionTo(x, y);
    if (direction > 0) {
        this.moveStraight(direction);
        this.setMovementSuccess(false);
    } else if (Math.abs(this._x - x) + Math.abs(this._y - y) < searchLimit) {
        this.setMovementSuccess(skippable || this.pos(x, y));
    }
};

//558
Game_Character.prototype.searchLimit = function() {
    return searchLimit;
};

})();
