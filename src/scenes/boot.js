import { Scene } from 'phaser';

export class Boot extends Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        // shortcuts
        this.canvas = this.sys.canvas;
        this.camera = this.cameras.main;
    }

    create() {
        this.scene.start('Preloader');
    }
}
