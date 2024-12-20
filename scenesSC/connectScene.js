import Phaser from 'phaser';
import WebFontLoader from 'webfontloader';
import SideBarBtn from './component/SideBarBtn';
import MissionBar from './component/MissionBar';
import { ScrollablePanel } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import linkedScene from './linkedScene';

export default class connectScene extends Phaser.Scene {
    constructor() {
        super('connectScene');
    }

    initialize() {
        Phaser.Scene.call(this, { key: 'connectScene' });
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
        const { width, height } = this.scale;
        //Background elements
        this.bg = this.add
            .image(0, 0, 'Bg')
            .setOrigin(0)
            .setDisplaySize(width, height);

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

        this.boxBlue = this.add
            .nineslice(width / 2, height / 2 - 30, 'boxBlue', 0, width * (350 / 430), 300, 10, 10, 10, 10)
            .setOrigin(0.5);

        this.icon = this.add
            .image(this.boxBlue.x, this.boxBlue.y - 50, 'telegramB');

        this.text1 = this.add.text(this.icon.x, this.icon.y + 110, 'WALLET CONNECTED', {
            fontFamily: 'Lexend',
            fontSize: '20px',
            fontStyle: 'bold'
        })
            .setOrigin(0.5);

        this.text2 = this.add.text(this.text1.x - 10, this.text1.y + 30, 'SUCCESSFULLY!', {
            fontFamily: 'Lexend',
            fontSize: '20px',
            fontStyle: 'bold'
        })
            .setOrigin(0.5);

        this.vIcon = this.add
            .image(this.text2.x + 85, this.text2.y, 'Vs')
            .setOrigin(0, 0.5);

        this.backBg = this.add
            .nineslice(this.boxBlue.x, this.boxBlue.y + 200, 'exBg', 0, width * (220 / 430), 50, 10, 10, 10, 10)
            .setOrigin(0.5)
            .setInteractive();

        this.backText = this.add.text(this.backBg.x, this.backBg.y, 'GO TO WALLET', {
            fontFamily: 'Lexend',
            fontSize: '20px',
            fontStyle: 'bold'
        })
            .setOrigin(0.5);

        const originalPosition = { x: this.backBg.x, y: this.backBg.y };
        const originalPositionText = { x: this.backText.x, y: this.backText.y };

        this.backBg.on('pointerdown', () => {
            this.tweens.add({
                targets: this.backBg,
                y: originalPosition.y + 5,
                yoyo: true,
                duration: 50,
                ease: 'Linear',
                onComplete: () => {
                    this.backBg.setPosition(originalPosition.x, originalPosition.y);
                    this.time.delayedCall(100, () => {
                        this.scene.run('linkedScene');
                    });
                }
            });
            this.tweens.add({
                targets: this.backText,
                y: originalPositionText.y + 5,
                yoyo: true,
                duration: 50,
                ease: 'Linear',
                onComplete: () => {
                    this.backText.setPosition(originalPositionText.x, originalPositionText.y);
                }
            });
        });
    }

    update() {
    }
}

