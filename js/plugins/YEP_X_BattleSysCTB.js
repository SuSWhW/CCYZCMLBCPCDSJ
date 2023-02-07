//=============================================================================
// Yanfly Engine Plugins - Battle System - Charge Turn Battle
// YEP_X_BattleSysCTB.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_BattleSysCTB = true;

var Yanfly = Yanfly || {};
Yanfly.CTB = Yanfly.CTB || {};
Yanfly.CTB.version = 1.17;

/*:ja
 * @plugindesc v1.17 (要YEP_BattleEngineCore.js)戦闘システムをCTB(Charge Turn Battle)にします。
 * @author Yanfly Engine Plugins
 *
 * @param ---CTB全般---
 * @default
 *
 * @param Per Tick
 * @text ティック基準
 * @parent ---CTB全般---
 * @desc ティック毎に得られる速度
 * @default user.agi
 *
 * @param Initial Speed
 * @text 初期速度
 * @parent ---CTB全般---
 * @desc 戦闘開始時のバトラーの初期速度。evalの式
 * @default 0
 *
 * @param Full Gauge
 * @text ゲージ速度
 * @parent ---CTB全般---
 * @desc CTBゲージが満たされる速度。evalの式
 * @default Math.max(7000, BattleManager.highestBaseAgi() * 120)
 *
 * @param Pre-Emptive Bonuses
 * @text 事前のボーナス
 * @parent ---CTB全般---
 * @desc 事前CTBボーナス。0から1まで
 * @default 0.8
 *
 * @param Surprise Bonuses
 * @text サプライズボーナス
 * @parent ---CTB全般---
 * @desc サプライズCTBボーナス。0から1まで
 * @default 0.8
 *
 * @param ---逃走---
 * @default
 *
 * @param Escape Ratio
 * @text 逃走率
 * @parent ---逃走---
 * @desc CTB逃走率の計算式
 * デフォルト:0.5 * $gameParty.agility() / $gameTroop.agility()
 * @default 0.125 * $gameParty.agility() / $gameTroop.agility()
 *
 * @param Fail Escape Boost
 * @text 逃走失敗ブースト
 * @parent ---逃走---
 * @type number
 * @decimals 3
 * @min 0
 * @desc プレイヤーが逃走に失敗する度に、上がる成功率。デフォルト:0.1
 * @default 0.025
 *
 * @param ---ターン---
 * @default
 *
 * @param Full Turn
 * @text ターン基準
 * @parent ---ターン---
 * @desc 戦闘ターンに相当するティック数。evalの式
 * @default Math.min(200, BattleManager.lowestBaseAgi() * 8)
 *
 * @param ---ラバーバンディング---
 * @default
 *
 * @param Enable Rubberband
 * @text 有効化
 * @parent ---ラバーバンディング---
 * @type boolean
 * @on 有効
 * @off 無効
 * @desc AGIのオートバランス機構
 * 無効:false / 有効:true
 * @default true
 *
 * @param Minimum Speed
 * @text 最低速度
 * @parent ---ラバーバンディング---
 * @desc ラバーバンディング有効時の最低速度。式で指定
 * @default 0.5 * BattleManager.highestBaseAgi()
 *
 * @param Maximum Speed
 * @text 最高速度
 * @parent ---ラバーバンディング---
 * @desc ラバーバンディング有効時の最高速度。式で指定
 * @default 1.5 * BattleManager.highestBaseAgi()
 *
 * @param ---音---
 * @default
 *
 * @param Ready Sound
 * @text 準備完了
 * @parent ---音---
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc バトラーの準備完了音
 * @default Decision1
 *
 * @param Ready Volume
 * @text 準備完了音量
 * @parent ---音---
 * @type number
 * @min 0
 * @max 100
 * @desc 準備完了音の音量
 * @default 90
 *
 * @param Ready Pitch
 * @text 準備完了ピッチ
 * @parent ---音---
 * @type number
 * @min 0
 * @desc 準備完了音のピッチ
 * @default 120
 *
 * @param Ready Pan
 * @text 準備完了のパン
 * @parent ---音---
 * @type number
 * @desc 準備完了音のパン
 * @default 0
 *
 * @param ---ターン順---
 * @default
 *
 * @param Show Turn Order
 * @text 表示有効化
 * @parent ---ターン順---
 * @type boolean
 * @on 表示
 * @off 非表示
 * @desc バトラー行動順の表示
 * 非表示:false / 表示:true
 * @default true
 *
 * @param Icon Size
 * @text アイコンサイズ
 * @parent ---ターン順---
 * @type number
 * @min 1
 * @desc 行動順の表示アイコンのサイズ
 * Default: 32
 * @default 32
 *
 * @param Position Y
 * @text 表示位置 Y
 * @parent ---ターン順---
 * @type number
 * @min -9007
 * @max 9007
 * @desc 行動順の表示Y位置。
 * 正:下 / 負:上
 * @default 54
 *
 * @param Position X
 * @text 表示位置 X
 * @parent ---ターン順---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc 行動順の表示X位置。
 * 左:left / 中央:center / 右:right
 * @default right
 *
 * @param Turn Direction
 * @text アイコン移動方向
 * @parent ---ターン順---
 * @type combo
 * @option left
 * @option right
 * @desc ターンアイコンを動かす方向
 * 左:left / 右:right
 * @default left
 *
 * @param Ally Border Color
 * @text 味方の境界線色
 * @parent ---ターン順---
 * @type number
 * @min 0
 * @max 31
 * @desc 味方の境界線の色
 * @default 4
 *
 * @param Ally Back Color
 * @text 味方の背景色
 * @parent ---ターン順---
 * @type number
 * @min 0
 * @max 31
 * @desc 味方の背景色のテキスト色
 * @default 22
 *
 * @param Ally Icon
 * @text 味方のアイコン
 * @parent ---ターン順---
 * @type number
 * @min 0
 * @desc 味方のデフォルトのアイコン。0の場合、アイコンは味方の顔画像に
 * @default 0
 *
 * @param Enemy Border Color
 * @text 敵の境界線色
 * @parent ---ターン順---
 * @type number
 * @min 0
 * @max 31
 * @desc 敵の境界線の色
 * @default 2
 *
 * @param Enemy Back Color
 * @text 敵の背景色
 * @parent ---ターン順---
 * @type number
 * @min 0
 * @max 31
 * @desc 敵の背景色のテキスト色
 * @default 19
 *
 * @param Enemy Icon
 * @text 敵のアイコン
 * @parent ---ターン順---
 * @type number
 * @min 0
 * @desc 敵のデフォルトのアイコン。0の場合、アイコンは敵画像に
 * @default 0
 *
 * @param Enemy SV Battlers
 * @text 敵のSV戦闘キャラ
 * @parent ---ターン順---
 * @type boolean
 * @on 非表示
 * @off 表示
 * @desc AnimatedSVEnemiesを使用している場合で、アイコンが指定されていない場合、表示すると重くなる場合があります。表示:false / 非表示:true
 * @default false
 *
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * ===========================================================================
 * 導入
 * ===========================================================================
 * Battle System - Charge Turn Battleプラグインは、
 * Yanfly Engine PluginsのBattle Engine Core用の拡張プラグインです。
 * この拡張プラグインにはBattle Engine Coreが必要です。
 *
 * チャージターンバトル(CTB)システムを使用するには、
 * Battle Engine Coreプラグインの設定内パラメーターの
 * 'DefaultSystem'設定を'ctb'に変更します。
 *
 * チャージターンバトルシステムは、全てのバトラーの速度を計算し、
 * それらを互いに相対的にバランスさせることによって機能します。
 * それがバトラーのターンである時、
 * バトラーはすぐに実行するために行動を選択するか、
 * スキルがチャージを必要とする場合はチャージします。
 *
 * 敏捷性が高いほど有利であり、敏捷性が低いほど不利になる。
 * 敏捷性が重要な属性となる戦闘システムです。
 *
 * ===========================================================================
 * プラグインコマンド
 * ===========================================================================
 *
 * デフォルトの戦闘システムではない場合、
 * 戦闘システムをCharge Turn Battleに変更するには、
 * 次のプラグインコマンドを使用できます。
 *
 * プラグインコマンド
 *   setBattleSys CTB      戦闘システムをチャージターンバトルに設定します。
 *   setBattleSys DTB      戦闘システムをデフォルトターンバトルに設定します。
 *
 * 上記のプラグインコマンドを使用して、
 * デフォルトバトルシステムとチャージターンバトルを切り替えることができます。
 *
 * ===========================================================================
 * メモタグ
 * ===========================================================================
 *
 * 以下は、CTBシステムに関連し、影響を与える注記です。
 *
 * アクター、敵のメモタグ
 *   <CTB Icon: x>
 *   アクター・敵のアイコンをxに設定します。
 *
 *   <CTB Border Color: x>
 *   アクター・敵の境界色をテキスト色xに設定します。
 *
 *   <CTB Background Color: x>
 *   アクター・敵の背景色をテキスト色xに設定します。
 *
 * アクターのメモタグ
 *   <Class x CTB Icon: y>
 *   もしアクターが特定の職業であれば、
 *   そのアクターはCTBターンオーダーの特定のアイコンに設定します。
 *   アクターが職業xの場合、アイコンyに設定します。
 *
 *   <Hero CTB Icon: x>
 *   <Warrior CTB Icon: x>
 *   <Mage CTB Icon: x>
 *   <Priest CTB Icon: x>
 *   職業IDの代わりに名前を使用したい場合、
 *   上記のメモタグを使用できます。
 *   アクターが名前付き職業の場合、アイコンxに設定します。
 *   同じ名前の職業が複数ある場合、最も高いIDを持つ職業が優先されます。
 *
 * スキル、アイテムのメモタグ
 *   <CTB Help>
 *   text
 *   text
 *   </CTB Help>
 *   複数の戦闘システムを使用することを計画している場合、
 *   時々CTBを使用している間スキルが異なった実行をするかも知れません。
 *   その場合、このメモタグを使用することでCTBが有効にされている間、
 *   スキルとアイテムが異なるヘルプテキストを表示できます。
 *
 *   <CTB Speed: x>
 *   CTB中のみ使用可能です。対象の現在の速度をxに設定します。
 *
 *   <CTB Speed: x%>
 *   CTB中のみ使用可能です。
 *   目標の現在の速度をCTBターン完了目標のx%に設定します。
 *
 *   <CTB Speed: +x>
 *   <CTB Speed: -x>
 *   CTB中のみ使用可能です。対象の現在の速度がx増減します。
 *
 *   <CTB Speed: +x%>
 *   <CTB Speed: -x%>
 *   CTB中のみ使用可能です。
 *   対象の現在の速度・チャージをCTBターン完了対象のx%増減します。
 *
 *   <CTB Order: +x>
 *   <CTB Order: -x>
 *   対象の位置を+x・-xの順番で回転します。
 *   +xを指定すると対象の待機時間が長くなり、
 *   -xを指定すると対象の待機時間が短くなります。
 *   影響は最小限で、現在のターンサイクルの間持続します。
 *   *注:複数の対象に使用すると、各対象は一度に1つずつ順番に移動します。
 *
 *   <After CTB: x>
 *   <After CTB: x%>
 *   スキル・アイテムの使用者のCTBスピード値がx・x%に設定されます。
 *   'x'が使用されている場合、正確なCTB値になります。
 *   x%が使用されている場合、
 *   CTBターン完了値のパーセンテージになります。
 *
 * アクター、職業、敵、武器、防具、ステートのメモタグ
 *   <CTB Start: +x>
 *   <CTB Start: +x%>
 *   CTB中のみ使用可能です。
 *   X CTBスピード・CTBターン完了値のX%で戦闘を開始します。
 *
 *   <CTB Turn: +x>
 *   <CTB Turn: +x%>
 *   CTB中のみ使用可能です。
 *   X CTB スピード・CTBターン完了値のX%でターンを開始します。
 *
 * ===========================================================================
 * ルナティックモード - 条件付CTB速度、条件付CTBチャージ
 * ===========================================================================
 *
 * JavaScriptの経験があり、
 * CTBの速度とチャージの変更をよりユニークな方法をご希望の場合、
 * 以下のメモタグを使用できます。
 *
 * スキル、アイテムのメモタグ
 *   <Target CTB Speed Eval>
 *   speed = x;
 *   charge = x;
 *   </Target CTB Speed Eval>
 *   speedやchargeを省略することができます。
 *   'speed'に設定したものは何でも対象のCTBspeedを変えるでしょう。
 *   対象がchargeしている場合、
 *   'charge'は対象のchargeをその値に変更させます。
 *   'max'がフルゲージ値になります。
 *
 *   例
 *
 *   <Target CTB Speed Eval>
 *   speed = target.hp / target.mhp * max;
 *   charge = target.hp / target.mhp * max;
 *   </Target CTB Speed Eval>
 *   上記のコードは、
 *   使用者の現在のCTBゲージを対象のHP比率と同じに設定します。
 *   目標のHPが25%の場合、
 *   CTBゲージは完了値に対して25%満たされた状態になります。
 *
 *   --- --- --- --- ---
 *
 *   <Target CTB Order Eval>
 *   order = x;
 *   </Target CTB Order Eval>
 *   'order'変数を、対象の現在のターン順を変更したい量に設定します。
 *   もし'order'がプラスであれば、さらに多くの順番を待つ必要があります。
 *   'order'がマイナスの場合、orderが出るまでのターン数は少なくなります。
 *
 *   例
 *
 *   <Target CTB Order Eval>
 *   if (target.hp > 1000) {
 *     order = 3;
 *   } else {
 *     order = -1;
 *   }
 *   </Target CTB Order Eval>
 *   攻撃された時、
 *   対象が1000HPを超えて残っている場合、
 *   そのターンが完了する前にさらに3ターン待つ必要があります。
 *   対象が1000以下の場合、実際に1ターン少なく待機します。
 *
 *   --- --- --- --- ---
 *
 *   <After CTB Eval>
 *   speed = x;
 *   </After CTB Eval>
 *   使用者がスキル・アイテムを使用した後に設定されたCTBと、
 *   使用者が後で使用するカスタムCTBのチャージです。
 *   'max'はフルゲージの値です。
 *   'speed'を設定したものは何でも、使用者のCTBスピード値が変わります。
 *
 *   例
 *
 *   <After CTB Eval>
 *   speed = user.mp / user.mmp * max;
 *   </After CTB Eval>
 *   上記のコードは、
 *   スキル・アイテムを使用した後の使用者のCTBゲージを、
 *   使用者のMP比率と等しくなるように設定します。
 *   使用者が25%のMPを持っている場合、
 *   CTBゲージは完了値に対して25%満たされた状態になります。
 *
 * ===========================================================================
 * Yanfly Engine Plugins - Battle Engine Extension - Action Sequence Commands
 * ===========================================================================
 *
 * 拡張されたCTB関連のアクションシーケンスを利用できます。
 *
 * ===========================================================================
 * CTB ORDER: target, +X
 * CTB ORDER: target, -X
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * CTBにのみ使用可能です。
 * 対象の位置を+x・-xの順番で回転します。
 * +xを指定すると対象の待機時間が長くなり、
 * -xを指定すると対象の待機時間が短くなります。
 * 影響は最小限で、現在のターンサイクルの間持続します。
 * *注意:これを複数の対象に使用すると、
 * 各対象は一度に個別にターンをシフトします。
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 例: ctb order: target, -2
 *     ctb order: target, +3
 * ===========================================================================
 *
 * ===========================================================================
 * CTB SPEED: target, X
 * CTB SPEED: target, X%
 * CTB SPEED: targets, +X
 * CTB SPEED: targets, +X%
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * CTBにのみ使用可能です。
 * 対象のCTB速度をX・X%に設定します。
 * 対象がCTBゲージをいっぱいにしている場合のみ適用されます。
 * システム的問題を防ぐために使用者に影響を与えません。
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 例: ctb speed: targets, +5000
 *     ctb speed: target, -50%
 * ===========================================================================
 *
 * ===========================================================================
 * Changelog
 * ===========================================================================
 *
 * Version 1.17:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.16:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.15:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.14a:
 * - Updated check for CTB Charging. Units in the turn order will not be
 * considered 'ready' unless they are in the front of the CTB Turn Order.
 *
 * Version 1.13:
 * - Timing has been changed for states that update turns at Turn Start. Now,
 * the states will update prior to the actor's command box opening or the
 * enemy make a decision on which action it will use.
 *
 * Version 1.12:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.11:
 * - Counterattacks no longer cause turn order inconsistencies.
 *
 * Version 1.10a:
 * - Updated plugin to update the AI more accordingly with Battle AI Core.
 * - Optimized CTB Turn Order further to reduce lag when there are larger
 * quantities of battle members.
 *
 * Version 1.09:
 * - Fixed a bug where forced actions clear out an action's effects before the
 * turn is over, making post-turn effects to not occur.
 *
 * Version 1.08a:
 * - Fixed a bug where changing back and forth between the Fight/Escape window
 * would prompt on turn start effects.
 * - Made an update where if using Battle Engine Core's "Lower Windows" to
 * false, the icons no longer show above the windows.
 *
 * Version 1.07:
 * - Made a mechanic change so that turn 0 ends immediately upon battle start
 * rather than requiring a full turn to end.
 *
 * Version 1.06:
 * - Fixed a bug that would cause a crash when a party member leaves the
 * party.
 *
 * Version 1.05c:
 * - Implemented a Forced Action queue list. This means if a Forced Action
 * takes place in the middle of an action, the action will resume after the
 * forced action finishes rather than cancels it out like MV does.
 * - Fixed a graphical issue where enemies appearing midway don't have letters
 * attached to their icons.
 * - Added a fail safe for loaded saves that did not have CTB installed
 * before.
 *
 * Version 1.04:
 * - Added a speed position check for Instant Casts to maintain order
 * position.
 *
 * Version 1.03:
 * - Fixed a bug that doesn't update state turns properly.
 * - Removed 'Turn Structure parameter' as it goes against the nature of a
 * Tick-Based battle system.
 *
 * Version 1.02:
 * - Added failsafe for battlers without actions.
 * - Added speed rebalance formulas for tick-based systems (innate).
 * - Added <Class x CTB Icon: y> and <classname CTB Icon: x> notetags.
 *
 * Version 1.01:
 * - Provided loop breaks to prevent lock-ups with non-Yanfly plugins.
 * - Added 'Icon Size' parameter to allow customization of icon sizes.
 *
 * Version 1.00:
 * - It's doooooooooone!
 */

//=============================================================================
 /*:
 * @plugindesc v1.17 (Requires YEP_BattleEngineCore.js) Add CTB (Charge
 * Turn Battle) into your game using this plugin!
 * @author Yanfly Engine Plugins
 *
 * @param ---CTB Settings---
 * @default
 *
 * @param Per Tick
 * @parent ---CTB Settings---
 * @desc This is how much speed is gained per tick.
 * @default user.agi
 *
 * @param Initial Speed
 * @parent ---CTB Settings---
 * @desc The speed position of the battler at the start of battle.
 * This is a formula processed as an eval.
 * @default 0
 *
 * @param Full Gauge
 * @parent ---CTB Settings---
 * @desc The target speed for an CTB gauge to be full.
 * This is a formula processed as an eval.
 * @default Math.max(7000, BattleManager.highestBaseAgi() * 120)
 *
 * @param Pre-Emptive Bonuses
 * @parent ---CTB Settings---
 * @desc How much of the CTB bar do you want filled up for an
 * CTB pre-emptive bonus from 0 to 1.
 * @default 0.8
 *
 * @param Surprise Bonuses
 * @parent ---CTB Settings---
 * @desc How much of the CTB bar do you want filled up for an
 * CTB surprise bonus from 0 to 1.
 * @default 0.8
 *
 * @param ---Escape---
 * @default
 *
 * @param Escape Ratio
 * @parent ---Escape---
 * @desc How CTB calculates escape ratios.
 * Default: 0.5 * $gameParty.agility() / $gameTroop.agility()
 * @default 0.125 * $gameParty.agility() / $gameTroop.agility()
 *
 * @param Fail Escape Boost
 * @parent ---Escape---
 * @type number
 * @decimals 3
 * @min 0
 * @desc Each time the player fails escape, increase the success
 * rate by this much. Default: 0.1
 * @default 0.025
 *
 * @param ---Turn---
 * @default
 *
 * @param Full Turn
 * @parent ---Turn---
 * @desc This is how many ticks to equal a full battle turn.
 * This is a formula processed as an eval.
 * @default Math.min(200, BattleManager.lowestBaseAgi() * 8)
 *
 * @param ---Rubberband---
 * @default
 *
 * @param Enable Rubberband
 * @parent ---Rubberband---
 * @type boolean
 * @on YES
 * @off NO
 * @desc This is an auto-balance mechanic for AGI.
 * Disable - false     Enable - true
 * @default true
 *
 * @param Minimum Speed
 * @parent ---Rubberband---
 * @desc If rubberbanding is enabled, what is the minimum
 * speed increase? This is a formula.
 * @default 0.5 * BattleManager.highestBaseAgi()
 *
 * @param Maximum Speed
 * @parent ---Rubberband---
 * @desc If rubberbanding is enabled, what is the maximum
 * speed increase? This is a formula.
 * @default 1.5 * BattleManager.highestBaseAgi()
 *
 * @param ---Sound---
 * @default
 *
 * @param Ready Sound
 * @parent ---Sound---
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc This is the sound played when the battler is ready.
 * @default Decision1
 *
 * @param Ready Volume
 * @parent ---Sound---
 * @type number
 * @min 0
 * @max 100
 * @desc This is the volume of the ready sound.
 * @default 90
 *
 * @param Ready Pitch
 * @parent ---Sound---
 * @type number
 * @min 0
 * @desc This is the pitch of the ready sound.
 * @default 120
 *
 * @param Ready Pan
 * @parent ---Sound---
 * @type number
 * @desc This is the pan of the ready sound.
 * @default 0
 *
 * @param ---Turn Order---
 * @default
 *
 * @param Show Turn Order
 * @parent ---Turn Order---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show the battler turn order?
 * NO - false     YES - true
 * @default true
 *
 * @param Icon Size
 * @parent ---Turn Order---
 * @type number
 * @min 1
 * @desc This is the size of the icons displayed for the turn order.
 * Default: 32
 * @default 32
 *
 * @param Position Y
 * @parent ---Turn Order---
 * @type number
 * @desc Where do you want to align the Y turn order?
 * @default 54
 *
 * @param Position X
 * @parent ---Turn Order---
 * @type number
 * @desc Which side of the screen should the turn order appear?
 * left     center     right
 * @default right
 *
 * @param Turn Direction
 * @parent ---Turn Order---
 * @type combo
 * @option left
 * @option right
 * @desc Which way do you want the turn icons going?
 * left     right
 * @default left
 *
 * @param Ally Border Color
 * @parent ---Turn Order---
 * @type number
 * @min 0
 * @max 31
 * @desc Text Color used for the borders of allies.
 * @default 4
 *
 * @param Ally Back Color
 * @parent ---Turn Order---
 * @type number
 * @min 0
 * @max 31
 * @desc Text Color used for the ally background color.
 * @default 22
 *
 * @param Ally Icon
 * @parent ---Turn Order---
 * @type number
 * @min 0
 * @desc Default icon used for allies. If this value is 0,
 * the icon will be the ally's face graphic instead.
 * @default 0
 *
 * @param Enemy Border Color
 * @parent ---Turn Order---
 * @type number
 * @min 0
 * @max 31
 * @desc Text Color used for the borders of enemies.
 * @default 2
 *
 * @param Enemy Back Color
 * @parent ---Turn Order---
 * @type number
 * @min 0
 * @max 31
 * @desc Text Color used for the ally background color.
 * @default 19
 *
 * @param Enemy Icon
 * @parent ---Turn Order---
 * @type number
 * @min 0
 * @desc Default icon used for enemies. If this value is 0,
 * the icon will be the enemy's drawn battler instead.
 * @default 0
 *
 * @param Enemy SV Battlers
 * @parent ---Turn Order---
 * @type boolean
 * @on YES
 * @off NO
 * @desc If using Animated SV Enemies, draw their battlers if no icon
 * is being used? This can become laggy. NO - false  YES - true
 * @default false
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Battle System - Charge Turn Battle plugin is an extension plugin for
 * Yanfly Engine Plugins' Battle Engine Core. This extension plugin will not
 * work without the main plugin.
 *
 * To use the CTB system, go to the Battle Engine Core plugin and change the
 * 'Default System' setting in the parameters to 'ctb'.
 *
 * The Charge Turn Battle system functions by calculating every battlers' speed
 * and balancing them relative to one another. When it's a battler's turn, the
 * battler will either choose an action to perform immediately or charge it for
 * later depending if the skill requires charging.
 *
 * This is a battle system where agility plays an important factor in the
 * progress of battle where higher agility values give battlers more advantage
 * and lower agility values give battlers less advantage.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * To change your battle system to Charge Turn Battle if it isn't the default
 * battle system, you can use the following Plugin Command:
 *
 * Plugin Command:
 *   setBattleSys CTB      Sets battle system to Charge Turn Battle.
 *   setBattleSys DTB      Sets battle system to Default Turn Battle.
 *
 * Using the above Plugin Commands, you can toggle between the Default Battle
 * System and Charge Turn Battle!
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that pertain to and affect the CTB system.
 *
 * Actor and Enemy Notetags:
 *   <CTB Icon: x>
 *   This sets the icon used for the actor/enemy to be x.
 *
 *   <CTB Border Color: x>
 *   This sets the border color used for the actor/enemy to text color x.
 *
 *   <CTB Background Color: x>
 *   This sets the background color used for the actor/enemy to text color x.
 *
 * Actor only Notetags:
 *   <Class x CTB Icon: y>
 *   This sets it so that if the actor is a specific class, the actor will get
 *   a specific icon used for the CTB Turn Order. If the actor is class x, it
 *   will receive icon y.
 *
 *   <Hero CTB Icon: x>
 *   <Warrior CTB Icon: x>
 *   <Mage CTB Icon: x>
 *   <Priest CTB Icon: x>
 *   If you prefer to use names instead of class ID's, you can use the above
 *   notetag format. If the actor is the named class, it will receive icon x.
 *   If you have multiple classes with the same name, priority will be given to
 *   the class with the highest ID.
 *
 * Skill and Item Notetags:
 *   <CTB Help>
 *   text
 *   text
 *   </CTB Help>
 *   For those planning on using multiple battle systems, sometimes you may
 *   have your skills perform differently while using CTB. If so, using this
 *   notetag will allow skills and items to display different help text while
 *   CTB is enabled.
 *
 *   <CTB Speed: x>
 *   Usable only during CTB. This sets the target's current speed to x.
 *
 *   <CTB Speed: x%>
 *   Usable only during CTB. This sets the target's current speed to x% of
 *   the CTB turn completion target.
 *
 *   <CTB Speed: +x>
 *   <CTB Speed: -x>
 *   Usable only during CTB. This increases or decreases the target's current
 *   speed by x.
 *
 *   <CTB Speed: +x%>
 *   <CTB Speed: -x%>
 *   Usable only during CTB. This increases or decreases the target's current
 *   speed or charge by x% of the CTB turn completion target.
 *
 *   <CTB Order: +x>
 *   <CTB Order: -x>
 *   Moves target's position in the turn order by +x or -x. +x will make the
 *   target having to wait more before getting their turn while -x will make
 *   the target having to wait less. The effect is minimal and will only last
 *   for the current turn cycle.
 *   * Note: If you use this for multiple targets, each target will shift turns
 *   individually at a time.
 *
 *   <After CTB: x>
 *   <After CTB: x%>
 *   This will set the skill/item user's CTB speed value to x or x%. If 'x' is
 *   used, this will be the exact CTB value. If x% is used, this will be the
 *   percentage of the CTB turn completion target that it will be at.
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *   <CTB Start: +x>
 *   <CTB Start: +x%>
 *   Usable only during CTB. This will give the actor, class, enemy, weapon,
 *   armor, or state the property of starting battle with X CTB Speed or X% of
 *   the CTB turn completion target.
 *
 *   <CTB Turn: +x>
 *   <CTB Turn: +x%>
 *   Usable only during CTB. This will give the actor, class, enemy, weapon,
 *   armor, or state the property of starting a turn with X CTB Speed or X% of
 *   the CTB turn completion target.
 *
 * ============================================================================
 * Lunatic Mode - Conditional CTB Speed and Conditional CTB Charge
 * ============================================================================
 *
 * For those who have a bit of JavaScript experience and would like to have
 * more unique ways of performing CTB speed and charge changes, you can use the
 * following notetags:
 *
 * Skill and Item Notetags:
 *   <Target CTB Speed Eval>
 *   speed = x;
 *   charge = x;
 *   </Target CTB Speed Eval>
 *   You can omit speed and/or charge. Whatever you set 'speed' to will change
 *   the CTB speed of the target. If the target is charging, 'charge' will
 *   cause the target's charge to change to that value. To make things more
 *   simple, 'max' will be the full gauge value.
 *
 *   Here is an example:
 *
 *   <Target CTB Speed Eval>
 *   speed = target.hp / target.mhp * max;
 *   charge = target.hp / target.mhp * max;
 *   </Target CTB Speed Eval>
 *   The above code will set the user's current CTB gauge to position equal to
 *   the target's HP ratio. If the target has 25% HP, the CTB gauge will go to
 *   25% full for the target.
 *
 *   --- --- --- --- ---
 * 
 *   <Target CTB Order Eval>
 *   order = x;
 *   </Target CTB Order Eval>
 *   Set the 'order' variable to how much you want to alter the target's
 *   current turn order by. If 'order' is positive, the order will need to wait
 *   that many more turns before its turn comes up. If 'order' is negative, it
 *   will will that amount of turns less before the order comes up.
 *
 *   Here is an example:
 *
 *   <Target CTB Order Eval>
 *   if (target.hp > 1000) {
 *     order = 3;
 *   } else {
 *     order = -1;
 *   }
 *   </Target CTB Order Eval>
 *   If the target when attacked has over 1000 HP left, the target will have to
 *   wait 3 more turns before its turn arrives. If the target has 1000 or less,
 *   the target actually waits 1 less turn.
 * 
 *   --- --- --- --- ---
 *
 *   <After CTB Eval>
 *   speed = x;
 *   </After CTB Eval>
 *   This is the CTB set after the user has used the skill/item and the custom
 *   CTB amount you want the user to be at after. 'max' be the value of the
 *   full gauge value. Whatever you set 'speed', the user's CTB speed value
 *   will change to that much:
 *
 *   Here is an example:
 *
 *   <After CTB Eval>
 *   speed = user.mp / user.mmp * max;
 *   </After CTB Eval>
 *   The above code will set the user's CTB gauge after using the skill/item to
 *   equal the user's MP ratio. If the user has 25% MP, the CTB gauge will go
 *   to 25% full for the user.
 *
 * ============================================================================
 * Yanfly Engine Plugins - Battle Engine Extension - Action Sequence Commands
 * ============================================================================
 *
 * You can make use of these extra CTB related action sequences.
 *
 *=============================================================================
 * CTB ORDER: target, +X
 * CTB ORDER: target, -X
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usable only for CTB. Moves target's position in the turn order by +x or -x.
 * +x will make the target having to wait more before getting their turn while
 * -x will make the target having to wait less. The effect is minimal and will
 * only last for the current turn cycle.
 * * Note: If you use this for multiple targets, each target will shift turns
 * individually at a time.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: ctb order: target, -2
 *                ctb order: target, +3
 *=============================================================================
 *
 *=============================================================================
 * CTB SPEED: target, X
 * CTB SPEED: target, X%
 * CTB SPEED: targets, +X
 * CTB SPEED: targets, +X%
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usable only for CTB. Sets the target's CTB speed to X or X%. This only
 * applies when the target is filling up its CTB gauge. This will not affect
 * the user to prevent mechanical issues.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: ctb speed: targets, +5000
 *                ctb speed: target, -50%
 *=============================================================================
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.17:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.16:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.15:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.14a:
 * - Updated check for CTB Charging. Units in the turn order will not be
 * considered 'ready' unless they are in the front of the CTB Turn Order.
 *
 * Version 1.13:
 * - Timing has been changed for states that update turns at Turn Start. Now,
 * the states will update prior to the actor's command box opening or the enemy
 * make a decision on which action it will use.
 *
 * Version 1.12:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.11:
 * - Counterattacks no longer cause turn order inconsistencies.
 *
 * Version 1.10a:
 * - Updated plugin to update the AI more accordingly with Battle AI Core.
 * - Optimized CTB Turn Order further to reduce lag when there are larger
 * quantities of battle members.
 *
 * Version 1.09:
 * - Fixed a bug where forced actions clear out an action's effects before the
 * turn is over, making post-turn effects to not occur.
 *
 * Version 1.08a:
 * - Fixed a bug where changing back and forth between the Fight/Escape window
 * would prompt on turn start effects.
 * - Made an update where if using Battle Engine Core's "Lower Windows" to
 * false, the icons no longer show above the windows.
 *
 * Version 1.07:
 * - Made a mechanic change so that turn 0 ends immediately upon battle start
 * rather than requiring a full turn to end.
 *
 * Version 1.06:
 * - Fixed a bug that would cause a crash when a party member leaves the party.
 *
 * Version 1.05c:
 * - Implemented a Forced Action queue list. This means if a Forced Action
 * takes place in the middle of an action, the action will resume after the
 * forced action finishes rather than cancels it out like MV does.
 * - Fixed a graphical issue where enemies appearing midway don't have letters
 * attached to their icons.
 * - Added a fail safe for loaded saves that did not have CTB installed before.
 *
 * Version 1.04:
 * - Added a speed position check for Instant Casts to maintain order position.
 *
 * Version 1.03:
 * - Fixed a bug that doesn't update state turns properly.
 * - Removed 'Turn Structure parameter' as it goes against the nature of a
 * Tick-Based battle system.
 *
 * Version 1.02:
 * - Added failsafe for battlers without actions.
 * - Added speed rebalance formulas for tick-based systems (innate).
 * - Added <Class x CTB Icon: y> and <classname CTB Icon: x> notetags.
 *
 * Version 1.01:
 * - Provided loop breaks to prevent lock-ups with non-Yanfly plugins.
 * - Added 'Icon Size' parameter to allow customization of icon sizes.
 *
 * Version 1.00:
 * - It's doooooooooone!
 */
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

if (Yanfly.BEC.version && Yanfly.BEC.version >= 1.42) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_BattleSysCTB');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.CTBPerTick = String(Yanfly.Parameters['Per Tick']);
Yanfly.Param.CTBInitSpeed = String(Yanfly.Parameters['Initial Speed']);
Yanfly.Param.CTBFullGauge = String(Yanfly.Parameters['Full Gauge']);
Yanfly.Param.CTBPreEmptive = Number(Yanfly.Parameters['Pre-Emptive Bonuses']);
Yanfly.Param.CTBSurprise = Number(Yanfly.Parameters['Surprise Bonuses']);

Yanfly.Param.CTBEscapeRatio = String(Yanfly.Parameters['Escape Ratio']);
Yanfly.Param.CTBEscapeBoost = Number(Yanfly.Parameters['Fail Escape Boost']);

Yanfly.Param.CTBFullTurn = String(Yanfly.Parameters['Full Turn']);
Yanfly.Param.CTBTurnStructure = false;

Yanfly.Param.CTBRubberband = String(Yanfly.Parameters['Enable Rubberband']);
Yanfly.Param.CTBMinSpeed = String(Yanfly.Parameters['Minimum Speed']);
Yanfly.Param.CTBMaxSpeed = String(Yanfly.Parameters['Maximum Speed']);

Yanfly.Param.CTBReadyName = String(Yanfly.Parameters['Ready Sound']);
Yanfly.Param.CTBReadyVol = Number(Yanfly.Parameters['Ready Volume']);
Yanfly.Param.CTBReadyPitch = Number(Yanfly.Parameters['Ready Pitch']);
Yanfly.Param.CTBReadyPan = Number(Yanfly.Parameters['Ready Pan']);

Yanfly.Param.CTBOptionSpeedTx = String(Yanfly.Parameters['CTB Speed Text']);
Yanfly.Param.CTBDefaultSpeed = Number(Yanfly.Parameters['Default CTB Speed']);

Yanfly.Param.CTBTurnOrder = eval(String(Yanfly.Parameters['Show Turn Order']));
Yanfly.Param.CTBTurnPosY = Number(Yanfly.Parameters['Position Y']);
Yanfly.Param.CTBTurnPosX = String(Yanfly.Parameters['Position X']);
Yanfly.Param.CTBIconSize = Number(Yanfly.Parameters['Icon Size']);
Yanfly.Param.CTBTurnDirection = String(Yanfly.Parameters['Turn Direction']);
Yanfly.Param.CTBColorAllyBr = Number(Yanfly.Parameters['Ally Border Color']);
Yanfly.Param.CTBColorAllyBg = Number(Yanfly.Parameters['Ally Back Color']);
Yanfly.Param.CTBAllyIcon = Number(Yanfly.Parameters['Ally Icon']);
Yanfly.Param.CTBColorEnemyBr = Number(Yanfly.Parameters['Enemy Border Color']);
Yanfly.Param.CTBColorEnemyBg = Number(Yanfly.Parameters['Enemy Back Color']);
Yanfly.Param.CTBColorBackground = Number(Yanfly.Parameters['Background Color']);
Yanfly.Param.CTBEnemyIcon = Number(Yanfly.Parameters['Enemy Icon']);
Yanfly.Param.CTBEnemySVBattler = String(Yanfly.Parameters['Enemy SV Battlers']);
Yanfly.Param.CTBEnemySVBattler = eval(Yanfly.Param.CTBEnemySVBattler);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.CTB.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.CTB.DataManager_isDatabaseLoaded.call(this)) return false;
    this.processCTBNotetagsC($dataClasses);
    this.processCTBNotetags1($dataSkills);
    this.processCTBNotetags1($dataItems);
    this.processCTBNotetags2($dataActors);
    this.processCTBNotetags2($dataClasses);
    this.processCTBNotetags2($dataEnemies);
    this.processCTBNotetags2($dataWeapons);
    this.processCTBNotetags2($dataArmors);
    this.processCTBNotetags2($dataStates);
    this.processCTBNotetags3($dataActors, true);
    this.processCTBNotetags3($dataEnemies, false);
    return true;
};

DataManager.processCTBNotetagsC = function(group) {
  if (Yanfly.ClassIdRef) return;
  Yanfly.ClassIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.ClassIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processCTBNotetags1 = function(group) {
  var noteA1 = /<(?:CTB SPEED):[ ](\d+)>/i;
  var noteA2 = /<(?:CTB SPEED):[ ]([\+\-]\d+)>/i;
  var noteA3 = /<(?:CTB SPEED):[ ](\d+)([%％])>/i;
  var noteA4 = /<(?:CTB SPEED):[ ]([\+\-]\d+)([%％])>/i;
  var noteB1 = /<(?:CTB ORDER):[ ]([\+\-]\d+)>/i;
  var noteS1 = /<(?:AFTER CTB):[ ](\d+)>/i;
  var noteS2 = /<(?:AFTER CTB):[ ](\d+)([%％])>/i;
    for (var n = 1; n < group.length; n++) {
      var obj = group[n];
      var notedata = obj.note.split(/[\r\n]+/);

      obj.setCTBGaugeFlat = undefined;
      obj.addCTBGaugeFlat = 0;
      obj.setCTBGaugeRate = undefined;
      obj.addCTBGaugeRate = 0.0;
      obj.ctbOrderModifier = 0;
      obj.afterCTBFlat = undefined;
      obj.afterCTBRate = undefined;
      var evalMode = 'none';
      obj.ctbEval = '';
      obj.ctbOrderEval = '';
      obj.ctbAfterEval = '';
      obj.ctbHelp = undefined;

      for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (line.match(noteA1)) {
          obj.setCTBGaugeFlat = parseInt(RegExp.$1);
        } else if (line.match(noteA2)) {
          obj.addCTBGaugeFlat = parseInt(RegExp.$1);
        } else if (line.match(noteA3)) {
          obj.setCTBGaugeRate = parseFloat(RegExp.$1 * 0.01);
        } else if (line.match(noteA4)) {
          obj.addCTBGaugeRate = parseFloat(RegExp.$1 * 0.01);
        } else if (line.match(noteB1)) {
          obj.ctbOrderModifier = parseInt(RegExp.$1);
        } else if (line.match(noteS1)) {
          obj.afterCTBFlat = parseInt(RegExp.$1);
        } else if (line.match(noteS2)) {
          obj.afterCTBRate = parseFloat(RegExp.$1 * 0.01);
        } else if (line.match(/<(?:TARGET CTB SPEED EVAL)>/i)) {
          evalMode = 'ctb speed eval';
        } else if (line.match(/<\/(?:TARGET CTB SPEED EVAL)>/i)) {
          evalMode = 'none';
        } else if (line.match(/<(?:TARGET CTB ORDER EVAL)>/i)) {
          evalMode = 'ctb order eval';
        } else if (line.match(/<\/(?:TARGET CTB ORDER EVAL)>/i)) {
          evalMode = 'none';
        } else if (line.match(/<(?:AFTER CTB EVAL)>/i)) {
          evalMode = 'after ctb eval';
        } else if (line.match(/<\/(?:AFTER CTB EVAL)>/i)) {
          evalMode = 'none';
        } else if (line.match(/<(?:CTB HELP)>/i)) {
          evalMode = 'ctb help';
          obj.ctbHelp = '';
        } else if (line.match(/<\/(?:CTB HELP)>/i)) {
          evalMode = 'none';
        } else if (evalMode === 'ctb help') {
          obj.ctbHelp = obj.ctbHelp + line + '\n';
        } else if (evalMode === 'ctb speed eval') {
          obj.ctbEval = obj.ctbEval + line + '\n';
        } else if (evalMode === 'ctb order eval') {
          obj.ctbOrderEval = obj.ctbOrderEval + line + '\n';
        } else if (evalMode === 'after ctb eval') {
          obj.ctbAfterEval = obj.ctbAfterEval + line + '\n';
        }
      }
    }
};

DataManager.processCTBNotetags2 = function(group) {
  var noteA1 = /<(?:CTB START):[ ]([\+\-]\d+)>/i;
  var noteA2 = /<(?:CTB START):[ ]([\+\-]\d+)([%％])>/i;
  var noteB1 = /<(?:CTB TURN):[ ]([\+\-]\d+)>/i;
  var noteB2 = /<(?:CTB TURN):[ ]([\+\-]\d+)([%％])>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.ctbStartFlat = 0;
    obj.ctbStartRate = 0;
    obj.ctbTurnFlat = 0;
    obj.ctbTurnRate = 0;
    var evalMode = 'none';
    obj.ctbHelp = undefined;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(noteA1)) {
        obj.ctbStartFlat = parseInt(RegExp.$1);
      } else if (line.match(noteA2)) {
        obj.ctbStartRate = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(noteB1)) {
        obj.ctbTurnFlat = parseInt(RegExp.$1);
      } else if (line.match(noteB2)) {
        obj.ctbTurnRate = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(/<(?:CTB HELP)>/i)) {
        evalMode = 'ctb help';
        obj.ctbHelp = '';
      } else if (line.match(/<\/(?:CTB HELP)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'ctb help') {
        obj.ctbHelp = obj.ctbHelp + line + '\n';
      }
    }
  }
};

DataManager.processCTBNotetags3 = function(group, isActor) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);
    
    if (isActor) obj.ctbIcon = Yanfly.Param.CTBAllyIcon;
    if (isActor) obj.ctbBorderColor = Yanfly.Param.CTBColorAllyBr;
    if (isActor) obj.ctbBackgroundColor = Yanfly.Param.CTBColorAllyBg;
    if (isActor) obj.ctbClassIcon = {};
    if (!isActor) obj.ctbIcon = Yanfly.Param.CTBEnemyIcon;
    if (!isActor) obj.ctbBorderColor = Yanfly.Param.CTBColorEnemyBr;
    if (!isActor) obj.ctbBackgroundColor = Yanfly.Param.CTBColorEnemyBg;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:CTB ICON):[ ](\d+)>/i)) {
        obj.ctbIcon = parseInt(RegExp.$1);
      } else if (line.match(/<(?:CTB BORDER COLOR):[ ](\d+)>/i)) {
        obj.ctbBorderColor = parseInt(RegExp.$1);
      } else if (line.match(/<(?:CTB BACKGROUND COLOR):[ ](\d+)>/i)) {
        obj.ctbBackgroundColor = parseInt(RegExp.$1);
      } else if (line.match(/<(?:CLASS)[ ](\d+)[ ](?:CTB ICON):[ ](\d+)>/i)) {
        var classId = parseInt(RegExp.$1);
        var icon = parseInt(RegExp.$2);
        obj.ctbClassIcon[classId] = icon;
      } else if (line.match(/<(.*)[ ](?:CTB ICON):[ ](\d+)>/i)) {
        var name = String(RegExp.$1).toUpperCase();
        var icon = parseInt(RegExp.$2);
        var classId = Yanfly.ClassIdRef[name];
        if (classId) obj.ctbClassIcon[classId] = icon;
      }
    }
  }
};

//=============================================================================
// BattleManager
//=============================================================================

BattleManager.isCTB = function() {
    return this.isBattleSystem('ctb');
};

Yanfly.CTB.BattleManager_isTurnBased = BattleManager.isTurnBased;
BattleManager.isTurnBased = function() {
    if (this.isCTB()) return false;
    return Yanfly.CTB.BattleManager_isTurnBased.call(this);
};

BattleManager.ctbTickRate = function() {
    var rate = 0.1 * ConfigManager.ctbSpeed;
    return rate;
};

Yanfly.CTB.BattleManager_makeEscapeRatio = BattleManager.makeEscapeRatio;
BattleManager.makeEscapeRatio = function() {
  if (this.isCTB()) {
    var code = Yanfly.Param.CTBEscapeRatio;
    try {
      this._escapeRatio = eval(code);
    } catch (e) {
      this._escapeRatio = 0;
      Yanfly.Util.displayError(e, code, 'CTB ESCAPE RATIO ERROR');
    }
    var code = Yanfly.Param.CTBEscapeBoost;
    try {
      this._escapeFailBoost = eval(code);
    } catch (e) {
      this._escapeFailBoost = 0;
      Yanfly.Util.displayError(e, code, 'CTB ESCAPE BOOST ERROR');
    }
  } else {
    this._escapeFailBoost = 0.1;
    Yanfly.CTB.BattleManager_makeEscapeRatio.call(this);
  }
};

Yanfly.CTB.BattleManager_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function() {
    Yanfly.CTB.BattleManager_startBattle.call(this);
    if (this.isCTB()) {
      this._phase = null;
      this._counterAttacking = false;
      this.ctbTicksToReadyClear();
      this.startCTB();
    }
};

Yanfly.CTB.BattleManager_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
    Yanfly.CTB.BattleManager_endBattle.call(this, result);
    this.ctbTicksToReadyClear();
    this.clearCTBData();
};

BattleManager.startCTB = function() {
    if (this._phase === 'battleEnd') return;
    this.clearCTBData();
    this._ctbTarget = Math.max(1, eval(Yanfly.Param.CTBFullGauge));
    this._ctbFullTurn = Math.max(1, eval(Yanfly.Param.CTBFullTurn));
    this._ctbRubberband = eval(Yanfly.Param.CTBRubberband);
    if (this.ctbRubberband()) {
      this._ctbMinimumSpeed = Math.max(1, eval(Yanfly.Param.CTBMinSpeed));
      this._ctbMaximumSpeed = Math.max(1, eval(Yanfly.Param.CTBMaxSpeed));
    }
    this._ctbTicks = this._ctbFullTurn;
    this._ctbReadySound = {
      name: Yanfly.Param.CTBReadyName,
      volume: Yanfly.Param.CTBReadyVol,
      pitch: Yanfly.Param.CTBReadyPitch,
      pan: Yanfly.Param.CTBReadyPan
    }
    $gameParty.onCTBStart();
    $gameTroop.onCTBStart();
    this._phase = 'start';
};

BattleManager.clearCTBData = function() {
    this._highestBaseAgi = undefined;
    this._averageBaseAgi = undefined;
    this._lowestBaseAgi = undefined;
    this._ctbTarget = undefined;
    this._ctbCharge = undefined;
    this._ctbTarget = undefined;
    this._ctbCharge = undefined;
    this._ctbFullTurn = undefined;
    this._ctbRubberband = undefined;
    this._ctbMinimumSpeed = undefined;
    this._ctbMaximumSpeed = undefined;
    this._ctbTicks = 0;
};

BattleManager.ctbTarget = function() {
    if (!this._ctbTarget) this.startCTB();
    return this._ctbTarget;
};

BattleManager.ctbRubberband = function() {
    return this._ctbRubberband;
};

BattleManager.ctbMinimumSpeed = function() {
    return this._ctbMinimumSpeed;
};

BattleManager.ctbMaximumSpeed = function() {
    return this._ctbMaximumSpeed;
};

BattleManager.highestBaseAgi = function() {
    if (this._highestBaseAgi) return this._highestBaseAgi;
    var agi = 0;
    for (var i = 0; i < $gameParty.battleMembers().length; ++i) {
      var battler = $gameParty.battleMembers()[i];
      if (battler) agi = Math.max(agi, battler.agi);
    }
    for (var i = 0; i < $gameTroop.members().length; ++i) {
      var battler = $gameTroop.members()[i];
      if (battler) agi = Math.max(agi, battler.agi);
    }
    this._highestBaseAgi = agi;
    return this._highestBaseAgi;
};

BattleManager.averageBaseAgi = function() {
    if (this._averageBaseAgi) return this._averageBaseAgi;
    var agi = 0;
    for (var i = 0; i < $gameParty.battleMembers().length; ++i) {
      var battler = $gameParty.battleMembers()[i];
      if (battler) agi += battler.agi;
    }
    for (var i = 0; i < $gameTroop.members().length; ++i) {
      var battler = $gameTroop.members()[i];
      if (battler) agi += battler.agi;
    }
    var sum = $gameParty.battleMembers().length;
    sum += $gameTroop.members().length;
    this._averageBaseAgi = agi / sum;
    return this._averageBaseAgi;
};

BattleManager.lowestBaseAgi = function() {
    if (this._lowestBaseAgi) return this._lowestBaseAgi;
    var agi = this.highestBaseAgi();
    for (var i = 0; i < $gameParty.battleMembers().length; ++i) {
      var battler = $gameParty.battleMembers()[i];
      if (battler) agi = Math.min(agi, battler.agi);
    }
    for (var i = 0; i < $gameTroop.members().length; ++i) {
      var battler = $gameTroop.members()[i];
      if (battler) agi = Math.min(agi, battler.agi);
    }
    this._lowestBaseAgi = agi;
    return this._lowestBaseAgi;
};

BattleManager.ctbTurnOrder = function() {
    var battlers = $gameParty.aliveMembers().concat($gameTroop.aliveMembers());
    battlers.sort(function(a, b) {
      if (a.ctbTicksToReady() > b.ctbTicksToReady()) return 1;
      if (a.ctbTicksToReady() < b.ctbTicksToReady()) return -1;
      return 0;
    });
    return battlers;
};

BattleManager.ctbTicksToReadyClear = function() {
    var length = this.allBattleMembers().length;
    for (var i = 0; i < length; ++i) {
      var member = this.allBattleMembers()[i];
      if (member) member._ctbTicksToReady = undefined;
    }
};

Yanfly.CTB.BattleManager_update = BattleManager.update;
BattleManager.update = function() {
    if (this.isCTB()) {
      if (this.isBusy()) return;
      if (this.updateEvent()) return;
      if (this._phase === 'battleEnd') {
        return Yanfly.CTB.BattleManager_update.call(this);
      }
      if (this.checkBattleEnd()) return;
      if (this._phase === 'ctb') {
        this.updateCTBPhase();
      } else {
        Yanfly.CTB.BattleManager_update.call(this);
      }
    } else {
      Yanfly.CTB.BattleManager_update.call(this);
    }
};

Yanfly.CTB.BattleManager_updateEventMain = BattleManager.updateEventMain;
BattleManager.updateEventMain = function() {
    if (this.isCTB()) {
      $gameTroop.updateInterpreter();
      $gameParty.requestMotionRefresh();
      if ($gameTroop.isEventRunning()) {
          return true;
      }
      $gameTroop.setupBattleEvent();
      if ($gameTroop.isEventRunning() || SceneManager.isSceneChanging()) {
          return true;
      }
      return false;
    } else {
      return Yanfly.CTB.BattleManager_updateEventMain.call(this);
    }
};

BattleManager.updateCTBPhase = function() {
    this._ctbLoops = 0;
    for (;;) {
      if (this.breakCTBPhase()) break;
      var chargedBattler = this.getChargedCTBBattler();
      if (chargedBattler) return this.startCTBAction(chargedBattler);
      var readyBattler = this.getReadyCTBBattler();
      if (readyBattler) {
        return this.startCTBInput(readyBattler);
      } else {
        if (this.updateCTBTicks()) break;
        this.updateBattlerCTB();
      }
    }
};

BattleManager.breakCTBPhase = function() {
    if (this._victoryPhase) return true;
    if (this._processingForcedAction) return true;
    if ($gameTroop.isEventRunning()) return true;
    if (++this._ctbLoops >= 1000000) return true;
    return this._phase !== 'ctb';
};

BattleManager.updateCTBTicks = function() {
    this._ctbTicks += 1 * this.tickRate();
    if (this._ctbTicks < this._ctbFullTurn) return false;
    this._ctbTicks = 0;
    $gameTroop.increaseTurn();
    this.endTurn();
    return true;
};

BattleManager.getChargedCTBBattler = function() {
    if ($gameParty.aliveMembers() <= 0 || $gameTroop.aliveMembers() <= 0) {
      return false;
    }
    var fastest = false;
    for (var i = 0; i < this.allBattleMembers().length; ++i) {
      var battler = this.allBattleMembers()[i];
      if (!battler) continue;
      if (!this.isBattlerCTBCharged(battler)) continue;
      if (!fastest) {
        fastest = battler;
      } else if (battler.ctbTicksToReady() < fastest.ctbTicksToReady()) {
        fastest = battler;
      }
    }
    return fastest;
};

BattleManager.isBattlerCTBCharged = function(battler) {
    if (!battler.isCTBCharging()) return false;
    if (battler.isConfused()) {
      battler.makeActions();
      if (battler.isActor()) battler.makeConfusionActions();
    }
    if (battler.ctbChargeRate() < 1) return false;
    if (battler.ctbTurnOrder() > 0) return false;
    return battler.currentAction() && battler.currentAction().item();
};

BattleManager.getReadyCTBBattler = function() {
    var fastest = false;
    for (var i = 0; i < this.allBattleMembers().length; ++i) {
      var battler = this.allBattleMembers()[i];
      if (!battler) continue;
      if (!this.isBattlerCTBReady(battler)) continue;
      if (!fastest) {
        fastest = battler;
      } else if (battler.ctbTicksToReady() < fastest.ctbTicksToReady()) {
        fastest = battler;
      }
    }
    return fastest;
};

BattleManager.isBattlerCTBReady = function(battler) {
    if (battler.ctbRate() < 1) return false;
    if (battler.isCTBCharging()) return false;
    if (battler.ctbTurnOrder() > 0) return false;
    if (battler.currentAction() && battler.currentAction().item()) {
      this._subject = battler;
      battler.makeActions();
      battler.setupCTBCharge();
      return true;
    }
    return true;
};

BattleManager.updateBattlerCTB = function() {
    $gameParty.updateTick();
    $gameTroop.updateTick();
};

BattleManager.setCTBPhase = function() {
    this._phase = 'ctb';
};

Yanfly.CTB.BattleManager_startInput = BattleManager.startInput;
BattleManager.startInput = function() {
    if (this.isCTB()) {
      this.setCTBPhase();
    } else {
      Yanfly.CTB.BattleManager_startInput.call(this);
    }
};

Yanfly.CTB.BattleManager_selectNextCommand = BattleManager.selectNextCommand;
BattleManager.selectNextCommand = function() {
    if (this.isCTB()) {
      if (!this.actor()) return this.setCTBPhase();
      this.resetNonPartyActorCTB();
      this._subject = this.actor();
      this.actor().setupCTBCharge();
      if (this.actor().isCTBCharging()) {
        this.actor().spriteStepBack();
        this.actor().requestMotionRefresh();
        this._actorIndex = undefined;
        this.setCTBPhase();
      } else if (this.isValidCTBActorAction()) {
        this.startCTBAction(this.actor());
      } else {
        if (this.actor()) this.ctbSkipTurn();
        $gameParty.requestMotionRefresh();
        this.setCTBPhase();
      }
    } else {
      Yanfly.CTB.BattleManager_selectNextCommand.call(this);
    }
};

BattleManager.ctbSkipTurn = function() {
    this.actor().clearActions();
    this.actor().setActionState('undecided');
    this.actor().requestMotionRefresh();
    if (!this._bypassCtbEndTurn) this.actor().endTurnAllCTB();
    this.actor().spriteStepBack();
};

BattleManager.isValidCTBActorAction = function() {
    if (!this.actor()) return false;
    if (!this.actor().currentAction()) return false;
    return this.actor().currentAction().item();
};

BattleManager.resetNonPartyActorCTB = function() {
    for (var i = 0; i < $gameParty.allMembers().length; ++i) {
      var actor = $gameParty.allMembers()[i];
      if (!actor) continue;
      if ($gameParty.battleMembers().contains(actor)) continue;
      actor.resetAllCTB();
    }
};

Yanfly.CTB.BattleManager_selectPreviousCommand =
    BattleManager.selectPreviousCommand;
BattleManager.selectPreviousCommand = function() {
    if (this.isCTB()) {
      if (this.actor()) this.actor().spriteStepBack();
      var actorIndex = this._actorIndex;
      var scene = SceneManager._scene;
      this._bypassCtbEndTurn = true;
      scene.startPartyCommandSelection();
      this._bypassCtbEndTurn = undefined;
      this._actorIndex = actorIndex;
    } else {
      Yanfly.CTB.BattleManager_selectPreviousCommand.call(this);
    }
};

Yanfly.CTB.BattleManager_startTurn = BattleManager.startTurn;
BattleManager.startTurn = function() {
    if (this.isCTB() && !this.isTurnBased()) return;
    Yanfly.CTB.BattleManager_startTurn.call(this);
};

Yanfly.CTB.BattleManager_updateTurnEnd = BattleManager.updateTurnEnd;
BattleManager.updateTurnEnd = function() {
    if (this.isCTB()) {
      this.setCTBPhase();
    } else {
      Yanfly.CTB.BattleManager_updateTurnEnd.call(this);
    }
};

BattleManager.startCTBInput = function(battler) {
    if (battler.isDead()) return;
    battler.onTurnStart();
    battler.makeActions();
    if (battler.isEnemy()) {
      battler.setupCTBCharge();
    } else if (battler.canInput()) {
      this._actorIndex = battler.index();
      this.playCTBReadySound();
      battler.setActionState('inputting');
      battler.spriteStepForward();
      this._phase = 'input';
      return;
    } else if (battler.isConfused()) {
      battler.makeConfusionActions();
      battler.setupCTBCharge();
    } else {
      battler.makeAutoBattleActions();
      battler.setupCTBCharge();
    }
    if (battler.isCTBCharging()) {
      this.setCTBPhase();
    } else {
      this.startCTBAction(battler);
    }
};

BattleManager.playCTBReadySound = function() {
    AudioManager.playSe(this._ctbReadySound);
};

BattleManager.startCTBAction = function(battler) {
    this._subject = battler;
    var action = this._subject.currentAction();
    if (action && action.isValid()) {
      this.startAction();
    } else {
      this.endAction();
    }
};

Yanfly.CTB.BattleManager_processForcedAction =
    BattleManager.processForcedAction;
BattleManager.processForcedAction = function() {
    var forced = false;
    if (this._actionForcedBattler && this.isCTB()) {
      var action = this._actionForcedBattler.currentAction();
      forced = true;
    }
    Yanfly.CTB.BattleManager_processForcedAction.call(this);
    if (forced) this._subject.setAction(0, action);
};

Yanfly.CTB.BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    if (this.isCTB()) {
      this.endCTBAction();
    } else {
      Yanfly.CTB.BattleManager_endAction.call(this);
    }
};

BattleManager.endCTBAction = function() {
    if (Imported.YEP_BattleEngineCore) {
      if (this._processingForcedAction) this._phase = this._preForcePhase;
      this._processingForcedAction = false;
    }
    if (this._subject) this._subject.onAllActionsEnd();
    if (this.updateEventMain()) return;
    this._subject.endTurnAllCTB();
    if (this.loadPreForceActionSettings()) return;
    var chargedBattler = this.getChargedCTBBattler();
    if (chargedBattler) {
      this.startCTBAction(chargedBattler);
    } else {
      this.setCTBPhase();
    }
};

Yanfly.CTB.BattleManager_invokeCounterAttack =
    BattleManager.invokeCounterAttack;
BattleManager.invokeCounterAttack = function(subject, target) {
    if (this.isCTB()) this._counterAttacking = true;
    Yanfly.CTB.BattleManager_invokeCounterAttack.call(this, subject, target);
    if (this.isCTB()) this._counterAttacking = false;
};

BattleManager.isCounterAttacking = function() {
    return this._counterAttacking;
};

Yanfly.CTB.BattleManager_processEscape = BattleManager.processEscape;
BattleManager.processEscape = function() {
    if (this.isCTB()) {
      return this.processEscapeCTB();
    } else {
      return Yanfly.CTB.BattleManager_processEscape.call(this);
    }
};

BattleManager.processEscapeCTB = function() {
  $gameParty.performEscape();
  SoundManager.playEscape();
  var success = this._preemptive ? true : (Math.random() < this._escapeRatio);
  if (success) {
      $gameParty.removeBattleStates();
      $gameParty.performEscapeSuccess();
      this.displayEscapeSuccessMessage();
      this._escaped = true;
      this.processAbort();
  } else {
      this.actor().spriteStepBack();
      this.actor().clearActions();
      this.displayEscapeFailureMessage();
      this._escapeRatio += this._escapeFailBoost;
      this.startTurn();
      this.processFailEscapeCTB();
  }
  return success;
};

BattleManager.processFailEscapeCTB = function() {
    var actor = $gameParty.members()[this._actorIndex];
    if (!actor) return;
    actor.resetAllCTB();
};

BattleManager.redrawCTBIcons = function() {
    var max = $gameTroop.members().length;
    for (var i = 0; i < max; ++i) {
      var member = $gameTroop.members()[i];
      if (!member) continue;
      if (!member.battler()._ctbIcon) continue;
      member.battler()._ctbIcon.forceRedraw();
    }
};

Yanfly.CTB.BattleManager_processActionSequence =
  BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs) {
  if (this.isCTB()) {
    // CTB SPEED
    if (actionName === 'CTB SPEED') {
        this.actionCTBCharge(actionArgs);
      return this.actionCTBSpeed(actionArgs);
    }
    // CTB ORDER
    if (actionName === 'CTB ORDER') {
      return this.actionCTBOrder(actionArgs);
    }
  }
  return Yanfly.CTB.BattleManager_processActionSequence.call(this,
    actionName, actionArgs);
};

BattleManager.actionCTBCharge = function(actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return true;
    var cmd = actionArgs[1];
    if (cmd.match(/([\+\-]\d+)([%％])/i)) {
      var rate = parseFloat(RegExp.$1 * 0.01);
      for (var i = 0; i < targets.length; ++i) {
        var target = targets[i];
        if (!target) continue;
        if (target === this._subject) continue;
        if (!target.isCTBCharging()) continue;
        var max = target.ctbChargeDestination();
        var value = rate * max + target.ctbCharge();
        target.setCTBCharge(value);
        target.refresh();
      }
    } else if (cmd.match(/([\+\-]\d+)/i)) {
      var plus = parseInt(RegExp.$1);
      for (var i = 0; i < targets.length; ++i) {
        var target = targets[i];
        if (!target) continue;
        if (target === this._subject) continue;
        if (!target.isCTBCharging()) continue;
        var value = plus + target.ctbCharge();
        target.setCTBCharge(value);
        target.refresh();
      }
    } else if (cmd.match(/(\d+)([%％])/i)) {
      var rate = parseFloat(RegExp.$1 * 0.01);
      for (var i = 0; i < targets.length; ++i) {
        var target = targets[i];
        if (!target) continue;
        if (target === this._subject) continue;
        if (!target.isCTBCharging()) continue;
        var max = target.ctbChargeDestination();
        var value = rate * max;
        target.setCTBCharge(value);
        target.refresh();
      }
    } else if (cmd.match(/(\d+)/i)) {
      var value = parseInt(RegExp.$1);
      for (var i = 0; i < targets.length; ++i) {
        var target = targets[i];
        if (!target) continue;
        if (target === this._subject) continue;
        if (!target.isCTBCharging()) continue;
        target.setCTBCharge(value);
        target.refresh();
      }
    }
    return true;
};

BattleManager.actionCTBSpeed = function(actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return true;
    var cmd = actionArgs[1];
    if (cmd.match(/([\+\-]\d+)([%％])/i)) {
      var rate = parseFloat(RegExp.$1 * 0.01);
      var max = this.ctbTarget();
      for (var i = 0; i < targets.length; ++i) {
        var target = targets[i];
        if (!target) continue;
        if (target === this._subject) continue;
        if (target.isCTBCharging()) continue;
        var value = rate * max + target.ctbSpeed();
        target.setCTBSpeed(value);
        target.refresh();
      }
    } else if (cmd.match(/([\+\-]\d+)/i)) {
      var plus = parseInt(RegExp.$1);
      for (var i = 0; i < targets.length; ++i) {
        var target = targets[i];
        if (!target) continue;
        if (target === this._subject) continue;
        if (target.isCTBCharging()) continue;
        var value = plus + target.ctbSpeed();
        target.setCTBSpeed(value);
        target.refresh();
      }
    } else if (cmd.match(/(\d+)([%％])/i)) {
      var rate = parseFloat(RegExp.$1 * 0.01);
      var max = this.ctbTarget();
      for (var i = 0; i < targets.length; ++i) {
        var target = targets[i];
        if (!target) continue;
        if (target === this._subject) continue;
        if (target.isCTBCharging()) continue;
        var value = rate * max;
        target.setCTBSpeed(value);
        target.refresh();
      }
    } else if (cmd.match(/(\d+)/i)) {
      var value = parseInt(RegExp.$1);
      for (var i = 0; i < targets.length; ++i) {
        var target = targets[i];
        if (!target) continue;
        if (target === this._subject) continue;
        if (target.isCTBCharging()) continue;
        target.setCTBSpeed(value);
        target.refresh();
      }
    }
    return true;
};

BattleManager.actionCTBOrder = function(actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return true;
    var value = parseInt(actionArgs[1]);
    for (var i = 0; i < targets.length; ++i) {
      var target = targets[i];
      if (!target) continue;
      target.ctbAlterTurnOrder(value);
    }
    return true;
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.CTB.Game_Action_applyItemUserEffect =
    Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Yanfly.CTB.Game_Action_applyItemUserEffect.call(this, target);
    if (BattleManager.isCTB() && $gameParty.inBattle()) {
      this.applyItemCTBEffect(target);
    }
};

Game_Action.prototype.applyItemCTBEffect = function(target) {
  if (!target) return;
  this.applyItemCTBOrderEffect(target);
  this.applyItemCTBOrderEvalEffect(target);
  this.applyItemCTBSetEffects(target);
  this.applyItemCTBAddEffects(target);
  this.applyItemCTBEvalEffect(target);
  if (BattleManager.isCounterAttacking()) return;
  this.rebalanceCTBSpeed(target);
};

Game_Action.prototype.applyItemCTBOrderEffect = function(target) {
    var item = this.item();
    if (!item) return;
    if (item.ctbOrderModifier === 0) return;
    target.ctbAlterTurnOrder(item.ctbOrderModifier);
};

Game_Action.prototype.applyItemCTBSetEffects = function(target) {
  var item = this.item();
  if (!item) return;
  var value = undefined;
  if (target.isCTBCharging()) {
    var max = target.ctbChargeDestination();
    if (item.setCTBGaugeFlat !== undefined) {
      value = item.setCTBGaugeFlat;
    } else if (item.setCTBGaugeRate !== undefined) {
      value = item.setCTBGaugeRate * max;
    }
    if (value !== undefined) target.setCTBCharge(value);
  } else {
    var max = BattleManager.ctbTarget();
    if (item.setCTBGaugeFlat !== undefined) {
      value = item.setCTBGaugeFlat;
    } else if (item.setCTBGaugeRate !== undefined) {
      value = item.setCTBGaugeRate * max;
    }
    if (value !== undefined) target.setCTBSpeed(value);
  }
};

Game_Action.prototype.applyItemCTBAddEffects = function(target) {
    var item = this.item();
    if (!item) return;
    if (target.isCTBCharging()) {
      var value = target.ctbCharge();
      var max = target.ctbChargeDestination();
      value += item.addCTBGaugeRate * max;
      value += item.addCTBGaugeFlat;
      target.setCTBCharge(value);
    } else {
      var value = target.ctbSpeed();
      var max = BattleManager.ctbTarget()
      value += item.addCTBGaugeRate * max;
      value += item.addCTBGaugeFlat;
      target.setCTBSpeed(value);
    }
};

Game_Action.prototype.applyItemCTBEvalEffect = function(target) {
    if (this.item().ctbEval === '') return;
    var a = this.subject();
    var user = this.subject();
    var b = target;
    var item = this.item();
    var skill = this.item();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var speed = target.ctbSpeed();
    var charge = target.ctbCharge();
    if (target.isCTBCharging()) {
      var max = target.ctbChargeDestination();
    } else {
      var max = BattleManager.ctbTarget();
    }
    var code = item.ctbEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CTB EVAL ERROR');
    }
    target.setCTBSpeed(speed);
    target.setCTBCharge(charge);
};

Game_Action.prototype.applyItemCTBOrderEvalEffect = function(target) {
    if (this.item().ctbOrderEval === '') return;
    var a = this.subject();
    var user = this.subject();
    var b = target;
    var item = this.item();
    var skill = this.item();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var order = 0;
    var code = item.ctbOrderEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CTB ORDER EVAL ERROR');
    }
    target.ctbAlterTurnOrder(order);
};

Game_Action.prototype.rebalanceCTBSpeed = function(target) {
    var speed = this.subject().ctbSpeed();
    var offset = 00000000001;
    speed = Math.max(speed + offset, target.ctbSpeed() + target.ctbCharge());
    this.subject().setCTBSpeed(speed);
};

//=============================================================================
// Game_Battlerbase
//=============================================================================

Yanfly.CTB.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function() {
    if (BattleManager.isCTB() && $gameParty.inBattle()) {
      BattleManager.ctbTicksToReadyClear();
      this._ctbTickValue = undefined;
      this.clearCTBCommandWindowCache();
    }
    Yanfly.CTB.Game_BattlerBase_refresh.call(this);
};

Game_BattlerBase.prototype.clearCTBCommandWindowCache = function() {
    this._commandWindowIndex = undefined;
    this._commandWindowItem = undefined;
    this._skillWindowIndex = undefined;
    this._skillWindowItem = undefined;
    this._itemWindowIndex = undefined;
    this._itemWindowItem = undefined;
};

Yanfly.CTB.Game_BattlerBase_die = Game_BattlerBase.prototype.die;
Game_BattlerBase.prototype.die = function() {
    Yanfly.CTB.Game_BattlerBase_die.call(this);
    if (BattleManager.isCTB() && $gameParty.inBattle()) this.resetAllCTB();
};

Yanfly.CTB.Game_BattlerBase_appear = Game_BattlerBase.prototype.appear;
Game_BattlerBase.prototype.appear = function() {
    Yanfly.CTB.Game_BattlerBase_appear.call(this);
    if (BattleManager.isCTB() && this.isEnemy()) {
      BattleManager.redrawCTBIcons();
    }
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.ctbIcon = function() {
    return 0;
};

Game_Battler.prototype.ctbBorderColor = function() {
    return 0;
};

Game_Battler.prototype.ctbBackgroundColor = function() {
    return 0;
};

Game_Battler.prototype.onCTBStart = function() {
    this._ctbSpeed = eval(Yanfly.Param.CTBInitSpeed);
    this._ctbSpeed += BattleManager.ctbTarget() * this.ctbStartRate();
    this._ctbSpeed += this.ctbStartFlat();
    this._ctbCharge = 0;
    this._ctbCharging = false;
    this._ctbChargeMod = 0;
    this.applyPreemptiveBonusCTB();
    this.applySurpriseBonusCTB();
    this.refresh();
};

Game_Battler.prototype.applyPreemptiveBonusCTB = function() {
    if (!BattleManager._preemptive) return;
    if (!this.isActor()) return;
    var rate = Yanfly.Param.CTBPreEmptive;
    this._ctbSpeed += rate * BattleManager.ctbTarget();
};

Game_Battler.prototype.applySurpriseBonusCTB = function() {
    if (!BattleManager._surprise) return;
    if (!this.isEnemy()) return;
    var rate = Yanfly.Param.CTBSurprise;
    this._ctbSpeed += rate * BattleManager.ctbTarget();
};

Yanfly.CTB.Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function() {
    Yanfly.CTB.Game_Battler_onBattleEnd.call(this);
    this._ctbSpeed = 0;
    this._ctbCharge = 0;
    this._ctbCharging = false;
    this._ctbChargeMod = 0;
    this.clearCTBCommandWindowCache();
};

Game_Battler.prototype.ctbTicksToReady = function() {
    if (this._ctbTicksToReady !== undefined) return this._ctbTicksToReady;
    var goal = BattleManager.ctbTarget();
    if (this.isCTBCharging()) goal += this.ctbChargeDestination();
    goal -= this.ctbSpeed();
    goal -= (this.isCTBCharging()) ? this.ctbCharge() : 0;
    var rate = this.ctbSpeedTick();
    if (this.ctbTicksToReadyActionCheck()) {
      var item = this.ctbTicksToReadyActionCheck();
      if (item.speed < 0) goal -= item.speed;
    }
    this._ctbTicksToReady = goal / Math.max(1, rate);
    return this._ctbTicksToReady;
};

Game_Battler.prototype.ctbTicksToReadyActionCheck = function() {
    if (!BattleManager.isInputting()) return false;
    if (BattleManager.actor() !== this) return false;
    var scene = SceneManager._scene;
    if (scene._skillWindow.active) {
      if (this._skillWindowIndex === scene._skillWindow.index()) {
        return this._skillWindowItem;
      }
      this._skillWindowIndex = scene._skillWindow.index();
      this._skillWindowItem = scene._skillWindow.item();
      return this._skillWindowItem;
    } else if (scene._itemWindow.active) {
      if (this._itemWindowIndex === scene._itemWindow.index()) {
        return this._itemWindowItem;
      }
      this._itemWindowIndex = scene._itemWindow.index();
      this._itemWindowItem = scene._itemWindow.item();
      return this._itemWindowItem;
    } else if (scene._actorCommandWindow.active) {
      if (this._commandWindowIndex === scene._actorCommandWindow.index()) {
        return this._commandWindowItem;
      }
      var win = scene._actorCommandWindow;
      var symbol = win.currentSymbol();
      this._commandWindowIndex = win.index();
      if (symbol === 'attack') {
        this._commandWindowItem = $dataSkills[this.attackSkillId()];
        return this._commandWindowItem;
      } else if (symbol === 'guard') {
        this._commandWindowItem = $dataSkills[this.guardSkillId()];
        return this._commandWindowItem;
      } else {
        this._commandWindowItem = undefined;
        return false;
      }
    }
    if (!this.currentAction()) return false;
    return this.currentAction().item();
};

Game_Battler.prototype.ctbSpeed = function() {
    if (this.isDead()) return -1 * BattleManager.ctbTarget();
    if (this.isHidden()) return -1 * BattleManager.ctbTarget();
    if (this._ctbSpeed === undefined) this.onCTBStart();
    return this._ctbSpeed;
};

Game_Battler.prototype.ctbRate = function() {
    if (this._ctbSpeed === undefined) this.onCTBStart();
    var rate = this._ctbSpeed / BattleManager.ctbTarget();
    return rate.clamp(0, 1);
};

Game_Battler.prototype.isCTBCharging = function() {
    return this._ctbCharging;
};

Game_Battler.prototype.setCTBCharging = function(value) {
    this._ctbCharging = value;
};

Game_Battler.prototype.ctbCharge = function() {
  if (this._ctbCharge === undefined) this.onCTBStart();
  return this._ctbCharge;
};

Game_Battler.prototype.ctbChargeDestination = function() {
    var denom = Math.max(1, -1 * this._ctbChargeMod);
    return denom;
};

Game_Battler.prototype.ctbChargeRate = function() {
    if (this._ctbCharge === undefined) this.onCTBStart();
    if (!this.isCTBCharging()) return 0;
    var rate = this._ctbCharge / this.ctbChargeDestination();
    return rate.clamp(0, 1);
};

Game_Battler.prototype.setCTBSpeed = function(value) {
    this._ctbSpeed = value;
};

Game_Battler.prototype.setCTBCharge = function(value) {
    if (this.isCTBCharging()) this._ctbCharge = value;
};

Game_Battler.prototype.setupCTBCharge = function() {
    if (BattleManager._subject !== this) return;
    if (BattleManager._bypassCtbEndTurn) return;
    if (!this.currentAction()) this.makeActions();
    if (this.currentAction()) {
      var item = this.currentAction().item();
      if (item && item.speed < 0) {
        this.setCTBCharging(true);
        this._ctbChargeMod = item.speed;
        this.setCTBCharge(0);
      } else if (!item) {
        this._ctbChargeMod = 0;
      } else {
        this._ctbChargeMod = 0;
      }
    } else {
      this._ctbChargeMod = 0;
    }
    this.setActionState('waiting');
};

Yanfly.CTB.Game_Battler_updateTick = Game_Battler.prototype.updateTick;
Game_Battler.prototype.updateTick = function() {
    Yanfly.CTB.Game_Battler_updateTick.call(this);
    if (BattleManager.isCTB()) this.updateCTB();
};

Game_Battler.prototype.updateCTB = function() {
    if (this.isDead()) return this.resetAllCTB();
    if (!this.canMove()) {
      this.updateCTBStates();
      return;
    }
    if (this.isCTBCharging()) {
      if (!this.currentAction()) this.resetAllCTB();
      if (this.currentAction() && this.currentAction().item() === null) {
        this.resetAllCTB();
      }
    }
    if (this.isCTBCharging()) {
      var value = this.ctbCharge() + this.ctbSpeedTick();
      this.setCTBCharge(value);
    } else if (this.ctbRate() < 1) {
      var value = this.ctbSpeed() + this.ctbSpeedTick();
      this.setCTBSpeed(value);
    }
};

Game_Battler.prototype.updateCTBStates = function() {
    if (BattleManager.timeBasedBuffs()) return;
    for (var i = 0; i < this._states.length; ++i) {
      var stateId = this._states[i];
      var state = $dataStates[stateId];
      if (!state) continue;
      if (!this._stateTurns[stateId]) continue;
      if (state.restriction >= 4 && state.autoRemovalTiming !== 0) {
	// ★★★ Changed By Sasuke Kannazuki at 2017.Nov.23
	// var value = BattleManager.tickRate() / Yanfly.Param.BECTurnTime;
	// ★★★書き換え後
	var value = 1;
        this._stateTurns[stateId] -= value;
        if (this._stateTurns[stateId] <= 0) this.removeState(stateId);
      }
    }
};

Game_Battler.prototype.resetAllCTB = function() {
    this._ctbCharge = 0;
    this._ctbChargeMod = 0;
    this._ctbCharging = false;
    this._ctbSpeed = 0;
    this.clearActions();
};

Game_Battler.prototype.endTurnAllCTB = function() {
    this._ctbCharge = 0;
    this._ctbChargeMod = 0;
    this._ctbCharging = false;
    if (this.checkCTBEndInstantCast()) return;
    this.setEndActionCTBSpeed();
    this.clearActions();
    this.setActionState('undecided');
    if (this.battler()) this.battler().refreshMotion();
    if (BattleManager.isTickBased()) this.onTurnEnd();
};

Game_Battler.prototype.checkCTBEndInstantCast = function() {
    if (!Imported.YEP_InstantCast) return false;
    var action = this.currentAction();
    if (!action) return false;
    var item = action.item();
    if (!item) return false;
    if (!this.isInstantCast(item)) return false;
    var length = BattleManager.allBattleMembers().length;
    for (var i = 0; i < length; ++i) {
      var member = BattleManager.allBattleMembers()[i];
      if (!member) continue;
      var max = member.ctbSpeed() + member.ctbCharge();
      this._ctbSpeed = Math.max(this._ctbSpeed, max);
    }
    this._ctbSpeed = Math.max(this._ctbSpeed, BattleManager.ctbTarget());
    this._ctbSpeed += 0.00000000001;
    return true;
};

Game_Battler.prototype.ctbSpeedRate = function() {
    if (!this.canMove()) return 0;
    var base = this.paramBase(6) + this.paramPlus(6);
    if (base >= this.paramMax(6) && this.agi >= this.paramMax(6)) return 1;
    var rate = this.agi / base;
    return rate;
};

Game_Battler.prototype.ctbSpeedTick = function() {
    var value = this.ctbTickValue();
    if (BattleManager.ctbRubberband()) {
      var min = BattleManager.ctbMinimumSpeed();
      var max = BattleManager.ctbMaximumSpeed();
      value = value.clamp(min, max);
      value += this.minorCTBOffset();
    }
    return value * BattleManager.tickRate();
};

Game_Battler.prototype.ctbTickValue = function() {
    if (this._ctbTickValue !== undefined) return this._ctbTickValue;
    var a = this;
    var user = this;
    var subject = this;
    this._ctbTickValue = eval(Yanfly.Param.CTBPerTick);
    return this._ctbTickValue;
};

Game_Battler.prototype.setEndActionCTBSpeed = function() {
    this._ctbSpeed = 0;
    var action = this.currentAction();
    if (!action) return;
    var item = action.item();;
    if (item) {
      if (item.afterCTBFlat !== undefined) this.setCTBSpeed(item.afterCTBFlat);
      if (item.afterCTBRate !== undefined) {
        this.setCTBSpeed(item.afterCTBRate * BattleManager.ctbTarget());
      }
      if (item.speed > 0) this._ctbSpeed += item.speed;
    }
    this._ctbSpeed += BattleManager.ctbTarget() * this.ctbTurnRate();
    this._ctbSpeed += this.ctbTurnFlat();
    if (item) this.afterCTBEval(item);
};

Game_Battler.prototype.afterCTBEval = function(item) {
    if (!item) return;
    var a = this;
    var user = this;
    var skill = item;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var speed = this._ctbSpeed;
    var max = BattleManager.ctbTarget();
    var code = item.ctbAfterEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'AFTER CTB ERROR');
    }
    this.setCTBSpeed(speed);
};

Game_Battler.prototype.ctbStartFlat = function() {
    var value = 0;
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state) value += state.ctbStartFlat;
    }
    return value;
};

Game_Battler.prototype.ctbStartRate = function() {
    var value = 0;
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state) value += state.ctbStartRate;
    }
    return value;
};

Game_Battler.prototype.ctbTurnFlat = function() {
    var value = 0;
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state) value += state.ctbTurnFlat;
    }
    return value;
};

Game_Battler.prototype.ctbTurnRate = function() {
    var value = 0;
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state) value += state.ctbTurnRate;
    }
    return value;
};

Yanfly.CTB.Game_Battler_removeState = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId) {
    if (BattleManager.isCTB()) {
      var confuseCondition = this.isConfused();
    }
    Yanfly.CTB.Game_Battler_removeState.call(this, stateId);
    if (BattleManager.isCTB()) {
      if (confuseCondition !== this.isConfused()) this.resetAllCTB();
    }
};

Game_Battler.prototype.minorCTBOffset = function() {
    var value = 0.00000000001;
    if (this.isActor()) value *= $gameParty.members().length - this.index();
    if (this.isEnemy()) value *= -1 * this.index();
    return value;
};

Game_Battler.prototype.ctbTurnOrder = function() {
    var index = BattleManager.ctbTurnOrder().indexOf(this);
    return index;
};

Game_Battler.prototype.ctbAlterTurnOrder = function(value) {
    var sign = (value > 0) ? 1 : -1;
    var max = BattleManager.ctbTurnOrder().length - 1;
    var index = this.ctbTurnOrder();
    index += value;
    index = index.clamp(0, max);
    var battler = BattleManager.ctbTurnOrder()[index];
    if (!battler) battler = this;
    var ticksTarget = battler.ctbTicksToReady();
    var ticksCurrent = this.ctbTicksToReady();
    var ticksChange = ticksTarget - ticksCurrent;
    ticksChange += sign * Math.abs(this.minorCTBOffset());
    this._ctbSpeed -= this.ctbSpeedTick() * ticksChange;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.ctbIcon = function() {
    if (this.actor().ctbClassIcon) {
      if (this.actor().ctbClassIcon[this._classId]) {
        return this.actor().ctbClassIcon[this._classId];
      }
    }
    return this.actor().ctbIcon;
};

Game_Actor.prototype.ctbBorderColor = function() {
    return this.actor().ctbBorderColor;
};

Game_Actor.prototype.ctbBackgroundColor = function() {
    return this.actor().ctbBackgroundColor;
};

Game_Actor.prototype.ctbStartFlat = function() {
    var value = Game_Battler.prototype.ctbStartFlat.call(this);
    value += this.actor().ctbStartFlat;
    value += this.currentClass().ctbStartFlat;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.ctbStartFlat) value += equip.ctbStartFlat;
    }
    return value;
};

Game_Actor.prototype.ctbStartRate = function() {
    var value = Game_Battler.prototype.ctbStartRate.call(this);
    value += this.actor().ctbStartRate;
    value += this.currentClass().ctbStartRate;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.ctbStartRate) value += equip.ctbStartRate;
    }
    return value;
};

Game_Actor.prototype.ctbTurnFlat = function() {
    var value = Game_Battler.prototype.ctbTurnFlat.call(this);
    value += this.actor().ctbTurnFlat;
    value += this.currentClass().ctbTurnFlat;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.ctbTurnFlat) value += equip.ctbTurnFlat;
    }
    return value;
};

Game_Actor.prototype.ctbTurnRate = function() {
    var value = Game_Battler.prototype.ctbTurnRate.call(this);
    value += this.actor().ctbTurnRate;
    value += this.currentClass().ctbTurnRate;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.ctbTurnRate) value += equip.ctbTurnRate;
    }
    return value;
};

Yanfly.CTB.Game_Actor_changeClass = Game_Actor.prototype.changeClass;
Game_Actor.prototype.changeClass = function(classId, keepExp) {
    Yanfly.CTB.Game_Actor_changeClass.call(this, classId, keepExp);
    this.ctbTransform();
};

Yanfly.CTB.Game_Actor_setCharacterImage =
    Game_Actor.prototype.setCharacterImage;
Game_Actor.prototype.setCharacterImage = function(name, index) {
    Yanfly.CTB.Game_Actor_setCharacterImage.call(this, name, index)
    this.ctbTransform();
};

Yanfly.CTB.Game_Actor_setFaceImage = Game_Actor.prototype.setFaceImage;
Game_Actor.prototype.setFaceImage = function(faceName, faceIndex) {
    Yanfly.CTB.Game_Actor_setFaceImage.call(this, faceName, faceIndex);
    this.ctbTransform();
};

Yanfly.CTB.Game_Actor_setBattlerImage = Game_Actor.prototype.setBattlerImage;
Game_Actor.prototype.setBattlerImage = function(battlerName) {
    Yanfly.CTB.Game_Actor_setBattlerImage.call(this, battlerName);
    this.ctbTransform();
};

Game_Actor.prototype.ctbTransform = function() {
    if (!$gameParty.inBattle()) return;
    if (!BattleManager.isCTB()) return;
    this._ctbTransformed = true;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.ctbIcon = function() {
    return this.enemy().ctbIcon;
};

Game_Enemy.prototype.ctbBorderColor = function() {
    return this.enemy().ctbBorderColor;
};

Game_Enemy.prototype.ctbBackgroundColor = function() {
    return this.enemy().ctbBackgroundColor;
};

Game_Enemy.prototype.ctbStartFlat = function() {
    var value = Game_Battler.prototype.ctbStartFlat.call(this);
    value += this.enemy().ctbStartFlat;
    return value;
};

Game_Enemy.prototype.ctbStartRate = function() {
    var value = Game_Battler.prototype.ctbStartRate.call(this);
    value += this.enemy().ctbStartRate;
    return value;
};

Game_Enemy.prototype.ctbTurnFlat = function() {
    var value = Game_Battler.prototype.ctbTurnFlat.call(this);
    value += this.enemy().ctbTurnFlat;
    return value;
};

Game_Enemy.prototype.ctbTurnRate = function() {
    var value = Game_Battler.prototype.ctbTurnRate.call(this);
    value += this.enemy().ctbTurnRate;
    return value;
};

Yanfly.CTB.Game_Enemy_transform = Game_Enemy.prototype.transform;
Game_Enemy.prototype.transform = function(enemyId) {
    Yanfly.CTB.Game_Enemy_transform.call(this, enemyId);
    this._ctbTransformed = true;
};

//=============================================================================
// Game_Unit
//=============================================================================

Game_Unit.prototype.onCTBStart = function() {
    if (!BattleManager.isCTB()) return;
    for (var i = 0; i < this.members().length; ++i) {
      var member = this.members()[i];
      if (member) member.onCTBStart();
    }
};

Game_Unit.prototype.increaseTurnTimeBasedCTB = function() {
    for (var i = 0; i < this.members().length; ++i) {
      var member = this.members()[i];
      if (!member) continue;
      if (member.isDead()) continue;
      if (member.isHidden()) continue;
      if (member.canMove()) continue;
      member.onTurnEnd();
    }
};

//=============================================================================
// Game_Party
//=============================================================================

Yanfly.CTB.Game_Party_performEscape = Game_Party.prototype.performEscape;
Game_Party.prototype.performEscape = function() {
    if (BattleManager.isCTB()) return;
    Yanfly.CTB.Game_Party_performEscape.call(this);
};

//=============================================================================
// Game_Troop
//=============================================================================

Yanfly.CTB.Game_Troop_increaseTurn = Game_Troop.prototype.increaseTurn;
Game_Troop.prototype.increaseTurn = function() {
    Yanfly.CTB.Game_Troop_increaseTurn.call(this);
    if (BattleManager.isCTB() && BattleManager.timeBasedStates()) {
      $gameParty.increaseTurnTimeBasedCTB();
      this.increaseTurnTimeBasedCTB();
    }
};

//=============================================================================
// Sprite_Battler
//=============================================================================

Yanfly.CTB.Sprite_Battler_postSpriteInitialize =
        Sprite_Battler.prototype.postSpriteInitialize;
Sprite_Battler.prototype.postSpriteInitialize = function() {
    Yanfly.CTB.Sprite_Battler_postSpriteInitialize.call(this);
    if (BattleManager.isCTB()) this.createCTBIcon();
};

Sprite_Battler.prototype.createCTBIcon = function() {
    if (!Yanfly.Param.CTBTurnOrder) return;
    this._ctbIcon = new Window_CTBIcon(this);
};

Yanfly.CTB.Sprite_Battler_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
    Yanfly.CTB.Sprite_Battler_update.call(this);
    this.addCTBIcon();
};

Sprite_Battler.prototype.addCTBIcon = function() {
    if (!this._ctbIcon) return;
    if (this._addedCTBIcon) return;
    if (!SceneManager._scene) return;
    var scene = SceneManager._scene;
    if (!scene._windowLayer) return;
    this._addedCTBIcon = true;
    this._ctbIcon.setWindowLayer(scene._windowLayer);
    scene.addChild(this._ctbIcon);
};

//=============================================================================
// Window_Help
//=============================================================================

Yanfly.CTB.Window_Help_setItem = Window_Help.prototype.setItem;
Window_Help.prototype.setItem = function(item) {
    if (this.meetCTBConditions(item)) return this.setText(item.ctbHelp);
    Yanfly.CTB.Window_Help_setItem.call(this, item);
};

Window_Help.prototype.meetCTBConditions = function(item) {
    if (!item) return false;
    if (!BattleManager.isCTB()) return false;
    return item.ctbHelp !== undefined;
};

//=============================================================================
// Window_Selectable
//=============================================================================

Yanfly.CTB.Window_Selectable_select = Window_Selectable.prototype.select;
Window_Selectable.prototype.select = function(index) {
    if ($gameParty.inBattle() && BattleManager.isCTB()) {
      BattleManager.ctbTicksToReadyClear();
    }
    Yanfly.CTB.Window_Selectable_select.call(this, index);
};

//=============================================================================
// Window_CTBIcon
//=============================================================================

function Window_CTBIcon() {
    this.initialize.apply(this, arguments);
}

Window_CTBIcon.prototype = Object.create(Window_Base.prototype);
Window_CTBIcon.prototype.constructor = Window_CTBIcon;

Window_CTBIcon.prototype.initialize = function(mainSprite) {
    this._mainSprite = mainSprite;
    var width = this.iconWidth() + 8 + this.standardPadding() * 2;
    var height = this.iconHeight() + 8 + this.standardPadding() * 2;
    this._redraw = false;
    this._position = Yanfly.Param.CTBTurnPosX.toLowerCase();
    this._direction = Yanfly.Param.CTBTurnDirection.toLowerCase();
    this._lowerWindows = eval(Yanfly.Param.BECLowerWindows);
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this.opacity = 0;
    this.contentsOpacity = 0;
};

Window_CTBIcon.prototype.iconWidth = function() {
    return Yanfly.Param.CTBIconSize;
};

Window_CTBIcon.prototype.iconHeight = function() {
    return Yanfly.Param.CTBIconSize;
};

Window_CTBIcon.prototype.setWindowLayer = function(windowLayer) {
        this._windowLayer = windowLayer;
};

Window_CTBIcon.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.updateBattler();
    this.updateIconIndex();
    this.updateRedraw();
    this.updateDestinationX();
    this.updateOpacity();
    this.updatePositionX();
    this.updatePositionY();
};

Window_CTBIcon.prototype.updateBattler = function() {
    var changed = this._battler !== this._mainSprite._battler;
    if (this._battler && this._battler._ctbTransformed) changed = true;
    if (!changed) return;
    this._battler = this._mainSprite._battler;
    if (!this._battler) return this.removeCTBIcon();
    this._battler._ctbTransformed = undefined;
    this._iconIndex = this._battler.ctbIcon();
    if (this._iconIndex > 0) {
      this._image = ImageManager.loadSystem('IconSet');
    } else if (this._battler.isEnemy()) {
      if (this.isUsingSVBattler()) {
        var name = this._battler.svBattlerName();
        this._image = ImageManager.loadSvActor(name);
      } else {
        var battlerName = this._battler.battlerName();
        var battlerHue = this._battler.battlerHue();
        if ($gameSystem.isSideView()) {
          this._image = ImageManager.loadSvEnemy(battlerName, battlerHue);
        } else {
          this._image = ImageManager.loadEnemy(battlerName, battlerHue);
        }
      }
    } else if (this._battler.isActor()) {
      var faceName = this._battler.faceName();
      this._image = ImageManager.loadFace(faceName);
    }
    this._redraw = true;
};

Window_CTBIcon.prototype.removeCTBIcon = function() {
    this.contents.clear();
    this.opacity = 0;
    this.contentsOpacity =0;
};

Window_CTBIcon.prototype.isUsingSVBattler = function() {
    if (!Imported.YEP_X_AnimatedSVEnemies) return false;
    if (!this._battler.hasSVBattler()) return false;
    return Yanfly.Param.CTBEnemySVBattler;
};

Window_CTBIcon.prototype.updateIconIndex = function() {
    if (!this._battler) return;
    var changed = this._iconIndex !== this._battler.ctbIcon();
    if (changed) {
        this._iconIndex = this._battler.ctbIcon();
        this._redraw = true;
    }
};

Window_CTBIcon.prototype.forceRedraw = function() {
    this._redraw = true;
};

Window_CTBIcon.prototype.updateRedraw = function() {
    if (!this._redraw) return;
    if (!this._image) return;
    if (this._image.width <= 0) return;
    this._redraw = false;
    this.contents.clear();
    this.drawBorder();
    if (this._iconIndex > 0) {
        this.drawIcon(this._iconIndex, 4, 4);
    } else if (this._battler.isActor()) {
        this.redrawActorFace();
    } else if (this._battler.isEnemy()) {
        this.redrawEnemy();
    }
    this.redrawLetter();
};

Window_CTBIcon.prototype.drawIcon = function(iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    var ww = this.iconWidth();
    var wh = this.iconHeight();
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, ww, wh);
};

Window_CTBIcon.prototype.drawBorder = function() {
    var width = this.contents.width;
    var height = this.contents.height;
    this.contents.fillRect(0, 0, width, height, this.gaugeBackColor());
    width -= 2;
    height -= 2;
    this.contents.fillRect(1, 1, width, height, this.ctbBorderColor());
    width -= 4;
    height -= 4;
    this.contents.fillRect(3, 3, width, height, this.gaugeBackColor());
    width -= 2;
    height -= 2;
    this.contents.fillRect(4, 4, width, height, this.ctbBackgroundColor());
};

Window_CTBIcon.prototype.ctbBorderColor = function() {
    var colorId = this._battler.ctbBorderColor() || 0;
    return this.textColor(colorId);
};

Window_CTBIcon.prototype.ctbBackgroundColor = function() {
    var colorId = this._battler.ctbBackgroundColor() || 0;
    return this.textColor(colorId);
};

Window_CTBIcon.prototype.redrawActorFace = function() {
    var width = Window_Base._faceWidth;
    var height = Window_Base._faceHeight;
    var faceIndex = this._battler.faceIndex();
    var bitmap = this._image;
    var pw = Window_Base._faceWidth;
    var ph = Window_Base._faceHeight;
    var sw = Math.min(width, pw);
    var sh = Math.min(height, ph);
    var dx = Math.floor(Math.max(width - pw, 0) / 2);
    var dy = Math.floor(Math.max(height - ph, 0) / 2);
    var sx = faceIndex % 4 * pw + (pw - sw) / 2;
    var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
    var dw = this.contents.width - 8;
    var dh = this.contents.height - 8;
    this.contents.blt(bitmap, sx, sy, sw, sh, dx + 4, dy + 4, dw, dh);
};

Window_CTBIcon.prototype.redrawEnemy = function() {
    if (this.isUsingSVBattler()) {
      return this.redrawSVEnemy();
    };
    var bitmap = this._image;
    var sw = bitmap.width;
    var sh = bitmap.height;
    var dw = this.contents.width - 8;
    var dh = this.contents.height - 8;
    var dx = 0;
    var dy = 0;
    if (sw >= sh) {
      var rate = sh / sw;
      dh *= rate;
      dy += this.contents.height - 8 - dh;
    } else {
      var rate = sw / sh;
      dw *= rate;
      dx += Math.floor((this.contents.width - 8 - dw) / 2);
    }
    this.contents.blt(bitmap, 0, 0, sw, sh, dx + 4, dy + 4, dw, dh);
};

Window_CTBIcon.prototype.redrawSVEnemy = function() {
    var bitmap = this._image;
    var sw = bitmap.width / 9;
    var sh = bitmap.height / 6;
    var dw = this.contents.width - 8;
    var dh = this.contents.height - 8;
    var dx = 0;
    var dy = 0;
    if (sw >= sh) {
      var rate = sh / sw;
      dh *= rate;
      dy += this.contents.height - 8 - dh;
    } else {
      var rate = sw / sh;
      dw *= rate;
      dx += Math.floor((this.contents.width - 8 - dw) / 2);
    }
    this.contents.blt(bitmap, 0, 0, sw, sh, dx + 4, dy + 4, dw, dh);
};

Window_CTBIcon.prototype.redrawLetter = function() {
    if (!this._battler.isEnemy()) return;
    if (!this._battler._plural) return;
    var letter = this._battler._letter;
    var dy = this.contents.height - this.lineHeight();
    this.drawText(letter, 0, dy, this.contents.width - 4, 'right');
};

Window_CTBIcon.prototype.destinationXConstant = function() {
    return this.contents.width + 2;
};

Window_CTBIcon.prototype.updateDestinationX = function() {
    if (!this._battler) return;
    if (this._battler.isDead()) return;
    if (this._position === 'left') this.updateDestinationLeftAlign();
    if (this._position === 'center') this.updateDestinationCenterAlign();
    if (this._position === 'right') this.updateDestinationRightAlign();
    if (this._direction === 'left') this.updateDestinationGoingLeft();
    if (this._direction === 'right') this.updateDestinationGoingRight();
};

Window_CTBIcon.prototype.updateDestinationLeftAlign = function() {
    this._destinationX = 0;
};

Window_CTBIcon.prototype.updateDestinationCenterAlign = function() {
    this._destinationX = 0;
    var width = this.standardPadding() * 2;
    var size = BattleManager.ctbTurnOrder().length;
    var constant = this.destinationXConstant();
    width += constant * size;
    width += constant / 2 - 2;
    this._destinationX = Math.floor((Graphics.boxWidth - width) / 2);
};

Window_CTBIcon.prototype.updateDestinationRightAlign = function() {
    this._destinationX = Graphics.boxWidth;
    this._destinationX -= this.standardPadding() * 2;
    var size = BattleManager.ctbTurnOrder().length;
    var constant = this.destinationXConstant();
    this._destinationX -= constant * size;
    this._destinationX -= constant / 2;
    this._destinationX += 2;
};

Window_CTBIcon.prototype.updateDestinationGoingLeft = function(index) {
    var index = BattleManager.ctbTurnOrder().indexOf(this._battler);
    if (index < 0) index = BattleManager.ctbTurnOrder().length + 5;
    var constant = this.destinationXConstant();
    this._destinationX += index * constant;
    if (index !== 0) {
      this._destinationX += constant / 2;
    }
};

Window_CTBIcon.prototype.updateDestinationGoingRight = function(index) {
    var index = BattleManager.ctbTurnOrder().reverse().indexOf(this._battler);
    if (index < 0) index = -5;
    var constant = this.destinationXConstant();
    this._destinationX += index * constant;
    if (index === BattleManager.ctbTurnOrder().length - 1) {
      this._destinationX += constant / 2;
    }
};

Window_CTBIcon.prototype.updatePositionX = function() {
    if (this._destinationX === undefined) return;
    if (BattleManager._escaped) return;
    var desX = this._destinationX;
    var moveAmount = Math.max(1, Math.abs(desX - this.x) / 4);
    if (this.x > desX) this.x = Math.max(this.x - moveAmount, desX);
    if (this.x < desX) this.x = Math.min(this.x + moveAmount, desX);
};

Window_CTBIcon.prototype.destinationY = function() {
    var value = Yanfly.Param.CTBTurnPosY - this.standardPadding();
    var scene = SceneManager._scene;
    if (scene && scene._helpWindow.visible) {
        value = Math.max(value, scene._helpWindow.height);
    }
    if (!this._battler) return value;
    if (this._battler.isSelected()) {
        value -= this.contents.height / 4;
    }
    return value;
};

Window_CTBIcon.prototype.updatePositionY = function() {
    if (BattleManager._escaped) return;
    if (this._destinationX !== this.x) {
      var desX = this._destinationX;
      var cap1 = this.destinationY() - this.contents.height / 2;
      var cap2 = this.destinationY() + this.contents.height / 2;
      var moveAmount = Math.max(1, Math.abs(cap2 - this.y) / 4);
      if (this.x > desX) this.y = Math.max(this.y - moveAmount, cap1);
      if (this.x < desX) this.y = Math.min(this.y + moveAmount, cap2);
    } else if (this.destinationY() !== this.y) {
      var desY = this.destinationY();
      var moveAmount = Math.max(1, Math.abs(desY - this.y) / 4);
      if (this.y > desY) this.y = Math.max(this.y - moveAmount, desY);
      if (this.y < desY) this.y = Math.min(this.y + moveAmount, desY);
    }
};

Window_CTBIcon.prototype.opacityFadeRate = function() {
    return 8;
};

Window_CTBIcon.prototype.updateOpacity = function() {
    var rate = this.opacityFadeRate();
    if (this._foreverHidden) return this.reduceOpacity();
    if (this.isReduceOpacity()) return this.reduceOpacity();
    if (BattleManager._victoryPhase) {
      this._foreverHidden = true;
      return this.reduceOpacity();
    }
    if (BattleManager._escaped) {
      this._foreverHidden = true;
      return this.reduceOpacity();
    }
    if (this._battler) {
      var index = BattleManager.ctbTurnOrder().reverse().indexOf(this._battler);
      if (index < 0) return this.reduceOpacity();
    }
    this.contentsOpacity += rate;
};

Window_CTBIcon.prototype.isReduceOpacity = function() {
    if (!this._lowerWindows) {
      if (this.isLargeWindowShowing()) return true;
    }
    return this._windowLayer && this._windowLayer.x !== 0;
};

Window_CTBIcon.prototype.isLargeWindowShowing = function() {
    if (SceneManager._scene._itemWindow.visible) return true;
    if (SceneManager._scene._skillWindow.visible) return true;
    return false;
};

Window_CTBIcon.prototype.reduceOpacity = function() {
    this.contentsOpacity -= this.opacityFadeRate();
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.CTB.Scene_Battle_isStartActorCommand =
    Scene_Battle.prototype.isStartActorCommand;
Scene_Battle.prototype.isStartActorCommand = function() {
    if (BattleManager.isCTB()) return true;
    return Yanfly.CTB.Scene_Battle_isStartActorCommand.call(this);
};

Yanfly.CTB.Scene_Battle_commandFight = Scene_Battle.prototype.commandFight;
Scene_Battle.prototype.commandFight = function() {
    if (BattleManager.isCTB()) {
      this.startActorCommandSelection();
      BattleManager._phase = 'input';
    } else {
      Yanfly.CTB.Scene_Battle_commandFight.call(this);
    }
};

Yanfly.CTB.Scene_Battle_startActorCommandSelection =
    Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function() {
    Yanfly.CTB.Scene_Battle_startActorCommandSelection.call(this);
    if (BattleManager.isCTB()) {
      BattleManager.actor().spriteStepForward();
      BattleManager.actor().setActionState('undecided');
      BattleManager.actor().requestMotionRefresh();
      BattleManager.actor().makeActions();
    }
};

Yanfly.CTB.Scene_Battle_updateWindowPositions =
    Scene_Battle.prototype.updateWindowPositions;
Scene_Battle.prototype.updateWindowPositions = function() {
    if (BattleManager.isCTB()) return this.updateWindowPositionsCTB();
    Yanfly.CTB.Scene_Battle_updateWindowPositions.call(this);
};

Scene_Battle.prototype.updateWindowPositionsCTB = function() {
    if (this._ctbWindowPosCount === undefined) this._ctbWindowPosCount = 0;
    if (this._partyCommandWindow.active) {
      this._ctbWindowPosCount = 16;
      var statusX = 0;
      statusX = this._partyCommandWindow.width;
      if (this._statusWindow.x < statusX) {
        this._statusWindow.x += 16;
        if (this._statusWindow.x > statusX) this._statusWindow.x = statusX;
      }
      if (this._statusWindow.x > statusX) {
        this._statusWindow.x -= 16;
        if (this._statusWindow.x < statusX) this._statusWindow.x = statusX;
      }
    } else if (this._actorCommandWindow.active) {
      this._ctbWindowPosCount = 16;
      Yanfly.CTB.Scene_Battle_updateWindowPositions.call(this);
    } else {
      if (--this._ctbWindowPosCount > 0) return;
      Yanfly.CTB.Scene_Battle_updateWindowPositions.call(this);
    }
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

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
} else { // Yanfly.BEC.version

var text = '================================================================\n';
text += 'YEP_X_AnimatedSVEnemies requires YEP_BattleEngineCore to be at the ';
text += 'latest version to run properly.\n\nPlease go to www.yanfly.moe and ';
text += 'update to the latest version for the YEP_BattleEngineCore plugin.\n';
text += '================================================================\n';
console.log(text);
require('nw.gui').Window.get().showDevTools();

} // Yanfly.BEC.version
}; // YEP_BattleEngineCore