import { Scene } from 'phaser'

import bg_01Img from '../assets/bg/bg_01.png'
import { AnimsLoader } from '../utils/loader';

const hangImgMap = (() => {
  const ctx = require.context('../assets/players/hang', true, /\.png$/);
  const map = {};
  ctx.keys().forEach(ctxKey => {
    const key = ctxKey.replace(/^\.\/|\..+$/g, '');
    map[key] = ctx(ctxKey).default;
  });

  return map;
})()

export class Preloader extends Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    console.log('Preloader init');
  }

  preload() {
    this.load.image('bg_01', bg_01Img);
    this.animsLoader = new AnimsLoader({scene: this});

    this.animsLoader
      .setMap({ map: hangImgMap, prefix: 'hang-' })
      .add({ key: 'quiet', endFrame: 6 })
      .add({ key: 'jump', endFrame: 2 })
      .add({ key: 'walk', endFrame: 4, frameRate: 5})

    // load spritesheet first
    this.animsLoader.setupSpritesheets();
  }

  create() {
    // create anims later
    this.animsLoader.setupAnims();

    this.scene.start('Game');
  }
}