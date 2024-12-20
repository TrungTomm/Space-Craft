import Phaser from 'phaser';
import WebFontLoader from 'webfontloader';
import SideBarBtn from './component/SideBarBtn';
import MissionBar from './component/MissionBar';
import { ScrollablePanel } from 'phaser3-rex-plugins/templates/ui/ui-components.js';

export default class FriendsScene extends Phaser.Scene {
    constructor() {
        super('FriendsScene');
    }

    initialize() {
        Phaser.Scene.call(this, { key: 'FriendsScene' });
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
        this.bg = this.add
            .image(0, 0, 'Bg3')
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

        this.title = this.add.text(width / 2, 45, 'Friends', {
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

        this.leftMenuText = this.add.text(width / 4 + 10, this.leftMenu.y - 20, 'Your Squad', {
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
                targets: this.panel1,
                alpha: 1,
                duration: 400
            })
            this.tweens.add({
                targets: this.panel2,
                alpha: 0,
                duration: 400
            })
            this.tweens.add({
                targets: this.headerContainer,
                alpha: 0,
                duration: 400
            })
            this.tweens.add({
                targets: this.footerContainer,
                alpha: 1,
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

        this.rightMenuText = this.add.text(width * 3 / 4 - 10, this.rightMenu.y - 20, 'LeaderBoard', {
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
                targets: this.panel2,
                alpha: 1,
                duration: 400
            })
            this.tweens.add({
                targets: this.headerContainer,
                alpha: 1,
                duration: 400
            })
            this.tweens.add({
                targets: this.panel1,
                alpha: 0,
                duration: 400
            })
            this.tweens.add({
                targets: this.footerContainer,
                alpha: 0,
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
        this.midBar2 = new SideBarBtn(this, width * (214 / 430), height, width * (106 / 430), 100, 'midBar', 'midBarYel', 'friends', 'friendsYel', buttons, 'FriendsScene', 'on');

        //Button 4
        this.rightBar = new SideBarBtn(this, width * (319 / 430), height, width * (106 / 430), 100, 'rightBar', 'rightBarYel', 'wallet', 'walletYel', buttons, 'WalletScene', 'off');

        this.downBar = this.add
            .nineslice(width * (4 / 430), height, 'a5', 0, width * (421 / 430), 0, 10, 10)
            .setOrigin(0, 1);

        //Panel footer
        this.footerContainer = this.add.container();

        this.google = this.add
            .image(width / 2, height - 120, 'google')
            .setOrigin(0.5, 1);

        this.facebook = this.add
            .image(this.google.x - 70, this.google.y, 'facebook')
            .setOrigin(0.5, 1);

        this.telegram = this.add
            .image(this.google.x + 70, this.google.y, 'telegram')
            .setOrigin(0.5, 1);

        this.inviteTextUnder = this.add
            .text(width / 2 - width * (40 / 430), this.google.y - 65, 'INVITE 1 FRIEND', {
                fontFamily: 'Lexend',
                fontSize: '22px',
                fontStyle: 'bold'
            })
            .setOrigin(0.5, 1);

        this.intRewText = this.add
            .text(this.inviteTextUnder.x + 130, this.inviteTextUnder.y + 2, '+100 ', {
                fontFamily: 'Lexend',
                fontSize: '25px',
                color: '#fc9003',
                fontStyle: 'bold'
            })
            .setOrigin(0.5, 1);

        this.rewardCoin = this.add
            .image(this.intRewText.x + 41, this.intRewText.y - 3, 'coinC')
            .setOrigin(0.5, 1);

        this.inviteBg = this.add
            .nineslice(width / 2, this.inviteTextUnder.y - 80, 'claimBg', 0, width * (350 / 430), 70, 15, 15, 15, 15)
            .setOrigin(0.5)
            .setInteractive();

        this.inviteText = this.add
            .text(width / 2, this.inviteBg.y + 5, 'INVITE YOUR FRIENDS', {
                fontFamily: 'Lexend',
                fontStyle: 'bold',
                fontSize: '25px'
            })
            .setOrigin(0.5);

        const originalPosition = { x: this.inviteBg.x, y: this.inviteBg.y };
        const originalPositionText = { x: this.inviteText.x, y: this.inviteText.y };

        this.inviteBg.on('pointerdown', () => {
            this.tweens.add({
                targets: this.inviteBg,
                y: originalPosition.y + 5,
                yoyo: true,
                duration: 50,
                ease: 'Linear',
                onComplete: () => {
                    this.inviteBg.setPosition(originalPosition.x, originalPosition.y);
                }
            });
            this.tweens.add({
                targets: this.inviteText,
                y: originalPositionText.y + 5,
                yoyo: true,
                duration: 50,
                ease: 'Linear',
                onComplete: () => {
                    this.inviteText.setPosition(originalPositionText.x, originalPositionText.y);
                }
            });
        });

        this.footerContainer.add([this.google, this.telegram, this.facebook, this.intRewText, this.inviteTextUnder, this.inviteBg, this.inviteText, this.rewardCoin])
        this.footerContainer.setAlpha(1);

        //Image Array
        const ps = [];
        const i = 1
        for (let i = 1; i < 12; i++) {
            ps.push('p' + i.toString());
            // console.log(ps[i - 1]);
        }

        //Your Squad Scrollable Panel Container
        let container1 = this.add.container();
        let container1Height = 0;
        for (let i = 0; i < 7; i++) {

            let iconBg = this.add
                .image(width * (65 / 430), i * 80 + 40, 'iconBlue')
                .setOrigin(0.5);

            let friendBar = this.add.nineslice(iconBg.x + width * (50 / 430), iconBg.y, 'blueBar', 0, width * (300 / 430), 80, 15, 15, 15, 15)
                .setOrigin(0, 0.5);

            container1Height = friendBar.y + 80;

            let playerName = this.add
                .text(friendBar.x + width * (70 / 430), iconBg.y, 'PlayerName', {
                    fontSize: '17px',
                    fontFamily: 'Lexend',
                    color: '#B3F8FF'
                })
                .setOrigin(0.5);

            let rankBg = this.add
                .image(friendBar.x + width * (40 / 430), friendBar.y, 'rankBg')
                .setAlpha(0);

            let rankText = this.add
                .text(rankBg.x, rankBg.y - 7, 'TOP', {
                    fontFamily: 'Warpen',
                    fontSize: '8px'
                })
                .setOrigin(0.5)
                .setAlpha(0);

            let rankNum = this.add
                .text(rankText.x, rankText.y + 14, '82', {
                    fontFamily: 'Warpen',
                    fontSize: '13px'
                })
                .setOrigin(0.5)
                .setAlpha(0);

            if (i == 0) {
                playerName.setX(friendBar.x + width * (120 / 430));
                rankBg.setAlpha(1);
                rankText.setAlpha(1);
                rankNum.setAlpha(1)
            }

            if (i == 1) {
                iconBg.setTexture('iconPurple');
                friendBar.setTexture('purpleBar');
                playerName.setColor('#F8B6FF')
            }

            let rewardIcon = this.add
                .image(friendBar.x + width * (270 / 430), iconBg.y, 'coinC')
                .setOrigin(0.5);

            let rewardNum = this.add
                .text(rewardIcon.x - 15, rewardIcon.y, '20000', {
                    fontFamily: 'Lexend',
                    fontSize: '20px',
                    color: '#fc9003',
                    fontStyle: 'bold'
                })
                .setOrigin(1, 0.5);

            let pImg = this.add.image(iconBg.x, iconBg.y, this.getRandomImage(ps));

            container1.add([friendBar, iconBg, playerName, rankBg, rewardIcon, rewardNum, rankText, rankNum, pImg])
        }

        container1.setSize(width, container1Height - 40);
        const panelHeight = (this.inviteTextUnder.y - 80 - 40) - (this.rightMenu.y + 10)

        this.panel1 = this.rexUI.add.scrollablePanel({
            x: width / 2,
            y: this.rightMenu.y + 10 + (panelHeight / 2),
            height: panelHeight,
            scrollMode: 0,
            panel: {
                child: container1,
                mask: {
                    padding: 0,
                },
            },

            mouseWheelScroller: {
                focus: true,
                speed: 1,
            },
        })
            .layout()
            .setAlpha(1)

        //Header container
        this.headerContainer = this.add.container();

        this.yellowRank = this.add
            .image(width / 2, this.leftMenu.y + 100, 'yellowRank')
            .setOrigin(0.5, 0.5);

        this.ship1 = this.add.image(this.yellowRank.x, this.yellowRank.y - 10, 'ship1a');

        this.yellowNum = this.add
            .image(this.yellowRank.x, this.yellowRank.y + 70, 'yellowNum')
            .setOrigin(0.5);

        this.rank1 = this.add.text(this.yellowNum.x, this.yellowNum.y, '1', {
            fontFamily: 'Warpen',
            fontSize: '25px'
        })
            .setOrigin(0.5);

        this.playerName1 = this.add.text(this.yellowNum.x, this.yellowNum.y + 50, 'Playername1', {
            fontFamily: 'Lexend',
            fontSize: ' 18px',
            color: '#b1abff'
        })
            .setOrigin(0.5);

        this.point1 = this.add.text(this.playerName1.x, this.playerName1.y + 30, 'point1', {
            fontFamily: 'Lexend',
            fontSize: ' 18px',
            color: '#fc9003',
            fontStyle: 'bold'
        })
            .setOrigin(0.5);

        this.coin1 = this.add
            .image(this.point1.x + 30, this.point1.y, 'coinC')
            .setOrigin(0, 0.5);

        this.greenRank = this.add
            .image(this.yellowRank.x - 140, this.yellowRank.y, 'greenRank')
            .setOrigin(0.5, 0.5);

        this.ship2 = this.add.image(this.greenRank.x, this.greenRank.y - 10, 'ship2');

        this.greenNum = this.add
            .image(this.greenRank.x, this.greenRank.y + 50, 'greenNum')
            .setOrigin(0.5);

        this.rank2 = this.add.text(this.greenNum.x, this.greenNum.y, '2', {
            fontFamily: 'Warpen',
            fontSize: '25px'
        })
            .setOrigin(0.5);

        this.playerName2 = this.add.text(this.greenNum.x, this.greenNum.y + 50, 'Playername2', {
            fontFamily: 'Lexend',
            fontSize: ' 18px',
            color: '#b1abff'
        })
            .setOrigin(0.5);

        this.point2 = this.add.text(this.playerName2.x, this.playerName2.y + 30, 'point2', {
            fontFamily: 'Lexend',
            fontSize: ' 18px',
            color: '#fc9003',
            fontStyle: 'bold'
        })
            .setOrigin(0.5);

        this.coin2 = this.add
            .image(this.point2.x + 30, this.point2.y, 'coinC')
            .setOrigin(0, 0.5);

        this.pinkRank = this.add
            .image(this.yellowRank.x + 140, this.yellowRank.y, 'pinkRank')
            .setOrigin(0.5, 0.5);

        this.ship3 = this.add.image(this.pinkRank.x, this.pinkRank.y - 10, 'ship3');

        this.pinkNum = this.add
            .image(this.pinkRank.x, this.pinkRank.y + 50, 'pinkNum')
            .setOrigin(0.5);

        this.rank3 = this.add.text(this.pinkNum.x, this.pinkNum.y, '3', {
            fontFamily: 'Warpen',
            fontSize: '25px'
        })
            .setOrigin(0.5);

        this.playerName3 = this.add.text(this.pinkNum.x, this.pinkNum.y + 50, 'Playername3', {
            fontFamily: 'Lexend',
            fontSize: ' 18px',
            color: '#b1abff'
        })
            .setOrigin(0.5);

        this.point3 = this.add.text(this.playerName3.x, this.playerName3.y + 30, 'point3', {
            fontFamily: 'Lexend',
            fontSize: ' 18px',
            color: '#fc9003',
            fontStyle: 'bold'
        })
            .setOrigin(0.5);

        this.coin3 = this.add
            .image(this.point3.x + 30, this.point3.y, 'coinC')
            .setOrigin(0, 0.5);

        this.headerContainer.add([this.greenRank, this.yellowRank, this.pinkRank, this.ship1, this.ship2, this.ship3, this.pinkNum, this.greenNum, this.yellowNum, this.rank1, this.rank2, this.rank3, this.playerName1, this.playerName2, this.playerName3, this.point1, this.point2, this.point3, this.coin1, this.coin2, this.coin3]);
        this.headerContainer.setAlpha(0);

        // Colab Task Scrollable Panel Container
        let container2 = this.add.container();
        let container2Height = 0;

        for (let i = 0; i < 6; i++) {

            let iconBg = this.add
                .image(width * (65 / 430), i * 80 + 40, 'iconBlue')
                .setOrigin(0.5);

            let friendBar = this.add.nineslice(iconBg.x + width * (50 / 430), iconBg.y, 'blueBar', 0, width * (300 / 430), 80, 15, 15, 15, 15)
                .setOrigin(0, 0.5);

            container2Height = friendBar.y;

            let playerName = this.add
                .text(friendBar.x + width * (70 / 430), iconBg.y, 'PlayerName', {
                    fontSize: '17px',
                    fontFamily: 'Lexend',
                    color: '#B3F8FF'
                })
                .setOrigin(0.5);

            let rankBg = this.add
                .image(friendBar.x + width * (40 / 430), friendBar.y, 'rankBg')
                .setAlpha(0);

            let rankText = this.add
                .text(rankBg.x, rankBg.y - 7, 'TOP', {
                    fontFamily: 'Warpen',
                    fontSize: '8px'
                })
                .setOrigin(0.5)
                .setAlpha(0);

            let rankNum = this.add
                .text(rankText.x, rankText.y + 14, '82', {
                    fontFamily: 'Warpen',
                    fontSize: '13px'
                })
                .setOrigin(0.5)
                .setAlpha(0);

            if (i == 0) {
                playerName.setX(friendBar.x + width * (120 / 430));
                rankBg.setAlpha(1);
                rankText.setAlpha(1);
                rankNum.setAlpha(1)
            }

            if (i == 1) {
                iconBg.setTexture('iconPurple');
                friendBar.setTexture('purpleBar');
                playerName.setColor('#F8B6FF')
            }

            let rewardIcon = this.add
                .image(friendBar.x + width * (270 / 430), iconBg.y, 'coinC')
                .setOrigin(0.5);

            let rewardNum = this.add
                .text(rewardIcon.x - 15, rewardIcon.y, '20000', {
                    fontFamily: 'Lexend',
                    fontSize: '20px',
                    color: '#fc9003',
                    fontStyle: 'bold'
                })
                .setOrigin(1, 0.5);

            let pImg = this.add.image(iconBg.x, iconBg.y, this.getRandomImage(ps));

            container2.add([friendBar, iconBg, playerName, rankBg, rewardIcon, rewardNum, rankText, rankNum, pImg])
        }

        container2.setSize(width, container2Height + 40);
        const panel2Heght = (height - 120) - (this.point1.y + 25)

        this.panel2 = this.rexUI.add.scrollablePanel({
            x: width / 2,
            y: this.point1.y + 30 + (panel2Heght / 2),
            height: panel2Heght,
            scrollMode: 0,
            panel: {
                child: container2,
                mask: {
                    padding: 0,
                },
            },

            mouseWheelScroller: {
                focus: true,
                speed: 1,
            },
        })
            .layout()
            .setOrigin(0.5, 1)
            .setAlpha(0);

    }

    getRandomImage(array) {
        const random = Math.floor(Math.random() * 11);
        const image = array.at(random);
        return image;
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

