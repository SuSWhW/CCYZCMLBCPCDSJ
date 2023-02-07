//=============================================================================
// DualWieldExtend.js
//=============================================================================

/*:ja
 * @plugindesc 二刀流スキルを拡張します。
 * @author 絶望と希望
 *
 * @param DualWield CostRate
 * @type number
 * @decimals 4
 * @desc 二刀流時のコスト倍率です。
 * @default 1.5000
 *
 * @param DualWield DamageRate
 * @type number
 * @decimals 4
 * @desc 二刀流時の一撃のダメージ倍率です。
 * @default 0.7500
 *
 * @help このプラグインには、プラグインコマンドはありません。
 * 二刀流時の仕様を以下のように拡張します。
 * ついでにアニメーションの仕様にも少し手を加えています。
 *
 * ∇必要武器
 *   例えば剣を装備時にのみ使用可能なスキルは、
 *   両手に剣を装備している場合のみしか使用できません。
 *
 * ∇<DualWieldSkill>
 *   スキルのメモ欄に記述することで二刀流時に以下の効果。
 *   ・コストに補正がかかります(MPのみ)。
 *   ・二刀流時に攻撃回数が倍になりますが、一撃ごとのダメージに補正がかかります。
 *   ・二刀流時にアニメーションが二回再生されます(画面アニメは除く)。
 *
 * ∇<WeaponType_DualWield>
 *   メモ欄に記述するとそのスキルは二刀流時専用となります。
 *
 * ∇<WeaponType_DualType>
 *   メモ欄に記述するとそのスキルは
 *   必要武器1と必要武器2を両方装備時専用となります。
 *   これにより、例えば片手剣スキルと片手槍スキルの合体スキルを設定できます。
 *
 * ∇<DualWield_AnimeChange:x>
 *   二刀流時のアニメをx番に変更。
 *   尚、この場合アニメーションは二回再生されません。
 *
 * ∇<DualWield_SecondAnime:x>
 *   二刀流時の二回目のアニメをx番に変更。
 *
 * ∇二刀流時スキル表示名変更
 *   <DWSkillName_AddFront:x>：二刀流時、スキル名の前にxが追加されます。
 *   <DWSkillName_AddBack:x>：二刀流時、スキル名の後ろにxが追加されます。
 *   <DWSkillName_Change:x>：二刀流時、スキル名がxになります。
 * 
 */

(function() {

    var parameters = PluginManager.parameters('DualWieldExtend');
    var dualWieldCostRate = Number(parameters['DualWield CostRate'] || 0);
    var dualWieldDamageRate = Number(parameters['DualWield DamageRate'] || 0);

    //-----------------------------------------------------------------------
    //  Game_BattlerBase
    //-----------------------------------------------------------------------

    // 該当スキルを二刀流で使用する場合、コストを調整する
    var eva_gameBattlerBasePrototypeSkillMpCost = Game_BattlerBase.prototype.skillMpCost;
    Game_BattlerBase.prototype.skillMpCost = function (skill) {
        if (skill.meta.DualWieldSkill && this.isDualWield()) {
            return Math.floor(eva_gameBattlerBasePrototypeSkillMpCost.call(this, skill) * dualWieldCostRate);
        }
        return eva_gameBattlerBasePrototypeSkillMpCost.call(this, skill);
    };

    //-----------------------------------------------------------------------
    //  Game_Actor
    //-----------------------------------------------------------------------

    // 両手に同じタイプの武器を装備しているか
    Game_Actor.prototype.isWtypeEquippedDual = function (wtypeId) {
        return this.weapons().every(function (weapon) {
            return weapon.wtypeId === wtypeId;
        });
    };

    // 二刀流時、両手に同じ武器を持たないと該当スキルを使えないように修正
    var eva_gameActorPrototypeIsSkillWtypeOk = Game_Actor.prototype.isSkillWtypeOk;
    Game_Actor.prototype.isSkillWtypeOk = function (skill) {
        if (this.isDualWield()) {
            var wtypeId1 = skill.requiredWtypeId1;
            var wtypeId2 = skill.requiredWtypeId2;
            if (wtypeId1 === 0 && wtypeId2 === 0) { return true; }
            if (skill.meta.WeaponType_DualType) {
                if (wtypeId1 > 0 && this.isWtypeEquipped(wtypeId1) && wtypeId2 > 0 && this.isWtypeEquipped(wtypeId2)) {
                    return true;
                } else {
                    return false;
                }
            }
            if ((wtypeId1 > 0 && this.isWtypeEquippedDual(wtypeId1)) || (wtypeId2 > 0 && this.isWtypeEquippedDual(wtypeId2)) ||
                (wtypeId1 > 0 && this.isWtypeEquipped(wtypeId1) && wtypeId2 > 0 && this.isWtypeEquipped(wtypeId2))) {
                if (this.weapons().length >= 2) {
                    return true;
                }
            }
            return false;
        }
        else if (skill.meta.WeaponType_DualWield || skill.meta.WeaponType_DualType) {
            return false;
        }
        return eva_gameActorPrototypeIsSkillWtypeOk.call(this, skill);
    };

    //-----------------------------------------------------------------------
    //  Game_Action
    //-----------------------------------------------------------------------

    // 二刀流時の攻撃回数を増やす
    var eva_gameActionPrototypeNumRepeats = Game_Action.prototype.numRepeats;
    Game_Action.prototype.numRepeats = function () {
        // 二刀流かどうか
        if (this.subject().isDualWield()) {
            // 該当スキルか否か
            if (this.item().meta.DualWieldSkill) {
                return eva_gameActionPrototypeNumRepeats.call(this) * 2;
            }
        }
        return eva_gameActionPrototypeNumRepeats.call(this);
    };

    // 二刀流時のダメージに補正をかける
    var eva_gameActionPrototypeMakeDamageValue = Game_Action.prototype.makeDamageValue;
    Game_Action.prototype.makeDamageValue = function (target, critical) {
        // 二刀流かどうか
        if (this.subject().isDualWield()) {
            // 該当スキルか否か
            if (this.item().meta.DualWieldSkill) {
                return Math.round(eva_gameActionPrototypeMakeDamageValue.call(this, target, critical) * dualWieldDamageRate);
            }
        }
        return eva_gameActionPrototypeMakeDamageValue.call(this, target, critical);
    };

    //-----------------------------------------------------------------------
    // Window_BattleLog
    //-----------------------------------------------------------------------

    // メンバ変数追加定義
    var eva_windowBattleLogPrototypeInitialize = Window_BattleLog.prototype.initialize;
    Window_BattleLog.prototype.initialize = function () {
        eva_windowBattleLogPrototypeInitialize.call(this);
        this._evaItemName = "ランドセル君";
    }

    // 表示名変更
    var eva_windowBattleLogPrototypeDisplayAction = Window_BattleLog.prototype.displayAction;
    Window_BattleLog.prototype.displayAction = function (subject, item) {
        this._evaItemName = item.name;
        if (subject.isDualWield()) {
            if (item.meta.DWSkillName_AddFront) {
                item.name = String(item.meta.DWSkillName_AddFront) + item.name;
            }
            else if (item.meta.DWSkillName_AddBack) {
                item.name += String(item.meta.DWSkillName_AddBack);
            }
            else if (item.meta.DWSkillName_Change) {
                item.name = String(item.meta.DWSkillName_Change);
            }
        }
        eva_windowBattleLogPrototypeDisplayAction.call(this, subject, item);
        item.name = this._evaItemName;
    }


    //-----------------------------------------------------------------------
    //  Sprite_Battler
    //-----------------------------------------------------------------------

    // アニメ制御
    var eva_spriteBattlerPrototypeSetupAnimation = Sprite_Battler.prototype.setupAnimation;
    Sprite_Battler.prototype.setupAnimation = function () {
        var l_animeCount = 0;
        while (this._battler.isAnimationRequested()) {
            var data = this._battler.shiftAnimation();
            if (BattleManager._action) {
                // 通常攻撃はそのまま
                if (!BattleManager._action.isAttack()) {
                    if (Math.floor(l_animeCount) % BattleManager._action.numRepeats() != 0) {
                        l_animeCount += 1;
                        continue;
                    }
                }
            }
            l_animeCount += 1;
            // アニメーション変更処理
            if (BattleManager._action) {
                if (BattleManager._action.subject().isDualWield() && BattleManager._action.item().meta.DualWield_AnimeChange) {
                    data.animationId = BattleManager._action.item().meta.DualWield_AnimeChange;
                }
            }
            var animation = $dataAnimations[data.animationId];
            var mirror = data.mirror;
            var delay = animation.position === 3 ? 0 : data.delay;
            if (BattleManager._action) {
                if (BattleManager._action.numRepeats() > 1 && !BattleManager._action.isAttack()) {
                    delay *= 0.75;
                }
            }
            this.startAnimation(animation, mirror, delay);
            // 二刀流の場合、追加でアニメーション再生
            if (BattleManager._action) {
                // 二刀流時に攻撃以外の該当スキルを使用時
                if (!BattleManager._action.isAttack() && !BattleManager._action.item().meta.DualWield_AnimeChange &&
                    BattleManager._action.subject().isDualWield() && BattleManager._action.item().meta.DualWieldSkill) {
                    delay += animation.frames.length * 1.5;
                    if (BattleManager._action.item().meta.DualWield_SecondAnime) {
                        animation = $dataAnimations[BattleManager._action.item().meta.DualWield_SecondAnime];
                    }
                    this.startAnimation(animation, mirror, delay);
                }
            }
            for (var i = 0; i < this._animationSprites.length; i++) {
                var sprite = this._animationSprites[i];
                sprite.visible = this._battler.isSpriteVisible();
            }
        }
    };

})();