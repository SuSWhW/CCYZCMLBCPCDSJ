//---------------------------------------------------------------------------------
//  Rowkoc's Elements Rate Plugin
//  Row_ElementsRate.js
//-----------------------------------------------------------------------------------

 /*:
 * @plugindesc 属性有効度の計算方法を変更します。
 * ツクールXPのような倍率かけ合わせも可能です。
 * @author 弄刻
 *
 * @param Calculation Type
 * @desc 属性有効度計算のタイプです。以下から指定します。
 * 1.有効度最大 2.平均値 3.全て乗算
 * @default 1
 * 
 * @param Calc All Element
 * @desc 平均値計算時に有効度100%の属性をカウントするかの設定です。
 * true - 全ての属性で割る。 false - 有効度 100% の属性は無視する。(デフォルト)
 * @default false
 *
 * @param Adjust to Zero
 * @desc 有効度 0% が含まれていた場合の計算方法です。
 * true -必ず 0% を返す(デフォルト)。 false - 指定した計算に従う。
 * @default true
 *
 *
 * @help 
 * ===================================================================================
 * ＜概要＞
 *  複数の攻撃属性を持つスキルを使用した場合のダメージ倍率決定方法を変更する
 *  プラグインです。
 *
 *  ※注意：属性吸収プラグイン「YEP_ElementAbsorb.js」と併用する場合※
 *  Game_Action.prototype.elementsMaxRate を変更するので、
 *  こちらのプラグインが上に来るようにしてください。
 *  また、本プラグインでは計算中に属性吸収への対応は行っていませんので、
 *  属性吸収時は吸収属性の中で有効度が一番高いものが反映されます。
 *  
 *  
 * ====================================================================================
 * ＜使い方＞
 *  以下の計算方法から１つ選んで、パラメータ に番号を入れてください。
 *  デフォルトでは 1番が選択されます。
 *  また、パラメータ "Adjust to Zero" が true の場合は、
 *  どの計算式でも 0% が優先されるようになります。
 *
 * ＜計算方法一覧＞
 *  1.一番有効度の高いものを選択 (デフォルト)
 *    MV のデフォルトの計算方法です。
 *    攻撃側の属性のうち、ターゲット側の一番有効度が高い属性を返します。
 *    それ以外の属性の有効度は無視されます。
 *
 *  2.有効度の平均値をとる
 *    各属性の有効度の平均値をとります。属性有効度 0% の属性もカウントします。
 *    パラメータにより計算方法の調整を行えます。
 *    ・Calc All Element : 
 *		属性有効度100% の属性を計算に含めます。デフォルトは false です。
 *
 *  3.有効度を乗算する
 *    各属性の有効度をかけ合わせます。
 *    属性有効度 0% の属性が含まれる攻撃はダメージ0 となります。
 *    ただし、YEPの吸収、反射は無効化されません。
 *  
 *  =====================================================================================
 *  ＜補足事項＞
 *   Game_Action.prototype.elementsMaxRate の内部をパラメータに合わせて分岐させています。
 *   上記を改造しているタイプのプラグインはこのプラグインより上に置いてください。
 *   (最大有効度で計算するのであればこのプラグイン自体をOFFしておくのがベストですが…）
 */

 var sum  = function(arr) {
    return arr.reduce(function(prev, current, i, arr) {
        return prev+current;
    });
 };


 _Row_Game_Action_elementsMaxRate = Game_Action.prototype.elementsMaxRate
 Game_Action.prototype.elementsMaxRate = function(target, elements) {
 	var parameters = PluginManager.parameters('Row_ElementsRate');	
	var calcType = Number(parameters['Calculation Type'] || 1);
	var AllElement = parameters['Calc All Element'] || false;
	var AdjustZero = parameters['Adjust to Zero'] || true;
	var effective = 1;

    if (elements.length > 0) {
    	switch (calcType){
		  case 2: //平均値
		    var elsum = 0.0;
		    var elcount = 0.0;
		    for (var i = 0 ; i < elements.length ; i++ ){
		    	if (AllElement && target.elementRate(elements[i]) != 1){
		    		if (AdjustZero && target.elementRate(elements[i]) == 0){
		    			console.log("Zero Check");
		    			return 0;
		    		}		    		
		    		elsum += target.elementRate(elements[i]);
		    		elcount++;
		    	};
    		};
    		if (elsum == 0){ elsum = 1; };
    		if (elcount == 0){ elcount = 1; };
		    effective = elsum/elcount;
		    break;
		  case 3: //乗算
		    for (var i = 0 ; i < elements.length ; i++ ){
				effective = effective * target.elementRate(elements[i]);
    		};
		    
		    break;
		  default: //デフォルト設定値なら元の関数を返す。
		    effective = _Row_Game_Action_elementsMaxRate.call(this, target, elements);
		    break;
		}
		
		console.log("effective="+effective);
		return effective;
        
    } else {
        return 1;
    }
};
