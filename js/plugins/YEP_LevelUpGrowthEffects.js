//=============================================================================
// Yanfly Engine Plugins - Level Up Growth Effects
// YEP_LevelUpGrowthEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_LevelUpGrowthEffects = true;

var Yanfly = Yanfly || {};
Yanfly.LvGrEf = Yanfly.LvGrEf || {};
Yanfly.LvGrEf.version = 1.00;

/*:ja
 * @plugindesc v1.01 レベルアップ時に追加効果を設定できます。
 * @author Yanfly Engine Plugins
 *
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * ===========================================================================
 * 導入
 * ===========================================================================
 *
 * このプラグインを使用すると、レベルアップ時に変化する
 * アクター、装備、職業、スキル、アイテムを作成できます。
 * 成長オプションには、基本パラメーターの増加、新しいスキルの習得、
 * スイッチのオン/オフ、完全回復、JavaScriptコードの実行等
 * あらゆる種類のカスタム効果が含まれます。
 *
 * ===========================================================================
 * メモタグ
 * ===========================================================================
 *
 * 次のメモタグを各データベースのメモ欄に挿入して、
 * レベルアップ成長効果を設定します。
 *
 * アクター、職業、スキル、武器、防具、ステートのメモタグ
 *
 *   <Level Up stat Growth: +x>
 *   <Level Up stat Growth: -x>
 *   レベルアップすると、これは特定の'stat'をx値だけ上げたり下げたりします。
 *   - 'stat'を'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *   に置き換えます
 *   - 'x' を成長量の数値に置き換えます。
 *
 *   <Level Up Learn Skill: x>
 *   レベルアップすると、アクターのスキルxを習得します。
 *   - 'x'をアクターが習得するスキルのIDに置き換えます。
 *
 *   <Level Up Switch On: x>
 *   <Level Up Switch On: x, x, x>
 *   <Level Up Switch On: x to y>
 *   <Level Up Switch Off: x>
 *   <Level Up Switch Off: x, x, x>
 *   <Level Up Switch Off: x to y>
 *   レベルアップすると、スイッチxがオン/オフになります。
 *   - 'x' をオン/オフするスイッチのIDと置き換えます。
 *   - 'x to y'を使用する場合、'x'を開始IDに、'y'を終了IDに設定します。
 *   - メモタグ複数を挿入して、複数のスイッチに影響を与えます。
 *
 *   <Level Up Recover All>
 *   レベルアップすると、全回復効果がアクターに対して実行されます。
 *   ※能力値を上げるタグを入れた場合、その下側に入れなければ反映されません。
 *
 * ===========================================================================
 * ルナティックモード
 * ===========================================================================
 *
 * JavaScriptと以下のメモタグを使用して、
 * レベルアップ時にカスタム効果を発生させることができます。
 *
 * アクター、職業、スキル、武器、防具、ステートのメモタグ
 *
 *   <Custom Level Up Effect>
 *    code
 *    code
 *   </Custom Level Up Effect>
 *   - 'code'をメモタグ内で実行するコードに置き換えます。
 *
 *   --- 例 ---
 *
 *   <Custom Level Up Effect>
 *    var heal = actor.mdf;
 *    actor.gainHp(heal);
 *   </Custom Level Up Effect>
 *   - レベルアップすると、アクターはHPを回復し、
 *     アクターの現在のMDFパラメーターと等しくなります。
 *
 *   --- 例 ---
 *
 *   <Custom Level Up Effect>
 *    if (actor.level >= 50) {
 *      var keepExp = true;
 *      actor.changeClass(5, keepExp);
 *    }
 *   </Custom Level Up Effect>
 *   - アクターのレベルがレベル50を超えている場合、
 *     アクターの職業IDを5に変更します。
 *
 *   --- 例 ---
 *
 *   <Custom Level Up Effect>
 *    if (actor.level >= 25) {
 *      // Change sprite
 *      var characterName = 'Actor1';
 *      var characterIndex = 0;
 *      actor.setCharacterImage(characterName, characterIndex);
 *      // Change Face
 *      var faceName = 'Actor1';
 *      var faceIndex = 0;
 *      actor.setFaceImage(faceName, faceIndex);
 *      // Change SV Battler
 *      var battlerName = 'Actor1_1';
 *      actor.setBattlerImage(battlerName);
 *      // Refresh Actor
 *      actor.refresh();
 *    }
 *   </Custom Level Up Effect>
 *   - アクターのレベルがレベル25を超えた場合、
 *     アクターの歩行キャラ、顔、[SV]戦闘キャラが別のものに変わります。
 *
 * ===========================================================================
 * Changelog
 * ===========================================================================
 *
 * Version 1.01:
 * - Bugfix made by Arisu's Dollhouse.
 * - Fixed the Level Up Switch On/Off notetags.
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ===========================================================================
 * End of Helpfile
 * ===========================================================================
 *
 */


//=============================================================================
 /*:
 * @plugindesc v1.00 Equip an item that upon leveling up will raise stats?
 * This plugin will let you do just that!
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin lets you create items that allow actor growth upon leveling up
 * due to the actor, the equipment worn, class, learned skills, or any states
 * applied to the actor upon leveling up. Growth options include increasing
 * basic parameters, learning new skills, turning switches on/off, full
 * recovery, and for those experienced with JavaScript, any kind of custom
 * effect that can be done using code.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Insert the following notetags into the respective database object noteboxes
 * to acquire their Level Up Growth Effects.
 *
 * Actor, Class, Skill, Weapon, Armor, State Notetags:
 *
 *   <Level Up stat Growth: +x>
 *   <Level Up stat Growth: -x>
 *   Upon leveling up, this will raise/reduce a particular 'stat' by x value.
 *   - Replace 'stat' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to alter that specific stat.
 *   - Replace 'x' with a numeric value indicating how much growth to apply.
 * 
 *   <Level Up Learn Skill: x>
 *   Upon leveling up, this will teach the actor skill x.
 *   - Replace 'x' with the ID of the skill you wish to teach the actor.
 *
 *   <Level Up Switch On: x>
 *   <Level Up Switch On: x, x, x>
 *   <Level Up Switch On: x to y>
 *   <Level Up Switch Off: x>
 *   <Level Up Switch Off: x, x, x>
 *   <Level Up Switch Off: x to y>
 *   Upon leveling up, this will cause switch(es) x to turn on or off.
 *   - Replace 'x' with the ID of the switch(es) to turn on/off.
 *   - If using 'x to y', set 'x' to the starting ID and 'y' to the ending ID.
 *   - Insert multiples of this notetag to affect multiple switches.
 *
 *   <Level Up Recover All>
 *   Upon leveling up, this will cause the Recover All effect to trigger for
 *   the actor.
 *
 * ===========================================================================
 * Lunatic Mode
 * ===========================================================================
 *
 * For those with JavaScript experience, you can make custom effects occur upon
 * leveling up as well using these notetags:
 *
 * Actor, Class, Skill, Weapon, Armor, State Notetags:
 *
 *   <Custom Level Up Effect>
 *    code
 *    code
 *   </Custom Level Up Effect>
 *   - Replace 'code' with the code you wish to run inside the notetags.
 *
 *   --- Example ---
 *
 *   <Custom Level Up Effect>
 *    var heal = actor.mdf;
 *    actor.gainHp(heal);
 *   </Custom Level Up Effect>
 *   - Upon leveling up, this will make the actor heal HP equal to the actor's
 *   current MDF parameter.
 *
 *   --- Example ---
 *
 *   <Custom Level Up Effect>
 *    if (actor.level >= 50) {
 *      var keepExp = true;
 *      actor.changeClass(5, keepExp);
 *    }
 *   </Custom Level Up Effect>
 *   - If actor's level has exceeded level 50, then the actor will class change
 *   into class ID 5.
 *
 *   --- Example ---
 *
 *   <Custom Level Up Effect>
 *    if (actor.level >= 25) {
 *      // Change sprite
 *      var characterName = 'Actor1';
 *      var characterIndex = 0;
 *      actor.setCharacterImage(characterName, characterIndex);
 *      // Change Face
 *      var faceName = 'Actor1';
 *      var faceIndex = 0;
 *      actor.setFaceImage(faceName, faceIndex);
 *      // Change SV Battler
 *      var battlerName = 'Actor1_1';
 *      actor.setBattlerImage(battlerName);
 *      // Refresh Actor
 *      actor.refresh();
 *    }
 *   </Custom Level Up Effect>
 *   - If actor's level has exceeded level 25, then the actor's map sprite,
 *   face graphic, and sideview battler will change into something else.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 */
//=============================================================================

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.LvGrEf.Game_Actor_changeClass = Game_Actor.prototype.changeClass;
Game_Actor.prototype.changeClass = function(classId, keepExp) {
  this._preventLevelUpGrowth = true;
  Yanfly.LvGrEf.Game_Actor_changeClass.call(this, classId, keepExp);
  this._preventLevelUpGrowth = false;
};

Yanfly.LvGrEf.Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
  Yanfly.LvGrEf.Game_Actor_levelUp.call(this);
  if (this._preventLevelUpGrowth) return;
  this.performLevelUpGrowth();
};

Game_Actor.prototype.performLevelUpGrowth = function() {
  var objects = [this.actor(), this.currentClass()];
  var equips = this.equips();
  var length = equips.length;
  for (var i = 0; i < length; ++i) {
    var equip = equips[i];
    if (!equip) continue;
    objects.push(equip);
  }
  var states = this.states();
  var length = states.length;
  for (var i = 0; i < length; ++i) {
    var state = states[i];
    if (!state) continue;
    objects.push(state);
  }
  var skills = this.skills();
  var length = skills.length;
  for (var i = 0; i < length; ++i) {
    var skill = skills[i];
    if (!skill) continue;
    objects.push(skill);
  }
  var length = objects.length;
  for (var i = 0; i < length; ++i) {
    var object = objects[i];
    if (!object) continue;
    this.performLevelUpGrowthFromObject(object);
  }
};

Game_Actor.prototype.performLevelUpGrowthFromObject = function(object) {
  var notedata = object.note.split(/[\r\n]+/);
  var code = '';
  var evalMode = 'none';
  for (var i = 0; i < notedata.length; ++i) {
    var line = notedata[i];
    // Level Up Stat Growth
    if (line.match(/<Level Up (.*) Growth:[ ](.*)>/i)) {
      var param = String(RegExp.$1).toUpperCase().trim();
      var value = Number(RegExp.$2);
      if (['MAXHP','HP','MHP'].contains(param)) {
        var paramId = 0;
      } else if (['MAXMP','MP','MMP'].contains(param)) {
        var paramId = 1;
      } else if (['ATTACK','ATK'].contains(param)) {
        var paramId = 2;
      } else if (['DEFENSE','DEF'].contains(param)) {
        var paramId = 3;
      } else if (['MAGIC ATTACK','MAT','INT'].contains(param)) {
        var paramId = 4;
      } else if (['MAGIC DEFENSE','MDF','RES'].contains(param)) {
        var paramId = 5;
      } else if (['AGILITY','AGI','SPD'].contains(param)) {
        var paramId = 6;
      } else if (['LUCK','LUK'].contains(param)) {
        var paramId = 7;
      } else {
        continue;
      }
      this.addParam(paramId, value);

    // Learn Skill
    } else if (line.match(/<Level Up Learn Skill:[ ](.*)>/i)) {
      var skillId = Number(RegExp.$1);
      this.learnSkill(skillId);

    // Switch On
    } else if (line.match(/<Level Up Switch On:[ ]*(\d+(?:\s*,\s*\d+)*>/i)) {
      var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      for (var a = 0; a < array.length; ++a) {
        $gameSwitches.setValue(Number(a), true);
      }
    } else if (line.match(/<Level Up Switch On:[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i)) {
      var array = Yanfly.Util.getRange(Number(RegExp.$1), Number(RegExp.$2));
      for (var a = 0; a < array.length; ++a) {
        $gameSwitches.setValue(Number(a), true);
      }

    // Switch Off
    } else if (line.match(/<Level Up Switch Off:[ ]*(\d+(?:\s*,\s*\d+)*>/i)) {
      var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      for (var a = 0; a < array.length; ++a) {
        $gameSwitches.setValue(Number(a), false);
      }
    } else if (line.match(/<Level Up Switch Off:[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i)) {
      var array = Yanfly.Util.getRange(Number(RegExp.$1), Number(RegExp.$2));
      for (var a = 0; a < array.length; ++a) {
        $gameSwitches.setValue(Number(a), false);
      }

    // Recover All
    } else if (line.match(/<Level Up Recover All>/i)) {
      this.recoverAll();

    // Custom Effect
    } else if (line.match(/<Custom Level Up Effect>/i)) {
      evalMode = 'Custom Level Up Effect';
    } else if (line.match(/<\/Custom Level Up Effect>/i)) {
      evalMode = 'none';
    } else if (evalMode === 'Custom Level Up Effect') {
      code += line + '\n';

    }
  }

  // If custom effect
  if (code !== '') {
    var item = object;
    var actor = this;
    var user = this;
    var subject = this;
    var target = this;
    var a = this;
    var b = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(code);
  }
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.getRange = function(n, m) {
  var result = [];
  for (var i = n; i <= m; ++i) result.push(i);
  return result;
};

//=============================================================================
// End of File
//=============================================================================