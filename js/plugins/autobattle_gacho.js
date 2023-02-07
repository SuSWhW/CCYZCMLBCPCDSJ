/*:
 * @plugindesc パーティコマンドにオート戦闘を実装します。Gilles Meyer氏のプラグインと、やな氏のプラグインを参考にしました。
 * @author ガチョピン
 *
 * @param Auto Attack Text Party
 * @default おまかせ
 *
 * @help プラグインコマンドで表示名の変更が可能です。
 * 競合や他サイトプラグインとの併用で表示がおかしくなった場合は
 * そのつど自力での改変をお願いします(そっちのが簡単)。
 */



(function() {


  var parameters = PluginManager.parameters('AutoBattle');
  var autoPartyText = String(parameters['Auto Attack Text Party'] || "おまかせ");

  
  BattleManager.startAutoBattle = function(){
		this.clearActor();
		for(var i=0;i<$gameParty.members().length;i++){
			this.selectNextCommand();
			var actor = this.actor();
			if (actor && actor.canInput()){
				actor.makeActions();
				actor.makeAutoBattleActions();				
			}
		}
		if (BattleManager.isInputting()){ this.startTurn() }
	};////////////////
  
  

  Scene_Battle.prototype.commandAutoFight = function() {
    this.selectNextCommand();
    do {
      this.commandAutoAttack.apply(this, arguments);
    } while(BattleManager.isInputting());
    this._actorCommandWindow.deactivate();
  };

  Scene_Battle.prototype.commandAutoAttack = function() {
	BattleManager.startAutoBattle();
  };


  Window_PartyCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.fight,  'fight');
    this.addCommand(autoPartyText,  'autofight');
    this.addCommand(TextManager.escape, 'escape', BattleManager.canEscape());
  };

  var _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
  Scene_Battle.prototype.createPartyCommandWindow = function() {
    _Scene_Battle_createPartyCommandWindow.apply(this, arguments);
    this._partyCommandWindow.setHandler('autofight',  this.commandAutoFight.bind(this));
  };



})();