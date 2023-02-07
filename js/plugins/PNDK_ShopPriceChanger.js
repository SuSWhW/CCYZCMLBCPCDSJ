// --------------------------------------------------------------------------
// 
// PNDK_ShopPriceChanger
// Copyright (c) 2016 PANDAKO
// This software is released under the MIT License.
// 
// Version:1.2.0	2016/10/27	小数ではなく整数の％で設定できるように変更
// Version:1.1.0	2016/10/26	制御文字に対応。名称を他と重なりにくいよう変更
// Version:1.0.0	2016/10/24	初版
// 
// --------------------------------------------------------------------------
/*:
 * @plugindesc Change the market price.
 * @author PANDAKO
 *
 * @help
 * Plugin Command Example:
 *   PNDK_ShopPriceChanger buy 50      #50% OFF
 *   PNDK_ShopPriceChanger sell 100    #100% price
 *   PNDK_ShopPriceChanger sell \V[n]
 *   PNDK_ShopPriceChanger reset
 * 
 * @param buyingPrice
 * @desc Purchase price rate. (%)
 * e.g. 50 = 50% OFF
 * @default 100
 * 
 * @param sellingPrice
 * @desc Selling price rate. (%)
 * e.g. 50 is half price.
 * @default 50
 * 
 */
/*:ja
 * @plugindesc お店で売買する時の価格を変更します。
 * @author パンダコ
 *
 * @help
 * プラグインコマンド:
 *   PNDK_ShopPriceChanger buy 50      #購入価格を半額（50%）にする
 *   PNDK_ShopPriceChanger sell 100    #売却価格を購入価格と同じ（100%）にする
 *   PNDK_ShopPriceChanger sell \V[n]  #売却価格を変数n番のレートにする
 *   PNDK_ShopPriceChanger reset       #パラメータで設定した値にリセット
 * 
 * @param buyingPrice
 * @desc 購入時の価格レート（単位は％です）
 * ※制御文字利用可（\V[n]）
 * @default 100
 * 
 * @param sellingPrice
 * @desc 売却時の価格レート（単位は％です）
 * ※制御文字利用可（\V[n]）
 * @default 50
 * 
 */

(function() {
	//プラグインマネージャーで設定されたパラメータを取得
	var parameters = PluginManager.parameters('PNDK_ShopPriceChanger');
	
	//パラメータを変数へ
	var buyingPrice = parameters['buyingPrice'];
	var sellingPrice = parameters['sellingPrice'];
	
	//プラグインコマンドの追加
	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		//
		if (command === 'PNDK_ShopPriceChanger') {
			switch (args[0]) {
				case 'buy':
					buyingPrice = args[1];
					break;
				case 'sell':
					sellingPrice = args[1];
					break;
				case 'reset':
					buyingPrice = parameters['buyingPrice'];
					sellingPrice = parameters['sellingPrice'];
					break;
			}
		}
	};
	
	//表示価格＆販売価格の処理に追記
	var _Window_ShopBuy_prototype_price = Window_ShopBuy.prototype.price;
	Window_ShopBuy.prototype.price = function(item) {
		_Window_ShopBuy_prototype_price.call(this, item);
		//
		return Math.floor(this._price[this._data.indexOf(item)] * (Number(Window_Base.prototype.convertEscapeCharacters(buyingPrice)) / 100));
	};

	//売却価格処理に追記
	var _Scene_Shop_prototype_sellingPrice = Scene_Shop.prototype.sellingPrice;
	Scene_Shop.prototype.sellingPrice = function() {
		_Scene_Shop_prototype_sellingPrice.call(this);
		//
		return Math.floor(this._item.price * (Number(Window_Base.prototype.convertEscapeCharacters(sellingPrice)) / 100));
	};
	
})();