import Phaser from 'phaser';
import WebFontLoader from 'webfontloader';
import SideBarBtn from './component/SideBarBtn';
import MissionBar from './component/MissionBar';
import { ScrollablePanel } from 'phaser3-rex-plugins/templates/ui/ui-components.js';

export default class TaskScene extends Phaser.Scene {
    constructor() {
        super('TaskScene');
    }

    initialize() {
        Phaser.Scene.call(this, { key: 'TaskScene' });
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
            .image(0, 0, 'Bg2')
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

        this.title = this.add.text(width / 2, 45, 'TASK', {
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

        this.leftMenuText = this.add.text(width / 4 + 10, this.leftMenu.y - 20, 'DAILY TASK', {
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

        this.rightMenuText = this.add.text(width * 3 / 4 - 10, this.rightMenu.y - 20, 'COLLAB TASK', {
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
                targets: this.panel1,
                alpha: 0,
                duration: 400
            })
        });

        this.completeText = this.add.text(width / 2, this.rightMenu.y + 30, 'Complete tasks to earn BLX', {
            fontSize: '17px',
            color: '#ffffff',
            fontFamily: 'Lexend'
        })
            .setOrigin(0.5);

        //SideBar
        let buttons = [];
        //Button 1
        this.leftBar = new SideBarBtn(this, width * (4 / 430), height, width * (106 / 430), 100, 'leftBar', 'leftBarYel', 'play', 'playYel', buttons, 'mainSceneSC', 'off');

        //Button 2
        this.midBar1 = new SideBarBtn(this, width * (109 / 430), height, width * (106 / 430), 100, 'midBar', 'midBarYel', 'task', 'taskYel', buttons, 'TaskScene', 'on');

        //Button 3	
        this.midBar2 = new SideBarBtn(this, width * (214 / 430), height, width * (106 / 430), 100, 'midBar', 'midBarYel', 'friends', 'friendsYel', buttons, 'FriendsScene', 'off');

        //Button 4
        this.rightBar = new SideBarBtn(this, width * (319 / 430), height, width * (106 / 430), 100, 'rightBar', 'rightBarYel', 'wallet', 'walletYel', buttons, 'WalletScene', 'off');

        this.downBar = this.add
            .nineslice(width * (4 / 430), height, 'a5', 0, width * (421 / 430), 0, 10, 10)
            .setOrigin(0, 1);

        //Daily Task Scrollable Panel Container
        let container1 = this.add.container();
        let container1Height = 0;

        for (let i = 0; i < 5; i++) {
            let missionBarbBg = this.add.nineslice(width / 2, i * 120 + 60, 'missionBg', 0, width * (400 / 430), 120, 15, 15, 15, 15)
                .setOrigin(0.5);

            container1Height = missionBarbBg.y + 120;
            // console.log(container1Height);

            let box = this.add.image(width * (65 / 430), missionBarbBg.y, 'X');

            let collectBg = this.add
                .nineslice(width * (360 / 430), box.y - 17, 'collectBgAfter', 0, width * (90 / 430), 35, 10, 10, 10, 10)
                .setInteractive()
                .setOrigin(0.5)
                .on('pointerup', () => {
                    collectBg.setTexture('collectBg');
                    box.setTexture('V');
                })

            let collectText = this.add
                .text(collectBg.x, collectBg.y, 'Collect', {
                    fontSize: '18px',
                    fontFamily: 'Lexend'
                })
                .setOrigin(0.5);

            let missionName = this.add
                .text(width * (120 / 430), collectBg.y, 'Mission Name', {
                    fontSize: '18px',
                    fontFamily: 'Lexend'
                })
                .setOrigin(0, 1);

            let rewardText = this.add
                .text(missionName.x, collectBg.y + 20, 'Reward: ', {
                    fontSize: '15px',
                    fontFamily: 'Lexend'
                })
                .setOrigin(0, 1);

            let rewardNumber = this.add
                .text(rewardText.x + 63, rewardText.y + 2, '25', {
                    fontSize: '18px',
                    fontFamily: 'Lexend',
                    fontStyle: 'bold',
                    color: '#ea6d23'
                })
                .setOrigin(0, 1);

            let rewardIcon = this.add
                .image(rewardNumber.x + 35, rewardNumber.y - 12, 'coinC')
                .setOrigin(0.5);

            let progressBar = this.add
                .nineslice(width * (405 / 430) + 10, box.y + 44, 'progressBar', 0, width * (300 / 430), 0, 30, 30)
                .setOrigin(1, 1);

            container1.add([missionBarbBg, box, collectBg, collectText, missionName, rewardText, rewardNumber, rewardIcon, progressBar]);
        }
        container1.setSize(width, container1Height -60);
        const panel1Height = (height - 120) - (this.completeText.y + 50)

        this.panel1 = this.rexUI.add.scrollablePanel({
            x: width / 2,
            y: this.completeText.y + 30 + (panel1Height / 2),
            height: panel1Height,
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
            .setAlpha(1);

        // Colab Task Scrollable Panel Container
        let container2 = this.add.container();
        let container2Height = 0;

        for (let i = 0; i < 6; i++) {
            let missionBarbBg = this.add.nineslice(width / 2, i * 120 + 60, 'missionBg', 0, width * (400 / 430), 120, 15, 15, 15, 15)
                .setOrigin(0.5);

            container2Height = missionBarbBg.y + 120;
            // console.log(container2Height);

            let box = this.add.image(width * (65 / 430), missionBarbBg.y, 'X');

            let collectBg = this.add
                .nineslice(width * (360 / 430), box.y - 17, 'collectBgAfter', 0, width * (90 / 430), 35, 10, 10, 10, 10)
                .setInteractive()
                .setOrigin(0.5)
                .on('pointerup', () => {
                    collectBg.setTexture('collectBg');
                    box.setTexture('V');
                })

            let collectText = this.add
                .text(collectBg.x, collectBg.y, 'Collect', {
                    fontSize: '18px',
                    fontFamily: 'Lexend'
                })
                .setOrigin(0.5);

            let missionName = this.add
                .text(width * (120 / 430), collectBg.y, 'Name Mission', {
                    fontSize: '18px',
                    fontFamily: 'Lexend'
                })
                .setOrigin(0, 1);

            let rewardText = this.add
                .text(missionName.x, collectBg.y + 20, 'Reward: ', {
                    fontSize: '15px',
                    fontFamily: 'Lexend'
                })
                .setOrigin(0, 1);

            let rewardNumber = this.add
                .text(rewardText.x + 63, rewardText.y + 2, '25', {
                    fontSize: '18px',
                    fontFamily: 'Lexend',
                    fontStyle: 'bold',
                    color: '#ea6d23'
                })
                .setOrigin(0, 1);

            let rewardIcon = this.add
                .image(rewardNumber.x + 35, rewardNumber.y - 12, 'coinC')
                .setOrigin(0.5);

            let progressBar = this.add
                .nineslice(width * (405 / 430) + 10, box.y + 44, 'progressBar', 0, width * (300 / 430), 0, 30, 30)
                .setOrigin(1, 1);

            container2.add([missionBarbBg, box, collectBg, collectText, missionName, rewardText, rewardNumber, rewardIcon, progressBar]);
        }
        container2.setSize(width, container2Height - 60);
        const panel2Height = (height - 120) - (this.completeText.y + 50)

        this.panel2 = this.rexUI.add.scrollablePanel({
            x: width / 2,
            y: this.completeText.y + 30 + (panel2Height / 2),
            height: panel2Height,
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
            .setAlpha(0);


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

