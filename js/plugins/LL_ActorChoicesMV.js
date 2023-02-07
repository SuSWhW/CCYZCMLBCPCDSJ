//=============================================================================
// RPGツクールMV - LL_ActorChoicesMV.js v1.1.1
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// URL below for license details.
// https://nine-yusha.com/plugin/
//=============================================================================

/*:
 * @target MV
 * @plugindesc アクターを選択するプラグインコマンドを実装します。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin-actorchoices/
 *
 * @help LL_ActorChoicesMV.js
 *
 * アクターを選択するプラグインコマンドを実装します。
 *
 * プラグインコマンド:
 *   LL_ActorChoicesMV [選択種類] [結果変数] [キャンセル許可] [背景] [位置] [絞込リストID]
 *
 *   選択種類: partyMember=現在のパーティ、deadPartyMember=戦闘不能のパーティ、
 *             alivePartyMember=生存しているパーティ、secondPartyMember=先頭を除くパーティ、
 *             reserveMember=パーティ未参加メンバー、allMember=全てのメンバー
 *
 *   結果変数: 選択結果を受け取る変数IDを指定します。
 *   キャンセル許可: 0=禁止、1=許可 (キャンセルされた場合、結果は-1)
 *   背景: 0=ウィンドウ、1=暗くする、2=透明
 *   位置: 0=左、1=中、2=右
 *   絞込リストID(省略可): 絞込リストのIDを指定
 *
 *   【プラグインコマンドの入力例】
 *   LL_ActorChoicesMV partyMember 1 0 0 0    // 現在のパーティから選択
 *   LL_ActorChoicesMV partyMember 1 0 0 0 1  // 絞込リストID:1を指定する場合
 *
 * 利用規約:
 *   ・著作権表記は必要ございません。
 *   ・利用するにあたり報告の必要は特にございません。
 *   ・商用・非商用問いません。
 *   ・R18作品にも使用制限はありません。
 *   ・ゲームに合わせて自由に改変していただいて問題ございません。
 *   ・プラグイン素材としての再配布（改変後含む）は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2021/02/17
 *
 * @param selectActorListMasters
 * @text アクター絞込リスト
 * @desc 選択肢に表示するアクターリストをこちらで定義しておき、
 * 選択肢表示にリストIDで指定することができます。
 * @default []
 * @type struct<selectActorListMasters>[]
 *
 * @param cancelLabel
 * @text キャンセル項目名
 * @desc キャンセルを許可した場合のキャンセル項目名です。
 * @default キャンセル
 * @type string
 *
 * @param cancelPosition
 * @text キャンセル項目位置
 * @desc キャンセルを許可した場合のキャンセル項目の位置です。
 * @default bottom
 * @type select
 * @option 最下部
 * @value bottom
 * @option 最上部
 * @value top
 * @option 非表示
 * @value hidden
 */

/*~struct~selectActorListMasters:
 *
 * @param id
 * @text リストID
 * @desc 選択肢のリストを定義するIDです。
 * プラグインコマンドで呼び出す際のIDです。
 * @default 1
 * @type number
 *
 * @param actorLists
 * @text アクターリスト
 * @desc 設定するとリスト内のアクターのみ選択肢に表示されます。
 * 通常は空のままで問題ありません。
 * @default []
 * @type struct<actorLists>[]
 */

/*~struct~actorLists:
 *
 * @param actorId
 * @text アクターID
 * @desc 選択肢に表示するアクターを選択してください。
 * @type actor
 *
 * @param switchId
 * @text スイッチID
 * @desc スイッチON時のみアクターを表示したい場合に設定します。
 * なしに設定した場合は、スイッチ条件に関わらず表示されます。
 * @type switch
 */

(function() {
    "use strict";
    var pluginName = "LL_ActorChoicesMV";

    var parameters = PluginManager.parameters(pluginName);
    var cancelLabel = String(parameters["cancelLabel"] || "キャンセル");
    var cancelPosition = String(parameters["cancelPosition"] || "bottom");

    var selectActorListMasters = JSON.parse(parameters["selectActorListMasters"] || "null");
	var actorListMasters = [];
	if (selectActorListMasters) {
		selectActorListMasters.forEach(function(elm) {
            var elmArrays = JSON.parse(elm || "null");
            var elmArrays2 = JSON.parse(elmArrays.actorLists || "null");
            actorListMasters.push({id: elmArrays.id, actorLists: elmArrays2});
		});
	}


    //-----------------------------------------------------------------------------
	// PluginCommand (for MV)
    //

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === pluginName) {
            switch (args[0]) {
				case "setActors":
                    //
                    return;
                case "showMessage":
                    //
                    return;
            }

            var selectType = String(args[0]);

            if ($gameMessage.isBusy()) {
                return false;
            }

            // 設定を取得
            var variableNumber = Number(args[1]);
            var cancelType = Number(args[2]) === 1 ? -2 : -1;
            var background = Number(args[3] || 0);
            var positionType = Number(args[4] || 2);
            var selectActorListId = Number(args[5] || -1);

            // アクター絞込リスト
            var selectActorLists = actorListMasters.filter(function(item) {
				if (Number(item.id) == selectActorListId) {
					return true;
				}
			});

            var filterActorLists = [];
            if (selectActorLists[0]) {
                selectActorLists[0].actorLists.forEach(function(elm) {
                    if (Number(JSON.parse(elm).switchId) === 0 || $gameSwitches.value(Number(JSON.parse(elm).switchId))) {
                        filterActorLists.push(Number(JSON.parse(elm).actorId));
                    }
                });
            }

            // アクター選択リストを取得
            var actorLists = setupActorLists(selectType, filterActorLists);

            // キャンセル項目の追加
            if (cancelType === -2) {
                if (cancelPosition == "bottom") actorLists.push({id: -1, name: cancelLabel});
                if (cancelPosition == "top") actorLists.unshift({id: -1, name: cancelLabel});
            }

            var choices = actorLists.map(function(item) {return item.name});

            // アクター選択肢を表示
            $gameMessage.setChoices(choices, 0, cancelType);
            $gameMessage.setChoiceBackground(background);
            $gameMessage.setChoicePositionType(positionType);
            $gameMessage.setChoiceCallback(function(n) {
                if (n == -2) {
                    $gameVariables.setValue(variableNumber, -1);
                } else {
                    // 変数に選択されたアクターIDを代入
                    $gameVariables.setValue(variableNumber, actorLists[n].id);
                }
            });

            this.setWaitMode("message");
        }
	};

    var setupActorLists = function(selectType, filterActorLists) {
        var result = null;
        switch (selectType) {
            case "partyMember":
                // 現在のパーティメンバー
                result = $gameParty.members().map(function(item) {
                    if (item) return {"id": item._actorId, "name": item._name};
                });
                break;
            case "deadPartyMember":
                // 戦闘不能のパーティメンバー
                result = $gameParty.deadMembers().map(function(item) {
                    if (item) return {"id": item._actorId, "name": item._name};
                });
                break;
            case "alivePartyMember":
                // 生存しているパーティメンバー
                result = $gameParty.aliveMembers().map(function(item) {
                    if (item) return {"id": item._actorId, "name": item._name};
                });
                break;
            case "secondPartyMember":
                // 先頭を除くパーティメンバー
                result = partyMembers = $gameParty.members().map(function(item) {
                    if (item) return {"id": item._actorId, "name": item._name};
                }).slice(1);
                break;
            case "reserveMember":
                // パーティ未参加メンバー
                var exPartyMemberIds = $gameParty.members().map(function(item) {
                    if (item) return item._actorId;
                });
                result = $dataActors.filter(Boolean).map(function(item) {
                    if (item) return {"id": item.id, "name": item.name};
                }).filter(function(item) {
                    if (exPartyMemberIds.indexOf(item.id) === -1) return true;
                });
                break;
            default:
                // 全てのメンバー
                result = $dataActors.filter(Boolean).map(function(item) {
                    if (item) return {"id": item.id, "name": item.name};
                });
        }

        // アクター絞込 (設定時のみ)
        if (filterActorLists.length) {
            result = result.filter(function(item) {
                if (filterActorLists.indexOf(item.id) !== -1) return true;
            });
        }

        return result;
    }
})();
