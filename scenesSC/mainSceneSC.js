import Phaser, { NONE } from 'phaser';
import WebFontLoader from 'webfontloader';
import IconContainer from './component/IconContainer';
import SideBarBtn from './component/SideBarBtn';
export default class mainSceneSC extends Phaser.Scene {
	constructor() {
		super('mainSceneSC');
	}

	initialize() {
		Phaser.Scene.call(this, { key: 'mainSceneSC' });
	}

	preload() {
	}
	create() {
		this.cameras.main.fadeIn(250, 0, 0, 0);

		const { width, height } = this.scale;
		console.log(width + " " + height + " ");

		//Background elements
		this.bg = this.add
			.image(0, 0, 'Bg')
			.setOrigin(0)
			.setDisplaySize(width, height);

		this.starBg = this.add
			.tileSprite(width / 2, height / 2, width, height, 'starBg')
			.setOrigin(0.5, 0.5);
		this.planet2 = this.add.image(width * (60 / 430), height * (740 / 932), 'planet2');

		this.comet1 = this.add.image(width * (245 / 430), height * (180 / 930), 'cometS');

		this.comet2 = this.add.image(width * (100 / 430), height * (320 / 932), 'cometS');

		this.comet3 = this.add.image(width * (380 / 430), this.comet2.y, 'cometB');

		this.comet4 = this.add.image(width * (65 / 430), height * (640 / 932), 'cometA');

		this.comet5 = this.add.image(width * (320 / 430), height * (686 / 932), 'cometS');

		this.sun = this.add
			.image(28, -100, 'sun')
			.setOrigin(0.5);

		this.planet1 = this.add.image(90, 130, 'planet1');

		this.ship = this.add
			.image(width / 2, height / 2, 'Ship');

		const shipOriginalPosition = { x: this.ship.x, y: this.ship.y };

		// this.light = this.add.image(width / 2, this.ship.y + 170, 'light')
		// 	.setVisible(false);
		// const lightOriginY = this.light.y;

		this.click = this.add.image(width / 2, this.ship.y + 140, 'click');

		this.clickText = this.add
			.text(this.click.x, this.click.y + 35, 'Shoot the spaceship', {
				fontSize: '15px',
			})
			.setOrigin(0.5);

		this.tweens.add({
			targets: this.click,
			alpha: 0,
			duration: 800,
			yoyo: true,
			repeat: -1
		})

		this.tweens.add({
			targets: this.clickText,
			alpha: 0,
			duration: 800,
			yoyo: true,
			repeat: -1
		})

		//Buttons
		this.claimBg = this.add.image(width * (365 / 430), height - 130, 'claimBg')
			.setInteractive()
			.setOrigin(0.5);

		this.claimText = this.add
			.text(this.claimBg.x, this.claimBg.y + 5, 'CLAIM', {
				fontSize: '20px',
			})
			.setOrigin(0.5);

		// Lưu vị trí ban đầu của nút
		const originalPosition = { x: this.claimBg.x, y: this.claimBg.y };
		const originalPositionText = { x: this.claimText.x, y: this.claimText.y };

		this.claimBg.on('pointerdown', () => {
			this.tweens.add({
				targets: this.claimBg,
				y: height - 127,
				yoyo: true,
				duration: 50,
				ease: 'Linear',
				onComplete: () => {
					this.claimBg.setPosition(originalPosition.x, originalPosition.y);
				}
			});
			this.tweens.add({
				targets: this.claimText,
				y: height - 122,
				yoyo: true,
				duration: 50,
				ease: 'Linear',
				onComplete: () => {
					this.claimText.setPosition(originalPositionText.x, originalPositionText.y);
				}
			});
		});

		this.coin = this.add
			.image(this.claimBg.x - 190, this.claimBg.y + 5, 'coin')
			.setOrigin(0.5, 0.5);

		this.hammerBtn = new IconContainer(this, width * (385 / 430), height * 6 / 9, 'hammerIcon', 'BtBg');
		this.bookBtn = new IconContainer(this, width * (385 / 430), height * 6 / 9 - 80, 'bookIcon', 'BtBg');
		this.rocketBtn = new IconContainer(this, width * (385 / 430), height * 6 / 9 - 160, 'rocketIcon', 'BtBg');


		this.smoke = this.add.image(20, 40, 'smoke');

		this.smokeUnder = this.add.image(this.smoke.x + 100, this.smoke.y + 10, 'smokeUnder');

		this.human = this.add.image(width - 150, 30, 'human');

		//Them Text
		this.smokeText = this.add
			.text(this.smokeUnder.x, this.smoke.y, 'THE CHAOS ERA', {
				fontSize: '15px',
			})
			.setOrigin(0.5);

		this.playerName = this.add
			.text(this.human.x + 80, this.human.y, 'Eroma3748738', {
				fontSize: '15px',
			})
			.setOrigin(0.5);

		this.speedText = this.add
			.text(width - 130, this.playerName.y + 35, 'Speed', {
				fontSize: '15px',
			})
			.setOrigin(0.5);

		this.speedN = 10;
		this.count = 0;
		this.speed = this.add
			.text(this.speedText.x, this.speedText.y + 20, this.speedN, {
				fontSize: '17px',
			})
			.setOrigin(0.5);

		this.speedUnit = this.add
			.text(this.speedText.x, this.speed.y + 20, 'lightyears/shoot', {
				fontSize: '10px',
			})
			.setOrigin(0.5);

		this.tokensText = this.add
			.text(this.speedText.x + 80, this.speedText.y, 'Tokens', {
				fontSize: '15px',
			})
			.setOrigin(0.5);

		this.tokenM = 0;
		this.token = this.add
			.text(this.tokensText.x + 5, this.speed.y, this.tokenM, {
				fontSize: '17px',
			})
			.setOrigin(1, 0.5);

		this.time.addEvent({
			delay: 1000,
			callback: () => {
				this.tokenM += 1;
				this.token.setText(this.tokenM);
			},
			loop: true
		});

		this.coinC = this.add.image(this.token.x + 1, this.token.y, 'coinC')
			.setOrigin(0, 0.5);

		this.travelMil = 1000000000;

		this.oneMil = this.add
			.text(width / 2, height * (236 / 932), this.travelMil.toLocaleString('en-CA'), {
				fontSize: '30px',
			})
			.setOrigin(0.5);

		this.time.addEvent({
			delay: 500,
			callback: () => {
				this.travelMil += 1;
				this.oneMil.setText(this.travelMil.toLocaleString('en-CA'));
			},
			loop: true
		});

		this.LT = this.add
			.text(width / 2, height * (266 / 932), 'LIGHTYEARS TRAVELLED', {
				fontSize: '15px',

			})
			.setOrigin(0.5);

		this.money = 0;
		this.coinText = this.add
			.text(this.coin.x + 70, this.claimText.y, this.money + ' BLX', {
				fontSize: '18px',
			})
			.setOrigin(0.5);

		this.equipmentText = this.add
			.text(width * (385 / 430) - 10, height * 6 / 9 - 220, 'Equipment', {
				fontSize: '17px',
			})
			.setOrigin(0.5);

		this.energyLeftText = this.add
			.text(width * (25 / 430), this.equipmentText.y - 6, 'Energy left', {
				fontSize: '17px',

			})
			.setOrigin(0, 0);

		this.energyLeft = 10;
		this.energyText = this.add
			.text(this.energyLeftText.x, this.energyLeftText.y + 20, this.energyLeft, {
				fontSize: '35px',

			})
			.setOrigin(0, 0);

		this.time.addEvent({
			delay: 10000,
			callback: () => {
				this.energyLeft += 1;
				this.energyText.setText(this.energyLeft);
				if (this.energyLeft > 0) {
					this.energyText.setColor('#7a70fa')
				}
			},
			loop: true
		});

		const eTOriginalPosition = { x: this.energyText.x, y: this.energyText.y };

		this.shootsText = this.add
			.text(this.energyText.x, this.energyText.y + 40, 'Shoots', {
				fontSize: '10px',

			})
			.setOrigin(0, 0);

		//ship anims
		this.ship.setInteractive();
		let isAnimating = false;

		this.ship.on('pointerdown', () => {
			if (isAnimating) return;

			if (this.energyLeft > 0) {

				const previousEnergy = this.energyLeft;
				this.energyText.setText(previousEnergy - 1);

				if (previousEnergy - 1 === 0) {
					this.energyText.setColor('#fc0303');
				}


				isAnimating = true;
				this.count += 1;

				if (this.count % 5 == 0) {
					this.speedN += 10;
					this.speed.setText(this.speedN)
				}

				console.log(this.count);
				this.createReward(5, shipOriginalPosition.x, shipOriginalPosition.y);
				this.click.setVisible(false);
				this.clickText.setVisible(false);
				this.time.delayedCall(2500, () => {
					this.increaseMoney(5);

				})
				this.increaseScore(this.speedN);
				this.tweens.add({
					targets: this.ship,
					y: this.ship.y + 20,
					yoyo: true,
					duration: 200,
					ease: 'Linear',
					onComplete: () => {
						this.energyLeft -= 1;
						this.click.setVisible(true);
						this.clickText.setVisible(true);

						if (this.energyLeft === 0) {
							console.log('Hết năng lượng, tàu không còn tạo hiệu ứng!');
							this.ship.on('pointerdown', () => {
								this.tweens.add({
									targets: this.energyText,
									x: { from: eTOriginalPosition.x - 2, to: eTOriginalPosition.x + 2 },
									duration: 50,
									yoyo: true,
									onComplete: () => {
										this.energyText.setPosition(eTOriginalPosition.x, eTOriginalPosition.y)
									}
								});
							})
						}

						this.ship.setPosition(shipOriginalPosition.x, shipOriginalPosition.y);
						isAnimating = false;
					}
				});
			}
		});

		this.ship.on('pointerout', () => {
			this.ship.setPosition(shipOriginalPosition.x, shipOriginalPosition.y);
		});

		//Load Font và setFont
		WebFontLoader.load({
			google: {
				families: ['Lexend']
			},
			custom: {
				families: ['Warpen'],
				urls: ['./static/fonts/Warpen.ttf']
			},
			active: () => {
				this.smokeText.setFontFamily('Warpen');
				this.oneMil.setFontFamily('Warpen');
				this.LT.setFontFamily('Warpen').setColor('#fc9003');
				this.playerName.setFontFamily('Lexend').setColor('#b1abff').setFontStyle('bold');
				this.speedText.setFontFamily('Lexend').setColor('#6459f7').setFontStyle('bold');
				this.tokensText.setFontFamily('Lexend').setColor('#6459f7').setFontStyle('bold');
				this.speed.setFontFamily('Lexend').setColor('#fc9003').setFontStyle('bold');
				this.token.setFontFamily('Lexend').setColor('#fc9003').setFontStyle('bold');
				this.speedUnit.setFontFamily('Lexend');
				this.energyLeftText.setFontFamily('Lexend').setColor('#6459f7').setFontStyle('bold');
				this.energyText.setFontFamily('Lexend').setColor('#7a70fa').setFontStyle('bolder');
				this.shootsText.setFontFamily('Lexend').setColor('#6459f7').setFontStyle('bold');
				this.equipmentText.setFontFamily('Lexend').setColor('#6459f7').setFontStyle('bold');
				this.clickText.setFontFamily('Lexend').setFontStyle('bold');
				this.coinText.setFontFamily('Lexend').setFontStyle('bold');
				this.claimText.setFontFamily('Lexend').setFontStyle('bold');

				let buttons = [];
				//Button 1
				this.leftBar = new SideBarBtn(this, width * (4 / 430), height, width * (106 / 430), 100, 'leftBar', 'leftBarYel', 'play', 'playYel', buttons, 'mainSceneSC', 'on');
				console.log(this.leftBar);

				//Button 2
				this.midBar1 = new SideBarBtn(this, width * (109 / 430), height, width * (106 / 430), 100, 'midBar', 'midBarYel', 'task', 'taskYel', buttons, 'TaskScene', 'off');

				//Button 3	
				this.midBar2 = new SideBarBtn(this, width * (214 / 430), height, width * (106 / 430), 100, 'midBar', 'midBarYel', 'friends', 'friendsYel', buttons, 'FriendsScene', 'off');

				//Button 4
				this.rightBar = new SideBarBtn(this, width * (319 / 430), height, width * (106 / 430), 100, 'rightBar', 'rightBarYel', 'wallet', 'walletYel', buttons, 'WalletScene', 'off');

				this.downBar = this.add
					.nineslice(width * (4 / 430), height, 'a5', 0, width * (421 / 430), 0, 10, 10)
					.setOrigin(0, 1);
			}
		});


	}

	createReward(maxParticle, x, y) {
		if (maxParticle == 0) {
			return;
		}

		const emitter = this.add.particles(x, y, 'coin', {
			bounce: 0.5,
			speed: { min: 600, max: 700 },
			maxVelocityX: 1200,
			maxVelocityY: 1200,
			angle: { min: -100, max: -80 },
			rotate: { min: 100, max: -80 },
			gravityY: 1600,
			lifespan: 4000,
			maxParticles: Math.min(maxParticle, 10),
			sortProperty: 'lifeT',
			sortOrderAsc: true,
		});

		emitter.addParticleBounds(0, 0, 700, y + 200, false, false, false, true);

		this.time.addEvent({
			callback: function () {
				emitter.gravityY = 0;
				const well = emitter.createGravityWell({
					x: -190,
					y: -650,
					power: 10,
					epsilon: 10,
					gravity: 1600,
				});
			},
			callbackScope: this,
			delay: 2000, // 1000 = 1 second
			loop: false,
		});
	}

	moveComet(comet, speed) {
		const { width, height } = this.scale;
		comet.y += speed;
		comet.setOrigin(0.5, 1);
		if (comet.y > height) {
			this.resetCometPos(comet);
			comet.setOrigin(0.5, 0);
		}
	}

	resetCometPos(comet) {
		const { width, height } = this.scale;
		comet.y = 0;
		var randomX = Phaser.Math.Between(0, width);
		comet.x = randomX;
	}

	increaseScore(targetScore) {
		this.tweens.addCounter({
			from: this.travelMil,
			to: this.travelMil + targetScore,
			duration: 400,
			ease: 'Linear',
			onUpdate: (tweens) => {
				this.travelMil = Math.round(tweens.getValue());
				this.oneMil.setText(this.travelMil.toLocaleString('en-CA'));
			}
		});
	}

	increaseMoney(targetMoney) {
		this.tweens.addCounter({
			from: this.money,
			to: this.money + targetMoney,
			duration: 500,
			ease: 'Linear',
			onUpdate: (tweens) => {
				this.money = Math.round(tweens.getValue());
				this.coinText.setText(this.money + ' BLX');
			}
		});
	}

	update() {
		this.starBg.tilePositionY -= 1;

		this.moveComet(this.comet1, 1);
		this.moveComet(this.comet2, 1);
		this.moveComet(this.comet5, 1);
		this.moveComet(this.comet3, 1);
		this.moveComet(this.comet4, 1);
		this.moveComet(this.planet2, 1);

	}
}