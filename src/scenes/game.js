import { Scene } from 'phaser';

export class Game extends Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.effectsMap = {}
  }

  create() {

    // render size
    this.RW = this.sys.canvas.width;
    this.RH = this.sys.canvas.height;

    // scene size
    this.SW = this.RW * 6;
    this.SH = this.RH * 1.1;

    this.gobj = {
      platforms: [
        []
      ]
    }
    this.bg = this.add.tileSprite(0, 0, this.RW * 1.3, this.RH * 1.3, 'bg_01')
      .setOrigin(0.5)
      .setTileScale(this.SH / this.RH)

    this.player = this.add.sprite(this.RW / 2, this.RH / 2, 'hang-quiet')
      .setOrigin(0.5)
      .setDisplaySize(149, 150);
      
      
    this.player.skin = 'hang';
    this.player.play('anim-hang-quiet')
    this.player.playAnim = (id) => {
      let anim = 'anim-' + this.player.skin + '-' + id;
      if (anim !== this.player.animId) {
        this.player.animId = id;
        this.player.chain(anim);
        this.player.stop();
      } 
    }
    this.player.playAnim('quiet');
    this.player.vx = 0;
    this.player.vy = 0;
    this.player.walkForce = 2;
    this.player.jumpForce = 15;
    this.gravity = 0.5;
    this.player.setV = function (vx, vy) {
      this.vx = vx;
      this.vy = vy;
      return this;
    }

    this.camera = this.cameras.main
      .setBackgroundColor(0x00ff00)
      .setBounds(0, 0, this.SW, this.SH)
      .startFollow(this.player, false, 0.5, 0.5);

    this.debugText = this.add.text(1, 1, '')
      .setOrigin(0)
      .setScrollFactor(0)

    // Add keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  debug(text) {
    this.debugText.text = text;
  }

  /* useEffect(id, args, callback) {
    if (!this.effectsMap[id]) this.effectsMap[id] = {callback, args: []};
    const effect = this.effectsMap[id];

    for (let i = 0; i < args.length; i++) {
      if (effect.args[i] !== args[i]) {
        effect.args = args;
        callback();
        break;
      } 
    }
  } */

  update(time, delta) {
    this.bg
      .setTilePosition(this.camera.scrollX, this.camera.scrollY)
      .setPosition(this.camera.scrollX + this.bg.displayWidth / 2, this.camera.scrollY + this.bg.displayHeight / 2);

    {
      let {
        x, y, vx, vy,
        walkForce, jumpForce, isJump, isFall,
        displayHeight,
      } = this.player;

      // Update velocity based on keyboard input
      // x-axis
      if (this.cursors.left.isDown) {
        vx = -walkForce;
        this.player.flipX = true;
      }
      else if (this.cursors.right.isDown) {
        vx = walkForce;
        this.player.flipX = this.false;
      }
      else {
        vx = 0;
      }


      // y-axis
      if (this.cursors.up.isDown && !isJump) {
        vy = -jumpForce;
        isJump = true;
      }

      if(isJump) {
        this.player.playAnim('jump');
      }
      else {
        this.player.playAnim('quiet');

      }

      if (vy > 0.2) isFall = true;
      else isFall = false;
      
      x += vx;
      y += vy;

      // Gravity and ground collide
      vy += this.gravity;
      if (y >= this.SH - displayHeight * 0.7) {
        y = this.SH - displayHeight * 0.7;
        vy = 0;
        isJump = false;
      }


      this.player.isJump = isJump;
      this.player.isFall = isFall;
      this.player.setPosition(x, y);
      this.player.setV(vx, vy);
    }

    this.debug(
      'x:' + this.player.x.toFixed(2) + '\n' +
      'y:' + this.player.y.toFixed(2) + '\n' +
      'player.animId:' + this.player.animId
    )
  }
}