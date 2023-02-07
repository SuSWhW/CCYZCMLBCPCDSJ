/*:ja
 * @plugindesc バトルイベントの発動条件を注釈で指定できるプラグイン
 * @author ネコニャーン
 * @help
 *Ｑ：どんなプラグイン？
 *Ａ：javascriptで、バトルイベントの発動条件を設定できるプラグイン。
 *設定方法：
 *①　発動条件なしのバトルイベントを用意します。
 *②　①のバトルイベントの一行目に注釈を入れます。
 *③　②の注釈の中に、javascript条件式を記述します。
 *④　③で記述した式がtrueになると①のバトルイベントが発動します。
 *
 *このプラグインを用いる事で、例えば○番目のアクターがピンチになったり、
 *○ターンまでに敵のHPが半分を切ると発動するイベントを作成できます。
 *
 *サンプルコード：
 *
 *$gameParty.aliveMembers().some(function(actor){
 *return actor.hpRate()<0.5;}
 *,this);//パーティの誰かのHPが半分を切ったとき
 *
 *$gameParty.members()[0].isStateAffected(1)//先頭のアクターが戦闘不能のとき
 *
 *バトルイベントの発動回数はスパンの設定に依存します。
 */
(function() {

	//バトルイベントの発動条件をコメントで指定する処理
	var NYA_Game_Troop_meetsConditions = Game_Troop.prototype.meetsConditions;
	Game_Troop.prototype.meetsConditions = function(page) {
	    var c = page.conditions;
	    if (!c.turnEnding && !c.turnValid && !c.enemyValid &&
	            !c.actorValid && !c.switchValid) {
		if(page.list[0].code == 108){
			var script = page.list[0].parameters[0]; + '\n'
			var index = 1;
			while(page.list[index].code == 408){
				script += page.list[index].parameters[0]; + '\n'
				index++;
			}
			return eval(script);
		}
	    }
	    return NYA_Game_Troop_meetsConditions.call(this,page);
	};

})();