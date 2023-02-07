//=============================================================================
// ReflectAway.js
//=============================================================================

/*:ja
 * @plugindesc ver1.00 って、どこいくねーん！？
 * @author まっつＵＰ
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * バトラー対象の魔法を反射した時、ターゲットを味方ユニットの
 * バトラーからランダム選択にします。
 * 
 * このプラグインを利用する場合は
 * readmeなどに「まっつＵＰ」の名を入れてください。
 * また、素材のみの販売はダメです。
 * 上記以外の規約等はございません。
 * もちろんツクールMVで使用する前提です。
 * 何か不具合ありましたら気軽にどうぞ。
 *  
 * 免責事項：
 * このプラグインを利用したことによるいかなる損害も制作者は一切の責任を負いません。
 * 
 */

(function() {
    
//var parameters = PluginManager.parameters('ReflectAway');

var _BattleManager_invokeMagicReflection = BattleManager.invokeMagicReflection;
BattleManager.invokeMagicReflection = function(subject, target) {
    var sub2 = this._action.reflectionRandomTarget();
    if(sub2) subject = sub2;
	_BattleManager_invokeMagicReflection.call(this, subject, target);
};

Game_Action.prototype.reflectionRandomTarget = function() {
    var target;
    if(this.isForDeadFriend()){
        target = this.friendsUnit().randomDeadTarget();
    }else{
        target = this.friendsUnit().randomTarget();
    }
    return target; 
};

})();
