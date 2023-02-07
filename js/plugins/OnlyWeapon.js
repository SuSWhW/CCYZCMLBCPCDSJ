//=============================================================================
// OnlyWeapon.js
//=============================================================================

/*:ja
 * @plugindesc 特定のアクター専用の武器を設定できます
 * @author 絶望と希望
 *
 * @help このプラグインには、プラグインコマンドはありません。
 * デフォルトでは特定アクター専用武器を
 * 設定するには専用の武器タイプを定義する必要があります。
 * しかしそれだとスキルの必要武器等の関係で少々不便なのでそれを解消します。
 *
 * ∇<OnlyWeapon:x>
 *   武器のメモ欄に記述するとその武器はアクターx番の専用武器となります。
 *   複数アクターを指定する場合は<OnlyWeapon:x,y,z>と記述します。
 * 
 */

(function() {

    var parameters = PluginManager.parameters('OnlyWeapon');

    var eva_gameBattlerBasePrototypeCanEquipWeapon = Game_BattlerBase.prototype.canEquipWeapon;
    Game_BattlerBase.prototype.canEquipWeapon = function (item) {
        var l_resultCanEquip = eva_gameBattlerBasePrototypeCanEquipWeapon.call(this, item);
        if (this.isActor() && item.meta.OnlyWeapon && l_resultCanEquip) {
            var l_actorIndices = String(item.meta.OnlyWeapon).split(",");
            for (var i = 0; i < l_actorIndices.length; i++) {
                if (Number(l_actorIndices[i]) === this.actorId()) { return true; }
            }
            return false;
        }
        return l_resultCanEquip;
    };

})();