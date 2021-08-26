export default class TitleScreen {
  constructor(game) {
    this.game = game;
  }

  draw(ctx) {
    ctx.font = '100px Arial';
    ctx.fillStyle = 'darkorange';
    ctx.textAlign = 'center';
    ctx.fillText("RPongG", this.width/3, this.height/3);

    ctx.font = '75px Arial';
    ctx.fillStyle = 'darkorange';
    ctx.textAlign = 'center';
    ctx.fillText("Press Start (or spacebar...)", this.width/3, this.height/3);
  }
}
