//---------------------------------------------------------------------------------
//  Rowkoc's Multiple Elements Skill Plugin
//  ・スキルのNoteTag に属性IDを記入することで、複数の攻撃属性を持つスキルを作るプラグイン。
//	  
//-----------------------------------------------------------------------------------

 /*:
 * @plugindesc スキル、アイテムに複数の攻撃属性を設定します。
 * @author 弄刻
 * @help 
 *  スキル、アイテムのメモ欄に追加する属性を記入することにより、
 *  複数の攻撃属性を持ったスキルを作成することができます。
 *
 *  記入例：
 *  <ElemID:3>     ⇒  属性ID 3番の属性を追加
 *  <ElemID:2,3,4> ⇒  属性ID 2,3,4 番の属性を全て追加
 *
 *  ※注意※
 *  ・データベース側で指定する属性が「通常攻撃」の場合は、
 *    アクターの攻撃属性に記入した属性が追加されます。
 *  
 */
 
(function() {
  var _Game_Action_calcElementRate = Game_Action.prototype.calcElementRate
  Game_Action.prototype.calcElementRate = function(target) {
  	if (this._item.object().meta.ElemId){
  		//メタに属性追加が記入されている場合は、攻撃属性に追加属性を加えた属性で最大値をとる。
	  	var AdElements = this._item.object().meta.ElemId.split(",");
	  	var ElementsSet = AdElements.map(function(ElementsID){return Number(ElementsID);});
  		console.log(ElementsSet);
  		if (this.item().damage.elementId < 0) {
    		//スキル属性が「通常攻撃」の場合、アクターの属性配列ににtagの配列を追加して計算。
     	   return this.elementsMaxRate(target, this.subject().AddedElementsSet(ElementsSet));
    	} else {
    		//通常攻撃でない属性が設定されているとき、tagの配列ににデータベースの属性を追加。
    		ElementsSet.push(this.item().damage.elementId);
    		console.log(ElementsSet);
   	     	return this.elementsMaxRate(target, ElementsSet);
	    }
  		
  	}else{
  		//メタに属性追加が無ければ通常の関数を返す。
  		return _Game_Action_calcElementRate.call(this,target);
  	}
  };
})();

Game_Actor.prototype.AddedElementsSet = function(elements){
	// アクターの攻撃属性リストに elements を加えて返す。
	var set = Game_Battler.prototype.attackElements.call(this);
    if (this.hasNoWeapons() && !set.contains(this.bareHandsElementId())) {
        set.push(this.bareHandsElementId());
    }
    for (var i = 0 ; i < elements.length ; i++ ){
    	set.push(elements[i]);
    }
    //重複を削除
	set = set.filter(function(x,i,self){
    		return self.indexOf(x) === i;
    		});
    console.log(set);
    return set;
};