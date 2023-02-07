//=============================================================================
// Change_Scope.js
//=============================================================================

/*:
 * @plugindesc スキルを「敵<=>味方」に変更可能になります。
 * @author 村人C
 *
 * @help
 *
 * 使い方
 * 戦闘時、ターゲットを選択時に「Shift」を押すことで
 * 敵<=>味方
 * に変更可能になります。
 *
 * 仕様
 * 使用者、敵○体ランダム、全体対象には、適用されません。
 * スキルID１の「攻撃」も対象の切り替えが可能になります。
 *
 *
 * readmeやスタッフロールの明記、使用報告は任意
 *
 */
  
 (function() {
	 // ターン終了
	 BattleManager.endTurn_Change_Scope = BattleManager.endTurn;
	 BattleManager.endTurn = function() {
		 this.allBattleMembers().forEach(function(battler) {
			 battler._change_scope = false // 初期化
		 }, this);
		 BattleManager.endTurn_Change_Scope.call(this);
	};
	// 前のアクターへ
	BattleManager.selectPreviousCommand_Change_Scope = BattleManager.selectPreviousCommand;
	BattleManager.selectPreviousCommand = function() {
		$gameParty.members()[Math.max(this._actorIndex-1, 0)]._change_scope = false;  // 初期化
		BattleManager.selectPreviousCommand_Change_Scope.call(this);
	};
	 // フラグ
	var _Game_Battler_initMembers_Change_Scope = Game_Battler.prototype.initMembers;
	Game_Battler.prototype.initMembers = function() {
		_Game_Battler_initMembers_Change_Scope.call(this);
		this._change_scope = false; // 初期化
	};
	// ターゲットの配列作成
	var _Game_Action_makeTargets_Change_Scope = Game_Action.prototype.makeTargets;
	Game_Action.prototype.makeTargets = function() {
		if (this.subject()._change_scope) {
			var targets = [];
			if (!this._forcing && this.subject().isConfused()) {
				targets = [this.confusionTarget()]; // 変更なし
			} else if (this.isForOpponent()) {
				targets = this.targetsForFriends(); // 入れ替え
			} else if (this.isForFriend()) {
				targets = this.targetsForOpponents(); // 入れ替え
			}
			return this.repeatTargets(targets);
		} else {
			return _Game_Action_makeTargets_Change_Scope.call(this);
		}
	};
	// 選択判定
	var _Scene_Battle_update_Change_Scope = Scene_Battle.prototype.update;
	Scene_Battle.prototype.update = function() {
		if (this._actorWindow.visible && Input.isTriggered('shift')) { // 現在：味方
			BattleManager.actor()._change_scope = !BattleManager.actor()._change_scope;
			this._actorWindow.deactivate(); // 忘れるとエラー
			this._actorWindow.hide();
			this.selectEnemySelection(); // 切り替え
		}else if (this._enemyWindow.visible && Input.isTriggered('shift')) { // 現在：敵
			BattleManager.actor()._change_scope = !BattleManager.actor()._change_scope;
			this._enemyWindow.deactivate(); // 忘れるとエラー
			this._enemyWindow.hide();
			this.selectActorSelection(); // 切り替え
		}
		_Scene_Battle_update_Change_Scope.call(this);
	};
})();