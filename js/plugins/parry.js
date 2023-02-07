/*:
@author
シトラス

@plugindesc
攻撃を受けたときに、一定確率でダメージを
軽減することができます。

@param physicalParryEval
@desc
物理攻撃の軽減確率を表す式です
@default
b.phpr

@param magicalParryEval
@desc
魔法攻撃の軽減確率を表す式です
@default
b.mapr

@param certainParryEval
@desc
必中攻撃の軽減確率を表す式です
@default
b.cepr

@param physicalParryMessage
@desc
物理攻撃を軽減したときのメッセージです。
@default
物理ダメージを軽減した！

@param magicalParryMessage
@desc
物理攻撃を軽減したときのメッセージです。
@default
魔法ダメージを軽減した！

@param certainParryMessage
@desc
必中攻撃を軽減したときのメッセージです。
@default
必中ダメージを軽減した！

@help
アクター、職業、ステート、装備、敵キャラのメモ欄に以下の設定をすると
ダメージを受けたときに威力を軽減することができます。

物理攻撃を　数値%　の確率で軽減します。
<phpr:数値>

魔法攻撃を　数値%　の確率で軽減します。
<mapr:数値>

必中攻撃を　数値%　の確率で軽減します。
<cepr:数値>

物理攻撃のダメージを　数値%　だけ軽減します。
<pdrr:数値>

魔法攻撃のダメージを 数値%　だけ軽減します。
<mdrr:数値>

必中攻撃のダメージを 数値%　だけ軽減します。
<cdrr:数値>


また、ダメージを軽減する確率に独自の計算式を使うことができます。

例：
b.phpr + b.luk/5000
この式だと、運が上がるごとに物理攻撃を軽減する確率が上昇します。

このプラグインはＭＩＴライセンスに基づいて公開しています
https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
*/

//即時間数で囲む
(function(){
	var pluginName = 'parry'
	//var pp = PluginManager.parameters(pluginName);
	
	//軽減時のメッセージ
	var physicalParryMessage = PluginManager.parameters(pluginName).physicalParryMessage;
	var magicalParryMessage  = PluginManager.parameters(pluginName).magicalParryMessage;
	var certainParryMessage  = PluginManager.parameters(pluginName).certainParryMessage;
	
	//ダメージ軽減確率を表す式
	var physicalParryEval = PluginManager.parameters(pluginName).physicalParryEval;
	var magicalParryEval  = PluginManager.parameters(pluginName).magicalParryEval;
	var certainParryEval  = PluginManager.parameters(pluginName).certainParryEval;
	
	Object.defineProperties(Game_BattlerBase.prototype,{
		//Physical Parry Rate 物理攻撃を軽減する確率
		phpr : { get: function() { return this.parryParam(0); }, configurable: true },
		//Magical Parry Rate  魔法攻撃を軽減する確率
		mapr : { get: function() { return this.parryParam(1); }, configurable: true },
		//Certain　Parry Rate  必中攻撃を軽減する確率
		cepr : { get: function() { return this.parryParam(2); }, configurable: true },
		
		//Physical Damage Reduse Rate 物理ダメージを軽減する割合
		pdrr : { get: function() { return this.parryParam(3); }, configurable: true },
		//Magical Damage Reduse Rate  魔法ダメージを軽減する確率
		mdrr : { get: function() { return this.parryParam(4); }, configurable: true },
		//Certain　Damage Reduse Rate  必中ダメージを軽減する割合
		cdrr : { get: function() { return this.parryParam(5); }, configurable: true },
	});
	
	Game_BattlerBase.prototype.parryParam = function(id){
		var names = ["phpr","mapr","cepr","pdrr","mdrr","cdrr",];
		var result = 0;
		var value = 0;
		for(var i = 0;i < this.states().length;i++){
			value = Number(this.states()[i].meta[names[id] ] );
			if(isNaN(value) === false){
				result += value;
			}
		}
		result /= 100;
		return result; 
	};
	
	//装備、アクター、職業のメモ欄から算出する
	Game_Actor.prototype.parryParam = function(id){
		var result = Game_BattlerBase.prototype.parryParam.call(this,id);
		var names = ["phpr","mapr","cepr","pdrr","mdrr","cdrr",];
		var value = 0;
		//アクターのメモ欄から算出
		value += Number(this.actor().meta[names[id] ] )/100;
		if(isNaN(value) === false){
			result += value;
		}
		
		//職業のメモ欄から算出
		value += Number(this.currentClass().meta[names[id] ] )/100;
		if(isNaN(value) === false){
			result += value;
		}
		
		//装備のメモ欄から算出
		var eq;
		for(var i = 0;i < this.equips().length;i++){
			eq = this.equips()[i];
			if(eq !== null){
				value = Number(eq.meta[names[id] ] )/100;
				if(isFinite(value) === true){
					result += value;
				}
			}
		}
		return result;
	};
	
	//敵のメモ欄から算出する
	Game_Enemy.prototype.originalParameter = function(id){
		var result = Game_BattlerBase.prototype.originalParameter.call(this,id);
		var names = ["phpr","mapr","cepr","pdrr","mdrr","cdrr",];
		var value = Number(this.enemy().meta[names[id] ] )/100;
		if(isFinite(value) === true){
			result += value;
		}
		return result;
	};
	
	//ダメージ軽減率の計算
	Game_Action.prototype.parryEval = function(target,evalString){
		//自分の能力値
		var a = this.subject();
		//相手の能力値
		var b = target;
		//変数を取得
		var v = $gameVariables._data;
		//スキルやアイテムそのものの情報
		var item = this.item();
		//計算結果
		var result = eval(evalString);
		//結果が数字でなければエラーを投げる
		if(isFinite(result) === false){
			throw new Error("結果が数字ではありません");
		}
		return result;
	};
	var _Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
	Game_Action.prototype.makeDamageValue = function(target, critical) {
		var value = _Game_Action_makeDamageValue.call(this,target,critical);
		
		//回復系なら軽減しない
		if(0 < value){
			
			//物理ダメージを軽減
			//値が0なら軽減しない
			if(0 < target.phpr && Math.random() < this.parryEval(target,physicalParryEval) && this.isPhysical() ){
				BattleManager._logWindow.addText(physicalParryMessage);
				value *= target.pdrr;
			}
			
			//魔法ダメージを軽減
			if(0 < target.mapr && Math.random() < this.parryEval(target,magicalParryEval) && this.isMagical() ){
				BattleManager._logWindow.addText(magicalParryMessage);
				value *= target.mdrr;
			}
			
			//必中ダメージを軽減
			if(0 < target.cepr && Math.random() < this.parryEval(target,certainParryEval) && this.isCertainHit() ){
				BattleManager._logWindow.addText(certainParryMessage);
				value *= target.cdrr;
			}
		}
		value = Math.round(value);
		return value;
	};
})();