//=============================================================================
// Pon_RegionPassage.js
//=============================================================================
//Copyright (c) 2020 Ponpoko Neruson
//Released under the MIT license
//https://opensource.org/licenses/mit-license.php
//
//連絡先	:ponpokonerusontanuki@gmail.com
/*:
 * @plugindesc リージョンで通行制限をできるようにします。
 * @author ぽんぽこねるそん
 *
 * @help  <使い方>
 *リージョンで通行制限したいマップかタイルセットのメモ欄に
 *<リージョン通行設定regionId:通行制限>
 *と記述してください。
 *両方に記述がある場合マップに記述されたものが優先されます。
 *
 *regionId	:対象にするリージョンID
 *通行制限	:通行制限設定値(10進数)
 *ex.リージョンID5の左右の通行を制限する
 *<リージョン通行設定5:1542>
 *
 *<通行制限設定値対応表>
 *下方向通行不可	:   1
 *左方向通行不可	:   2
 *右方向通行不可	:   4
 *上方向通行不可	:   8
 *小型船通行禁止	: 512
 *大型船通行禁止	:1024
 *飛行船着陸禁止	:2048
 *
 *※4方向移動制限は歩行時のみ適用されます
 *※小型船・大型船通行禁止を設定していない場合それに乗っていると通行可能になります
 *※1方向でも通行制限がある場合飛行船は着陸できません(小型船・大型船通行禁止は無視されます)
 *※複合させたい場合は加算してください
 *ex.上下移動制限	9
 *
 *このプラグインにプラグインコマンドはありません。
 *
 * Var 1.00 20/01/27		やっつけ完成
 */




(function() {
var _game_MapcheckPassage = Game_Map.prototype.checkPassage;
Game_Map.prototype.checkPassage = function(x, y, bit) {
    if (this.regionPassage(x, y)) {return this.checkRegionPassage(x, y, bit)};
    return _game_MapcheckPassage.call(this, x, y, bit)
};
Game_Map.prototype.checkRegionPassage = function(x, y, bit) {
    if (this.regionPassage(x, y)){ 
        var flag = Number(this.regionPassage(x, y));
        if ((flag & bit) === 0){return true};   // [o] Passable
        if ((flag & bit) === bit){return false}; // [x] Impassable
        return false;
    }
};
Game_Map.prototype.regionPassage = function(x, y) {
    return $dataMap.meta[`リージョン通行設定${this.regionId(x, y)}`] || this.tileset().meta[`リージョン通行設定${this.regionId(x, y)}`];
};
})();