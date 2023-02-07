//=============================================================================
// NRP_DynamicMotion.js
//=============================================================================

/*:
 * @plugindesc v1.08 When executing skills, call motion freely.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 *
 * @help When executing skills(items), call motion freely.
 * "NRP_DynamicAnimation.js" is required for the operation of this plugin.
 * 
 * This plugin has many features.
 * See below for details.
 * http://newrpg.seesaa.net/article/473809182.html
 * 
 * <Terms>
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @param templateList
 * @type struct<DynamicMotion>[]
 * @default ["{\"<Basic>\":\"\",\"name\":\"接近\",\"templateId\":\"near\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX + a.width/2 * mirroring + (position != 3 ? b.width/2 : 150) * mirroring\",\"ey\":\"defaultY + a.height/2\",\"airY\":\"0\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"scriptRT\":\"\"}","{\"<Basic>\":\"\",\"name\":\"衝突\",\"templateId\":\"crash\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX\",\"ey\":\"defaultY + a.height/2\",\"airY\":\"0\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"貫通\",\"templateId\":\"pierce\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"z\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"(b.isActor() ? Graphics.boxWidth + a.width : -a.width)\",\"ey\":\"sy + (defaultY - (sy - a.height/2)) * (ex - sx) / (defaultX - sx)\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"<Basic>\":\"\",\"name\":\"前進\",\"templateId\":\"stepForward\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"z\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"a.x - 48 * (a.isEnemy() ? -1 : 1)\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"<Basic>\":\"\",\"name\":\"後退\",\"templateId\":\"stepBack\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"z\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"a.x + 48 * (a.isEnemy() ? -1 : 1)\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"<Basic>\":\"\",\"name\":\"帰還\",\"templateId\":\"return\",\"condition\":\"\",\"delay\":\"(isSync ? 0 : \\\"auto\\\")\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"false\",\"damage\":\"\",\"damageAll\":\"true\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"a._homeX\",\"ey\":\"a._homeY\",\"airY\":\"0\",\"duration\":\"24\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"-50\",\"<Motion>\":\"\",\"motion\":\"escape\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"ホーム\",\"templateId\":\"home\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"a._homeX\",\"ey\":\"a._homeY\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"ジャンプ\",\"templateId\":\"jump\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"-100\",\"<Motion>\":\"\",\"motion\":\"wait\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"scriptRT\":\"\"}","{\"<Basic>\":\"\",\"name\":\"回転\",\"templateId\":\"roll\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"t/et * -Math.PI*2 * mirroring\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"攻撃\",\"templateId\":\"attack\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"attack\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"攻撃R\",\"templateId\":\"attackR\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"attack\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"this._pattern - 1\",\"motionStartPattern\":\"2\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"攻撃0\",\"templateId\":\"attack0\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"attack\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"0\",\"motionStartPattern\":\"0\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"攻撃1\",\"templateId\":\"attack1\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"attack\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"1\",\"motionStartPattern\":\"1\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"攻撃2\",\"templateId\":\"attack2\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"attack\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"2\",\"motionStartPattern\":\"2\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"突き\",\"templateId\":\"thrust\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"thrust\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"振り\",\"templateId\":\"swing\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"swing\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"飛び道具\",\"templateId\":\"missile\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"missile\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"魔法発動\",\"templateId\":\"spell\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"spell\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"スキル発動\",\"templateId\":\"skill\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"skill\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"透明\",\"templateId\":\"invisible\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"255 * (1 - t/et)\"}","{\"<Basic>\":\"\",\"name\":\"透明解除\",\"templateId\":\"visible\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"255 * t/et\"}","{\"<Basic>\":\"\",\"name\":\"反転\",\"templateId\":\"mirror\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"true\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"反転解除\",\"templateId\":\"mirrorOff\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"false\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"対象\",\"templateId\":\"target\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"targets\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"対象毎に実行\",\"templateId\":\"every\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"true\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"ウェイト\",\"templateId\":\"wait\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"auto\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"ウェイトなし\",\"templateId\":\"noWait\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"0\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"ディレイ\",\"templateId\":\"delay\",\"condition\":\"\",\"delay\":\"auto\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"ディレイなし\",\"templateId\":\"noDelay\",\"condition\":\"\",\"delay\":\"0\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"対象が他者\",\"templateId\":\"ifOther\",\"condition\":\"a != b\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"対象が自分\",\"templateId\":\"ifSelf\",\"condition\":\"a == b\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"味方のみ\",\"templateId\":\"ifActor\",\"condition\":\"a.isActor()\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"z\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"<Basic>\":\"\",\"name\":\"敵のみ\",\"templateId\":\"ifEnemy\",\"condition\":\"a.isEnemy()\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"z\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"<Basic>\":\"\",\"name\":\"即時\",\"templateId\":\"soon\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"auto\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"1\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"1\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"scriptRT\":\"\"}","{\"<Basic>\":\"\",\"name\":\"自分ズーム\",\"templateId\":\"zoomA\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"scriptRT\":\"$gameScreen.setZoom(a.x, a.y - a.height/2, 1 + 0.5 * t/et)\"}","{\"<Basic>\":\"\",\"name\":\"対象ズーム\",\"templateId\":\"zoomB\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"scriptRT\":\"$gameScreen.setZoom(b.x, b.y - b.height/2, 1 + 0.5 * t/et)\"}","{\"<Basic>\":\"\",\"name\":\"ズーム解除\",\"templateId\":\"zoomOff\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"scriptRT\":\"$gameScreen.setZoom($gameScreen._zoomX, $gameScreen._zoomY, 1 + ($gameScreen._zoomScale - 1) * (1 - t/et))\"}","{\"<Basic>\":\"\",\"name\":\"振動\",\"templateId\":\"shake\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"Math.sin(Math.PI * 2 * t / 4) * 3\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"scriptRT\":\"\"}","{\"<Basic>\":\"\",\"name\":\"公転\",\"templateId\":\"revolve\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"z\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"100 * (Math.sin(t/et * Math.PI))\",\"radiusY\":\"100 * (Math.sin(t/et * Math.PI))\",\"radX\":\"t/et * Math.PI*2\",\"radY\":\"t/et * Math.PI*2\"}"]
 * @desc List of defined template motions.
 * You can also add new templates.
 * 
 * @param shortTagName
 * @type string
 * @default DM
 * @desc You can omit the tag name with the specified string.
 * ex. <D-Motion:near/> -> <dm:near/>
 * 
 * @param shortSettingTagName
 * @type string
 * @default DS
 * @desc You can omit the setting tag name with the specified string.
 * ex. <D-Setting:NoStep> -> <ds:NoStep>
 * 
 * @param setStartMotion
 * @type select
 * @option 0:always @value 0
 * @option 1:always nothing @value 1
 * @option 2:None when motion @value 2
 * @default 2
 * @desc Set whether to start the attack or skill.
 * 
 * @param setStepForward
 * @type select
 * @option 0:always @value 0
 * @option 1:always nothing @value 1
 * @option 2:None when motion @value 2
 * @default 0
 * @desc Set whether there is one step forward motion.
 * 
 * @param defaultDuration
 * @type number
 * @min 0
 * @default 12
 * @desc The default value for move duration.
 * 
 * @param defaultEnemyMotionDuration
 * @type number
 * @min 0
 * @default 12
 * @desc The default value for enemy motion duration.
 * Normally, the enemy has no motion. Just wait for the time.
 *
 * @param jumpShadow
 * @type boolean
 * @default true
 * @desc Show shadows when jumping.
 * 
 * @param immortalState
 * @type state
 * @default 3
 * @desc The immortal state number to use for performance.
 * Please set up a dedicated state if possible.
 * 
 * @param <Priority>
 * @desc Display priority-related headings.
 * 
 * @param usePriority
 * @parent <Priority>
 * @type boolean
 * @default true
 * @desc Enables the display priority change function.
 * 
 * @param battlerZ
 * @parent <Priority>
 * @type number
 * @decimals 1
 * @default 3
 * @desc The initial value of the Z coordinate of battler.
 * The default value is 3.
 * 
 * @param opponentSideZ
 * @parent <Priority>
 * @type number
 * @decimals 1
 * @default 2.5
 * @desc Changes the Z coordinate of the opponent's side at the time of action.
 * It is assumed to be displayed below the action subject.
 */
/*~struct~DynamicMotion:
 * @param <Basic>
 * @desc Heading for basic settings.
 * 
 * @param name
 * @parent <Basic>
 * @type string
 * @desc This is a note for identification. Please give a descriptive name.
 * you can use it even if you specify this in the note field of the skill.
 * 
 * @param templateId
 * @parent <Basic>
 * @type string
 * @desc The identifier used to call the template.
 * Specify this ID in the note of skills and items.
 * 
 * @param condition
 * @parent <Basic>
 * @type string
 * @desc This is an execution condition.
 * 
 * @param delay
 * @parent <Basic>
 * @type string
 * @desc Wait frame before displaying motion.
 * When set to "auto", wait for the end of the previous motion.
 * 
 * @param wait
 * @parent <Basic>
 * @type string
 * @desc Wait frame after displaying motion.
 * When set to "auto", wait for the end of this motion.
 * 
 * @param repeat
 * @parent <Basic>
 * @type string
 * @desc The number of motion repetitions.
 * 
 * @param performer
 * @parent <Basic>
 * @type string
 * @desc Target to execute motion.
 * Battler or its array can be specified.
 * 
 * @param noReturn
 * @parent <Basic>
 * @type boolean
 * @desc An actor will not return to the home position.
 * To cancel, specify false.
 * 
 * @param battlerImage
 * @parent <Basic>
 * @type string
 * @desc Temporarily change the image of the battler.
 * It is released at the end of the battle.
 * 
 * @param <Basic Repeat>
 * @desc Basic settings that are processed for each repeat.
 * 
 * @param position
 * @parent <Basic Repeat>
 * @type select
 * @option 0:Overhead @value 0
 * @option 1:Center @value 1
 * @option 2:Foot @value 2
 * @option 3:Screen @value 3
 * @desc The position of the motion.
 * 
 * @param interval
 * @parent <Basic Repeat>
 * @type string
 * @desc The interval at which the motion repeats.
 * That time corresponds to one frame of the animation.
 * 
 * @param rate
 * @parent <Basic Repeat>
 * @type string
 * @desc It is the time of one frame of motion.
 * The default value is 4. The drawing is updated every 4/60 seconds.
 * 
 * @param every
 * @parent <Basic Repeat>
 * @type boolean
 * @desc If ON, repeat the motion for every target.
 * 
 * @param nextDelay
 * @parent <Basic Repeat>
 * @type string
 * @desc The time difference in motion for each target in the skill.
 * It is meaningless if "every" is not turned on.
 * 
 * @param performerDelay
 * @parent <Basic Repeat>
 * @type string
 * @desc The time difference in motion for each performer.
 * 
 * @param mirror
 * @parent <Basic Repeat>
 * @type boolean
 * @desc The display of battler is reversed left and right.
 * 
 * @param damage
 * @parent <Basic Repeat>
 * @type boolean
 * @desc Perform damage processing without waiting for the end of the motion.
 * This is processed only once.
 * 
 * @param damageAll
 * @parent <Basic Repeat>
 * @type boolean
 * @desc Perform damage processing without waiting for the end of the motion.
 * This is all handled. (Faster normal damage processing)
 * 
 * @param noShadow
 * @parent <Basic Repeat>
 * @type boolean
 * @desc Do not show battler shadows.
 * 
 * @param playSe
 * @parent <Basic Repeat>
 * @type string
 * @desc Plays the specified sound effect. ex1. Cat
 * ex2. {"name": "Cat", "volume": 90, "pitch": 100, "pan": 0}
 * 
 * @param commonEvent
 * @parent <Basic Repeat>
 * @type common_event
 * @desc Runs the common event of the specified number.
 * 
 * @param script
 * @parent <Basic Repeat>
 * @type string
 * @desc Runs the specified script.
 * 
 * @param plugin
 * @parent <Basic Repeat>
 * @type string
 * @desc Runs the specified plugin command.
 * 
 * @param <End Point>
 * @desc End point related parameters.
 * 
 * @param ex
 * @parent <End Point>
 * @type string
 * @desc The X coordinate of the end point.
 * The battler moves to the end point.
 * 
 * @param ey
 * @parent <End Point>
 * @type string
 * @desc The Y coordinate of the end point.
 * The battler moves to the end point.
 * 
 * @param airY
 * @parent <End Point>
 * @type string
 * @desc The air Y coordinate of the end point.
 * The battler moves to the end point in the air.
 * 
 * @param duration
 * @parent <End Point>
 * @type string
 * @desc The time it takes to move. (1/6os)
 * 
 * @param frame
 * @parent <End Point>
 * @type string
 * @desc Time required for movement (animation frame).
 * This has priority over "duration".
 * 
 * @param arcX
 * @parent <End Point>
 * @type string
 * @desc The width of the parabola.
 * 
 * @param arcY
 * @parent <End Point>
 * @type string
 * @desc The vertical width of the parabola.
 * Note that negative values go up!
 * 
 * @param <Motion>
 * @desc Motion-related parameters.
 * 
 * @param motion
 * @parent <Motion>
 * @type select
 * @option attack
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc The name of the motion to execute.
 * Ex: walk, wait. If you set "attack", the weapon will be used.
 * 
 * @param motionDuration
 * @parent <Motion>
 * @type string
 * @desc The time required for the motion.(1/6os)
 * 
 * @param motionFrame
 * @parent <Motion>
 * @type string
 * @desc Time required for motion (animation frame).
 * This has priority over "motionDuration".
 * 
 * @param motionPattern
 * @parent <Motion>
 * @type string
 * @desc Motion pattern.
 * Usually a number from 0 to 2 is entered.
 * 
 * @param motionStartPattern
 * @parent <Motion>
 * @type string
 * @desc The start pattern of the motion.
 * Usually 0, but 1,2 can be specified.
 * 
 * @param weaponId
 * @parent <Motion>
 * @type string
 * @desc Weapon ID used during motion.
 * 
 * @param weaponType
 * @parent <Motion>
 * @type string
 * @desc Weapon Type used during motion.
 * This takes priority over the weapon ID.
 * 
 * @param <Real Time>
 * @desc Items calculated every 1/60 second.
 *
 * @param dx
 * @parent <Real Time>
 * @type string
 * @desc It is the real-time calculation position of X coordinate.
 * 
 * @param dy
 * @parent <Real Time>
 * @type string
 * @desc It is the real-time calculation position of Y coordinate.
 * 
 * @param addX
 * @parent <Real Time>
 * @type string
 * @desc Value to be added to the X coordinate.
 * 
 * @param addY
 * @parent <Real Time>
 * @type string
 * @desc Value to be added to the Y coordinate.
 * 
 * @param scaleX
 * @parent <Real Time>
 * @type string
 * @desc The magnification of the width. 1.0 is standard.
 * 
 * @param scaleY
 * @parent <Real Time>
 * @type string
 * @desc The magnification of the height. 1.0 is standard.
 * 
 * @param rotation
 * @parent <Real Time>
 * @type string
 * @desc Turn rate
 * One revolution with "Math.PI * 2".
 * 
 * @param opacity
 * @parent <Real Time>
 * @type string
 * @desc Opacity.
 * 255 is opaque and 0 is transparent.
 * 
 * @param color
 * @parent <Real Time>
 * @type string
 * @desc Change the color tone.
 * Ex.[255, 255, 255, 255](Red, green, blue, strength)
 * 
 * @param z
 * @parent <Real Time>
 * @type number
 * @decimals 1
 * @desc Change the Z coordinate of battler.
 * 
 * @param scriptRT
 * @parent <Real Time>
 * @type string
 * @desc Runs the specified script in real time.
 * 
 * @param <Real Time Circle>
 * @desc Items related to real-time circular motion.
 * 
 * @param radiusX
 * @parent <Real Time Circle>
 * @type string
 * @desc The radius of the circular motion in the X direction.
 * 
 * @param radiusY
 * @parent <Real Time Circle>
 * @type string
 * @desc The radius of the circular motion in the Y direction.
 * 
 * @param radX
 * @parent <Real Time Circle>
 * @type string
 * @desc The circular motion angle in the X direction.
 * 2π is one cycle.
 * 
 * @param radY
 * @parent <Real Time Circle>
 * @type string
 * @desc The circular motion angle in the Y direction.
 * 2π is one cycle.
 */

/*:ja
 * @plugindesc v1.08 スキル実行時、自在にモーションを呼び出す。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 *
 * @help スキル（アイテム）から自在にモーションを呼び出します。
 * このプラグインの動作には、NRP_DynamicAnimation.jsが必要です。
 * 
 * 当プラグインは非常に多機能となっています。
 * 詳細は以下をご覧ください。
 * http://newrpg.seesaa.net/article/473809182.html
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param templateList
 * @text テンプレート一覧
 * @type struct<DynamicMotion>[]
 * @default ["{\"<Basic>\":\"\",\"name\":\"接近\",\"templateId\":\"near\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX + a.width/2 * mirroring + (position != 3 ? b.width/2 : 150) * mirroring\",\"ey\":\"defaultY + a.height/2\",\"airY\":\"0\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"scriptRT\":\"\"}","{\"<Basic>\":\"\",\"name\":\"衝突\",\"templateId\":\"crash\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX\",\"ey\":\"defaultY + a.height/2\",\"airY\":\"0\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"貫通\",\"templateId\":\"pierce\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"z\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"(b.isActor() ? Graphics.boxWidth + a.width : -a.width)\",\"ey\":\"sy + (defaultY - (sy - a.height/2)) * (ex - sx) / (defaultX - sx)\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"<Basic>\":\"\",\"name\":\"前進\",\"templateId\":\"stepForward\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"z\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"a.x - 48 * (a.isEnemy() ? -1 : 1)\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"<Basic>\":\"\",\"name\":\"後退\",\"templateId\":\"stepBack\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"z\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"a.x + 48 * (a.isEnemy() ? -1 : 1)\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"<Basic>\":\"\",\"name\":\"帰還\",\"templateId\":\"return\",\"condition\":\"\",\"delay\":\"(isSync ? 0 : \\\"auto\\\")\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"false\",\"damage\":\"\",\"damageAll\":\"true\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"a._homeX\",\"ey\":\"a._homeY\",\"airY\":\"0\",\"duration\":\"24\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"-50\",\"<Motion>\":\"\",\"motion\":\"escape\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"ホーム\",\"templateId\":\"home\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"a._homeX\",\"ey\":\"a._homeY\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"ジャンプ\",\"templateId\":\"jump\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"-100\",\"<Motion>\":\"\",\"motion\":\"wait\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"scriptRT\":\"\"}","{\"<Basic>\":\"\",\"name\":\"回転\",\"templateId\":\"roll\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"t/et * -Math.PI*2 * mirroring\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"攻撃\",\"templateId\":\"attack\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"attack\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"攻撃R\",\"templateId\":\"attackR\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"attack\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"this._pattern - 1\",\"motionStartPattern\":\"2\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"攻撃0\",\"templateId\":\"attack0\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"attack\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"0\",\"motionStartPattern\":\"0\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"攻撃1\",\"templateId\":\"attack1\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"attack\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"1\",\"motionStartPattern\":\"1\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"攻撃2\",\"templateId\":\"attack2\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"attack\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"2\",\"motionStartPattern\":\"2\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"突き\",\"templateId\":\"thrust\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"thrust\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"振り\",\"templateId\":\"swing\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"swing\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"飛び道具\",\"templateId\":\"missile\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"missile\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"魔法発動\",\"templateId\":\"spell\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"spell\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"スキル発動\",\"templateId\":\"skill\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"skill\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"透明\",\"templateId\":\"invisible\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"255 * (1 - t/et)\"}","{\"<Basic>\":\"\",\"name\":\"透明解除\",\"templateId\":\"visible\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"255 * t/et\"}","{\"<Basic>\":\"\",\"name\":\"反転\",\"templateId\":\"mirror\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"true\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"反転解除\",\"templateId\":\"mirrorOff\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"false\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"対象\",\"templateId\":\"target\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"targets\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"対象毎に実行\",\"templateId\":\"every\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"true\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"ウェイト\",\"templateId\":\"wait\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"auto\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"ウェイトなし\",\"templateId\":\"noWait\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"0\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"ディレイ\",\"templateId\":\"delay\",\"condition\":\"\",\"delay\":\"auto\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"ディレイなし\",\"templateId\":\"noDelay\",\"condition\":\"\",\"delay\":\"0\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"対象が他者\",\"templateId\":\"ifOther\",\"condition\":\"a != b\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"対象が自分\",\"templateId\":\"ifSelf\",\"condition\":\"a == b\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"noShadow\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\"}","{\"<Basic>\":\"\",\"name\":\"味方のみ\",\"templateId\":\"ifActor\",\"condition\":\"a.isActor()\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"z\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"<Basic>\":\"\",\"name\":\"敵のみ\",\"templateId\":\"ifEnemy\",\"condition\":\"a.isEnemy()\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"z\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"<Basic>\":\"\",\"name\":\"即時\",\"templateId\":\"soon\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"auto\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"1\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"1\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"scriptRT\":\"\"}","{\"<Basic>\":\"\",\"name\":\"自分ズーム\",\"templateId\":\"zoomA\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"scriptRT\":\"$gameScreen.setZoom(a.x, a.y - a.height/2, 1 + 0.5 * t/et)\"}","{\"<Basic>\":\"\",\"name\":\"対象ズーム\",\"templateId\":\"zoomB\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"scriptRT\":\"$gameScreen.setZoom(b.x, b.y - b.height/2, 1 + 0.5 * t/et)\"}","{\"<Basic>\":\"\",\"name\":\"ズーム解除\",\"templateId\":\"zoomOff\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"<Real Time>\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"scriptRT\":\"$gameScreen.setZoom($gameScreen._zoomX, $gameScreen._zoomY, 1 + ($gameScreen._zoomScale - 1) * (1 - t/et))\"}","{\"<Basic>\":\"\",\"name\":\"振動\",\"templateId\":\"shake\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"Math.sin(Math.PI * 2 * t / 4) * 3\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"scriptRT\":\"\"}","{\"<Basic>\":\"\",\"name\":\"公転\",\"templateId\":\"revolve\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"<Basic Repeat>\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"z\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"100 * (Math.sin(t/et * Math.PI))\",\"radiusY\":\"100 * (Math.sin(t/et * Math.PI))\",\"radX\":\"t/et * Math.PI*2\",\"radY\":\"t/et * Math.PI*2\"}"]
 * @desc 定義されたテンプレートモーションの一覧です。
 * 新しいテンプレートの追加も可能です。
 * 
 * @param shortTagName
 * @text 省略タグ名
 * @type string
 * @default dm
 * @desc タグ名を指定した文字列で省略できるようにします。
 * 例：<D-Motion:near/> -> <dm:near/>
 * 
 * @param shortSettingTagName
 * @text 省略設定タグ名
 * @type string
 * @default ds
 * @desc 設定タグ名を指定した文字列で省略できるようにします。
 * 例：<D-Setting:NoStep> -> <ds:NoStep>
 * 
 * @param setStartMotion
 * @text 開始モーションの設定
 * @type select
 * @option 0:常に有 @value 0
 * @option 1:常に無 @value 1
 * @option 2:モーション指定時のみ無 @value 2
 * @default 2
 * @desc 攻撃やスキルの開始モーションの有無を設定します。
 * 0:常に有, 1:常に無, 2:モーション指定時のみ無
 * 
 * @param setStepForward
 * @text 一歩前進の設定
 * @type select
 * @option 0:常に有 @value 0
 * @option 1:常に無 @value 1
 * @option 2:モーション指定時のみ無 @value 2
 * @default 0
 * @desc 一歩前進モーションの有無を設定します。
 * 0:常に有, 1:常に無, 2:モーション指定時のみ無
 * 
 * @param defaultDuration
 * @text 標準移動時間(1/60秒)
 * @type number
 * @min 0
 * @default 12
 * @desc 指定を行わない場合の移動時間の初期値です。
 * 
 * @param defaultEnemyMotionDuration
 * @text 敵の標準モーション時間(1/60秒)
 * @type number
 * @min 0
 * @default 12
 * @desc 指定を行わない場合の敵モーション時間の初期値です。
 * 通常、敵にモーションはありませんので時間だけ確保します。
 *
 * @param jumpShadow
 * @text ジャンプ時の影表示
 * @type boolean
 * @default true
 * @desc ジャンプ時に影を表示するかどうか？
 * 
 * @param immortalState
 * @text 不死身ステート
 * @type state
 * @default 3
 * @desc 演出制御に使う不死身ステートの番号です。
 * なるべく専用のステートを設定してください。
 * 
 * @param <Priority>
 * @text ＜表示優先度＞
 * @desc 表示優先度関連の見出しです。
 * 
 * @param usePriority
 * @text 表示優先度の有効化
 * @parent <Priority>
 * @type boolean
 * @default true
 * @desc 表示優先度の変更機能を有効化します。
 * 他のプラグインとの兼ね合いで不要ならfalseに。
 * 
 * @param battlerZ
 * @text バトラーのＺ座標
 * @parent <Priority>
 * @type number
 * @decimals 1
 * @default 3
 * @desc バトラーのＺ座標（表示優先度）の初期値です。
 * 初期値は3です。
 * 
 * @param opponentSideZ
 * @text 相手サイドのＺ座標
 * @parent <Priority>
 * @type number
 * @decimals 1
 * @default 2.5
 * @desc 行動時、相手サイドのＺ座標を変更します。
 * ※行動主体よりも下に表示することを想定。
 */
/*~struct~DynamicMotion:ja
 * @param <Basic>
 * @text ＜基本＞
 * @desc 基本設定の見出しです。
 * 
 * @param name
 * @text 名前
 * @parent <Basic>
 * @type string
 * @desc 識別用のメモです。分かりやすい名前をおつけください。
 * 実はこれをスキル・アイテムのメモ欄で指定しても使えます。
 * 
 * @param templateId
 * @text テンプレートＩＤ
 * @parent <Basic>
 * @type string
 * @desc テンプレートの呼び出しに使う識別子です。
 * このIDをスキル・アイテムのメモ欄で指定します。
 * 
 * @param condition
 * @text 実行条件
 * @parent <Basic>
 * @type string
 * @desc 実行条件です。
 * この条件を満たさない場合、モーションを実行しません。
 * 
 * @param delay
 * @text ディレイ（遅延）
 * @parent <Basic>
 * @type string
 * @desc モーション表示前の待機フレームです。
 * autoにすると前モーションの終了を待ちます。
 * 
 * @param wait
 * @text ウェイト
 * @parent <Basic>
 * @type string
 * @desc モーションを表示後の待機フレームです。
 * autoにするとモーションの終了を待ちます。
 * また、autoMoveにすると移動のみを待ちます。
 * 
 * @param repeat
 * @text リピート回数
 * @parent <Basic>
 * @type string
 * @desc モーションの繰り返し回数です。
 * 
 * @param performer
 * @text モーション対象
 * @parent <Basic>
 * @type string
 * @desc モーションの実行を指定した対象へ変更します。
 * バトラーまたはその配列を指定可能です。
 * 
 * @param noReturn
 * @text 帰還無効
 * @parent <Basic>
 * @type boolean
 * @desc アクターがホームポジションへ戻らないようにします。
 * 解除する場合はfalseを指定してください。
 * 
 * @param battlerImage
 * @text バトラー画像
 * @parent <Basic>
 * @type string
 * @desc バトラーの画像を一時的に変更します。
 * 戦闘終了で元に戻ります。
 * 
 * @param <Basic Repeat>
 * @text ＜基本リピート＞
 * @desc リピートごとに処理される基本設定です。
 * 
 * @param position
 * @text 位置
 * @parent <Basic Repeat>
 * @type select
 * @option 0:頭上 @value 0
 * @option 1:中央 @value 1
 * @option 2:足元 @value 2
 * @option 3:画面 @value 3
 * @desc モーションの対象位置です。0:頭上, 1:中心, 2:足元, 3:画面。
 * 
 * @param interval
 * @text 間隔
 * @parent <Basic Repeat>
 * @type string
 * @desc モーションを繰り返す間隔です。
 * 時間はアニメーションの1フレームに対応します。
 * 
 * @param rate
 * @text 描画レート
 * @parent <Basic Repeat>
 * @type string
 * @desc モーション１フレームの経過時間です。
 * 初期値は4。つまり4/60秒単位になります。
 * 
 * @param every
 * @text 対象毎に繰り返し
 * @parent <Basic Repeat>
 * @type boolean
 * @desc ONならモーションを対象毎に繰り返します。
 * 
 * @param nextDelay
 * @text 対象毎の時間差
 * @parent <Basic Repeat>
 * @type string
 * @desc スキル対象が複数の場合にモーションを実行する時間差です。
 * 『対象毎に繰り返し』をONにしないと無意味です。
 * 
 * @param performerDelay
 * @text モーション対象毎の時間差
 * @parent <Basic Repeat>
 * @type string
 * @desc モーション対象が複数の場合にモーションを実行する時間差です。
 * 
 * @param mirror
 * @text 左右反転
 * @parent <Basic Repeat>
 * @type boolean
 * @desc バトラーの表示を左右反転します。
 * 
 * @param damage
 * @text ダメージ処理
 * @parent <Basic Repeat>
 * @type boolean
 * @desc 全モーションの終了を待たずにダメージ処理を行います。
 * こちらは一回だけ処理します。
 * 
 * @param damageAll
 * @text 全体ダメージ処理
 * @parent <Basic Repeat>
 * @type boolean
 * @desc 全モーションの終了を待たずにダメージ処理を行います。
 * こちらは全て処理します。（通常のダメージ処理を早める）
 * 
 * @param noShadow
 * @text 影の非表示
 * @parent <Basic Repeat>
 * @type boolean
 * @desc 影を消します。
 * 
 * @param playSe
 * @text 効果音
 * @parent <Basic Repeat>
 * @type string
 * @desc 指定した効果音（SE）を再生します。例1:Cat
 * 例2:{"name":"Cat","volume":90,"pitch":100,"pan":0}
 * 
 * @param commonEvent
 * @text コモンイベント
 * @parent <Basic Repeat>
 * @type common_event
 * @desc 指定した番号のコモンイベントを実行します。
 * 
 * @param script
 * @text スクリプト
 * @parent <Basic Repeat>
 * @type string
 * @desc 指定したスクリプトを実行します。
 * 
 * @param plugin
 * @text プラグインコマンド
 * @parent <Basic Repeat>
 * @type string
 * @desc 指定したプラグインコマンドを実行します。
 * 
 * @param <End Point>
 * @text ＜終点＞
 * @desc 終点（移動先）関連のパラメータです。
 * 
 * @param ex
 * @text 終点Ｘ座標
 * @parent <End Point>
 * @type string
 * @desc 終点のＸ座標です。
 * これを入力すれば始点から終点へバトラーが移動します。
 * 
 * @param ey
 * @text 終点Ｙ座標
 * @parent <End Point>
 * @type string
 * @desc 終点のＹ座標です。
 * これを入力すれば始点から終点へバトラーが移動します。
 * 
 * @param airY
 * @text 終点空中Ｙ座標
 * @parent <End Point>
 * @type string
 * @desc 終点の空中Ｙ座標です。
 * 空中を終点にしてバトラーが移動します。
 * 
 * @param duration
 * @text 移動時間(1/60秒)
 * @parent <End Point>
 * @type string
 * @desc 移動に要する時間です。
 * 
 * @param frame
 * @text 移動フレーム
 * @parent <End Point>
 * @type string
 * @desc 移動に要する時間（アニメーションフレーム）です。
 * durationよりこちらのほうが優先されます。
 * 
 * @param arcX
 * @text 放物線の横幅
 * @parent <End Point>
 * @type string
 * @desc 放物線の横幅です。
 * 
 * @param arcY
 * @text 放物線の縦幅
 * @parent <End Point>
 * @type string
 * @desc 放物線の縦幅です。
 * マイナスが上方向になるので注意！
 * 
 * @param <Motion>
 * @text ＜モーション＞
 * @desc モーション関連のパラメータです。
 * 
 * @param motion
 * @text モーション名
 * @parent <Motion>
 * @type select
 * @option 攻撃（attack） @value attack
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc 実行するモーション名です。
 * 例：walk, waitなど。また"attack"で武器を振ります。
 * 
 * @param motionDuration
 * @text モーション時間(1/60秒)
 * @parent <Motion>
 * @type string
 * @desc モーションに要する時間です。
 * 
 * @param motionFrame
 * @text モーションフレーム
 * @parent <Motion>
 * @type string
 * @desc モーションに要する時間（アニメーションフレーム）です。
 * motionDurationよりこちらのほうが優先されます。
 * 
 * @param motionPattern
 * @text モーションパターン
 * @parent <Motion>
 * @type string
 * @desc モーションパターンです。
 * 通常は0～2の数が入ります。
 * 
 * @param motionStartPattern
 * @text モーション開始パターン
 * @parent <Motion>
 * @type string
 * @desc モーションの開始パターンです。
 * 通常は0ですが、1,2を指定可能です。
 * 
 * @param weaponId
 * @text 武器ID
 * @parent <Motion>
 * @type string
 * @desc モーション時に使用する武器IDです。
 * 
 * @param weaponType
 * @text 武器タイプ
 * @parent <Motion>
 * @type string
 * @desc モーション時に使用する武器タイプです。
 * 武器IDよりこちらが優先されます。
 * 
 * @param <Real Time>
 * @text ＜リアルタイム＞
 * @desc 1/60秒ごとに演算される項目です。
 * 上級向けの項目が多めです。
 * 
 * @param dx
 * @text 動的Ｘ座標【上級】
 * @parent <Real Time>
 * @type string
 * @desc Ｘ座標のリアルタイム計算位置です。
 * 
 * @param dy
 * @text 動的Ｙ座標【上級】
 * @parent <Real Time>
 * @type string
 * @desc Ｙ座標のリアルタイム計算位置です。
 * 
 * @param addX
 * @text Ｘ座標補正
 * @parent <Real Time>
 * @type string
 * @desc Ｘ座標に加算する値です。
 * 
 * @param addY
 * @text Ｙ座標補正
 * @parent <Real Time>
 * @type string
 * @desc Ｙ座標に加算する値です
 *
 * @param scaleX
 * @text 拡大率Ｘ
 * @parent <Real Time>
 * @type string
 * @desc 横幅の拡大率です。1.0が標準となります。
 * 
 * @param scaleY
 * @text 拡大率Ｙ
 * @parent <Real Time>
 * @type string
 * @desc 縦幅の拡大率です。1.0が標準となります。
 * 
 * @param rotation
 * @text 回転率
 * @parent <Real Time>
 * @type string
 * @desc 回転率です
 * Math.PI * 2で一回転します。
 * 
 * @param opacity
 * @text 不透明度
 * @parent <Real Time>
 * @type string
 * @desc 不透明度です。
 * 255で不透明、0で透明です。
 * 
 * @param color
 * @text 色調
 * @parent <Real Time>
 * @type string
 * @desc 色調を変更します。
 * 例：[255, 255, 255, 255] 赤,緑,青,強さの順。
 * 
 * @param z
 * @text Ｚ座標（表示優先度）
 * @parent <Real Time>
 * @type number
 * @decimals 1
 * @desc バトラーのＺ座標（表示優先度）を変更します。
 * 
 * @param scriptRT
 * @text スクリプト（リアルタイム）
 * @parent <Real Time>
 * @type string
 * @desc リアルタイムで指定したスクリプトを実行します。
 * 
 * @param <Real Time Circle>
 * @text ＜リアルタイム円＞
 * @desc リアルタイムの円運動関連の項目です。
 * 
 * @param radiusX
 * @text Ｘ方向の半径
 * @parent <Real Time Circle>
 * @type string
 * @desc Ｘ方向の円運動半径です。
 * 
 * @param radiusY
 * @text Ｙ方向の半径
 * @parent <Real Time Circle>
 * @type string
 * @desc Ｙ方向の円運動半径です。
 * 
 * @param radX
 * @text Ｘ方向の角度
 * @parent <Real Time Circle>
 * @type string
 * @desc Ｘ方向の円運動角度です。
 * ２πが一周期となります。
 * 
 * @param radY
 * @text Ｙ方向の角度
 * @parent <Real Time Circle>
 * @type string
 * @desc Ｙ方向の円運動角度です。
 * ２πが一周期となります。
 */

// 連携用に値を保持
var Nrp = Nrp || {};

/**
 * ●アニメーションの基本パラメータを持つ構造体
 */
var BaseMotion = function(animationId) {
    this.type = "motion";

    // Dataを保有するリスト
    this.list = [];

    this.id = animationId;
    this.delay = 0;
    this.repeat = 1;
    this.wait = 0;

    this.maxDuration = 0;
    this.contentMode = false;
};

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
/**
 * ●構造体（二重配列）をJSで扱えるように変換
 */
function parseStruct2(arg) {
    var ret = [];

    JSON.parse(arg).forEach(function(str) {
        ret.push(JSON.parse(str));
    });

    return ret;
}

var parameters = PluginManager.parameters("NRP_DynamicMotion");
var pTemplateList = parseStruct2(parameters["templateList"]);

var pSetStartMotion = parameters["setStartMotion"];
var pSetStepForward = parameters["setStepForward"];
var pJumpShadow = toBoolean(parameters["jumpShadow"]);
var pShortTagName = parameters["shortTagName"];
var pShortSettingTagName = parameters["shortSettingTagName"];
var pDefaultDuration = toNumber(parameters["defaultDuration"], 12);
var pDefaultEnemyMotionDuration = toNumber(parameters["defaultEnemyMotionDuration"], 12);
var pImmortalState = toNumber(parameters["immortalState"]);
var pUsePriority = toBoolean(parameters["usePriority"], true);
var pBattlerZ = toNumber(parameters["battlerZ"], 3);
var pOpponentSideZ = toNumber(parameters["opponentSideZ"]);

const TAG_NAME = "D-Motion";
const SETTING_TAG_NAME = "D-Setting";

// 連携用に保持
Nrp.shortMotionTagName = pShortTagName;
Nrp.shortSettingTagName = pShortSettingTagName;

/**
 * ●テンプレート内容を元にアニメーションの基本パラメータを設定する。
 */
BaseMotion.prototype.readNote = function (noteSplit, no) {
    var noteLine = noteSplit[no];
    var templatesStr;

    // 省略タグを考慮
    var tagNameSet = "(?:" + TAG_NAME + ")";
    if (pShortTagName) {
        tagNameSet = "(?:" + TAG_NAME + "|" + pShortTagName + ")";
    }

    // 単独タグ
    if (noteLine.match("<" + tagNameSet + "\\s*/>")) {
        return true;

    // 単独タグ（テンプレート指定）
    } else if (noteLine.match("<" + tagNameSet + "\\s*:(.*)/>")) {
        // テンプレート名を取得
        templatesStr = noteLine.match("<" + tagNameSet + "\\s*:(.*)/>");
        // テンプレート呼出
        this.callTemplate(templatesStr[1].trim());
        // 全体配列に追加
        return true;

    // 開始タグ
    } else if (noteLine.match("<" + tagNameSet + ">")) {
        // 内容モード開始
        this.contentMode = true;

    // 開始タグ（テンプレート指定）
    } else if (noteLine.match("<" + tagNameSet + "\\s*:(.*)>")) {
        // テンプレート名を取得
        templatesStr = noteLine.match("<" + tagNameSet + "\\s*:(.*)>");
        // テンプレート呼出
        this.callTemplate(templatesStr[1].trim());
        // 内容モード開始
        this.contentMode = true;

    // 終了タグ（または内容モードかつ最終行）
    } else if (noteLine.match("</\\s*" + tagNameSet + ">")
            || (this.contentMode && no == noteSplit.length - 1)) {
        // 内容モードを終了し、全体配列に追加
        this.contentMode = false;
        // 全体配列に追加
        return true;

    // 内容モード時
    } else if (this.contentMode) {
        // 行内容を追加
        this.setContent(noteLine);
    }

    return false;
};

/**
 * ●プラグインパラメータのテンプレートを呼び出す
 */
BaseMotion.prototype.callTemplate = function (templateStr) {
    // &で分割
    var tempSplit = templateStr.split("&");

    // 前から順番に読み込む
    tempSplit.forEach(function(key) {
        var template;
        // 空白除去
        key = key.trim();
        // ＩＤおよび名前と一致するテンプレートを取得
        for (var i = 0; i < pTemplateList.length; i++) {
            var t = pTemplateList[i];
            if (t.templateId == key || t.name == key) {
                template = t;
                break;
            }
        }
    
        // テンプレートが見つからなければそのまま。
        if (!template) {
            return;
        }
    
        // 取得したテンプレートを設定
        this.setTemplate(template);
    }, this);
};

/**
 * ●テンプレート内容を元にアニメーションの基本パラメータを設定する。
 */
BaseMotion.prototype.setTemplate = function (template) {
    // プロパティをコピー
    Object.keys(template).forEach(function(key) {
        // 値が存在する場合に設定
        if (template[key] != undefined && template[key] != null && template[key] != "") {
            this[key] = template[key];
        }
    }, this);
};

/**
 * ●タグの行内容を元にアニメーションの基本パラメータを設定する。
 */
BaseMotion.prototype.setContent = function (valueLine) {
    // eval参照用
    var a = getReferenceBattler(BattleManager._subject);

    var index;
    var paramType;
    var paramValue;

    // パラメータを取得（+=時）
    index = valueLine.indexOf("+=");
    if (index >= 0) {
        paramType = valueLine.slice(0, index).trim();
        // =以降をevalする。
        paramValue = valueLine.slice(index + 2).trim();
        // プロパティに文字列連結する。
        this[paramType] = this[paramType] + " + " + paramValue;
        return;
    }

    // パラメータを取得（-=時）
    index = valueLine.indexOf("-=");
    if (index >= 0) {
        paramType = valueLine.slice(0, index).trim();
        // =以降をevalする。
        paramValue = valueLine.slice(index + 2).trim();
        // プロパティに文字列連結する。
        this[paramType] = this[paramType] + " - " + paramValue;
        return;
    }

    // パラメータを取得（*=時）
    index = valueLine.indexOf("*=");
    if (index >= 0) {
        paramType = valueLine.slice(0, index).trim();
        // =以降をevalする。
        paramValue = valueLine.slice(index + 2).trim();
        // プロパティに文字列連結する。
        this[paramType] = this[paramType] + " * " + paramValue;
        return;
    }

    // パラメータを取得（/=時）
    index = valueLine.indexOf("/=");
    if (index >= 0) {
        paramType = valueLine.slice(0, index).trim();
        // =以降をevalする。
        paramValue = valueLine.slice(index + 2).trim();
        // プロパティに文字列連結する。
        this[paramType] = this[paramType] + " / " + paramValue;
        return;
    }

    // パラメータを取得（=時）
    index = valueLine.indexOf("=");
    if (index >= 0) {
        paramType = valueLine.slice(0, index).trim();
        // =以降をevalする。
        paramValue = valueLine.slice(index + 1).trim();
        // プロパティに設定する。
        this[paramType] = paramValue;
    }
};

/**
 * ●基本項目の計算を行う。（処理前）
 */
BaseMotion.prototype.calcBasicBefore = function (targets) {
    // eval参照用
    var a = getReferenceBattler(BattleManager._subject);
    var b = getReferenceBattler(targets[0]);

    var no = this.no;
    var dataA = this.dataA;
    var dataM = this.dataM;

    var delay = this.evalTimingStr(this.delay);

    // "auto"ならば前回フレーム数とウェイト合計の大きいほうを取得
    if (delay == "auto") {
        this.calcDelay = Math.max(this.lastFrame, this.allWait);

    // それ以外はディレイ＋ウェイト合計
    } else {
        this.calcDelay = delay + this.allWait;
    }

    // リピート回数
    var repeat = this.repeat;
    this.repeat = eval(repeat);

    // 対象の変更処理
    // SpriteでもBattlerでも受け付ける。
    if (this.performer) {
        var changePerformer = eval(this.performer);
        // 配列でなければ配列変換
        if (!Array.isArray(changePerformer)) {
            changePerformer = [changePerformer];
        }

        this.performers = [];
        changePerformer.forEach(function(t) {
            // Spriteの場合
            if (t.spriteId != undefined) {
                this.performers.push(t._battler);

            // Battlerの場合
            } else {
                // 互換用ダミーの場合（TODO: 将来的には消したい）
                if (t._isDynamicDummy) {
                    if (t.isActor()) {
                        this.performers.push($gameActors.actor(t._actorId));
                    } else {
                        this.performers.push($gameTroop.members()[t.index()]);
                    }
                    
                // 正常なデータの場合
                } else {
                    this.performers.push(t);
                }
            }
        }, this);

    // 通常は行動主体を設定する。
    } else {
        this.performers = [BattleManager._subject];
    }

    // 対象
    this.targets = targets;
};

/**
 * ●基本項目の計算を行う。（処理後）
 */
BaseMotion.prototype.calcBasicAfter = function () {
    var wait = this.evalTimingStr(this.wait);

    // "autoMove"ならば移動終了フレーム数を取得
    if (wait == "autoMove") {
        // 直近のモーションデータを取得
        var bm = this.dataM[this.dataM.length - 1];
        var dm = bm.list[bm.list.length - 1];

        var dif = 0;
        if (dm) {
            dif = nvl(dm.motionDurationTotal) - nvl(dm.duration);
        }
        // 移動よりもモーション時間のほうが長い場合
        if (dif > 0) {
            this.calcWait = this.frame - this.allWait - dif / bm.basicRate;
        } else {
            this.calcWait = this.frame - this.allWait;
        }

    // "auto"ならば移動とモーションの終了フレーム数を取得
    } else if (wait == "auto") {
        this.calcWait = this.frame - this.allWait;
    // 通常時
    } else {
        this.calcWait = wait;
    }
};

/**
 * ●画像を事前読込する。
 */
BaseMotion.prototype.loadImage = function () {
    if (this.battlerImage != undefined) {
        // eval参照用
        var a = getReferenceBattler(BattleManager._subject);

        try {
            // 数式として取得できる場合
            this.battlerImage = eval(this.battlerImage);
        } catch (e) {
            // 文字列の場合はそのまま
        }

        if (this.battlerImage) {
            if (this.performers[0].isActor()) {
                ImageManager.loadSvActor(this.battlerImage);
            } else {
                if ($gameSystem.isSideView()) {
                    ImageManager.loadSvEnemy(this.battlerImage);
                } else {
                    ImageManager.loadEnemy(this.battlerImage);
                }
            }
        }
    }
};

/**
 * ●ウェイト、ディレイについて有効な文字列を取得する。
 * ※数式として取得できない場合は、そのまま文字列取得
 */
BaseMotion.prototype.evalTimingStr = function (arg) {
    var retValue;

    var no = this.no;
    var dataA = this.dataA;
    var dataM = this.dataM;

    var isSync = false;
    // Syncの設定を読込（eval内で使用される）
    if (existSetting("Sync")) {
        isSync = true;
    }

    try {
        // 数式として取得できる場合
        retValue = eval(arg);
    } catch (e) {
        // 数式でない場合はエラーとなるが、普通に文字列で取得
        retValue = arg;
        // 注釈や空白は不要なので除去
        retValue = retValue.split("//")[0];
        retValue = retValue.trim();
    }

    return retValue;
};

/**
 * ●アニメーションの生成開始
 * ※NRP_DynamicAnimation.jsより呼び出し
 */
BaseMotion.prototype.makeMotion = function (targets, dataM, dataA, dynamicMotionList) {
    // アクター位置の自動設定を禁止
    BattleManager._noUpdateTargetPosition = true;

    // eval参照用
    var a = getReferenceBattler(BattleManager._subject);
    var b = getReferenceBattler(targets[0]);

    // アニメーションとモーションで別のため、番号を取得する。
    var no = dataM.length;
    this.no = no;
    // アニメーション情報への参照を作成。
    this.dataA = dataA;
    // 親要素への参照を作成。
    this.dataM = dataM;
    // 計算ウェイトの初期値
    this.calcWait = 0;

    // 基本項目の事前計算
    this.calcBasicBefore(targets);

    // 画像の事前読込
    this.loadImage();

    // Sprite_Animationから基本レートを取得
    var spriteAnimation = new Sprite_Animation();
    spriteAnimation.setupRate();
    var basicRate = spriteAnimation._rate;
    this.basicRate = basicRate;

    // 設定したdelayの分だけ遅らせる。（rateをかけた値）
    this.delaySum = this.animationBaseDelay + this.calcDelay * basicRate;

    // リピート回数だけ実行（r = 現在のリピート回数）
    for (var r = 0; r < this.repeat; r++) {
        // リピートごとの動的アニメーション生成
        this.makeRepeatMotion(dynamicMotionList, r);
    }

    // 合計フレーム数をセットし、基本レートで割る。
    // delaySum : これまでのディレイ
    // animationBaseDelay分は除く
    this.frame = (this.delaySum - this.animationBaseDelay) / basicRate;

    // データ一覧に追加
    dataM.push(this);

    // 基本項目の事後計算
    this.calcBasicAfter();
};

/**
 * ●繰り返しモーションの生成
 */
BaseMotion.prototype.makeRepeatMotion = function (dynamicMotionList, r) {
    // eval用に定義
    var no = this.no;
    var dataM = this.dataM;
    var dataA = this.dataA;
    var repeat = this.repeat;

    var spriteAnimation = new Sprite_Animation();
    // アニメーションに設定されているrateを取得
    // ※フレームレート変更系プラグインを考慮
    var animation = $dataAnimations[this.id];
    spriteAnimation._animation = animation;
    spriteAnimation.setupRate();
    var rate = spriteAnimation._rate;
    // 設定レートがあればそちらを参照
    if (this.rate) {
        rate = eval(this.rate);
        spriteAnimation._rate = rate;
    }
    this.rate = rate;

    // アニメーション位置の設定
    var position;
    // パラメータの設定があれば、そちらを優先
    if (this.position) {
        position = eval(this.position);
    // スキルに設定されているアニメーションの位置
    } else if (spriteAnimation._animation) {
        position = spriteAnimation._animation.position;
    // 取得できなければ1:中央
    } else {
        position = 1;
    }
    this.position = position;

    // 設定された対象を取得
    var performers = this.performers;

    // 対象毎にモーションを繰り返すフラグ
    var isEvery = eval(this.every);

    // 間隔×レート分のディレイを加算
    if (r > 0) {
        this.delaySum += this.list[r - 1].interval * rate;
    }

    var delay = this.delaySum;
    var targetDelay = delay;
    var dynamicMotion;

    // モーション対象毎に繰り返し
    performers.forEach(function (performer, performerIndex) {
        // 対象毎にモーション繰り返し
        if (isEvery) {
            this.targets.forEach(function (target, index) {
                // Sprite_Battlerへと引き渡すパラメータを作成
                dynamicMotion = this.createDynamicMotion(performer, target, r, targetDelay);
                dynamicMotion.performerNo = performerIndex;
                dynamicMotion.targetNo = index;

                // 条件を満たさなかった場合は処理不要
                if (dynamicMotion.isNoMatchCondition) {
                    return;
                }

                // 参照用に保持しておく
                this.list.push(dynamicMotion);
                // モーション実行リストに追加
                dynamicMotionList.push(dynamicMotion);

                // 対象が複数いる場合の時間差
                // ※最後の一回は除外
                if (this.targets.length - 1 > index) {
                    // 対象毎の時間差
                    var nextDelay = this.animationNextDelay;
                    // nextDelayが設定されている場合
                    if (this.nextDelay) {
                        // autoの場合はモーションの長さを自動取得
                        if (this.nextDelay.startsWith("auto")) {
                            nextDelay = this.maxDuration;
                        } else {
                            // アニメーションフレーム単位なので補正する。
                            nextDelay = eval(this.nextDelay) * rate;
                        }
                    }
                    targetDelay += nextDelay;
                }
            }, this);

        // その他
        } else {
            // Sprite_Battlerへと引き渡すパラメータを作成
            dynamicMotion = this.createDynamicMotion(performer, this.targets[0], r, targetDelay);
            dynamicMotion.performerNo = performerIndex;

            // 条件を満たさなかった場合は処理不要
            if (dynamicMotion.isNoMatchCondition) {
                return;
            }

            // 参照用に保持しておく
            this.list.push(dynamicMotion);
            // モーション実行リストに追加
            dynamicMotionList.push(dynamicMotion);
        }

        // 対象ごとのディレイ値（performerごとに値をリセット）
        let performerDelay = 0;
        if (this.performerDelay) {
            // アニメーションフレーム単位なので補正する。
            performerDelay = eval(this.performerDelay)  * rate;
        }
        targetDelay += performerDelay;

    }, this);

    // 実行時間の最大長を求める。
    this.maxDuration = Math.max(this.maxDuration, targetDelay + dynamicMotion.maxDuration);
    
    // 最後の１回ならモーション時間を保持
    if (r == this.repeat - 1) {
        this.delaySum = this.maxDuration;
    }
};

/**
 * ●動的モーションデータを生成する。
 */
BaseMotion.prototype.createDynamicMotion = function (performer, target, r, delay) {
    var dynamicMotion = new DynamicMotion(this, performer, target, r);
    dynamicMotion.targetDelay = delay;

    return dynamicMotion;
};

/**
 * ●標準画面Ｘ座標取得
 */
BaseMotion.prototype.getScreenX = function (b) {
    var screenX;

    // アクターが対象の場合、左右位置反転
    if (b && b.isActor()) {
        screenX = Graphics.boxWidth - this.defaultScreenX;
        // 位置調整
        if (this.mirrorAdjustX) {
            screenX += eval(this.mirrorAdjustX);
        }
    } else {
        screenX = this.defaultScreenX;
    }

    return screenX;
};

/**
 * ●標準画面Ｙ座標取得
 */
BaseMotion.prototype.getScreenY = function (b) {
    var screenY = this.defaultScreenY;
    
    // アクターが対象の場合、位置調整
    if (b && b.isActor() && this.mirrorAdjustY) {
        // 位置調整
        if (this.mirrorAdjustY) {
            screenY += eval(this.mirrorAdjustY);
        }
    }

    return screenY;
};

/**
 * ●非ループモーションのカウント数
 */
BaseMotion.prototype.motionPatternCount = function () {
    return 3;
};

/**
 * ●durationが必要かどうか？
 * ※移動に類する処理を行うかで判定
 */
BaseMotion.prototype.isUseDuration = function () {
    if (this.ex != undefined || this.ey != undefined
        || this.airY != undefined || this.arcX != undefined || this.arcY != undefined
        || this.addX != undefined || this.addY != undefined
        || this.dx != undefined || this.dy != undefined
        || this.opacity != undefined || this.rotation != undefined
        || this.scaleX != undefined || this.scaleY != undefined
        || this.scriptRT != undefined
        || this.radiusX != undefined || this.radiusY != undefined
        || this.radX != undefined || this.radY != undefined
    ) {
        return true;
    }

    return false;
};

/**
 * ●モーション時間を求める。
 */
BaseMotion.prototype.getDefaultMotionDuration = function (a) {
    var motionDuration;

    // アクターの場合
    if (a._actor) {
        // 一時的にモーションを変更し、標準のモーション速度を取得する。
        let tmp = a._motion;
        // attackの場合は本来のモーションを取得
        if (tmp == "attack") {
            var weapons = a.weapons();
            var wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
            var attackMotion = $dataSystem.attackMotions[wtypeId];
            if (attackMotion) {
                if (attackMotion.type === 0) {
                    a._motion = "thrust";
                } else if (attackMotion.type === 1) {
                    a._motion = "swing";
                } else if (attackMotion.type === 2) {
                    a._motion = "missile";
                }
            }
        } else {
            a._motion = this.motion;
        }
        motionDuration = a.motionSpeed();
        a._motion = tmp; // モーションを戻す
    // エネミーの場合
    } else {
        // 初期値を設定
        motionDuration = pDefaultEnemyMotionDuration;
    }

    return motionDuration;
};

/**
 * ●動的アニメーションの動的パラメータを持つ構造体
 * こちらは繰り返しごとに保有し、Sprite_Battlerへ引き渡すもの。
 */
var DynamicMotion = function (baseMotion, performer, target, r) {
    // eval参照用
    var a = getReferenceBattler(performer);
    var spriteA = getBattlerSprite(performer);
    // モーションの対象ではなく、スキルの対象を取得
    var b = getReferenceBattler(target);
    var bm = baseMotion;
    var dm = this;

    var no = baseMotion.no;
    this.no = no;

    // 親情報への参照設定
    this.baseMotion = baseMotion;
    var dataA = baseMotion.dataA;
    this.dataA = dataA;
    var dataM = baseMotion.dataM;
    this.dataM = dataM;

    this.referenceSubject = a;
    this.performer = performer;
    this.referenceTarget = b;
    var list = baseMotion.list;

    // 基本項目
    var delay = baseMotion.delay;
    this.delay = delay;
    var repeat = baseMotion.repeat;
    this.repeat = repeat;
    this.r = r;

    /*
     * 以下はリピートごとに変化する項目
     */

    // 条件が存在し、かつ満たさなければ次のループへ
    var condition = baseMotion.condition;
    if (condition && !eval(condition)) {
        // 表示しない
        this.maxDuration = 0;
        this.isNoMatchCondition = true;
        return;
    }

    // ダメージ処理
    this.damage = toBoolean(eval(baseMotion.damage));
    this.damageAll = toBoolean(eval(baseMotion.damageAll));
    this.targets = baseMotion.targets;

    var position = baseMotion.position;
    this.position = position;

    // 影の表示
    this.noShadow = eval(baseMotion.noShadow);

    // 判定設定の取得（スキルの対象者が基準）
    var mirroring = getMirroring(target);
    this.mirroring = mirroring;

    /*
     * このタイミングでevalしておく。
     */
    // 左右反転
    this.mirror = eval(baseMotion.mirror);

    // 標準ターゲット座標取得
    var screenX = baseMotion.getScreenX(b);
    var screenY = baseMotion.getScreenY(b);
    this.screenX = screenX;
    this.screenY = screenY;

    // 所要時間
    // フレーム指定
    if (baseMotion.frame != undefined) {
        this.duration = eval(baseMotion.frame) * baseMotion.rate;
    // 1/60指定
    } else if (baseMotion.duration != undefined) {
        this.duration = eval(baseMotion.duration);
    // 既定値
    } else if (baseMotion.isUseDuration()) {
        this.duration = pDefaultDuration;
    }

    // モーション
    if (baseMotion.motion != undefined) {
        let tmpMotion = baseMotion.motion;
        // 注釈や空白は不要なので除去
        tmpMotion = tmpMotion.split("//")[0];
        tmpMotion = tmpMotion.trim();

        // escapeのみ関数名と競合している模様なので固定コーディング
        if (tmpMotion == "escape") {
            this.motion = "escape";
        } else {
            try {
                // 数式として取得できる場合
                this.motion = eval(tmpMotion);
            } catch (e) {
                // 数式でない場合はエラーとなるが、普通に文字列で取得
                this.motion = tmpMotion;
            }
        }

        // モーション所要時間
        // フレーム指定
        if (baseMotion.motionFrame != undefined) {
            this.motionDuration = eval(baseMotion.motionFrame) * baseMotion.rate;
        // 1/60指定
        } else if (baseMotion.motionDuration != undefined) {
            this.motionDuration = eval(baseMotion.motionDuration);
        // 指定なしの場合
        } else {
            // 初期値を取得
            this.motionDuration = baseMotion.getDefaultMotionDuration(spriteA);
        }
    }

    /*
     * モーション時間を取得
     */
    this.maxDuration = nvl(this.duration);
    // モーションの指定があり、かつループモーション以外の場合
    if (this.motion
            && (this.motion == "attack"
                || (Sprite_Actor.MOTIONS[this.motion] && !Sprite_Actor.MOTIONS[this.motion].loop))) {
        // 合計モーション時間を計算
        // ※モーション時間は３パターンを想定し、*3して計算
        this.motionDurationTotal = nvl(this.motionDuration) * baseMotion.motionPatternCount();
        // 移動よりモーション時間が長い場合はそちらの時間まで確保
        this.maxDuration = Math.max(this.maxDuration, this.motionDurationTotal);
    }

    // 間隔を設定
    if (baseMotion.interval != undefined) {
        this.interval = eval(baseMotion.interval);
    // 間隔が未設定ならば、モーションの長さを設定
    } else {
        this.interval = this.maxDuration / baseMotion.rate;
    }

    // 以下の項目はそのまま数式として渡す
    this.ex = baseMotion.ex;
    this.ey = baseMotion.ey;
    this.airY = baseMotion.airY;
    this.z = baseMotion.z;
    this.playSe = baseMotion.playSe;
    this.commonEvent = baseMotion.commonEvent;
    this.script = baseMotion.script;
    this.plugin = baseMotion.plugin;
    this.scriptRT = baseMotion.scriptRT;
    this.motionPattern = baseMotion.motionPattern;
    this.motionStartPattern = baseMotion.motionStartPattern;
    this.weaponId = baseMotion.weaponId;
    this.weaponType = baseMotion.weaponType;
    this.arcX = baseMotion.arcX;
    this.arcY = baseMotion.arcY;
    this.addX = baseMotion.addX;
    this.addY = baseMotion.addY;
    this.dx = baseMotion.dx;
    this.dy = baseMotion.dy;
    this.opacity = baseMotion.opacity;
    this.rotation = baseMotion.rotation;
    this.scaleX = baseMotion.scaleX;
    this.scaleY = baseMotion.scaleY;
    this.color = baseMotion.color;
    this.noReturn = baseMotion.noReturn;
    this.battlerImage = baseMotion.battlerImage;
    // リアルタイム円
    this.radiusX = baseMotion.radiusX;
    this.radiusY = baseMotion.radiusY;
    this.radX = baseMotion.radX;
    this.radY = baseMotion.radY;
}

/**
 * ●nullなら0変換
 */
function nvl(val) {
    if (!val) {
        return 0;
    }
    return val;
}

/**
 * ●標準ターゲットＸ座標取得
 */
DynamicMotion.prototype.getDefaultX = function (b, screenX) {
    var defaultX;

    // 画面の場合は画面標準座標
    if (this.position === 3) {
        defaultX = screenX;

    // それ以外は対象のＸ座標
    } else if (b) {
        defaultX = b.x;
    }

    return defaultX;
};

/**
 * ●標準ターゲットＹ座標取得
 */
DynamicMotion.prototype.getDefaultY = function (a, b, screenY) {
    // 対象なし
    if (this.position <= 2 && b == undefined) {
        return undefined;
    }

    var defaultY;

    // 頭上
    if (this.position === 0) {
        defaultY = b.y - b.height;
    // 中心
    } else if (this.position === 1) {
        defaultY = b.y - b.height / 2;
    // 足元
    } else if (this.position === 2) {
        defaultY = b.y - a.height/2;
    // 画面の場合は画面標準座標
    } else if (this.position === 3) {
        defaultY = screenY
    }

    return defaultY;
};

/**
 * ●Game_Battlerの初期化
 */
var _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
    // 元処理実行
    _Game_Battler_initMembers.call(this);

    // モーション情報の追加
    this._motions = [];
};

/**
 * 【独自定義】動的モーションをバトラーからクリアする。
 */
Game_Battler.prototype.clearDynamicMotions = function() {
    this._motions = [];
};

/**
 * 【独自定義】動的モーションがリクエストされているか？
 */
Game_Battler.prototype.isDynamicMotionRequested = function() {
    return this._motions && this._motions.length > 0;
};

/**
 * 【独自定義】動的モーションを取得する。
 */
Game_Battler.prototype.shiftDynamicMotion = function() {
    return this._motions.shift();
};

/**
 * 【独自定義】動的モーションを開始する。
 * NRP_DynamicAnimation.js側から呼び出し。
 */
Game_Battler.prototype.startDynamicMotion = function(dynamicMotion) {
    var data = {
        delay: dynamicMotion.targetDelay,
        dynamicMotion: dynamicMotion
    };

    // モーション情報が未定義なら初期化
    if (!this._motions) {
        this.clearDynamicMotions();
    }
    this._motions.push(data);
};

/**
 * ●更新
 * ※毎フレーム実行される処理
 */
var _Sprite_Battler_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
    // 元処理実行
    _Sprite_Battler_update.call(this);

    if (this._battler) {
        // 動的モーションの更新
        this.updateDynamicMotion();
    }
};

/**
 * 【独自定義】動的モーションの実行
 */
Sprite_Battler.prototype.updateDynamicMotion = function() {
    // モーション実行中ならば、時間カウント-1
    if (this.isMotionPlaying()) {
        this._dynamicMotionDuration--;
    }
    
    // DynamicAnimationと同タイミングで実行するため、準備完了まで待つ
    if (!BattleManager._spriteset || !BattleManager._spriteset._isDynamicAnimationReady) {
        return;
    }

    // 実行モーションの設定があれば処理
    while (this._battler.isDynamicMotionRequested()) {
        // まだ時間でない場合は処理しない
        if (this._battler._motions[0].delay > this._dynamicMotionTime) {
            break;
        }

        // 実行条件を満たしたのでshift（先頭を削除＆取得）する。
        var data = this._battler.shiftDynamicMotion();

        var dynamicMotion = data.dynamicMotion;
        // モーション実行時間を設定
        // モーション実行時間が未設定、または新規モーションが現在のモーションより長い
        if (!this._dynamicMotionDuration || dynamicMotion.maxDuration > this._dynamicMotionDuration) {
            this._dynamicMotionDuration = dynamicMotion.maxDuration;
        }
        // 動的モーションを開始する。
        this.startDynamicMotion(dynamicMotion);
    }

    // 時間経過
    // ※この値はDynamicAnimation側で初期化している。
    this._dynamicMotionTime++;
};

/**
 * 【独自実装】動的モーションの呼び出し
 */
Sprite_Battler.prototype.startDynamicMotion = function(dynamicMotion) {
    var dm = dynamicMotion;

    // 初期化
    if (!this._dynamicMotion) {
        this._dynamicMotion = [];
    }

    var motion = this._dynamicMotion;

    // eval参照用
    var a = dm.referenceSubject;
    var subject = getReferenceBattler(BattleManager._subject);
    var b = dm.referenceTarget;
    motion._referenceTarget = b;
    var repeat = dm.repeat;
    var r = dm.r;
    var position = dm.position;
    var screenX = dm.screenX;
    var screenY = dm.screenY;
    motion._screenX = screenX;
    motion._screenY = screenY;
    var defaultX = dm.getDefaultX(b, screenX);
    var defaultY = dm.getDefaultY(a, b, screenY);
    motion._defaultX = defaultX;
    motion._defaultY = defaultY;

    var performerNo = dm.performerNo;
    var targetNo = dm.targetNo;
    motion._performerNo = performerNo;
    motion._targetNo = targetNo;

    // ミラーリング
    var mirroring = dm.mirroring;
    motion._mirroring = mirroring;

    // 放物線
    if (dm.arcX) {
        motion._arcX = eval(dm.arcX);
    }
    if (dm.arcY) {
        motion._arcY = eval(dm.arcY);
    }

    // 動的座標
    if (dm.dx) {
        motion._evalDx = dm.dx;
    }
    if (dm.dy) {
        motion._evalDy = dm.dy;
    }

    // リアルタイム円（半径）
    if (dm.radiusX) {
        motion._evalRadiusX = dm.radiusX;
    }
    if (dm.radiusY) {
        motion._evalRadiusY = dm.radiusY;
    }

    // リアルタイム円（角度）
    if (dm.radX) {
        motion._evalRadX = dm.radX;
    }
    if (dm.radY) {
        motion._evalRadY = dm.radY;
    }

    // 座標補正
    if (dm.addX) {
        motion._evalAddX = dm.addX;
    }
    if (dm.addY) {
        motion._evalAddY = dm.addY;
    }

    // 大きさ
    if (dm.scaleX != undefined) {
        motion._evalScaleX = dm.scaleX;
    }
    if (dm.scaleY != undefined) {
        motion._evalScaleY = dm.scaleY;
    }

    // 左右反転
    if (dm.mirror != undefined) {
        motion._mirror = dm.mirror;

        // 解除された場合は戻す
        if (!motion._mirror && this.scale.x < 0) {
            this.scale.x *= -1;
        }
    }

    // Ｚ座標
    if (dm.z != undefined) {
        // this.z = eval(dm.z);
        motion._evalZ = dm.z;
    }

    // 回転率
    if (dm.rotation != undefined) {
        motion._evalRotation = dm.rotation;
    }

    // 不透明度
    if (dm.opacity != undefined) {
        motion._evalOpacity = dm.opacity;
    }

    // 色調変更
    if (dm.color != undefined) {
        motion._evalColor = dm.color;
    }

    // 影非表示
    if (dm.noShadow != undefined) {
        motion._noShadow = dm.noShadow;
    }

    // 効果音
    if (dm.playSe != undefined) {
        // "{"で始まる場合はObject指定
        if (dm.playSe.startsWith("{")) {
            AudioManager.playSe(JSON.parse(dm.playSe))
        // ファイル名指定
        } else {
            AudioManager.playSe({"name":dm.playSe, "volume":90, "pitch":100, "pan":0})
        }
    }

    // コモンイベント
    if (dm.commonEvent != undefined) {
        var commonEventId = eval(dm.commonEvent);
        if (commonEventId) {
            var commonEvent = new Game_CommonEvent(commonEventId);
            // 強制実行フラグを立てる。
            commonEvent._isForceActive = true;
            // コモンイベントリストが未定義なら初期化
            if (this._commonEvents == undefined) {
                this._commonEvents = [];
            }
            // Sprite_Battlerに実行コモンイベントを追加
            // 処理はDynamicAnimation側に記述
            this._commonEvents.push(commonEvent);
            // 初期化
            commonEvent.refresh();
        }
    }

    // スクリプト
    if (dm.script != undefined) {
        eval(dm.script);
    }

    // プラグインコマンド
    if (dm.plugin != undefined) {
        var pluginCommand = dm.plugin;
        // 注釈や空白は不要なので除去
        pluginCommand = pluginCommand.split("//")[0];
        pluginCommand = pluginCommand.trim();

        var evalPluginCommand = [];
        for (let p of pluginCommand.split(" ")) {
            let p2;
            try {
                // 数式として取得できる場合
                p2 = eval(p);
            } catch (e) {
                // 数式でない場合はエラーとなるが、普通に文字列で取得
                p2 = p;
            }
            evalPluginCommand.push(p2);
        }
        callPluginCommand(evalPluginCommand);
    }

    // スクリプト（リアルタイム）
    if (dm.scriptRT != undefined) {
        motion._scriptRT = dm.scriptRT;
    }
    
    // 終点指定
    if (dm.duration != undefined) {
       /*
        * 始点座標
        * ※パラメータとしては存在しないがeval参照用に設定
        */
        // 現在地を初期値に設定
        var sx = this.x;
        var sy = this.y - this.rollAirY(); // 空中座標は除外

        motion._sx = sx;
        motion._sy = sy;

        var ex = sx;
        var ey = sy;
        
        // 指定があれば優先
        if (dm.ex) {
            ex = eval(dm.ex);
        }
        if (dm.ey) {
            ey = eval(dm.ey);
        }

        // 空中Ｙ座標
        var airY = this._airY;
        if (dm.airY != undefined) {
            airY = eval(dm.airY);
        }
        // 目標（終点）とする空中Ｙ座標
        this._targetAirY = airY;

        // 絶対座標へ移動
        this.startMoveDynamic(ex, ey, dm.duration);
    }

    // モーションの実行（アクター専用）
    if (dm.motion && this._actor) {
        // モーションリセット
        this._motionCount = 0;
        this._pattern = 0;

        // モーション時間
        this._motionDuration = dm.motionDuration;
        // モーションパターン
        this._motionPattern = dm.motionPattern;
        // モーション開始パターン
        if (dm.motionStartPattern != undefined) {
            this._motionStartPattern = eval(dm.motionStartPattern);
        }

        // attackの場合は武器を振る
        if (dm.motion == "attack"){
            var weaponId;
            if (dm.weaponId) {
                weaponId = eval(dm.weaponId);
            }
            var weaponType;
            if (dm.weaponType) {
                weaponType = eval(dm.weaponType);
            }
            this._battler.performAttackDynamicMotion(weaponId, weaponType);

        // 通常のモーション
        } else {
            // 武器非表示
            if (this._weaponSprite) {
                this._weaponSprite._weaponImageId = 0;
                this._weaponSprite.updateFrame();
            }
            this.startMotion(dm.motion);
        }
    }

    // 全体ダメージ処理の実行（通常のダメージ処理を先行呼び出し）
    if (dm.damageAll) {
        BattleManager._updateDamage = true;

    // ダメージ処理の実行（一回ずつ）
    } else if (dm.damage) {
        callDamage(BattleManager._action, BattleManager._subject, BattleManager._targets);
    }

    //--------------------
    // 非リピート項目
    //--------------------
    if (r == 0) {
        // 帰還しないフラグの設定
        if (dm.noReturn) {
            var noReturn = eval(dm.noReturn);
            if (noReturn == true) {
                this._battler._noReturn = true;
            } else if (noReturn == false) {
                this._battler._noReturn = false;
            }
        }

        // バトラー画像の変更
        if (dm.battlerImage != undefined) {
            if (dm.battlerImage) {
                this._battler._tempBattlerImage = dm.battlerImage;
            // 空白ならクリア
            } else {
                this._battler._tempBattlerImage = undefined;
            }
        }
    }
};

/**
 * ●ダメージ処理の実行
 */
function callDamage(action, subject, targets) {
    // 対象がなければ終了
    if (!targets.length) {
        return;
    }

    // ランダム型の場合
    if (action.isForRandom()) {
        // 一体ずつダメージ処理
        var target = targets.shift();
        BattleManager.invokeAction(subject, target);
        return;
    }

    // 範囲に従ってダメージ処理
    // 重複ターゲットを削除して再作成
    var distinctTargets = targets.filter(function(target, i) {
        return targets.indexOf(target) == i;
    });

    // 対象の人数分実行
    distinctTargets.forEach(function(target) {
        // 対象要素を削除
        for (let i = 0; i < targets.length; i++) {
            let t = targets[i];
            // 一致した最初の１件を削除
            if (t == target) {
                targets.splice(i, 1);
                break;
            }
        }
        // ダメージ処理実行
        BattleManager.invokeAction(subject, target);
    });
}

/**
 * ●プラグインコマンドを呼び出す
 */
function callPluginCommand(params) {
    var command = params.shift();
    // バトルコマンド用のInterpreterを参照し、プラグインコマンドを呼び出す。
    $gameTroop._interpreter.pluginCommand(command, params);
}

/**
 * ●毎フレーム実行される戦闘経過処理
 * ※モーション中のダメージ表示用に処理追加
 */
var _Scene_Battle_updateBattleProcess = Scene_Battle.prototype.updateBattleProcess;
Scene_Battle.prototype.updateBattleProcess = function() {
    if (!this.isAnyInputWindowActive() || BattleManager.isAborting() ||
            BattleManager.isBattleEnd()) {
        // ダメージ処理フラグがONの場合
        if (BattleManager._updateDamage) {
            if (!BattleManager.isBusyMessage() && !BattleManager.updateEvent()) {
                // 既に処理が終わっているなら、ダメージ処理フラグをOFFして何もしない
                if (BattleManager._targets.length == 0) {
                    BattleManager._updateDamage = false;
                    return;
                }

                // ダメージ処理
                BattleManager.updateAction();
                
                // 処理が終わったなら、ダメージ処理フラグをOFF
                if (BattleManager._targets.length == 0) {
                    BattleManager._updateDamage = false;
                }
            }
            return;
        }
    }

    // 元処理実行
    _Scene_Battle_updateBattleProcess.call(this);
};

/**
 * 【独自実装】モーション中でもダメージ表示を行うために
 * isBusy()からthis._spriteset.isBusy()を削除した版
 */
BattleManager.isBusyMessage = function() {
    return ($gameMessage.isBusy() || this._logWindow.isBusy());
};

/**
 * ●ダメージ更新処理など
 */
var _BattleManager_invokeAction = BattleManager.invokeAction;
BattleManager.invokeAction = function(subject, target) {
    // 不死身設定の場合、対象を不死身化
    if (existSetting("Immortal")) {
        target.addState(pImmortalState);
    }

    _BattleManager_invokeAction.apply(this, arguments);
};

/**
 * ●行動終了
 */
var _BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    // 不死身設定の場合、全員の不死身化解除
    if (existSetting("Immortal")) {
        this.allBattleMembers().forEach(function(battler) {
            battler.removeState(pImmortalState);
            // 既に死んでいる場合は演出実行
            if (battler.isStateAffected(battler.deathStateId())) {
                this._logWindow.displayAddedStates(battler);
            }
        }, this);
    }

    _BattleManager_endAction.apply(this, arguments);
};

/**
 * ●モーションの開始
 */
var _Sprite_Actor_startMotion = Sprite_Actor.prototype.startMotion;
Sprite_Actor.prototype.startMotion = function(motionType) {
    _Sprite_Actor_startMotion.call(this, motionType);

    // モーション開始パターンの変更
    if (this._motionStartPattern) {
        this._pattern = this._motionStartPattern;
    }
};

/**
 * ●モーションの更新
 */
var _Sprite_Actor_updateMotionCount = Sprite_Actor.prototype.updateMotionCount;
Sprite_Actor.prototype.updateMotionCount = function() {
    // 変更がある場合は独自実装へ。
    if (this._motionDuration != undefined || this._motionPattern != undefined) {
        // モーション速度
        var motionSpeed;
        if (this._motionDuration != undefined) {
            motionSpeed = this._motionDuration;
        // 指定がなければ標準値
        } else {
            motionSpeed = this.motionSpeed();
        }
        if (this._motion && ++this._motionCount >= motionSpeed) {
            // モーションパターンの指定がある場合
            if (this._motionPattern != undefined) {
                // 指定式でパターン制御
                this._pattern = eval(this._motionPattern);
                // 値がマイナスになった場合はリフレッシュ
                if (this._pattern < 0) {
                    this.refreshMotion();
                }
            } else if (this._motion.loop) {
                this._pattern = (this._pattern + 1) % 4;
            } else if (this._pattern < 2) {
                this._pattern++;
            } else {
                this.refreshMotion();
            }
            this._motionCount = 0;
        }
        return;
    }

    // 元処理実行
    _Sprite_Actor_updateMotionCount.call(this);
};

/**
 * ●モーションリフレッシュ
 */
var _Sprite_Actor_refreshMotion = Sprite_Actor.prototype.refreshMotion;
Sprite_Actor.prototype.refreshMotion = function() {
    this._motionDuration = undefined;
    this._motionPattern = undefined;
    this._motionStartPattern = undefined;
    // 武器非表示
    this._weaponSprite._weaponImageId = 0;

    _Sprite_Actor_refreshMotion.call(this);
};

/**
 * 【独自実装】アタックモーション
 */
Game_Actor.prototype.performAttackDynamicMotion = function(weaponId, weaponType) {
    var wtypeId;

    // weaponTypeの指定がある場合は優先
    if (weaponType != undefined) {
        wtypeId = weaponType;
    // それ以外は武器ＩＤから取得
    } else {
        var weapons;
        // 武器IDの指定があれば取得
        if (weaponId != undefined) {
            weapons = [$dataWeapons[weaponId]];
        } else {
            weapons = this.weapons();
        }
        wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
    }

    var attackMotion = $dataSystem.attackMotions[wtypeId];
    if (attackMotion) {
        if (attackMotion.type === 0) {
            this.requestMotion('thrust');
        } else if (attackMotion.type === 1) {
            this.requestMotion('swing');
        } else if (attackMotion.type === 2) {
            this.requestMotion('missile');
        }
        this.startWeaponAnimation(attackMotion.weaponImageId);
    }
};

/**
 * ●武器の表示準備
 */
var _Sprite_Weapon_setup = Sprite_Weapon.prototype.setup;
Sprite_Weapon.prototype.setup = function(weaponImageId) {
    // 開始モーションの指定がある場合
    if (this.parent._motionStartPattern) {
        this._weaponImageId = weaponImageId;
        this._animationCount = 0;
        this._pattern = this.parent._motionStartPattern;
        this.loadBitmap();
        this.updateFrame();
        return;
    }

    // 元処理実行
    _Sprite_Weapon_setup.call(this, weaponImageId);
};

/**
 * 【上書】武器のモーション時間
 */
Sprite_Weapon.prototype.animationWait = function() {
    // 親（Sprite_Actor）のモーション時間に武器も合わせる。
    var motionSpeed;
    if (this.parent._motionDuration != undefined) {
        motionSpeed = this.parent._motionDuration;
    // 指定がなければ標準値
    } else {
        motionSpeed = this.parent.motionSpeed();
    }

    return motionSpeed;
};

/**
 * 【上書】武器のモーションパターン
 */
Sprite_Weapon.prototype.updatePattern = function() {
    // アクターのパターンに同期する。
    this._pattern = this.parent._pattern;

    if (this._pattern >= 3 || this._pattern <= -1) {
        this._weaponImageId = 0;
    }
};

/**
 * 【独自定義】絶対座標での移動を行う。
 */
Sprite_Battler.prototype.startMoveDynamic = function(x, y, duration) {
    // 全体時間の保持
    this._allDuration = duration;

    // 絶対座標を相対座標へ変換し、移動実行。
    var offsetX = x - this._homeX;
    var offsetY = y - this._homeY;

    // 開始時の空中Ｙ座標
    this._startAirY = this._airY;
    if (this._startAirY == undefined) {
        this._startAirY = 0;
    }

    this._targetOffsetX = offsetX;
    this._targetOffsetY = offsetY;
    this._movementDuration = duration;
    if (duration === 0) {
        this._offsetX = offsetY;
        this._offsetY = offsetY;
        this._airY = this._targetAirY;
    }
};

/**
 * ●バトラーの移動更新
 * ※当プラグインの描画更新系もここで行う
 */
var _Sprite_Battler_updateMove = Sprite_Battler.prototype.updateMove;
Sprite_Battler.prototype.updateMove = function() {
    var motion = this._dynamicMotion;

    if (motion && this._movementDuration > 0) {
        var t = this._allDuration - this._movementDuration; // 現在の経過時間
        var et = this._allDuration - 1 // 終了時間

        // eval参照用
        var a = this;
        var b = motion._referenceTarget;
        var screenX = motion._screenX;
        var screenY = motion._screenY;
        var defaultX = motion._defaultX;
        var defaultY = motion._defaultY;
        var sx = motion._sx;
        var sy = motion._sy;
        var performerNo = motion._performerNo;
        var targetNo = motion._targetNo;

        var mirroring = motion._mirroring; // ミラーリング

        motion._addX = 0;
        motion._addY = 0;

        // 座標計算式
        if (motion._evalDx) {
            motion._dx = eval(motion._evalDx);
        }
        if (motion._evalDy) {
            motion._dy = eval(motion._evalDy);
        }

        // 円運動
        if (motion._evalRadiusX) {
            if (motion._evalRadX == undefined) {
                motion._evalRadX = 0;
            }
            motion._addX += eval(motion._evalRadiusX) * Math.cos(eval(motion._evalRadX))
        }
        if (motion._evalRadiusY) {
            if (motion._evalRadY == undefined) {
                motion._evalRadY = 0;
            }
            motion._addY += eval(motion._evalRadiusY) * Math.sin(eval(motion._evalRadY))
        }

        // 座標補正
        if (motion._evalAddX) {
            motion._addX += eval(motion._evalAddX);
        }
        if (motion._evalAddY) {
            motion._addY += eval(motion._evalAddY);
        }

        // 空中Ｙ座標
        this._airY = this._startAirY;
        if (this._airY == undefined) {
            this._airY = 0;
        }
        // 終点の始点がある場合
        if (this._targetAirY != undefined && this._startAirY != this._targetAirY) {
            var rate;
            // 両方０の場合はNaNになるので、固定で1を設定
            if (t == 0 && et == 0) {
                rate = 1;
            } else {
                rate = t/et;
            }
            // 始点から終点へと移動する計算式
            this._airY += (this._targetAirY - this._startAirY) * rate;
        }

        // 放物線補正があれば加算
        var arcX = motion._arcX;
        var arcY = motion._arcY;
        // arcX, arcYを頂点とする二次曲線の方程式
        if (arcX) {
            motion._offsetArcX = (-arcX / Math.pow(et/2, 2)) * Math.pow(Math.min(t, et) - et/2, 2) + arcX;
        }
        if (arcY) {
            this._airY += (-arcY / Math.pow(et/2, 2)) * Math.pow(Math.min(t, et) - et/2, 2) + arcY;
        }

        // 大きさ変更
        if (motion._evalScaleX != undefined) {
            this.scale.x = eval(motion._evalScaleX);
        }
        if (motion._evalScaleY != undefined) {
            this.scale.y = eval(motion._evalScaleY);
        }

        // 回転率変更
        if (motion._evalRotation != undefined) {
            this.rotation = eval(motion._evalRotation);
            // 画像の原点を高さの中央に
            this._effectTarget.anchor.y = 0.5;
            if (this._weaponSprite) {
                this._weaponSprite.anchor.y = 0.5;
            }
            if (this._stateSprite) {
                this._stateSprite.anchor.y = 0.5;
            }
            // その分、座標を調整
            this._rollAdjustY = -this.height/2;
        }

        // 不透明度変更
        if (motion._evalOpacity != undefined) {
            this.opacity = eval(motion._evalOpacity);
        }

        // 色調変更
        if (motion._evalColor != undefined) {
            this._effectTarget.setBlendColor(eval(motion._evalColor));
        }

        // Ｚ座標
        if (motion._evalZ != undefined) {
            this.z = eval(motion._evalZ);
        }

        // スクリプト（リアルタイム）
        if (motion._scriptRT != undefined) {
            eval(motion._scriptRT);
        }
    }

    // 元処理実行
    _Sprite_Battler_updateMove.call(this);
};

/**
 * 【上書】移動終了
 */
Sprite_Actor.prototype.onMoveEnd = function() {
    Sprite_Battler.prototype.onMoveEnd.call(this);
    if (!BattleManager.isBattleEnd()) {
        // モーションを実行中ならリフレッシュしない。
        // ■条件詳細
        // ・モーションが存在する。
        // ・ループモーションではない。
        // ・現在のパターンが0～2
        if (this._motion
                && !this._motion.loop
                && this._pattern >= 0 && this._pattern <= 2) {
            return;
        }
        this.refreshMotion();
    }
};

/**
 * ●移動終了
 */
var _Sprite_Battler_onMoveEnd = Sprite_Battler.prototype.onMoveEnd;
Sprite_Battler.prototype.onMoveEnd = function() {
    _Sprite_Battler_onMoveEnd.call(this);

    var motion = this._dynamicMotion;
    if (!motion) {
        return;
    }

    // 変数初期化
    this._startAirY = undefined;
    this._targetAirY = undefined;
    motion._arcX = 0;
    motion._arcY = 0;
    motion._offsetArcX = 0;
    motion._dx = undefined;
    motion._dy = undefined;
    motion._evalDx = undefined;
    motion._evalDy = undefined;
    motion._addX = undefined;
    motion._addY = undefined;
    motion._evalAddX = undefined;
    motion._evalAddY = undefined;
    motion._evalRadiusX = undefined;
    motion._evalRadiusY = undefined;
    motion._evalRadX = undefined;
    motion._evalRadY = undefined;
    motion._evalScaleX = undefined;
    motion._evalScaleY = undefined;
    motion._evalRotation = undefined;
    motion._evalOpacity = undefined;
    motion._evalColor = undefined;
    motion._evalZ = undefined;
    motion._scriptRT = undefined;

    // 画像基準点が変更されている場合
    if (this._effectTarget.anchor.y == 0.5) {
        // かつ回転終了の場合
        if (this.rotation == undefined || this.rotation % Math.PI*2 == 0) {
            // 基準点を戻す（本体、武器、ステート）
            this._effectTarget.anchor.y = 1;
            if (this._weaponSprite) {
                this._weaponSprite.anchor.y = 1;
            }
            if (this._stateSprite) {
                this._stateSprite.anchor.y = 1;
            }
            // 空中位置調整を戻す
            this._rollAdjustY = 0;
        }
    }
};

/**
 * ●バトラーの位置設定
 */
var _Sprite_Battler_updatePosition = Sprite_Battler.prototype.updatePosition;
Sprite_Battler.prototype.updatePosition = function() {
    // 元処理実行
    _Sprite_Battler_updatePosition.call(this);

    var motion = this._dynamicMotion;
    if (!motion) {
        return;
    }

    // Ｘ座標の計算式の指定がある場合
    if (motion._dx != undefined) {
        this.x = motion._dx;
    }
    // Ｙ座標の計算式の指定がある場合
    if (motion._dy != undefined) {
        this.y = motion._dy;
    }

    // Ｘ座標の補正があれば加算
    if (motion._addX) {
        this.x += motion._addX;
    }
    // Ｙ座標の補正があれば加算
    if (motion._addY) {
        this.y += motion._addY;
    }

    // 放物線成分および空中成分を加算
    if (motion._offsetArcX) {
        this.x += motion._offsetArcX;
    }
    // 空中Ｙ座標
    if (this.rollAirY()) {
        this.y += this.rollAirY();
    }

    // 左右反転
    if (motion._mirror) {
        if (this.scale.x > 0) {
            this.scale.x *= -1;
        }
    }
};

/**
 * ●アクターのアクション開始
 */
var _Game_Actor_performAction = Game_Actor.prototype.performAction;
Game_Actor.prototype.performAction = function(action) {
    // 開始モーションの有無
    if (pSetStartMotion) {
        // やや冗長だけど競合を減らすため、
        // Game_Battler.prototype.performActionを呼び出す。
        Game_Battler.prototype.performAction.call(this, action);
        // 1:常に無
        if (pSetStartMotion == 1) {
            return;
        // 2:モーション指定時のみ無
        } else if (pSetStartMotion == 2 && isDynamicMotion(action)) {
            return;
        }
    }

    // 元処理実行
    _Game_Actor_performAction.call(this, action);
};

/**
 * ●動的モーションかの判定処理
 */
function isDynamicMotion(action) {
    var item = action.item();
    var note = item.note;

    // 省略タグを考慮
    var tagNameSet = "(?:" + TAG_NAME + ")";
    if (pShortTagName) {
        tagNameSet = "(?:" + TAG_NAME + "|" + pShortTagName + ")";
    }

    // 省略タグを考慮（設定タグ）
    var settingTagNameSet = "(?:" + SETTING_TAG_NAME + ")";
    if (pShortSettingTagName) {
        settingTagNameSet = "(?:" + SETTING_TAG_NAME + "|" + pShortSettingTagName + ")";
    }

    // 開始タグがあればtrue
    if (note.match("<" + tagNameSet) || note.match("<" + settingTagNameSet)) {
        return true;
    }
    return false;
}

/**
 * ●アクション実行終了（バトラー共通）
 */
var _Game_Battler_performActionEnd = Game_Battler.prototype.performActionEnd;
Game_Battler.prototype.performActionEnd = function() {
    // 元処理実行
    _Game_Battler_performActionEnd.call(this);

    // アクター位置の自動設定を禁止解除
    BattleManager._noUpdateTargetPosition = false;
};

/**
 * ●アクター位置の自動設定
 */
var _Sprite_Actor_updateTargetPosition = Sprite_Actor.prototype.updateTargetPosition;
Sprite_Actor.prototype.updateTargetPosition = function() {
    // 行動開始したら、解除されるまで処理しない。
    if (BattleManager._noUpdateTargetPosition) {
        return;
    // noReturn状態ならば帰還しない。
    } else if (this._actor._noReturn) {
        return;
    }

    _Sprite_Actor_updateTargetPosition.call(this);
};

/**
 * ●前進
 */
var _Sprite_Actor_stepForward = Sprite_Actor.prototype.stepForward;
Sprite_Actor.prototype.stepForward = function() {
    if (BattleManager._phase == "action") {
        // 前進の有無
        if (pSetStepForward) {
            // 1:常に無
            if (pSetStepForward == 1) {
                return;
            // 2:モーション指定時のみ無
            } else if (pSetStepForward == 2 && isDynamicMotion(BattleManager._action)) {
                return;
            }
        }

        // NoStepの設定があれば前進しない
        if (existSetting("NoStep")) {
            return;
        }
    }

    // 元処理実行
    _Sprite_Actor_stepForward.call(this);
};

/**
 * ●アクターの影更新
 */
var _Sprite_Actor_updateShadow = Sprite_Actor.prototype.updateShadow;
Sprite_Actor.prototype.updateShadow = function() {
    // 元処理実行
    _Sprite_Actor_updateShadow.call(this);

    var motion = this._dynamicMotion;
    if (!motion) {
        return;
    }

    // 影非表示
    if (motion._noShadow) {
        this._shadowSprite.visible = false;
        return;
    }

    // 空中Ｙ座標
    var airY = this.rollAirY();

    // ジャンプ時の影表示
    if (pJumpShadow == true) {
        this._shadowSprite.x = 0;
        this._shadowSprite.y = 0;

        // ジャンプ座標分だけ影のＹ座標を調整
        if (airY && this._shadowSprite.visible) {
            // 回転時の角度変化分を調整
            if (motion._mirror) {
                this._shadowSprite.y -= airY * Math.cos(this.rotation * -1);
                this._shadowSprite.x -= airY * Math.sin(this.rotation * -1);
            } else {
                this._shadowSprite.y -= airY * Math.cos(this.rotation);
                this._shadowSprite.x -= airY * Math.sin(this.rotation);
            }
        }
    // ジャンプ時の影非表示
    } else if (pJumpShadow == false && airY) {
        this._shadowSprite.visible = false;
        return;
    }

    // アクターが回転した場合、影を反対に回転して元の角度を保持する。
    if (this.rotation) {
        this._shadowSprite.rotation = -this.rotation;
        // 左右反転時は逆
        if (motion._mirror) {
            this._shadowSprite.rotation *= -1;
        }
    } else {
        this._shadowSprite.rotation = 0;
    }
};

/**
 * 【独自定義】回転調整後の空中Ｙ座標を取得
 * ※基本的に正の値を取り、Ｙ座標から減算する。
 */
Sprite_Battler.prototype.rollAirY = function() {
    var airY = 0;
    if (this._airY) {
        airY += this._airY;
    }
    if (this._rollAdjustY) {
        airY += this._rollAdjustY;
    }
    return airY;
};

/**
 * 【独自定義】モーション実行中の判定。
 */
Sprite_Battler.prototype.isMotionPlaying = function() {
    return this._dynamicMotionDuration > 0;
};

/**
 * ●アクターの画像名を取得します。
 */
var _Game_Actor_battlerName = Game_Actor.prototype.battlerName;
Game_Actor.prototype.battlerName = function() {
    // 一時設定があれば、そちらを取得
    if (this._tempBattlerImage) {
        return this._tempBattlerImage;
    }

    return _Game_Actor_battlerName.apply(this, arguments);
};

/**
 * ●敵キャラの画像名を取得します。
 */
var _Game_Enemy_battlerName = Game_Enemy.prototype.battlerName;
Game_Enemy.prototype.battlerName = function() {
    // 一時設定があれば、そちらを取得
    if (this._tempBattlerImage) {
        return this._tempBattlerImage;
    }

    return _Game_Enemy_battlerName.apply(this, arguments);
};

/**
 * ●処理中かどうかの判定
 */
var _Spriteset_Battle_isBusy = Spriteset_Battle.prototype.isBusy;
Spriteset_Battle.prototype.isBusy = function() {
    return _Spriteset_Battle_isBusy.call(this) || this.isMotionPlaying();
};

/**
 * 【独自実装】モーション実行中判定
 */
Spriteset_Battle.prototype.isMotionPlaying = function() {
    return this.battlerSprites().some(function(sprite) {
        return sprite._battler && (sprite._battler.isDynamicMotionRequested() || sprite.isMotionPlaying());
    });
};

//------------------------------------------
// 表示優先度
//------------------------------------------

if (pUsePriority) {
    /**
     * ●更新処理
     */
    var _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
    Spriteset_Battle.prototype.update = function() {
        _Spriteset_Battle_update.apply(this, arguments);

        this.updateNrpZCoordinates();
    };

    /**
     * ●Ｚ座標による優先度表示の更新
     */
    Spriteset_Battle.prototype.updateNrpZCoordinates = function () {
        // 背景を一旦削除
        this._battleField.removeChild(this._back1Sprite);
        this._battleField.removeChild(this._back2Sprite);

        // Ｚ座標の既定値
        // 8:戦闘アニメ
        for (var child of this._battleField.children) {
            if (child.z == undefined) {
                child.z = 9;
            }
        }

        this._battleField.children.sort(compareZ);

        // 背景を再登録して後方へ
        this._battleField.addChildAt(this._back2Sprite, 0);
        this._battleField.addChildAt(this._back1Sprite, 0);
    };

    /**
     * ●バトラースプライトの初期化
     */
    var _Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
    Sprite_Battler.prototype.initMembers = function() {
        _Sprite_Battler_initMembers.apply(this, arguments);

        // Ｚ座標の設定
        this.z = pBattlerZ;
    };

    /**
     * ●アクション開始
     */
    var _Game_Battler_performActionStart = Game_Battler.prototype.performActionStart;
    Game_Battler.prototype.performActionStart = function(action) {
        _Game_Battler_performActionStart.apply(this, arguments);

        // 行動開始前、Ｚ座標を調整
        // ※相手サイドを下に表示
        var battlerSprites = BattleManager._spriteset.battlerSprites();
        for (var sprite of battlerSprites) {
            // 存在しない場合は無視
            if (!sprite._battler) {
                continue;
            }

            // 自分と同サイド
            if (this.isActor() == sprite._battler.isActor()) {
                sprite.z = pBattlerZ;

            // それ以外
            } else {
                if (pOpponentSideZ) {
                    sprite.z = pOpponentSideZ;
                } else {
                    sprite.z = pBattlerZ;
                }
            }
        }
    };

    /**
     * ●アクション実行終了（バトラー共通）
     * ※上に同関数があるので名前を_2に変更
     */
    var _Game_Battler_performActionEnd_2 = Game_Battler.prototype.performActionEnd;
    Game_Battler.prototype.performActionEnd = function() {
        _Game_Battler_performActionEnd_2.call(this);

        // 行動終了後、Ｚ座標を初期化
        var battlerSprites = BattleManager._spriteset.battlerSprites();
        for (var sprite of battlerSprites) {
            sprite.z = pBattlerZ;
        }
    };
}

/**
 * ●優先度設定
 */
function compareZ(a, b) {
    // 優先度による比較
    if (a.z > b.z) {
        return 1;
    } else if (a.z < b.z) {
        return -1;
    }

    // 空中Ｙ座標があれば優先（マイナス優先）
    var aAirY = a._airY ? a._airY : 0;
    var bAirY = b._airY ? b._airY : 0;

    if (aAirY < bAirY) {
        return 1;
    } else if (aAirY > bAirY) {
        return -1;
    }

    // 優先度が同一の場合、Ｙ座標が大きいものを優先
    if (a.y > b.y) {
        return 1;
    } else if (a.y < b.y) {
        return -1;
    }

    // バトラー同士ならＸ座標が大きいものを優先
    if (a._battler && b._battler) {
        if (a.x > b.x) {
            return 1;
        } else if (a.x < b.x) {
            return -1;
        }
    }
    
    // 新しく生成されたスプライトを優先（ダメージなど）
    return a.spriteId - b.spriteId;
}

//------------------------------------------
// 共通関数
//------------------------------------------

/**
 * ●指定した設定があればtrue
 */
function existSetting(searchName) {
    if (!BattleManager._action) {
        return false;
    }

    // 省略タグを考慮（設定タグ）
    var settingTagNameSet = "(?:" + SETTING_TAG_NAME + ")";
    if (pShortSettingTagName) {
        settingTagNameSet = "(?:" + SETTING_TAG_NAME + "|" + pShortSettingTagName + ")";
    }

    // <D-Setting:*>を取得
    var settingStrArr = BattleManager._action.item().note.match("<" + settingTagNameSet + "\\s*:(.*)>");
    if (settingStrArr) {
        var settings = settingStrArr[1];
        // 『/』が入っていたら除去
        settings = settings.replace("/", "");

        var settingSplit = settings.split("&");

        // 前から順番に読み込む
        for (let i = 0; i < settingSplit.length; i++) {
            let setting = settingSplit[i].trim();
            // 大文字変換して比較
            if (setting.toUpperCase() == searchName.toUpperCase()) {
                return true;
            }
        }
    }
    return false;
}

/**
 * ●座標反転するかどうかを判定する。
 * 反転時は-1を返す。
 */
function getMirroring(battler) {
    if (battler && battler.isActor()) {
        return -1;
    }
    return 1;
}

/**
 * ●参照用のバトラーを取得する
 * ※バトラー本体かスプライトか？
 */
function getReferenceBattler(battler) {
    // 1:バトラー取得
    if (Nrp.pReferenceBattler == 1) {
        return battler;
    }
    // 0:スプライト取得
    return getBattlerSprite(battler);
}

/**
 * 指定したバトラーのスプライトを取得する。
 */
function getBattlerSprite(battler) {
    if (!battler) {
        return undefined;
    }

    var sprite;

    var actorSprites = BattleManager._spriteset._actorSprites;
    var enemySprites = BattleManager._spriteset._enemySprites;

    if (battler.isActor()) {
        for (var i = 0; i < actorSprites.length; i++) {
            var s = actorSprites[i];
            if (s._battler == battler) {
                sprite = s;
                break;
            }
        }

        // Sprite_Actorのサイズ設定
        setActorSpriteSize(sprite);
    } else {
        for (var i = 0; i < enemySprites.length; i++) {
            var s = enemySprites[i];
            if (s._battler == battler) {
                sprite = s;
                break;
            }
        }
    }

    return sprite;
}

/**
 * 指定したアクタースプライトのサイズを設定する。
 */
function setActorSpriteSize(sprite) {
    if (sprite._battler.isActor()) {
        // Sprite_Actorのサイズが取れないのでeffectTargetのものをセットする。
        // やや強引かも……。
        sprite.width = sprite._effectTarget.width;
        sprite.height = sprite._effectTarget.height;
    }
}

})();
