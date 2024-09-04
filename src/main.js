import { Boot } from './scenes/boot';
import { Game } from './scenes/game'; 
import { Preloader } from './scenes/preloader';

const aspectRatio = 5/3;
const width = 800;

const config = {
    type: Phaser.AUTO,
    width,
    height: width / aspectRatio,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader, 
        Game 
    ]
};

export default new Phaser.Game(config);
