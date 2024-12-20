import Phaser from "phaser";
export default class MissionBar extends Phaser.GameObjects.Container {
    constructor(scene, x, y, iconKeyDefault, iconKeyActive, bgKey, progressKey, collectKeyDefault, collectKeyActive, mText, rNum, rwIcon) {
        // Gọi constructor cha
        super(scene, x, y);
        this.iconKeyDefault = iconKeyDefault;
        this.iconKeyActive = iconKeyActive;
        this.bgKey = bgKey;
        this.progressKey = progressKey;
        this.collectKeyDefault = collectKeyDefault;
        this.collectKeyActive = collectKeyActive;

        this.bg = scene.add
            .nineslice(x / 2, y, bgKey, 0, x * (400 / 430), 120, 15, 15, 15, 15)
            .setOrigin(0.5);

        this.icon = scene.add
            .image(x * (65 / 430), y, iconKeyDefault);

        this.missionText = scene.add
            .text(x * (120 / 430), y - 18, mText.toString(), {
                fontSize: '18px',
                fontFamily: 'Lexend'
            })
            .setOrigin(0, 1);

        this.rewardText = scene.add
            .text(this.missionText.x, this.missionText.y + 20, 'Reward: ', {
                fontSize: '15px',
                fontFamily: 'Lexend'
            })
            .setOrigin(0, 1);

        this.rewardNumber = scene.add
            .text(this.rewardText.x + 65, this.rewardText.y + 2, rNum.toString(), {
                fontFamily: 'Lexend',
                fontSize: '18px',
                color: '#ea6d23',
                fontStyle: 'bold'
            })
            .setOrigin(0, 1);

        this.rewardIcon = scene.add
            .image(this.rewardNumber.x + 35, this.rewardNumber.y - 12, rwIcon);

        this.collectBtn = scene.add
            .nineslice(x * (360 / 430), y - 17, collectKeyDefault, 0, x * (90 / 430), 35, 10, 10, 10, 10)
            .setInteractive()
            .setOrigin(0.5);

        this.collectText = scene.add
            .text(this.collectBtn.x, this.collectBtn.y, 'Collect', {
                fontFamily: 'Lexend',
                fontSize: '16px',
                color: '#ffffff'
            })
            .setOrigin(0.5);

        this.progressBar = scene.add
            .nineslice(x * (405 / 430) + 10, y + 45, progressKey, 0, x * (300 / 430), 0, 30, 30)
            .setOrigin(1, 1);

        this.collectBtn.on('pointerdown', () => {
            this.collectBtn.setTexture(collectKeyActive);
            this.icon.setTexture(iconKeyActive);
        })
    }
}