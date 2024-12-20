
export default class PreloaderSC extends Phaser.Scene {
	constructor() {
		super('PreloaderSC');
	}

	preload() {
		//new assets for SpaceCraft
		this.load.setPath('./assets');

		//mainScene
		this.load.image('Bg', 'Bg1.png');
		this.load.image('starBg', 'starBg1a.png');
		this.load.image('sun', 'sun1.png');
		this.load.image('planet1', 'planet1a.png');
		this.load.image('planet2', 'planet2a.png');
		this.load.image('Ship', 'Ship1.png');
		this.load.image('light', 'light.png');

		this.load.image('BtBg', 'BtBg.png');

		this.load.image('bar', 'bar.png');

		//Down Bar
		this.load.image('leftBar', 'leftBar.png'); //left
		this.load.image('leftBarYel', 'leftBarYel.png'); //leftYel

		this.load.image('midBar', 'midBar.png'); //mid
		this.load.image('midBarYel', 'midBarYel.png'); //midYel

		this.load.image('rightBar', 'rightBar.png'); //right
		this.load.image('rightBarYel', 'rightBarYel.png'); //rightYel

		this.load.image('a5', 'Asset5.png'); //down border

		this.load.image('rocketIcon', 'rocketIcon.png');
		this.load.image('bookIcon', 'bookIcon.png');
		this.load.image('hammerIcon', 'hammerIcon.png');

		this.load.image('claimBg', 'claimBg1.png');

		this.load.image('coin', 'coin.png');
		this.load.image('click', 'click1.png');
		this.load.image('smoke', 'smoke1.png');
		this.load.image('smokeUnder', 'smokeUnder1.png');
		this.load.image('human', 'human1.png');
		this.load.image('coinC', 'coinC1.png');

		this.load.image('play', 'play1.png');
		this.load.image('playYel', 'playYellow1.png');

		this.load.image('task', 'task1.png');
		this.load.image('taskYel', 'taskYellow.png');

		this.load.image('friends', 'friends1.png');
		this.load.image('friendsYel', 'friendYellow1.png');

		this.load.image('wallet', 'wallet1.png');
		this.load.image('walletYel', 'walletYellow.png');

		this.load.image('border', 'border1.png');
		this.load.image('cometS', 'cometS.png');
		this.load.image('cometA', 'cometA.png');
		this.load.image('cometB', 'cometB.png');

		//Task scene
		this.load.image('Bg2', 'Bg2.png');
		this.load.image('settingIcon', 'settingIcon.png');
		this.load.image('backIcon', 'backIcon.png');
		this.load.image('leftMenu', 'leftMenu.png');
		this.load.image('leftMenuYel', 'leftMenuYel.png');

		this.load.image('rightMenu', 'rightMenu.png');
		this.load.image('rightMenuYel', 'rightMenuYel.png');
		this.load.image('missionBg', 'missionBg.png');
		this.load.image('X', 'X.png');
		this.load.image('V', 'V.png');
		this.load.image('Vs', 'Vs.png');


		this.load.image('progressBar', 'progressBar.png');
		this.load.image('collectBgAfter', 'collectBgAfter.png');
		this.load.image('collectBg', 'collectBg.png');

		//Friends scene
		this.load.image('Bg3', 'Bg3.png');
		this.load.image('blueBar', 'blueBar.png');
		this.load.image('purpleBar', 'purpleBar.png');
		this.load.image('redBar', 'redBar.png');

		this.load.image('iconBlue', 'iconBlue.png');
		this.load.image('iconPurple', 'iconPurple.png');
		this.load.image('iconRed', 'iconRed.png');

		this.load.image('rankBg', 'rankBg.png');

		this.load.image('telegram', 'telegram.png');
		this.load.image('telegramB', 'telegramB.png');

		this.load.image('google', 'google.png');
		this.load.image('facebook', 'facebook.png');

		this.load.image('yellowRank', 'yellowRank.png');
		this.load.image('yellowNum', 'yellowNum.png');

		this.load.image('pinkRank', 'pinkRank.png');
		this.load.image('pinkNum', 'pinkNum.png');

		this.load.image('greenRank', 'greenRank.png');
		this.load.image('greenNum', 'greenNum.png');

		this.load.image('ship1a', 'ship1a.png');
		this.load.image('ship2', 'ship2.png');
		this.load.image('ship3', 'ship3.png');

		this.load.image('greenNum', 'greenNum.png');
		this.load.image('greenNum', 'greenNum.png');

		this.load.image('p1', 'p1.png');
		this.load.image('p2', 'p2.png');
		this.load.image('p3', 'p3.png');
		this.load.image('p4', 'p4.png');
		this.load.image('p5', 'p5.png');
		this.load.image('p6', 'p6.png');
		this.load.image('p7', 'p7.png');
		this.load.image('p8', 'p8.png');
		this.load.image('p9', 'p9.png');
		this.load.image('p10', 'p10.png');
		this.load.image('p11', 'p11.png');

		//Wallet Scene
		this.load.image('Bg4', 'Bg4.png');
		this.load.image('walPur', 'walPur.png');
		this.load.image('walBlue', 'walBlue.png');

		this.load.image('coinCB', 'coinCB.png');
		this.load.image('exBg', 'exBg.png');
		this.load.image('telegram1', 'telegram1.png');
		this.load.image('humanBlue', 'humanBlue.png');
		this.load.image('disconnect', 'disconnect.png');
		this.load.image('send', 'send.png');
		this.load.image('receive', 'receive.png');

		//Connect Scene
		this.load.image('boxBlue', 'boxBlue.png');

		//Linked Scene
		this.load.image('moneyIcon', 'moneyIcon.png');
		this.load.image('lameBg', 'lameBg.png');
		this.load.image('copy', 'copy.png');
	}

	create() {
	}

	update() {
		this.scene.start('mainSceneSC');
	}
}
