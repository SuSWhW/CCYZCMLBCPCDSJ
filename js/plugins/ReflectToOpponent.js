//=============================================================================
// Plugin for RPG Maker MV and MZ
// ReflectToOpponent.js Ver1.1.0
//=============================================================================
// [Update History]
// 2021.Jan.27 Ver1.0.0 First Release
// 2021.Jan.28 Ver1.1.0 Display Animation Also One Sufferd By Magic Reflection

/*:
 * @target MV MZ
 * @plugindesc [Ver1.1.0]Magic Reflection's Target Become Always Opponent
 * @author Sasuke KANNAZUKI
 *
 * [Summary]
 * This plugin runs under RPG Maker MV and MZ.
 * This plugin change the specification of magic refrection.
 *
 * At default, when one uses skill to an ally with magic refrection,
 * the magic reflects to the one who use the skill.
 * By introducing this plugin, skill to ally with magic refrection become
 * always one of opponent unit.
 * (Note:This specification adopts Final Fantasy series)
 *
 * [Important Note]
 * Be sure to the skill's Hit Type be Magical Attack.
 * If its Hit Type is Certain Hit, it doesn't work.
 * 
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @target MV MZ
 * @plugindesc [Ver1.1.0]魔法反射の標的を常に敵側にします。
 * @author 神無月サスケ
 *
 * @help
 * このプラグインは、RPGツクールMVおよびMZに対応しています。
 * このプラグインは、魔法反射の仕様を変更します。
 *
 * ■概要
 * 通常、対象のアクターが味方のユニットの場合、
 * その魔法を使ったアクターに魔法を反射します。
 * このプラグインは、対象が味方の場合、敵の方に反射するようにします。
 * (この仕様は、Final Fantasy シリーズが採用しています）
 *
 * 注意：敵に反射させたいスキルの命中タイプは「魔法攻撃」にして下さい。
 * 「必中」の場合、反射しません。
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(function() {

  var _Game_Temp_initialize =  Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function() {
    this.reflectionTarget = null;
    _Game_Temp_initialize.call(this);
  }


  var _BattleManager_invokeMagicReflection =
    BattleManager.invokeMagicReflection;
  BattleManager.invokeMagicReflection = function(subject, target) {
    if (target.isActor() === subject.isActor()) {
      subject = target.opponentsUnit().randomTarget();
      $gameTemp.reflectionTarget = subject;
    }
    _BattleManager_invokeMagicReflection.call(this, subject, target);
  };

  //
  // Display Animation Also One Sufferd From Magic Reflection
  //
  const _Window_BattleLog_displayReflection =
    Window_BattleLog.prototype.displayReflection;
  Window_BattleLog.prototype.displayReflection = function(target) {
    _Window_BattleLog_displayReflection.call(this, target);
    var animationId = BattleManager._action.item().animationId;
    if ($gameTemp.reflectionTarget) {
      this.showNormalAnimation([$gameTemp.reflectionTarget], animationId);
      $gameTemp.reflectionTarget = null;
    } else {
      this.showNormalAnimation([BattleManager._subject], animationId);
    }
  };
})();
