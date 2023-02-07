//=============================================================================
// Yanfly Engine Plugins - Target Core
// YEP_TargetCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_TargetCore = true;

var Yanfly = Yanfly || {};
Yanfly.Target = Yanfly.Target || {};
Yanfly.Target.version = 1.05;

/*:ja
 * @plugindesc v1.05 対象選択を拡張します。
 * @author Yanfly Engine Plugins
 *
 * @param ---バトル・エンジン---
 * @default
 *
 * @param Everybody Text
 * @text 全体のテキスト
 * @parent ---バトル・エンジン---
 * @desc 全体対象のヘルプテキスト
 * @default 全ての味方と敵
 *
 * @param All But User Text
 * @text 使用者以外の全体テキスト
 * @parent ---バトル・エンジン---
 * @desc 使用者以外の全体対象のヘルプテキスト
 * %1:味方 / %2:使用者
 * @default 全ての %1 , %2 以外
 *
 * @param Random Any Text
 * @text 無作為ランダムのテキスト
 * @parent ---バトル・エンジン---
 * @desc 無作為ランダム対象に使用されるヘルプテキスト
 * %1:数
 * @default ランダム %1 体
 *
 * @param ---複数対象---
 * @default
 *
 * @param Multiple Text
 * @text 倍数能力のテキスト
 * @parent ---複数対象---
 * @desc xの倍数能力を対象に使用されるヘルプテキスト
 * %1:対象   %2:能力   %3:値
 * @default %3 の倍数の %2 がいる %1
 *
 * @param Multiple Everybody
 * @text 全対象のテキスト
 * @parent ---複数対象---
 * @desc 全対象に使用されるヘルプテキスト
 * @default 全対象
 *
 * @param Multiple Allies
 * @text 複数味方のテキスト
 * @parent ---複数対象---
 * @desc 複数の味方に使用されるヘルプテキスト
 * @default 味方数体
 *
 * @param Multiple Foes
 * @text 複数敵のテキスト
 * @parent ---複数対象---
 * @desc 複数の敵に使用されるヘルプテキスト
 * @default 敵数体
 *
 * @param ---隊列---
 * @default
 *
 * @param Target Row Text
 * @text 列対象のテキスト
 * @parent ---隊列---
 * @desc 列対象に使用されるヘルプテキスト
 * %1:対象名
 * @default %1 の列
 *
 * @param Front Row Text
 * @text 最前列対象のテキスト
 * @parent ---隊列---
 * @desc 最前列対象に使用されるヘルプテキスト
 * %1:対象型
 * @default %1 最前列
 *
 * @param Back Row Text
 * @text 最後列対象のテキスト
 * @parent ---隊列---
 * @desc 最後列対象に使用されるヘルプテキスト
 * %1:対象型
 * @default %1 最後列
 *
 * @param Specific Row Text
 * @text 特定の列対象のテキスト
 * @parent ---隊列---
 * @desc 特定の列対象に使用されるヘルプテキスト
 * %1:対象型
 * @default %1 特定列
 *
 * @param Row Enemies
 * @text 敵列対象のテキスト
 * @parent ---隊列---
 * @desc 敵の列対象に使用されるヘルプテキスト
 * @default 敵
 *
 * @param Row Allies
 * @text 味方列対象のテキスト
 * @parent ---隊列---
 * @desc 味方の列対象に使用されるヘルプテキスト
 * @default 味方
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
 * このプラグインは YEP_BattleEngineCore とは独立して機能しますが、
 * 特別な効果を利用したい場合、
 * このプラグインをプラグイン管理で YEP_BattleEngineCore の下に配置します。
 *
 * YEP_TargetCore プラグインはRPGツクールMV既存の対象範囲を
 * 拡張するように作られています。
 * このプラグインを使用すると、より多くの対象範囲を使用できます。
 * YEP_RowFormation プラグインと組み合わせると、
 * 攻撃者や敵を対象にする方法は多種多様になります。
 *
 * ===========================================================================
 * メモタグ
 * ===========================================================================
 *
 * スキルやアイテムにカスタムの対象範囲を利用したい場合、
 * 次のメモタグを使用できます。
 *
 * スキル、アイテムのメモタグ:
 *
 *   <Repeat: x>
 *   各対象でアクションが繰り返し使用される回数を決定します。
 *   デフォルトのエディタの制限である9を超えることが出来ます。
 *
 *   <Target: Everybody>
 *   全ての生存敵と味方メンバーを対象にし、使用者が最後の対象になります。
 *
 *   <Target: x Random Any>
 *   x 体のランダムな生存敵や味方メンバーを対象にします。
 *
 *   <Target: Target All Foes>
 *   1体の敵を対象とし、その後全ての生存敵を対象にします。
 *
 *   <Target: Target x Random Foes>
 *   1体の敵を対象とし、その後x体のランダムな生存敵を対象にします。
 *
 *   <Target: x Random Foes>
 *   x 体のランダムな生存敵を対象にします。
 *   エディタのデフォルトのランダム4体を超える可能性があります。
 *
 *   <Target: All Allies But User>
 *   使用者以外の全ての生存味方メンバーを対象にします。
 *
 *   <Target: Target All Allies>
 *   1体の味方を対象にして、
 *   全ての生存味方メンバーを対象にします。
 *
 *   <Target: Target x Random Allies>
 *   1体の味方を対象にして、
 *   その後ランダムに生存味方 x 体を対象にします。
 *
 *   <Target: x Random Allies>
 *   ランダムに生存味方メンバー x 体を対象にします。
 *
 *   <Target: Everybody param Multiple Of x>
 *   'param'を'level'、'maxhp'、'maxmp'、'atk'、'mat'、'mdf'、'agi'、'luk'、
 *   'hp'、'mp'、'tp'のいずれかに置き換えます。
 *   スキルやアイテムは、パラメーター値が x の倍数である
 *   生存バトラーを無差別に対象にさせます。
 *   *注: 'level'を使用している場合は、
 *   YEP_EnemyLevels があることを確認してください。
 *
 *   <Target: Allies param Multiple Of x>
 *   'param'を'level'、'maxhp'、'maxmp'、'atk'、'mat'、'mdf'、'agi'、'luk'、
 *   'hp'、'mp'、'tp'のいずれかに置き換えます。
 *   スキルまたはアイテムは、そのパラメーター値がxの倍数である
 *   全ての味方メンバーを対象とします。
 *   *注: 'level'を使用している場合は、
 *   YEP_EnemyLevels があることを確認してください。
 *
 *   <Target: Foes param Multiple Of x>
 *   'param'を'level'、'maxhp'、'maxmp'、'atk'、'mat'、'mdf'、'agi'、'luk'、
 *   'hp'、'mp'、'tp'のいずれかに置き換えます。
 *   スキルやアイテムはパラメータ値がxの倍数である敵を対象とします。
 *   *注: 'level'を使用している場合は、
 *   YEP_EnemyLevels があることを確認してください。
 *
 *   --- YEP_RowFormation と YEP_BattleEngineCore が必要 ---
 *
 *   <Target: Enemy Row>
 *   選択されている対象敵と同じ敵列を対象にします。
 *   列全体が選択されます。
 *
 *   <Target: Enemy Row x>
 *   特に敵ユニットの敵の列 x を対象にします。
 *   列全体が選択されます。
 *
 *   <Target: Front Enemy Row>
 *   生存メンバーがいる最前の敵の列を対象にします。
 *   生存メンバーのいない列がある場合、
 *   生存メンバーがいる次の列を対象にします。
 *
 *   <Target: Back Enemy Row>
 *   生存メンバーがいる最後の敵の列を対象にします。
 *   生存メンバーのいない列がある場合、
 *   生存メンバーがいる次の列を対象にします。
 *
 *   <Target: Ally Row>
 *   選択されている対象敵と同じ敵列を対象にします。
 *   列全体が選択されます。
 *
 *   <Target: Ally Row x>
 *   特に味方ユニットの隊列 x を対象とします。
 *   列全体が選択されます。
 *
 *   <Target: Front Ally Row>
 *   生存メンバーがいる最前面の味方の列を対象にします。
 *   生存メンバーのいない列がある場合、
 *   生存メンバーがいる次の列を対象にします。
 *
 *   <Target: Back Ally Row>
 *   生存メンバーがいる最後の味方の列を対象にします。
 *   生存メンバーのいない列がある場合、
 *   生存メンバーがいる次の列を対象にします。
 *
 * ===========================================================================
 * ルナティックモード - カスタム対象ヘルプテキスト
 * ===========================================================================
 *
 * YEP_BattleEngineCore を併用するなら、下記のメモタグとJavaScriptを使って、
 * カスタムヘルプウィンドウを表示できます。
 *
 * スキル、アイテムのメモタグ:
 *
 *   <Custom Target Text>
 *    text = $gameActors.actor(1).name();
 *    text += ' and ' + $gameActors.actor(2).name();
 *   </Custom Target Text>
 *   'text'変数はヘルプウィンドウに表示されるテキストです。
 *   それに対して行われたどんな変更も表示されます。
 *
 * ===========================================================================
 * ルナティックモード - カスタム対象 Eval
 * ===========================================================================
 *
 * 下記のメモタグとJavaScriptを使って、カスタム対象選択をすることができます。
 * 対象選択の場面で、スキル/アイテムの現在の範囲を参照し、
 * 対象は範囲とは無関係に作られます。
 * 対象が選択された場合、それは'targets'値になります。
 *
 *   <Custom Target Eval>
 *   for (var i = 0; i < foes.aliveMembers().length; ++i) {
 *     var member = foes.aliveMembers()[i];
 *     if (member.level % 3 === 0) targets.push(member);
 *   }
 *   </Custom Target Eval>
 *   'targets'変数は、選択中に使用される対象を決定する配列です。
 *   目的の対象を'targets'配列に Push します。
 *
 * ===========================================================================
 * Changelog
 * ===========================================================================
 *
 * Version 1.05:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.04:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.03:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.02a:
 * - <Target: Everybody> will now have allies highlighted as well.
 * - <Target: Enemy Row> and <Target: Ally Row> will no longer highlight edead
 * enemies causing them to reappear.
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */

//=============================================================================
 /*:
 * @plugindesc v1.05 Expand the target scope from RPG Maker's default
 * limitations for better target control.
 * @author Yanfly Engine Plugins
 *
 * @param ---Battle Engine---
 * @default
 *
 * @param Everybody Text
 * @parent ---Battle Engine---
 * @desc The help text for Everybody scope.
 * @default All Allies and Enemies
 *
 * @param All But User Text
 * @parent ---Battle Engine---
 * @desc The help text for all All But User scope.
 * %1 - Allies     %2 - User
 * @default All %1 But %2
 *
 * @param Random Any Text
 * @parent ---Battle Engine---
 * @desc The help text used for the Random Any scope.
 * %1 - Number
 * @default %1 Random
 *
 * @param ---Multiple Of---
 * @default
 *
 * @param Multiple Text
 * @parent ---Multiple Of---
 * @desc The help text used for Multiple of x scope.
 * %1 - Targets   %2 - Parameters   %3 - Number
 * @default %1 with %2 as a Multiple of %3
 *
 * @param Multiple Everybody
 * @parent ---Multiple Of---
 * @desc The text to use for Everybody in this format.
 * @default Anyone
 *
 * @param Multiple Allies
 * @parent ---Multiple Of---
 * @desc The text to use for Allies in this format.
 * @default Any Ally
 *
 * @param Multiple Foes
 * @parent ---Multiple Of---
 * @desc The text to use for Foes in this format.
 * @default Any Foe
 *
 * @param ---Row Formation---
 * @default
 *
 * @param Target Row Text
 * @parent ---Row Formation---
 * @desc The help text used to target the target's row.
 * %1 - Target Name
 * @default %1's Row
 *
 * @param Front Row Text
 * @parent ---Row Formation---
 * @desc The help text used to target the front row.
 * %1 - Target Type
 * @default %1 Front Row
 *
 * @param Back Row Text
 * @parent ---Row Formation---
 * @desc The help text used to target the back row.
 * %1 - Target Type
 * @default %1 Back Row
 *
 * @param Specific Row Text
 * @parent ---Row Formation---
 * @desc The help text used to target specific rows.
 * %1 - Target Type
 * @default Specific %1 Row
 *
 * @param Row Enemies
 * @parent ---Row Formation---
 * @desc The help text used for enemies for Row Targets.
 * @default Enemy
 *
 * @param Row Allies
 * @parent ---Row Formation---
 * @desc The help text used for enemies for Row Targets.
 * @default Allied
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * While this plugin works independent of YEP_BattleEngineCore.js, if you want
 * to utilize extra effects, place this plugin beneath YEP_BattleEngineCore.js
 * in the Plugin Manager list.
 *
 * The Target Core plugin is made to expand upon the existing target scopes
 * provided by RPG Maker MV. This plugin enables you to use more target scopes,
 * with a larger variety of ways to target actors and enemies with bonus ways
 * to choose targets combined with the Row Formation plugin.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * If you would like to utilize custom target scopes for your skills and items,
 * you can use these notetags:
 *
 * Skill and Item Notetags:
 *
 *   <Repeat: x>
 *   This determines the number of times an action is repeatedly used on each
 *   target. This can go beyond the default editor's limit of 9.
 *
 *   <Target: Everybody>
 *   This targets all alive opponent and friendly members with the user being
 *   the very last target.
 *
 *   <Target: x Random Any>
 *   This adds x random alive opponents and/or allies.
 *
 *   <Target: Target All Foes>
 *   This targets a single foe and then adds all alive opponent members.
 *
 *   <Target: Target x Random Foes>
 *   This targets a single foe and then adds x random alive opponent members.
 *
 *   <Target: x Random Foes>
 *   This adds x random alive opponent members. This can go beyond the editor's
 *   default limit of 4 randomf oes.
 *
 *   <Target: All Allies But User>
 *   This will target all friendly alive members except for the user.
 *
 *   <Target: Target All Allies>
 *   This will target a single ally and then adds all alive friendly members.
 *
 *   <Target: Target x Random Allies>
 *   This will target a single ally and then adds x random alive allies.
 *
 *   <Target: x Random Allies>
 *   This adds x random alive allied members.
 *
 *   <Target: Everybody param Multiple Of x>
 *   Replace 'param' with 'level', 'maxhp', 'maxmp', 'atk', 'def', 'mat',
 *   'mdf', 'agi', 'luk', 'hp', 'mp', or 'tp'. This will make the skill or item
 *   indiscriminately target any living battler on the battlefield whose
 *   parameter value is a multiple of x.
 *   *NOTE: If you are using 'level', make sure you have YEP_EnemyLevels.js.
 *
 *   <Target: Allies param Multiple Of x>
 *   Replace 'param' with 'level', 'maxhp', 'maxmp', 'atk', 'def', 'mat',
 *   'mdf', 'agi', 'luk', 'hp', 'mp', or 'tp'. This will make the skill or item
 *   target any living allied party member on the battlefield whose parameter
 *   value is a multiple of x.
 *   *NOTE: If you are using 'level', make sure you have YEP_EnemyLevels.js.
 *
 *   <Target: Foes param Multiple Of x>
 *   Replace 'param' with 'level', 'maxhp', 'maxmp', 'atk', 'def', 'mat',
 *   'mdf', 'agi', 'luk', 'hp', 'mp', or 'tp'. This will make the skill or item
 *   target any living enemy battler on the battlefield whose parameter value
 *   is a multiple of x.
 *   *NOTE: If you are using 'level', make sure you have YEP_EnemyLevels.js.
 *
 *   --- YEP_RowFormation.js and YEP_BattleEngineCore.js Required ---
 *
 *   <Target: Enemy Row>
 *   This will target the enemy row equal to that of the currently selected
 *   target enemy. The entire row will be selected as a whole.
 *
 *   <Target: Enemy Row x>
 *   This will target specifically the enemy row x for the enemy unit. The
 *   entire row will be selected as a whole.
 *
 *   <Target: Front Enemy Row>
 *   This will target the front-most enemy row with alive members. If there is
 *   a row without any alive members, this will target the next row with an
 *   alive member.
 *
 *   <Target: Back Enemy Row>
 *   This will target the back-most enemy row with alive members. If there is
 *   a row without any alive members, this will target the next row with an
 *   alive member.
 *
 *   <Target: Ally Row>
 *   This will target the enemy row equal to that of the currently selected
 *   target enemy. The entire row will be selected as a whole.
 *
 *   <Target: Ally Row x>
 *   This will target specifically the allied row x for the allied unit. The
 *   entire row will be selected as a whole.
 *
 *   <Target: Front Ally Row>
 *   This will target the front-most ally row with alive members. If there is
 *   a row without any alive members, this will target the next row with an
 *   alive member.
 *
 *   <Target: Back Ally Row>
 *   This will target the back-most ally row with alive members. If there is
 *   a row without any alive members, this will target the next row with an
 *   alive member.
 *
 * ============================================================================
 * Lunatic Mode - Custom Target Help Text
 * ============================================================================
 *
 * For users that are proficient with JavaScript, these notetags can be used to
 * provide custom help window text if you are also the Battle Engine Core.
 *
 * Skill and Item Notetags:
 *
 *   <Custom Target Text>
 *    text = $gameActors.actor(1).name();
 *    text += ' and ' + $gameActors.actor(2).name();
 *   </Custom Target Text>
 *   The 'text' variable is the text that will appear in the help window. Any
 *   changes made to it will be what is visibly displayed.
 *
 * ============================================================================
 * Lunatic Mode - Custom Target Eval
 * ============================================================================
 *
 * For users that are proficient with JavaScript, these notetags can be used to
 * make custom target selections. For the targeting aspect, this will refer to
 * the skill/item's current scope and the targets made here will be made
 * independent of the scope with the exception of the target, where if a target
 * is selected, it will become the 'target' value.
 *
 *   <Custom Target Eval>
 *   for (var i = 0; i < foes.aliveMembers().length; ++i) {
 *     var member = foes.aliveMembers()[i];
 *     if (member.level % 3 === 0) targets.push(member);
 *   }
 *   </Custom Target Eval>
 *   The 'targets' variable is an array that determines which are the targets
 *   to be used during the selection process. Push the desired targets into
 *   the 'targets' array.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.05:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.04:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.03:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.02a:
 * - <Target: Everybody> will now have allies highlighted as well.
 * - <Target: Enemy Row> and <Target: Ally Row> will no longer highlight edead
 * enemies causing them to reappear.
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_TargetCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.BECHlpEverybodyTx = String(Yanfly.Parameters['Everybody Text']);
Yanfly.Param.BECHlpAllBTx = String(Yanfly.Parameters['All But User Text']);
Yanfly.Param.BECHlpRandomAnyTx = String(Yanfly.Parameters['Random Any Text']);

Yanfly.Param.TargetMultipleTx = String(Yanfly.Parameters['Multiple Text']);
Yanfly.Param.TargetMultiEvery = String(Yanfly.Parameters['Multiple Everybody']);
Yanfly.Param.TargetMultiAllies = String(Yanfly.Parameters['Multiple Allies']);
Yanfly.Param.TargetMultiFoes = String(Yanfly.Parameters['Multiple Foes']);

Yanfly.Param.TargetHlpRowTx = String(Yanfly.Parameters['Target Row Text']);
Yanfly.Param.TargetFrontRow = String(Yanfly.Parameters['Front Row Text']);
Yanfly.Param.TargetBackRow = String(Yanfly.Parameters['Back Row Text']);
Yanfly.Param.TargetSpcRow = String(Yanfly.Parameters['Specific Row Text']);
Yanfly.Param.TargetRowEnemies = String(Yanfly.Parameters['Row Enemies']);
Yanfly.Param.TargetRowAllies = String(Yanfly.Parameters['Row Allies']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Target.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Target.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Imported.YEP_BattleEngineCore) {
    this.processTargetNotetags1($dataSkills);
    this.processTargetNotetags1($dataItems);
  }
  return true;
};

if (Imported.YEP_BattleEngineCore) {

Yanfly.Target.DataManager_processMELODYNotetags =
    DataManager.processMELODYNotetags;
DataManager.processMELODYNotetags = function(group) {
    this.processTargetNotetags1(group);
    Yanfly.Target.DataManager_processMELODYNotetags.call(this, group);
};

Yanfly.Target.DataManager_addActionEffects = DataManager.addActionEffects;
DataManager.addActionEffects = function(obj, array) {
  this.processTargetRepeatNotetags(obj);
  Yanfly.Target.DataManager_addActionEffects.call(this, obj, array);
};

Yanfly.Target.DataManager_isWholeAction = DataManager.isWholeAction;
DataManager.isWholeAction = function(obj) {
  if (obj.scope === 'MULTIPLE') return true;
  if (obj.scope === 'EVERYBODY') return true;
  if (obj.scope === 'RANDOM ANY') return false;
  if (obj.scope === 'TARGET ALL FOES') return false;
  if (obj.scope === 'TARGET RANDOM FOES') return false;
  if (obj.scope === 'ALL BUT USER') return true;
  if (obj.scope === 'TARGET ALL ALLIES') return false;
  if (obj.scope === 'TARGET RANDOM ALLIES') return false;
  if (obj.scope === 'RANDOM ALLIES') return false;
  if (obj.scope === 'ENEMY ROW') return true;
  if (obj.scope === 'ALLY ROW') return true;
  if (obj.scope === 'FRONT ENEMY ROW') return true;
  if (obj.scope === 'FRONT ALLY ROW') return true;
  if (obj.scope === 'BACK ENEMY ROW') return true;
  if (obj.scope === 'BACK ALLY ROW') return true;
  if (obj.scope === 'SPECIFIC ENEMY ROW') return true;
  if (obj.scope === 'SPECIFIC ALLY ROW') return true;
  return Yanfly.Target.DataManager_isWholeAction.call(this, obj);
};

}; // Imported.YEP_BattleEngineCore

DataManager.processTargetRepeatNotetags = function(obj) {
  var notedata = obj.note.split(/[\r\n]+/);
  for (var i = 0; i < notedata.length; i++) {
    var line = notedata[i];
    if (line.match(/<(?:REPEAT|REPEATS|REPEAT TIMES):[ ](\d+)>/i)) {
      obj.repeats = parseInt(RegExp.$1);
    }
  }
};

DataManager.processTargetNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    this.makeRandomTargets(obj);
    var evalMode = 'none';
    obj.customTargetText = '';
    obj.customTargetEval = '';

    if (!Imported.YEP_BattleEngineCore) this.processTargetRepeatNotetags(obj);
    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:TARGET|targets):[ ](.*)>/i)) {
        var type = String(RegExp.$1).toUpperCase();
        this.makeTargetTypes(obj, type);
      } else if (line.match(/<CUSTOM TARGET TEXT>/i)) {
        evalMode = 'custom target text';
      } else if (line.match(/<\/CUSTOM TARGET TEXT>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom target text') {
        obj.customTargetText = obj.customTargetText + line + '\n';
      } else if (line.match(/<CUSTOM TARGET EVAL>/i)) {
        evalMode = 'custom target eval';
      } else if (line.match(/<\/CUSTOM TARGET EVAL>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom target eval') {
        obj.customTargetEval = obj.customTargetEval + line + '\n';
      }
    }
  }
};

DataManager.makeRandomTargets = function(obj) {
  obj.randomTargets = 0;
  if ([3, 4, 5, 6].contains(obj.scope)) {
    obj.randomTargets = obj.scope - 2;
  }
};

DataManager.makeTargetTypes = function(obj, type) {
    if (type.match(/(.*?)[ ](.*?)[ ]MULTIPLE OF[ ](\d+)/i)) {
      var targets = String(RegExp.$1).toUpperCase();
      var stat = String(RegExp.$2).toUpperCase();
      var number = Math.max(0, parseInt(RegExp.$3));
      this.makeTargetMultipleOfType(obj, targets, stat, number);
    } else if (type.match(/EVERYBODY/i)) {
      obj.scope = 'EVERYBODY';
    } else if (type.match(/(\d+)[ ]RANDOM ANY/i)) {
      obj.randomTargets = parseInt(RegExp.$1);
      obj.scope = 'RANDOM ANY';
    } else if (type.match(/TARGET ALL FOE/i)) {
      obj.scope = 'TARGET ALL FOES';
    } else if (type.match(/TARGET[ ](\d+)[ ]RANDOM FOE/i)) {
      obj.randomTargets = parseInt(RegExp.$1);
      obj.scope = 'TARGET RANDOM FOES';
    } else if (type.match(/(\d+)[ ]RANDOM FOE/i)) {
      obj.randomTargets = parseInt(RegExp.$1);
      obj.scope = 3;
    } else if (type.match(/ALL BUT USER/i)) {
      obj.scope = 'ALL BUT USER';
    } else if (type.match(/ALL ALLIES BUT USER/i)) {
      obj.scope = 'ALL BUT USER';
    } else if (type.match(/TARGET ALL ALL/i)) {
      obj.scope = 'TARGET ALL ALLIES';
    } else if (type.match(/TARGET[ ](\d+)[ ]RANDOM ALL/i)) {
      obj.randomTargets = parseInt(RegExp.$1);
      obj.scope = 'TARGET RANDOM ALLIES';
    } else if (type.match(/(\d+)[ ]RANDOM ALL/i)) {
      obj.randomTargets = parseInt(RegExp.$1);
      obj.scope = 'RANDOM ALLIES';
    } else if (type.match(/FRONT ENEMY ROW/i)) {
      if (!Imported.YEP_RowFormation) return;
      obj.scope = 'FRONT ENEMY ROW';
    } else if (type.match(/FRONT ALLY ROW/i)) {
      if (!Imported.YEP_RowFormation) return;
      obj.scope = 'FRONT ALLY ROW';
    } else if (type.match(/BACK ENEMY ROW/i)) {
      if (!Imported.YEP_RowFormation) return;
      obj.scope = 'BACK ENEMY ROW';
    } else if (type.match(/BACK ALLY ROW/i)) {
      if (!Imported.YEP_RowFormation) return;
      obj.scope = 'BACK ALLY ROW';
    }  else if (type.match(/ENEMY ROW[ ](\d+)/i)) {
      if (!Imported.YEP_RowFormation) return;
      obj.scope = 'SPECIFIC ENEMY ROW';
      obj.rowTarget = parseInt(RegExp.$1).clamp(1, 10);
    } else if (type.match(/ALLY ROW[ ](\d+)/i)) {
      if (!Imported.YEP_RowFormation) return;
      obj.scope = 'SPECIFIC ALLY ROW';
      obj.rowTarget = parseInt(RegExp.$1).clamp(1, 10);
    } else if (type.match(/ENEMY ROW/i)) {
      if (!Imported.YEP_RowFormation) return;
      obj.scope = 'ENEMY ROW';
    } else if (type.match(/ALLY ROW/i)) {
      if (!Imported.YEP_RowFormation) return;
      obj.scope = 'ALLY ROW';
    }
};

DataManager.makeTargetMultipleOfType = function(obj, targets, stat, number) {
  obj.multipleOf = [];
  if (['ALL', 'ANY', 'ANYBODY', 'EVERYBODY'].contains(targets)) {
    obj.multipleOf.push('EVERYBODY');
  } else if (['ALLY', 'ALLIES', 'FRIENDS'].contains(targets)) {
    obj.multipleOf.push('FRIENDS');
  } else if (['FOE', 'FOES', 'ENEMIES', 'OPPONENTS'].contains(targets)) {
    obj.multipleOf.push('OPPONENTS');
  } else {
    return;
  }
  if (['MAXHP', 'MAX HP'].contains(stat)) {
    obj.multipleOf.push(0);
  } else if (['MAXMP', 'MAX MP', 'MAXSP', 'MAX SP'].contains(stat)) {
    obj.multipleOf.push(1);
  } else if (['ATK', 'STR'].contains(stat)) {
    obj.multipleOf.push(2);
  } else if (['DEF'].contains(stat)) {
    obj.multipleOf.push(3);
  } else if (['MAT', 'INT'].contains(stat)) {
    obj.multipleOf.push(4);
  } else if (['MDF', 'RES'].contains(stat)) {
    obj.multipleOf.push(5);
  } else if (['AGI', 'SPD'].contains(stat)) {
    obj.multipleOf.push(6);
  } else if (['LUK'].contains(stat)) {
    obj.multipleOf.push(7);
  } else if (['LEVEL', 'LV', 'LVL'].contains(stat)) {
    obj.multipleOf.push('LEVEL');
  } else if (['HP'].contains(stat)) {
    obj.multipleOf.push('HP');
  } else if (['MP'].contains(stat)) {
    obj.multipleOf.push('MP');
  } else if (['TP'].contains(stat)) {
    obj.multipleOf.push('TP');
  } else {
    return;
  }
  obj.multipleOf.push(number);
  obj.scope = 'MULTIPLE';
};

//=============================================================================
// BattleManager
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

Yanfly.Target.BattleManager_startAllSelection = BattleManager.startAllSelection;
BattleManager.startAllSelection = function() {
  if (this.inputtingAction().isForMultiple()) {
    var targets = this.inputtingAction().makeMultipleOfTargets();
    this._customTargetSelectGroup = targets;
  } else if (this.inputtingAction().isForRow()) {
    var targets = this.inputtingAction().makeRowTypeTargets();
    this._customTargetSelectGroup = targets;
  } else {
    Yanfly.Target.BattleManager_startAllSelection.call(this);
  }
};

}; // Imported.YEP_BattleEngineCore

BattleManager.customTargetSelectGroup = function() {
  this._customTargetSelectGroup = this._customTargetSelectGroup || [];
  return this._customTargetSelectGroup;
};

BattleManager.clearCustomTargetSelectGroup = function() {
  this._customTargetSelectGroup = [];
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Target.Game_System_onBattleStart = Game_System.prototype.onBattleStart;
Game_System.prototype.onBattleStart = function() {
    BattleManager.clearCustomTargetSelectGroup();
    Yanfly.Target.Game_System_onBattleStart.call(this);
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.Target.Game_Battler_isSelected = Game_Battler.prototype.isSelected;
Game_Battler.prototype.isSelected = function() {
    if (BattleManager.customTargetSelectGroup().length > 0) {
      return BattleManager.customTargetSelectGroup().contains(this);
    }
    return Yanfly.Target.Game_Battler_isSelected.call(this);
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.Target.Game_Action_isForOpponent = Game_Action.prototype.isForOpponent;
Game_Action.prototype.isForOpponent = function() {
    if (this.item().scope === 'EVERYBODY') return true;
    if (this.item().scope === 'RANDOM ANY') return true;
    if (this.item().scope === 'TARGET ALL FOES') return true;
    if (this.item().scope === 'TARGET RANDOM FOES') return true;
    if (this.item().scope === 'MULTIPLE') {
      if (this.item().multipleOf.contains('EVERYBODY')) return true;
      if (this.item().multipleOf.contains('OPPONENTS')) return true;
    }
    if (this.item().scope === 'ENEMY ROW') return true;
    if (this.item().scope === 'FRONT ENEMY ROW') return true;
    if (this.item().scope === 'BACK ENEMY ROW') return true;
    if (this.item().scope === 'SPECIFIC ENEMY ROW') return true;
    return Yanfly.Target.Game_Action_isForOpponent.call(this);
};

Yanfly.Target.Game_Action_isForFriend = Game_Action.prototype.isForFriend;
Game_Action.prototype.isForFriend = function() {
    if (this.item().scope === 'EVERYBODY') return true;
    if (this.item().scope === 'ALL BUT USER') return true;
    if (this.item().scope === 'TARGET ALL ALLIES') return true;
    if (this.item().scope === 'TARGET RANDOM ALLIES') return true;
    if (this.item().scope === 'RANDOM ALLIES') return true;
    if (this.item().scope === 'MULTIPLE') {
      if (this.item().multipleOf.contains('FRIENDS')) return true;
    }
    if (this.item().scope === 'ALLY ROW') return true;
    if (this.item().scope === 'FRONT ALLY ROW') return true;
    if (this.item().scope === 'BACK ALLY ROW') return true;
    if (this.item().scope === 'SPECIFIC ALLY ROW') return true;
    return Yanfly.Target.Game_Action_isForFriend.call(this);
};

Game_Action.prototype.isForCustom = function() {
    if (this.isForEval()) return true;
    return typeof this.item().scope === 'string';
};

Game_Action.prototype.isForEval = function() {
    return this.item().customTargetEval !== '';
};

Game_Action.prototype.isForEverybody = function() {
    if (this.item().scope === 'MULTIPLE') {
      if (this.item().multipleOf.contains('EVERYBODY')) return true;
    }
    return this.item().scope === 'EVERYBODY';
};

Game_Action.prototype.isForRandomAny = function() {
    return this.item().scope === 'RANDOM ANY';
};

Game_Action.prototype.isForTargetAllFoes = function() {
    return this.item().scope === 'TARGET ALL FOES';
};

Game_Action.prototype.isForTargetRandomFoes = function() {
    return this.item().scope === 'TARGET RANDOM FOES';
};

Game_Action.prototype.isForAllButUser = function() {
    return this.item().scope === 'ALL BUT USER';
};

Game_Action.prototype.isForTargetAllAllies = function() {
    return this.item().scope === 'TARGET ALL ALLIES';
};

Game_Action.prototype.isForTargetRandomAllies = function() {
    return this.item().scope === 'TARGET RANDOM ALLIES';
};

Game_Action.prototype.isForRandomAllies = function() {
    return this.item().scope === 'RANDOM ALLIES';
};

Yanfly.Target.Game_Action_isForRandom = Game_Action.prototype.isForRandom;
Game_Action.prototype.isForRandom = function() {
    if (this.item().randomTargets > 0) return true;
    return Yanfly.Target.Game_Action_isForRandom.call(this);
};

Game_Action.prototype.isForMultiple = function() {
    return this.item().scope === 'MULTIPLE';
};

Game_Action.prototype.isForRow = function() {
    if (this.item().scope === 'ENEMY ROW') return true;
    if (this.item().scope === 'ALLY ROW') return true;
    if (this.item().scope === 'FRONT ENEMY ROW') return true;
    if (this.item().scope === 'FRONT ALLY ROW') return true;
    if (this.item().scope === 'BACK ENEMY ROW') return true;
    if (this.item().scope === 'BACK ALLY ROW') return true;
    if (this.item().scope === 'SPECIFIC ENEMY ROW') return true;
    if (this.item().scope === 'SPECIFIC ALLY ROW') return true;
    return false;
};

Yanfly.Target.Game_Action_needsSelection = Game_Action.prototype.needsSelection;
Game_Action.prototype.needsSelection = function() {
    if (this.item().scope === 'TARGET ALL FOES') return true;
    if (this.item().scope === 'TARGET RANDOM FOES') return true;
    if (this.item().scope === 'TARGET ALL ALLIES') return true;
    if (this.item().scope === 'TARGET RANDOM ALLIES') return true;
    if (this.item().scope === 'ENEMY ROW') return true;
    if (this.item().scope === 'ALLY ROW') return true;
    return Yanfly.Target.Game_Action_needsSelection.call(this);
};

Yanfly.Target.Game_Action_numTargets = Game_Action.prototype.numTargets;
Game_Action.prototype.numTargets = function() {
    if (this.isForRandom()) return this.item().randomTargets;
    return Yanfly.Target.Game_Action_numTargets.call(this);
};

Yanfly.Target.Game_Action_makeTargets = Game_Action.prototype.makeTargets;
Game_Action.prototype.makeTargets = function() {
  var targets = [];
  if (!this._forcing && this.subject().isConfused()) {
    targets = Yanfly.Target.Game_Action_makeTargets.call(this);
  } else if (this.isForCustom()) {
    targets = this.makeCustomTargets();
  } else {
    targets = Yanfly.Target.Game_Action_makeTargets.call(this);
  }
  return targets;
};

Game_Action.prototype.makeCustomTargets = function() {
  var targets = [];
  if (this.isForEval()) {
    targets = this.makeEvalTargets();
  } else if (this.isForMultiple()) {
    targets = this.makeMultipleOfTargets();
  } else if (this.isForRow()) {
    targets = this.makeRowTypeTargets();
  } else if (this.isForRandomAny()) {
    var number = this.numTargets();
    var group = $gameParty.aliveMembers().concat($gameTroop.aliveMembers());
    for (var i = 0; i < number; ++i) {
      var member = group[Math.floor(Math.random() * group.length)];
      targets.push(member);
    }
  } else if (this.isForEverybody()) {
    targets = this.opponentsUnit().aliveMembers();
    var length = this.friendsUnit().aliveMembers().length;
    for (var i = 0; i < length; ++i) {
      var member = this.friendsUnit().aliveMembers()[i];
      if (member && member !== this.subject()) targets.push(member);
    }
    targets.push(this.subject());
  } else if (this.isForTargetAllFoes()) {
    var unit = this.opponentsUnit();
    targets.push(unit.smoothTarget(this._targetIndex));
    targets = targets.concat(unit.aliveMembers());
  } else if (this.isForTargetRandomFoes()) {
    var unit = this.opponentsUnit();
    var number = this.numTargets();
    targets.push(unit.smoothTarget(this._targetIndex));
    targets = targets.concat(this.getRandomTargets(number, unit))
  } else if (this.isForAllButUser()) {
    var length = this.friendsUnit().aliveMembers().length;
    for (var i = 0; i < length; ++i) {
      var member = this.friendsUnit().aliveMembers()[i];
      if (member && member !== this.subject()) targets.push(member);
    }
  } else if (this.isForTargetAllAllies()) {
    var unit = this.friendsUnit();
    targets.push(unit.smoothTarget(this._targetIndex));
    targets = targets.concat(unit.aliveMembers());
  } else if (this.isForTargetRandomAllies()) {
    var unit = this.friendsUnit();
    var number = this.numTargets();
    targets.push(unit.smoothTarget(this._targetIndex));
    targets = targets.concat(this.getRandomTargets(number, unit))
  } else if (this.isForRandomAllies()) {
    var unit = this.friendsUnit();
    var number = this.numTargets();
    targets = targets.concat(this.getRandomTargets(number, unit))
  }
  return targets;
};

Game_Action.prototype.makeEvalTargets = function() {
  var targets = [];
  var a = this.subject();
  var user = this.subject();
  var subject = this.subject();
  if (this.isForOpponent()) {
    var targetUnit = this.opponentsUnit();
  } else {
    var targetUnit = this.friendsUnit();
  }
  var b = targetUnit.smoothTarget(this._targetIndex);
  var target = targetUnit.smoothTarget(this._targetIndex);
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var allies = this.friendsUnit();
  var friends = allies;
  var foes = this.opponentsUnit();
  var opponents = foes;
  var code = this.item().customTargetEval;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'MAKE CUSTOM TARGETS ERROR');
  }
  return targets;
};

Game_Action.prototype.getRandomTargets = function(number, unit) {
  var targets = [];
  for (var i = 0; i < number; ++i) {
    targets.push(unit.randomTarget());
  }
  return targets;
};

Game_Action.prototype.makeMultipleOfTargets = function() {
    var targets = [];
    var unit = [];
    var type = this.item().multipleOf[0];
    var param = this.item().multipleOf[1];
    var number = this.item().multipleOf[2];
    if (['EVERYBODY', 'OPPONENTS'].contains(type)) {
      unit = unit.concat(this.opponentsUnit().aliveMembers());
    }
    if (['EVERYBODY', 'FRIENDS'].contains(type)) {
      unit = unit.concat(this.friendsUnit().aliveMembers());
    }
    var length = unit.length;
    for (var i = 0; i < length; ++i) {
      var member = unit[i];
      if (param === 'LEVEL') {
        if (member.level % number === 0) targets.push(member);
      } else if (param === 'HP') {
        if (member.hp % number === 0) targets.push(member);
      } else if (param === 'MP') {
        if (member.mp % number === 0) targets.push(member);
      } else if (param === 'TP') {
        if (member.tp % number === 0) targets.push(member);
      } else {
        if (member.param(param) % number === 0) targets.push(member);
      }
    }
    return targets;
};

Game_Action.prototype.makeRowTypeTargets = function() {
    var targets = [];
    var scope = this.item().scope;
    if (scope === 'ENEMY ROW') {
      var unit = this.opponentsUnit();
      var target = unit.smoothTarget(this._targetIndex);
      var row = target.row();
      targets = unit.rowAliveMembers(row);
    } else if (scope === 'ALLY ROW') {
      var unit = this.friendsUnit();
      var target = unit.smoothTarget(this._targetIndex);
      var row = target.row();
      targets = unit.rowAliveMembers(row);
    } else if (scope === 'FRONT ENEMY ROW') {
      var unit = this.opponentsUnit();
      for (var i = 1; i < Yanfly.Param.RowMaximum + 1; ++i) {
        if (unit.rowAliveSize(i) > 0) return unit.rowAliveMembers(i);
      }
    } else if (scope === 'FRONT ALLY ROW') {
      var unit = this.friendsUnit();
      for (var i = 1; i < Yanfly.Param.RowMaximum + 1; ++i) {
        if (unit.rowAliveSize(i) > 0) return unit.rowAliveMembers(i);
      }
    } else if (scope === 'BACK ENEMY ROW') {
      var unit = this.opponentsUnit();
      for (var i = 10; i > 0; --i) {
        if (unit.rowAliveSize(i) > 0) return unit.rowAliveMembers(i);
      }
    } else if (scope === 'BACK ALLY ROW') {
      var unit = this.friendsUnit();
      for (var i = 10; i > 0; --i) {
        if (unit.rowAliveSize(i) > 0) return unit.rowAliveMembers(i);
      }
    } else if (scope === 'SPECIFIC ENEMY ROW') {
      var unit = this.opponentsUnit();
      var i = this.item().rowTarget;
      return unit.rowAliveMembers(i);
    } else if (scope === 'SPECIFIC ALLY ROW') {
      var unit = this.friendsUnit();
      var i = this.item().rowTarget;
      return unit.rowAliveMembers(i);
    }
    return targets;
};

//=============================================================================
// Window_Help
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

Yanfly.Target.Window_Help_setBattler = Window_Help.prototype.setBattler;
Window_Help.prototype.setBattler = function(battler) {
    this._battler = battler;
    Yanfly.Target.Window_Help_setBattler.call(this, battler);
};

Yanfly.Target.Window_Help_specialSelectionText =
    Window_Help.prototype.specialSelectionText;
Window_Help.prototype.specialSelectionText = function(action) {
    BattleManager.resetSelection();
    if (!action) return false;
    if (action.item().customTargetText !== '') return true;
    if (action.isForRow()) return true;
    return Yanfly.Target.Window_Help_specialSelectionText.call(this, action);
};

Yanfly.Target.Window_Help_drawSpecialSelectionText =
    Window_Help.prototype.drawSpecialSelectionText;
Window_Help.prototype.drawSpecialSelectionText = function(action) {
  if (action.item().customTargetText !== '') {
    BattleManager.startAllSelection();
    var wx = 0;
    var wy = (this.contents.height - this.lineHeight()) / 2;
    var text = this.makeCustomTargetText(action);
    this.drawText(text, wx, wy, this.contents.width, 'center');
  } else if (action.isForMultiple()) {
    BattleManager.startAllSelection();
    var wx = 0;
    var wy = (this.contents.height - this.lineHeight()) / 2;
    var text = this.makeTargetMultipleOfText(action);
    this.drawText(text, wx, wy, this.contents.width, 'center');
  } else if (action.isForRow()) {
    this.makeTargetRowText(action);
  } else if (action.isForRandomAny()) {
    var wx = 0;
    var wy = (this.contents.height - this.lineHeight()) / 2;
    var fmt = Yanfly.Param.BECHlpRandomAnyTx;
    var number = action.item().randomTargets;
    var text = fmt.format(Yanfly.Util.toGroup(number));
    this.drawText(text, wx, wy, this.contents.width, 'center');
  } else if (action.isForEverybody()) {
    BattleManager.startAllSelection();
    var wx = 0;
    var wy = (this.contents.height - this.lineHeight()) / 2;
    var text = Yanfly.Param.BECHlpEverybodyTx;
    this.drawText(text, wx, wy, this.contents.width, 'center');
  } else if (action.isForAllButUser()) {
    BattleManager.startAllSelection();
    var wx = 0;
    var wy = (this.contents.height - this.lineHeight()) / 2;
    var fmt = Yanfly.Param.BECHlpAllBTx;
    var allies = Yanfly.Param.BECHelpAlliesTx;
    var user = Yanfly.Param.BECHelpUserTx
    var text = fmt.format(allies, user);
    this.drawText(text, wx, wy, this.contents.width, 'center');
  } else {
    Yanfly.Target.Window_Help_drawSpecialSelectionText.call(this, action);
  }
};

}; // Imported.YEP_BattleEngineCore

Window_Help.prototype.makeCustomTargetText = function(action) {
    var text = ''
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var user = BattleManager._subject;
    var a = user;
    var subject = user;
    var b = user;
    var target = user;
    var code = action.item().customTargetText;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'MAKE CUSTOM TARGET TEXT ERROR');
    }
    return text;
};

Window_Help.prototype.makeTargetMultipleOfText = function(action) {
    var fmt = Yanfly.Param.TargetMultipleTx;
    if (action.isForEverybody()) {
      var targets = Yanfly.Param.TargetMultiEvery;
    } else if (action.isForFriend()) {
      var targets = Yanfly.Param.TargetMultiAllies;
    } else {
      var targets = Yanfly.Param.TargetMultiFoes;
    }
    var param = action.item().multipleOf[1];
    if (param === 'LEVEL') {
      param = TextManager.level;
    } else if (param === 'HP') {
      param = TextManager.hp;
    } else if (param === 'MP') {
      param = Textmanager.mp;
    } else if (param === 'TP') {
      param = Textmanager.tp;
    } else {
      param = TextManager.param(param);
    }
    var number = action.item().multipleOf[2];
    var text = fmt.format(targets, param, Yanfly.Util.toGroup(number));
    return text;
};

Window_Help.prototype.makeTargetRowText = function(action) {
    if (!this._battler) return;
    action.setTarget(this._battler.index());
    BattleManager.startAllSelection();
    var wx = 0;
    var wy = (this.contents.height - this.lineHeight()) / 2;
    var scope = action.item().scope;
    if (scope === 'ENEMY ROW' || scope === 'ALLY ROW') {
      var fmt = Yanfly.Param.TargetHlpRowTx;
      var text = fmt.format(this._battler.name());
    } else if (scope === 'FRONT ENEMY ROW') {
      var fmt = Yanfly.Param.TargetFrontRow;
      var text = fmt.format(Yanfly.Param.TargetRowEnemies);
    } else if (scope === 'BACK ENEMY ROW') {
      var fmt = Yanfly.Param.TargetBackRow;
      var text = fmt.format(Yanfly.Param.TargetRowEnemies);
    } else if (scope === 'SPECIFIC ENEMY ROW') {
      var fmt = Yanfly.Param.TargetSpcRow;
      var text = fmt.format(Yanfly.Param.TargetRowEnemies);
    } else if (scope === 'FRONT ALLY ROW') {
      var fmt = Yanfly.Param.TargetFrontRow;
      var text = fmt.format(Yanfly.Param.TargetRowAllies);
    } else if (scope === 'BACK ALLY ROW') {
      var fmt = Yanfly.Param.TargetBackRow;
      var text = fmt.format(Yanfly.Param.TargetRowAllies);
    } else if (scope === 'SPECIFIC ALLY ROW') {
      var fmt = Yanfly.Param.TargetSpcRow;
      var text = fmt.format(Yanfly.Param.TargetRowAllies);
    }
    this.drawText(text, wx, wy, this.contents.width, 'center');
};

//=============================================================================
// Window_EnemyVisualSelect
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

Yanfly.Target.Window_EnemyVisualSelect_isShowWindow =
    Window_EnemyVisualSelect.prototype.isShowWindow;
Window_EnemyVisualSelect.prototype.isShowWindow = function() {
    if (BattleManager.customTargetSelectGroup().length > 0) {
      return BattleManager.customTargetSelectGroup().contains(this._battler);
    }
    return Yanfly.Target.Window_EnemyVisualSelect_isShowWindow.call(this);
};

}; // Imported.YEP_BattleEngineCore

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.Target.Scene_Battle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
Scene_Battle.prototype.onEnemyOk = function() {
    BattleManager.clearCustomTargetSelectGroup();
    Yanfly.Target.Scene_Battle_onEnemyOk.call(this);
};

Yanfly.Target.Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    BattleManager.clearCustomTargetSelectGroup();
    Yanfly.Target.Scene_Battle_onEnemyCancel.call(this);
};

Yanfly.Target.Scene_Battle_onActorOk = Scene_Battle.prototype.onActorOk;
Scene_Battle.prototype.onActorOk = function() {
    BattleManager.clearCustomTargetSelectGroup();
    Yanfly.Target.Scene_Battle_onActorOk.call(this);
};

Yanfly.Target.Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
    BattleManager.clearCustomTargetSelectGroup();
    Yanfly.Target.Scene_Battle_onActorCancel.call(this);
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
    Yanfly.Util.toGroup = function(inVal) {
        return inVal;
    }
};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") return;
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================
