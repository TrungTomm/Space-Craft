export default class IconContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, iconKey, bgKey) {
        // Gọi constructor cha
        super(scene, x, y);

        // Thêm background
        this.bg = scene.add.image(0, 0, bgKey).setInteractive()
        this.add(this.bg);

        // Thêm icon
        this.icon = scene.add.image(0, 0, iconKey);
        this.add(this.icon);

        // Thêm container vào scene
        scene.add.existing(this);

        // Tạo tween hover
        this.bg.on('pointerover', () => {
            scene.tweens.add({
                targets: this.icon,
                scale: 0.8,
                duration: 300,
                ease: 'Power2',
            });
            scene.tweens.add({
                targets: this.bg,
                rotation: Phaser.Math.DegToRad(30),
                duration: 150,
            });
        });

        this.bg.on('pointerout', () => {
            scene.tweens.add({
                targets: this.icon,
                scale: 1,
                duration: 300,
                ease: 'Power2',
            });
            scene.tweens.add({
                targets: this.bg,
                rotation: 0,
                duration: 150,
            });
        });
    }
}