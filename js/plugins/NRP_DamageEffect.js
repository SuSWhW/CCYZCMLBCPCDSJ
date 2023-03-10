//=============================================================================
// NRP_DamageEffect.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc ver1.01 Change the effect of damage handling.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/475586753.html
 *
 * @help Change the effect of damage handling.
 * 
 * [What you can do]
 * 1. enable/disable enemy & actor blinking effects.
 * 2. Play an animation during critical or weak.
 * 3. change the position of the damage popup.
 * 
 * For more information, please see below.
 * http://newrpg.seesaa.net/article/475586753.html
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @param <Blink>
 * 
 * @param enemyBlink
 * @parent <Blink>
 * @type boolean
 * @default true
 * @desc Blink the enemy on damage.
 * The default value is true.
 * 
 * @param actorBlink
 * @parent <Blink>
 * @type boolean
 * @default false
 * @desc Blink the actor on damage.
 * The default value is false.
 * 
 * @param blinkDuration
 * @parent <Blink>
 * @type number
 * @default 20
 * @desc Blinking time. The default value is 20.
 * 
 * @param <Critical>
 * 
 * @param criticalAnimation
 * @parent <Critical>
 * @type animation
 * @desc When critical, this animation plays back to the target.
 * Formula is allowed (Text). (e.g.:target.isEnemy() ? 1 : 2)
 * 
 * @param criticalBlinkOff
 * @parent <Critical>
 * @type boolean
 * @defalt false
 * @desc When critical, the target will not blink.
 * If you want to leave the effect to animation only.
 * 
 * @param <Weak>
 * 
 * @param weakAnimation
 * @parent <Weak>
 * @type animation
 * @desc When weak, this animation plays back to the target.
 * Formula is allowed (Text). (e.g.:target.isEnemy() ? 1 : 2)
 * 
 * @param weakBlinkOff
 * @parent <Weak>
 * @type boolean
 * @defalt false
 * @desc When weak, the target will not blink.
 * If you want to leave the effect to animation only.
 * 
 * @param weakCondition
 * @parent <Weak>
 * @type string
 * @default 150 <= action.calcElementRate(target) * 100
 * @desc The condition for staging weaknesses.
 * The initial value must be 150% effective or higher.
 * 
 * @param <Critical & Weak>
 * 
 * @param effectPrioritity
 * @parent <Critical & Weak>
 * @type select
 * @option Critical Priority @value critical
 * @option Weak Priority @value weak
 * @option Both @value both
 * @default critical
 * @desc Priority for critical/weakness effects.
 * Which is the priority if it occurs at the same time?
 * 
 * @param <Damage Position>
 * 
 * @param enemyDamageOffsetX
 * @parent <Damage Position>
 * @type string
 * @desc Adjustment to the X for displaying enemy damage popups.
 * You can use a formula. The default value is 0.
 * 
 * @param enemyDamageOffsetY
 * @parent <Damage Position>
 * @type string
 * @desc Adjustment to the Y for displaying enemy damage popups.
 * You can use a formula. The default value is -8.
 * 
 * @param actorDamageOffsetX
 * @parent <Damage Position>
 * @type string
 * @desc Adjustment to the X for displaying actor damage popups.
 * You can use a formula. The default value is -32.
 * 
 * @param actorDamageOffsetY
 * @parent <Damage Position>
 * @type string
 * @desc Adjustment to the Y for displaying actor damage popups.
 * You can use a formula. The default value is 0.
 */

/*:ja
 * @target MZ
 * @plugindesc ver1.01 ダメージ処理の演出を変更します。
 * @author 砂川赳 (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/475586753.html
 *
 * @help ダメージ処理の演出を変更します。
 * 
 * ■できること
 * ・敵味方の点滅演出の有効・無効化
 * ・クリティカルや弱点時にアニメーションで演出
 * ・ダメージポップアップの表示位置を変更
 * 
 * 詳細は以下をご覧ください。
 * http://newrpg.seesaa.net/article/475586753.html
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param <Blink>
 * @text ＜点滅演出＞
 * 
 * @param enemyBlink
 * @text 敵を点滅
 * @parent <Blink>
 * @type boolean
 * @default true
 * @desc ダメージ時に敵を点滅させます。
 * 初期値はtrueです。
 * 
 * @param actorBlink
 * @text アクターを点滅
 * @parent <Blink>
 * @type boolean
 * @default false
 * @desc ダメージ時にアクターを点滅させます。
 * 初期値はfalseです。
 * 
 * @param blinkDuration
 * @text 点滅時間
 * @parent <Blink>
 * @type number
 * @default 20
 * @desc 点滅時間です。初期値は20です。
 * 
 * @param <Critical>
 * @text ＜クリティカル演出＞
 * 
 * @param criticalAnimation
 * @text クリティカル時のアニメ
 * @parent <Critical>
 * @type animation
 * @desc クリティカル時、対象に再生するアニメーションです。
 * 数式可（テキスト）。例：target.isEnemy() ? 1 : 2
 * 
 * @param criticalBlinkOff
 * @text クリティカル時の点滅オフ
 * @parent <Critical>
 * @type boolean
 * @defalt false
 * @desc クリティカル時、対象を点滅させません。
 * アニメーションのみに演出を任せたい場合。
 * 
 * @param <Weak>
 * @text ＜弱点演出＞
 * 
 * @param weakAnimation
 * @text 弱点時のアニメ
 * @parent <Weak>
 * @type animation
 * @desc 弱点時、対象に再生するアニメーションです。
 * 数式可（テキスト）。例：target.isEnemy() ? 1 : 2
 * 
 * @param weakBlinkOff
 * @text 弱点時の点滅オフ
 * @parent <Weak>
 * @type boolean
 * @defalt false
 * @desc 弱点時、対象を点滅させません。
 * アニメーションのみに演出を任せたい場合。
 * 
 * @param weakCondition
 * @text 弱点演出を行う条件
 * @parent <Weak>
 * @type string
 * @default 150 <= action.calcElementRate(target) * 100
 * @desc 弱点演出を行う条件です。
 * 初期値は有効度150%以上が条件です。
 * 
 * @param <Critical & Weak>
 * @text ＜クリティカル／弱点共通＞
 * 
 * @param effectPrioritity
 * @text クリティカル弱点優先度
 * @parent <Critical & Weak>
 * @type select
 * @option クリティカル優先 @value critical
 * @option 弱点優先 @value weak
 * @option 両方表示 @value both
 * @default critical
 * @desc クリティカル／弱点演出の優先度です。
 * 同時に発生した場合にどちらを優先するか。
 * 
 * @param <Damage Position>
 * @text ＜ダメージ表示位置＞
 * 
 * @param enemyDamageOffsetX
 * @text 敵のダメージＸ調整
 * @parent <Damage Position>
 * @type string
 * @desc 敵のダメージ数値を表示するＸ座標の調整分です。
 * 数式使用可。初期値は0です。
 * 
 * @param enemyDamageOffsetY
 * @text 敵のダメージＹ調整
 * @parent <Damage Position>
 * @type string
 * @desc 敵のダメージ数値を表示するＹ座標の調整分です。
 * 数式使用可。初期値は-8です。
 * 
 * @param actorDamageOffsetX
 * @text アクターのダメージＸ調整
 * @parent <Damage Position>
 * @type string
 * @desc アクターのダメージ数値を表示するＸ座標の調整分です。
 * 数式使用可。初期値は-32です。
 * 
 * @param actorDamageOffsetY
 * @text アクターのダメージＹ調整
 * @parent <Damage Position>
 * @type string
 * @desc アクターのダメージ数値を表示するＹ座標の調整分です。
 * 数式使用可。初期値は0です。
 */

(function() {
"use strict";

function toBoolean(str) {
    if (str == true) {
        return true;
    }
    return (str == "true") ? true : false;
}
function toNumber(str, def) {
    return isNaN(str) ? def : +(str || def);
}
function setDefault(str, def) {
    return (str != undefined && str.length > 0) ? str : def;
}

var parameters = PluginManager.parameters("NRP_DamageEffect");
// 点滅
var pEnemyBlink = toBoolean(parameters["enemyBlink"], true);
var pActorBlink = toBoolean(parameters["actorBlink"], false);
var pBlinkDuration = toNumber(parameters["blinkDuration"]);
// クリティカル
var pCriticalAnimation = parameters["criticalAnimation"];
var pCriticalBlinkOff = toBoolean(parameters["criticalBlinkOff"], false);
// 弱点
var pWeakAnimation = parameters["weakAnimation"];
var pWeakBlinkOff = toBoolean(parameters["weakBlinkOff"], false);
var pWeakCondition = parameters["weakCondition"];
// クリティカル／弱点
var pEffectPrioritity = setDefault(parameters["effectPrioritity"], "critical");
// ダメージ位置
var pEnemyDamageOffsetX = setDefault(parameters["enemyDamageOffsetX"]);
var pEnemyDamageOffsetY = setDefault(parameters["enemyDamageOffsetY"]);
var pActorDamageOffsetX = setDefault(parameters["actorDamageOffsetX"]);
var pActorDamageOffsetY = setDefault(parameters["actorDamageOffsetY"]);

// 競合を避けるためのフラグ
var noBlink = false;
var noDamageSound = false;

/***********************************************************
 * ■敵のダメージ演出
 ***********************************************************/
/**
 * ●敵のダメージ演出
 */
var _Game_Enemy_performDamage = Game_Enemy.prototype.performDamage;
Game_Enemy.prototype.performDamage = function() {
    if (!pEnemyBlink) {
        noBlink = true;
    }
    // クリティカル or 弱点の演出対象
    if (isCriticalEffect(this) || isWeakEffect(this)) {
        // 通常のダメージ効果音をオフ
        noDamageSound = true;
    }

    _Game_Enemy_performDamage.apply(this, arguments);
    noBlink = false;
    noDamageSound = false;
};

/**
 * ●敵のダメージ効果音
 */
var _SoundManager_playEnemyDamage = SoundManager.playEnemyDamage;
SoundManager.playEnemyDamage = function() {
    if (noDamageSound) {
        return;
    }

    _SoundManager_playEnemyDamage.apply(this, arguments);
};

/**
 * ●点滅開始
 */
var _Sprite_Enemy_startBlink = Sprite_Enemy.prototype.startBlink;
Sprite_Enemy.prototype.startBlink = function() {
    // 点滅時間の設定があれば反映
    if (pBlinkDuration) {
        this._effectDuration = pBlinkDuration;
        return;
    }

    _Sprite_Enemy_startBlink.apply(this, arguments);
};

/***********************************************************
 * ■アクターのダメージ演出
 ***********************************************************/
/**
 * ●アクターの初期化処理
 */
var _Sprite_Actor_initMembers = Sprite_Actor.prototype.initMembers;
Sprite_Actor.prototype.initMembers = function() {
    _Sprite_Actor_initMembers.apply(this, arguments);

    this._effectType = null;
    this._effectDuration = 0;
};

/**
 * ●更新
 */
var _Sprite_Actor_update = Sprite_Actor.prototype.update;
Sprite_Actor.prototype.update = function() {
    _Sprite_Actor_update.apply(this, arguments);

    // エフェクト更新追加
    if (this._actor) {
        this.updateEffect();
    }
};

/**
 * ●ダメージ演出
 */
var _Game_Actor_performDamage = Game_Actor.prototype.performDamage;
Game_Actor.prototype.performDamage = function() {
    // クリティカル or 弱点の演出対象
    if (isCriticalEffect(this) || isWeakEffect(this)) {
        // 通常のダメージ効果音をオフ
        noDamageSound = true;
    }

    _Game_Actor_performDamage.apply(this, arguments);
    noDamageSound = false;

    if (pActorBlink) {
        // 点滅開始
        this.requestEffect('blink');
    }
};

/**
 * ●アクターのダメージ効果音
 */
var _SoundManager_playActorDamage = SoundManager.playActorDamage;
SoundManager.playActorDamage = function() {
    if (noDamageSound) {
        return;
    }

    _SoundManager_playActorDamage.apply(this, arguments);
};

/**
 * ●点滅開始
 */
Sprite_Actor.prototype.startBlink = function() {
    // 点滅時間の設定があれば反映
    if (pBlinkDuration) {
        this._effectDuration = pBlinkDuration;
        return;
    }

    // 点滅時間を設定
    this._effectDuration = 20;
};

/**
 * ●エフェクトの設定
 */
Sprite_Actor.prototype.setupEffect = function() {
    if (this._actor.isEffectRequested()) {
        this.startEffect(this._actor.effectType());
        this._actor.clearEffect();
    }
};

/**
 * ●エフェクト開始
 */
Sprite_Actor.prototype.startEffect = function(effectType) {
    this._effectType = effectType;
    switch (this._effectType) {
    case 'blink':
        this.startBlink();
        break;
    }
    // this.revertToNormal();
};

/**
 * ●エフェクト更新
 */
Sprite_Actor.prototype.updateEffect = function() {
    this.setupEffect();
    if (this._effectDuration > 0) {
        this._effectDuration--;
        switch (this._effectType) {
        case 'blink':
            this.updateBlink();
            break;
        }
        if (this._effectDuration === 0) {
            this._effectType = null;
        }
    }
};

/**
 * ●エフェクト判定
 */
Sprite_Actor.prototype.isEffecting = function() {
    return this._effectType !== null;
};

/**
 * ●点滅演出更新
 */
Sprite_Actor.prototype.updateBlink = function() {
    this.opacity = (this._effectDuration % 10 < 5) ? 255 : 0;
};

/***********************************************************
 * ■点滅共通部分
 ***********************************************************/
/**
 * ●エフェクト設定
 */
var _Game_Battler_requestEffect = Game_Battler.prototype.requestEffect;
Game_Battler.prototype.requestEffect = function(effectType) {
    // 点滅の場合
    if (effectType == "blink") {
        // 無効フラグが立っている場合は処理しない
        if (noBlink) {
            return;

        // クリティカルかつ点滅無効なら処理しない
        } else if (isCriticalEffect(this) && pCriticalBlinkOff) {
            return;

        // 弱点かつ点滅無効なら処理しない
        } else if (isWeakEffect(this) && pWeakBlinkOff) {
            return;
        }
    }

    _Game_Battler_requestEffect.apply(this, arguments);
};

/***********************************************************
 * ■クリティカル演出
 ***********************************************************/
/**
 * ●クリティカル演出
 */
var _Window_BattleLog_displayCritical = Window_BattleLog.prototype.displayCritical;
Window_BattleLog.prototype.displayCritical = function(target) {
    var isCriticalFlg = isCriticalEffect(target); // クリティカル判定
    var isWeakFlg = isWeakEffect(target);         // 弱点判定

    // クリティカルと弱点が同時発生した場合
    if (isCriticalFlg && isWeakFlg) {
        // クリティカル優先
        if (pEffectPrioritity == "critical") {
            callAnimation(target, eval(pCriticalAnimation), this);
            // 処理終了
            _Window_BattleLog_displayCritical.apply(this, arguments);
            return;

        // 弱点優先
        } else if (pEffectPrioritity == "weak") {
            callAnimation(target, eval(pWeakAnimation), this);
            // 処理終了
            _Window_BattleLog_displayCritical.apply(this, arguments);
            return;
        }
    }

    // それ以外はクリティカルと弱点を別々に処理
    if (isCriticalFlg) {
        callAnimation(target, eval(pCriticalAnimation), this);
    }
    if (isWeakFlg) {
        callAnimation(target, eval(pWeakAnimation), this);
    }

    _Window_BattleLog_displayCritical.apply(this, arguments);
};

/**
 * ●クリティカル演出を行うかどうか？
 */
function isCriticalEffect(target) {
    // eval参照用
    var action = BattleManager._action;

    // クリティカルかつアニメーションが設定されている
    if (target.result().critical && pCriticalAnimation) {
        return true;
    }
    return false;
}

/**
 * ●弱点演出を行うかどうか？
 */
function isWeakEffect(target) {
    // eval参照用
    var action = BattleManager._action;

    // ミス、回避、弱点アニメーションの設定がない場合は無効
    if (target.result().missed || target.result().evaded || !pWeakAnimation) {
        return false;

    // ダメージがない場合は無効
    } else if (target.result().hpAffected && target.result().hpDamage <= 0) {
        return false;
    }

    return eval(pWeakCondition);
}

/**
 * ●アニメーション呼び出しを行う。
 * MV, MZの両方に対応
 */
function callAnimation(target, animationId, win) {
    // MVの場合
    if (Utils.RPGMAKER_NAME == "MV") {
        target.startAnimation(animationId, target.isActor(), 0);

    // MZの場合
    } else {
        let animation = $dataAnimations[animationId];

        // MZ用アニメーションが空ならMV用アニメーションを取得
        // ※ただし$dataMvAnimationsが有効な場合のみ
        if (isEmptyAnimation(animation) && typeof $dataMvAnimations !== 'undefined') {
            animation = $dataMvAnimations[animationId];
        }

        createAnimationSprite([target], animation, false, 0);
    }
}

/**
 * ●MZアニメーションの情報が空かどうかの判定
 * ※AnimationMv.jsから移植
 */
function isEmptyAnimation(animation) {
    return animation &&
        !animation.effectName &&
        animation.flashTimings.length === 0 &&
        animation.soundTimings.length === 0;
}

/**
 * MZ用のアニメーション呼び出し
 */
function createAnimationSprite(targets, animation, mirror, delay) {
    var spriteSet = BattleManager._spriteset;

    const mv = spriteSet.isMVAnimation(animation);
    const sprite = new (mv ? Sprite_AnimationMV : Sprite_Animation)();
    const targetSprites = spriteSet.makeTargetSprites(targets);
    const baseDelay = spriteSet.animationBaseDelay();
    const previous = delay > baseDelay ? spriteSet.lastAnimationSprite() : null;
    if (spriteSet.animationShouldMirror(targets[0])) {
        mirror = !mirror;
    }
    sprite.targetObjects = targets;
    sprite.setup(targetSprites, animation, mirror, delay, previous);
    spriteSet._effectsContainer.addChild(sprite);
    spriteSet._animationSprites.push(sprite);

    // ウェイトしないためのフラグ
    sprite._noWait = true;
};

// MZの場合
if (Utils.RPGMAKER_NAME != "MV") {
    /**
     * ●アニメーションの実行中判定
     * ※実際にはウェイト判定に使う。
     */
    const _Spriteset_Base_isAnimationPlaying = Spriteset_Base.prototype.isAnimationPlaying;
    Spriteset_Base.prototype.isAnimationPlaying = function() {
        // 全てのアニメーションがnoWaitならば待たない。
        // これによって、演出時のウェイトなくす。
        if (this._animationSprites.length > 0
                && this._animationSprites.every(sprite => sprite._noWait)) {
            return false;
        }

        return _Spriteset_Base_isAnimationPlaying.apply(this, arguments);
    };
}

/***********************************************************
 * ■ダメージ表示位置
 ***********************************************************/
/**
 * ●敵のダメージ表示位置Ｘ
 */
if (pEnemyDamageOffsetX != undefined) {
    Sprite_Enemy.prototype.damageOffsetX = function() {
        return eval(pEnemyDamageOffsetX);
    };
}

/**
 * ●敵のダメージ表示位置Ｙ
 */
if (pEnemyDamageOffsetY != undefined) {
    Sprite_Enemy.prototype.damageOffsetY = function() {
        return eval(pEnemyDamageOffsetY);
    };
}

/**
 * ●アクターのダメージ表示位置Ｘ
 */
if (pActorDamageOffsetX != undefined) {
    Sprite_Actor.prototype.damageOffsetX = function() {
        return eval(pActorDamageOffsetX);
    };
}

/**
 * ●アクターのダメージ表示位置Ｙ
 */
if (pActorDamageOffsetY != undefined) {
    Sprite_Actor.prototype.damageOffsetY = function() {
        return eval(pActorDamageOffsetY);
    };
}

})();
