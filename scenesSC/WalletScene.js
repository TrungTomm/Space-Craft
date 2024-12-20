import Phaser from 'phaser';
import WebFontLoader from 'webfontloader';
import SideBarBtn from './component/SideBarBtn';
import MissionBar from './component/MissionBar';
import { ScrollablePanel } from 'phaser3-rex-plugins/templates/ui/ui-components.js';

export default class WalletScene extends Phaser.Scene {
    constructor() {
        super('WalletScene');
    }

    initialize() {
        Phaser.Scene.call(this, { key: 'WalletScene' });
    }

    preload() {
    }

    create() {
        WebFontLoader.load({
            google: {
                families: ['Lexend']
            },
            custom: {
                families: ['Warpen'],
                urls: ['./static/fonts/Warpen.ttf']
            },
            active: () => {
                this.popultedScene();
            }
        })
    }

    popultedScene() {
        this.cameras.main.fadeIn(250, 0, 0, 0); 

        const { width, height } = this.scale;
        //Background elements
        this.bg1 = this.add
            .image(0, 0, 'Bg')
            .setOrigin(0)
            .setDisplaySize(width, height);

        this.bg2 = this.add
            .image(0, 0, 'Bg4')
            .setOrigin(0)
            .setDisplaySize(width, height)
            .setAlpha(0);

        this.backIcon = this.add
            .image(20, 40, 'backIcon')
            .setInteractive()
            .setOrigin(0, 0.5);

        const backIconOriginalPosition = { x: this.backIcon.x, y: this.backIcon.y };

        this.backIcon.on('pointerdown', () => {
            this.tweens.add({
                targets: this.backIcon,
                y: this.backIcon.y + 5,
                duration: 100,
                yoyo: true,
                ease: 'Linear',
                onComplete: () => {
                    this.backIcon.setPosition(backIconOriginalPosition.x, backIconOriginalPosition.y);
                    this.time.delayedCall(200, () => {
                        this.scene.start('mainSceneSC');
                    })
                }
            })

        });

        this.settingIcon = this.add
            .image(width - 20, 40, 'settingIcon')
            .setInteractive()
            .setOrigin(1, 0.5);

        this.title = this.add.text(width / 2, 45, 'BLOCK VOYAGE', {
            fontSize: '25px',
            color: '#ffffff',
            fontFamily: 'Warpen'
        })
            .setOrigin(0.5);

        //leftMenu
        this.leftMenuYel = this.add
            .nineslice(width / 2, this.title.y + 90, 'leftMenuYel', 0, width * (200 / 430), 0, 30, 10)
            .setInteractive()
            .setOrigin(1, 1);

        this.leftMenu = this.add
            .nineslice(width / 2, this.title.y + 90, 'leftMenu', 0, width * (200 / 430), 0, 30, 10)
            .setAlpha(0)
            .setInteractive()
            .setOrigin(1, 1);

        this.leftMenuText = this.add.text(width / 4 + 10, this.leftMenu.y - 20, 'TOKEN', {
            fontSize: '17px',
            color: '#fc9003',
            fontFamily: 'Warpen'
        })
            .setOrigin(0.5);

        this.leftMenu.on('pointerdown', () => {
            this.disableMenuBtn(this.rightMenu, this.rightMenuYel, this.rightMenuText);
            this.tweens.add({
                targets: this.leftMenu,
                alpha: 0,
                duration: 400
            });
            this.tweens.add({
                targets: this.leftMenuYel,
                alpha: 1,
                duration: 400
            });
            this.leftMenuText.setColor('#fc9003');
            this.tweens.add({
                targets: this.bg1,
                alpha: 1,
                duration: 400
            })
            this.tweens.add({
                targets: this.bg2,
                alpha: 0,
                duration: 400
            })
            this.tweens.add({
                targets: this.container1,
                alpha: 1,
                duration: 400
            })
            this.tweens.add({
                targets: this.container2,
                alpha: 0,
                duration: 400
            })
        });

        //rightMenu
        this.rightMenu = this.add
            .nineslice(width / 2, this.title.y + 90, 'rightMenu', 0, width * (200 / 430), 0, 10, 30)
            .setInteractive()
            .setOrigin(0, 1);

        this.rightMenuYel = this.add
            .nineslice(width / 2, this.title.y + 90, 'rightMenuYel', 0, width * (200 / 430), 0, 10, 30)
            .setAlpha(0)
            .setInteractive()
            .setOrigin(0, 1);

        this.rightMenuText = this.add.text(width * 3 / 4 - 10, this.rightMenu.y - 20, 'TON WALLET', {
            fontSize: '17px',
            color: '#ffffff',
            fontFamily: 'Warpen'

        })
            .setOrigin(0.5);

        this.rightMenu.on('pointerdown', () => {
            this.disableMenuBtn(this.leftMenu, this.leftMenuYel, this.leftMenuText);
            this.tweens.add({
                targets: this.rightMenu,
                alpha: 0,
                duration: 400
            });
            this.tweens.add({
                targets: this.rightMenuYel,
                alpha: 1,
                duration: 400
            });
            this.rightMenuText.setColor('#fc9003');
            this.tweens.add({
                targets: this.bg1,
                alpha: 0,
                duration: 400
            })
            this.tweens.add({
                targets: this.bg2,
                alpha: 1,
                duration: 400
            })
            this.tweens.add({
                targets: this.container1,
                alpha: 0,
                duration: 400
            })
            this.tweens.add({
                targets: this.container2,
                alpha: 1,
                duration: 400
            })
        });

        //SideBar
        let buttons = [];
        //Button 1
        this.leftBar = new SideBarBtn(this, width * (4 / 430), height, width * (106 / 430), 100, 'leftBar', 'leftBarYel', 'play', 'playYel', buttons, 'mainSceneSC', 'off');

        //Button 2
        this.midBar1 = new SideBarBtn(this, width * (109 / 430), height, width * (106 / 430), 100, 'midBar', 'midBarYel', 'task', 'taskYel', buttons, 'TaskScene', 'off');

        //Button 3	
        this.midBar2 = new SideBarBtn(this, width * (214 / 430), height, width * (106 / 430), 100, 'midBar', 'midBarYel', 'friends', 'friendsYel', buttons, 'FriendsScene', 'off');

        //Button 4
        this.rightBar = new SideBarBtn(this, width * (319 / 430), height, width * (106 / 430), 100, 'rightBar', 'rightBarYel', 'wallet', 'walletYel', buttons, 'WalletScene', 'on');

        this.downBar = this.add
            .nineslice(width * (4 / 430), height, 'a5', 0, width * (421 / 430), 0, 10, 10)
            .setOrigin(0, 1);

        //container1
        this.container1 = this.add.container();

        this.playerName1 = this.add
            .text(width / 2 + 20, this.rightMenu.y + 30, 'PlayerName', {
                fontFamily: 'Lexend',
                fontSize: '20px'
            })
            .setOrigin(0.5, 0.5);

        this.icon = this.add
            .image(this.playerName1.x - 70, this.playerName1.y - 20, 'human')
            .setOrigin(1, 0);

        this.walPur = this.add
            .image(width / 2, height / 2, 'walPur')
            .setOrigin(0.5);

        this.money = this.add.text(width / 2 - 30, this.walPur.y + 140, 'MONEY', {
            fontFamily: 'Lexend',
            fontSize: '35px',
            fontStyle: 'bold',
            color: '#fc9003'
        })
            .setOrigin(0.5);

        this.coinIcon = this.add.image(this.money.x + 70, this.money.y, 'coinCB')
            .setOrigin(0, 0.5);

        this.exBg = this.add
            .nineslice(width / 2, height - 115, 'exBg', 0, width * (300 / 430), 50, 10, 10, 10, 10)
            .setOrigin(0.5, 1)
            .setInteractive();

        this.exIcon = this.add
            .image(this.exBg.x + width * (120 / 430), this.exBg.y - 5, 'telegram1')
            .setOrigin(0.5, 1);

        this.exText = this.add.text(this.exBg.x - 20, this.exBg.y - 13, 'EXCHANGE TO TONS', {
            fontFamily: 'Lexend',
            fontSize: '20px',
            fontStyle: 'bold'
        })
            .setOrigin(0.5, 1)

        const originalPosition = { x: this.exBg.x, y: this.exBg.y };
        const originalPositionText = { x: this.exText.x, y: this.exText.y };
        const originalPositionicon = { x: this.exIcon.x, y: this.exIcon.y };

        this.exBg.on('pointerdown', () => {
            this.tweens.add({
                targets: this.exBg,
                y: originalPosition.y + 5,
                yoyo: true,
                duration: 50,
                ease: 'Linear',
                onComplete: () => {
                    this.exBg.setPosition(originalPosition.x, originalPosition.y);
                }
            });
            this.tweens.add({
                targets: this.exText,
                y: originalPositionText.y + 5,
                yoyo: true,
                duration: 50,
                ease: 'Linear',
                onComplete: () => {
                    this.exText.setPosition(originalPositionText.x, originalPositionText.y);
                }
            });
            this.tweens.add({
                targets: this.exIcon,
                y: originalPositionicon.y + 5,
                yoyo: true,
                duration: 50,
                ease: 'Linear',
                onComplete: () => {
                    this.exIcon.setPosition(originalPositionicon.x, originalPositionicon.y);
                }
            })

        });
        this.container1.add([this.playerName1, this.icon, this.walPur, this.money, this.coinIcon, this.exBg, this.exIcon, this.exText])

        //container2
        this.container2 = this.add.container();

        this.receiveText = this.add.text(width / 2, height - width * (120 / 430), 'Receive', {
            fontFamily: 'Lexend',
            fontSize: '20px'
        })
            .setOrigin(0.5, 1);

        this.receive = this.add
            .image(width / 2, this.receiveText.y - 30, 'receive')
            .setOrigin(0.5, 1);

        this.sendText = this.add.text(this.receiveText.x - width * (140 / 430), this.receiveText.y, 'Send', {
            fontFamily: 'Lexend',
            fontSize: '20px'
        })
            .setOrigin(0.5, 1);

        this.send = this.add
            .image(this.sendText.x, this.sendText.y - 30, 'send')
            .setOrigin(0.5, 1);

        this.disconnectText = this.add.text(this.receiveText.x + width * (140 / 430), this.receiveText.y, 'Disconnect', {
            fontFamily: 'Lexend',
            fontSize: '20px'
        })
            .setOrigin(0.5, 1);

        this.disconnect = this.add
            .image(this.disconnectText.x, this.disconnectText.y - 30, 'disconnect')
            .setOrigin(0.5, 1);

        this.connectText = this.add.text(width / 2, this.receive.y - width * (90 / 430), 'Connect your Wallet to receive BLX Airdrop', {
            fontFamily: 'Lexend',
            fontSize: '15px'
        })
            .setOrigin(0.5, 1);

        this.linkBg = this.add
            .nineslice(width / 2, this.connectText.y - width * (30 / 430), 'exBg', 0, width * (300 / 430), 50, 10, 10, 10, 10)
            .setOrigin(0.5, 1)
            .setInteractive();

        this.linkText = this.add.text(width / 2, this.linkBg.y - 13, 'Link ton wallet', {
            fontFamily: 'Warpen',
            fontSize: '20px'
        })
            .setOrigin(0.5, 1);
        this.playerName2 = this.add
            .text(width / 2 + 20, this.rightMenu.y + 30, 'PlayerName', {
                fontFamily: 'Lexend',
                fontSize: '20px'
            })
            .setOrigin(0.5, 0.5);

        this.iconBlue = this.add
            .image(this.playerName2.x - 70, this.playerName2.y - 20, 'humanBlue')
            .setOrigin(1, 0);

        this.walBlue = this.add
            .image(width / 2, height / 2 + 30, 'walBlue')
            .setOrigin(0.5, 1);

        const originalPosition1 = { x: this.linkBg.x, y: this.linkBg.y };
        const originalPositionText1 = { x: this.linkText.x, y: this.linkText.y };

        this.linkBg.on('pointerdown', () => {
            this.tweens.add({
                targets: this.linkBg,
                y: originalPosition1.y + 5,
                yoyo: true,
                duration: 50,
                ease: 'Linear',
                onComplete: () => {
                    this.linkBg.setPosition(originalPosition1.x, originalPosition1.y);
                    this.time.delayedCall( 100, () => {
                        this.scene.start('connectScene');
                    })
                }
            });
            this.tweens.add({
                targets: this.linkText,
                y: originalPositionText1.y + 5,
                yoyo: true,
                duration: 50,
                ease: 'Linear',
                onComplete: () => {
                    this.linkText.setPosition(originalPositionText1.x, originalPositionText1.y);
                }
            });
        });
        this.container2.add([this.iconBlue, this.walBlue, this.playerName2, this.receiveText, this.sendText, this.disconnectText, this.receive, this.send, this.disconnect, this.linkBg, this.linkText, this.connectText]);
        this.container2.setAlpha(0);
    }

    disableMenuBtn(defaultTexture, activeTexture, text) {
        this.tweens.add({
            targets: activeTexture,
            alpha: 0,
            duration: 500
        })
        this.tweens.add({
            targets: defaultTexture,
            alpha: 1,
            duration: 500
        })
        text.setColor('#ffffff')
    }

    update() {
    }
}

