//=============================================================================
// RTK_ActionRate.js  ver1.00 2016/08/07
// The MIT License (MIT)
//=============================================================================

/*:
 * @plugindesc アクションの成功レートを調整する
 * @author Toshio Yamashita (yamachan)
 *
 * @help このプラグインにはプラグインコマンドはありません。
 *
 * スキル・アイテムのメモ:
 *   <mrf rate:n>	# アクション実行時に対象の魔法反射率をn倍する
 *   <mrf value:n>	# アクション実行時に対象の魔法反射率をnにする
 */

(function(_global) {
	var N = 'RTK_ActionRate';
	var param = PluginManager.parameters(N);

	var _Game_Action_itemMrf = Game_Action.prototype.itemMrf;
	Game_Action.prototype.itemMrf = function(target) {
		var ret = _Game_Action_itemMrf.call(this, target);
		var meta = this.item() && (this.item().meta || {});
		if (meta["mrf value"] !== undefined) {
			return Number(meta["mrf value"]) || 0;
		}
		if (meta["mrf rate"] !== undefined) {
			var v = Number(meta["mrf rate"]);
			return ret * (v == v ? v : 1);
		}
		return ret;
	};
})(this);
