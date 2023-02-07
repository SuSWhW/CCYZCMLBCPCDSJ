// --------------------------------------------------------------------------
// 
// CriticalAnimation
// 
// Copyright (c) kotonoha*
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// 
// 2016/03/10 ver1.0 プラグイン公開
// 
// --------------------------------------------------------------------------
/*:
 * @plugindesc クリティカルヒット時にアニメーションを流すプラグイン
 * @author kotonoha* (http://ktnh5108.pw/)
 *
 * @help
 * クリティカルヒット時に、アニメーションを流す演出を加えたり、
 * フラッシュを消します。
 * 
 * @param AnimationID
 * @desc クリティカルヒット時に流すアニメーションのIDです。
 * @default 0
 * 
 * @param FlashEffect
 * @desc 画面をフラッシュさせるかどうか(1:させる,0:させない)
 * @default 1
 * 
*/

(function() {

    var parameters = PluginManager.parameters('CriticalAnimation');
	var AnimationID = Number(parameters['AnimationID']);
	var FlashEffect = Number(parameters['FlashEffect']);
	
	Sprite_Damage.prototype.setup = function(target) {
    	var result = target.result();
		if (result.missed || result.evaded) {
			this.createMiss();
		} else if (result.hpAffected) {
			this.createDigits(0, result.hpDamage);
		} else if (target.isAlive() && result.mpDamage !== 0) {
			this.createDigits(2, result.mpDamage);
    	}
    	if (result.critical) {
    		if (AnimationID != 0) {
				target.startAnimation(AnimationID, false, 0);
			}
			if (FlashEffect != 0) {
        		this.setupCriticalEffect();
   	 		}
   	 	}
	};

})();