import { Scene } from "phaser";

export class AnimsLoader {

  /**
   * @param {Object} cfg 
   * @param {{}} cfg.map 
   * @param {string} cfg.prefix 
   * @param {Scene} cfg.scene 
   */
  constructor({ map, prefix, scene }) {
    this.map = map;
    this.prefix = prefix;
    this.scene = scene;
    
    this.anims = [];
    this.spritesheets = [];
  }
  
  setMap({ map, prefix }) {
    this.map = map;
    this.prefix = prefix;

    return this;
  }

  add({
    key,
    frameWidth = 39,
    frameHeight = 39,
    startFrame = 0,
    endFrame = 8,
    repeat = -1,
    frameRate = 1.5
  }) {
    const url = this.map[key];

    this.spritesheets.push({
      key: this.prefix + key,
      url,
      frameWidth,
      frameHeight,
      startFrame,
      endFrame,
    });

    this.anims.push({
      key: 'anim-' + this.prefix + key,
      frames: this.prefix + key,
      frameRate,
      repeat,
    });

    return this;
  }

  setupSpritesheets() {
    this.spritesheets.forEach(spritesheet => {
      this.scene.load.spritesheet(
        spritesheet.key,
        spritesheet.url,
        spritesheet,
      );
    });

    return this;
  }

  setupAnims() {
    this.anims.forEach(anim => {
      this.scene.anims.create(anim);
    });

    return this;
  }

}