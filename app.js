//Initialize BG, Canvas and Ball
class Game {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.posYPaddle = 200;
		this.posXball = 10;
		this.posYball = 10;
		this.ballPosition = "left"
		this.canvas = document.getElementById('myCanvas');
		this.ctx = this.canvas.getContext('2d');
		this.ball = new Ball([this.posXball, this.posYball], 10, this.ctx, this.width, this.height, this.posYPaddle, this.ballPosition);
		this.canvas = new Canvas(this.ctx, this.width, this.height);
		this.paddle_1 = new Paddle(this.ctx, "player_1", this.posYPaddle, this.posXball, this.posYball);
		this.paddle_2 = new Paddle(this.ctx, "player_2", this.posYPaddle, this.posXball, this.posYball);
	}
}

//Background
class Canvas {
	constructor(ctx, width, height) {
		this.ctx = ctx;
		this.width = width;
		this.height = height;
	}
	renderBg = () => {
		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(0, 0, this.width, this.height);
	}
}

// Ball
class Ball{
  constructor(position, radius, ctx, width, height, posYPaddle, ballPosition) {
		this.width = width;
		this.height = height;
		this.ctx = ctx;
    	this.posXball = position[0];
		this.posYball = position[1];
		this.radius = radius;
		this.vx = 2;
		this.vy = 2;
		this.posYPaddle = posYPaddle;
		this.ballPosition = ballPosition;
		if (this.posXball > 300) {
			this.ballPosition = "right";
		} else {
			this.ballPosition = "left";
		}
  }
  renderBall = () => {
    this.ctx.beginPath();
  	this.ctx.arc(this.posXball, this.posYball, this.radius, 0, 2 * Math.PI, false);
  	this.ctx.fillStyle = '#fff';
  	this.ctx.fill();
	}
	move = () => {
		if (this.posXball >= this.width - 10 || this.posXball < 10) {
			this.vx = -this.vx;
		} 
		if (this.posYball >= this.height - 10 || this.posYball < 10) {
			this.vy = -this.vy;
		}
		this.posXball += this.vx;
		this.posYball += this.vy;
	}
}

// Paddle
class Paddle {
	constructor(ctx, player, posYPaddle, posXball, posYball) {
		this.player = player;
		this.ctx = ctx;
		this.vy = 10;
		this.posYPaddle = posYPaddle;
		this.posXball = posXball;
		this.posYball = posYball;
		if (this.player === "player_1") {
			this.xPos = 0;
			console.log()
			document.addEventListener('keydown', event => {
				if (event.key === "z") {
					if (this.posYPaddle <= 390) {
						this.down();
					}
				} else if (event.key === "a") {
					if (this.posYPaddle >= 10) {
						this.up();
					}
				}
			});
		} else if (this.player === "player_2") {
			this.xPos = 585;
			document.addEventListener('keydown', event => {
				if (event.key === "ArrowDown") {
					if (this.posYPaddle <= 390) {
						this.down();
					}
				} else if (event.key === "ArrowUp") {
					if (this.posYPaddle >= 10) {
						this.up();
					}
				}
			});
		}
	}
	
	renderPaddle = () => {
		
		this.ctx.beginPath();
		this.ctx.rect(this.xPos, this.posYPaddle, 15, 100);
		this.ctx.fillStyle = 'yellow';
		this.ctx.fill();
	}
	down = () => {
		this.posYPaddle += this.vy
	}
	up = () => {
		this.posYPaddle -= this.vy
	}
}

const game = new Game(600, 500);

setInterval(() => {
	game.ball.move();
	game.canvas.renderBg();
	game.ball.renderBall();
	game.paddle_1.renderPaddle();	
	game.paddle_2.renderPaddle();		
}, 17);