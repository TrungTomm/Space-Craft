import WebFontLoader from 'webfontloader';

export default class SideBarBtn extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width, height, textureDefault, textureActive, iconKeyDefault, iconKeyActive, buttons, sceneName, mode) {
        super(scene, x, y);

        this.buttons = buttons;
        this.sceneName = sceneName;

        // Default and active textures
        this.textureDefault = textureDefault;
        this.textureActive = textureActive;
        this.iconKeyDefault = iconKeyDefault;
        this.iconKeyActive = iconKeyActive;

        // Backgrounds
        this.defaultBg = scene.add
            .nineslice(x, y, textureDefault, 0, width, height, 30, 30, 30, 30)
            .setOrigin(0, 1)
            .setInteractive();

        this.activeBg = scene.add
            .nineslice(x, y, textureActive, 0, width, height, 30, 30, 30, 30)
            .setOrigin(0, 1)
            .setAlpha(0);

        // Icon
        this.defaultIcon = scene.add
            .image(x + width / 2, y - height / 2 - 13, iconKeyDefault);

        this.activeIcon = scene.add
            .image(x + width / 2, y - height / 2 - 13, iconKeyActive)
            .setAlpha(0);

        //Text
        this.title = scene.add
            .text(this.defaultIcon.x, this.defaultIcon.y + 35, iconKeyDefault.toUpperCase(), {
                fontsize: '12px',
                fontFamily: 'Warpen'
            })
            .setOrigin(0.5)

        if (mode == 'on') {
            this.defaultBg.setTexture(textureActive);
            this.defaultIcon.setTexture(iconKeyActive);
        }

        //Tween for changing
        this.defaultBg.on('pointerdown', () => {
            if (this.activeBg.alpha === 1) {
                // Nút đã được chọn, không làm gì thêm
                return;
            }
            // Reset tất cả các button còn lại về trạng thái ban đầu
            this.resetButtons();

            // Chuyển đổi trạng thái của button hiện tại
            scene.tweens.add({
                targets: this.defaultBg,
                alpha: 0,
                duration: 500
            });
            scene.tweens.add({
                targets: this.activeBg,
                alpha: 1,
                duration: 500
            });
            scene.tweens.add({
                targets: this.defaultIcon,
                alpha: 0,
                duration: 500
            });
            scene.tweens.add({
                targets: this.activeIcon,
                alpha: 1,
                duration: 500
            });

            scene.time.delayedCall(500, () => {
                scene.cameras.main.fadeOut(250, 0, 0, 0);  
                scene.time.delayedCall(250, () => {
                    scene.scene.start(this.sceneName);  
                });
            });
        });

        // Thêm button vào mảng buttons
        buttons.push(this);
    }


    // Hàm để reset tất cả các button về trạng thái ban đầu
    resetButtons() {
        this.buttons.forEach(button => {
            if (button !== this) {
                // Quay lại trạng thái ban đầu cho các button khác
                button.scene.tweens.add({
                    targets: button.defaultBg,
                    alpha: 1,
                    duration: 500
                });
                button.scene.tweens.add({
                    targets: button.activeBg,
                    alpha: 0,
                    duration: 500
                });
                button.scene.tweens.add({
                    targets: button.defaultIcon,
                    alpha: 1,
                    duration: 500
                });
                button.scene.tweens.add({
                    targets: button.activeIcon,
                    alpha: 0,
                    duration: 500
                });
            }
        });
    }
}
