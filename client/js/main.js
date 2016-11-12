window.addEventListener('keydown',doKeyDown,true);
		window.addEventListener('keyup',doKeyUp,true);
		var canvas = document.getElementById('pageCanvas');
		var context = canvas.getContext('2d');
        var angle = 0;
		var H = window.innerHeight; //*0.75,
		var	W = window.innerWidth; //*0.75;
		canvas.width = W;
		canvas.height = H;
		var xc = W/2; //zeby bylo w centrum :v
		var yc = H/2; //jw.
		var x =  xc;
		var y =  yc;
        var dv = 0.2;
        var dt = 1;
		var vx = 0;
		var vy = 0;
		var fps = 30;
		var maxVel = 10;
		var frict = 0.99;
		var brakes = 0.90;
		var keys = new Array();
		var fire = false;
		var laser = false;
		///////////////////lasery xD
		var	lx = 25,
			ly = 9,
			lw = 4,
			lh = 4;

		function doKeyUp(evt){
			keys[evt.keyCode] = false;
			fire = false;
        }

		function doKeyDown(evt){
			keys[evt.keyCode] = true;
		}

		//OOOOOOOOOOOOOOOOOOLASEROOOOOOOOOOOOOOOOOOOOOOOOOOO
		function drawLaser() {
			context.fillStyle = "red";
			context.fillRect(lx,ly,lw,lh);
		}

		function moveLaser() {
			lx += 2;
		}


		//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
        function ogienZdupy(){
				context.fillStyle = "red";
				context.beginPath();
				context.moveTo(-2,2);
				context.lineTo(2,10);
				context.lineTo(-2,18);
				context.lineTo(-25,10);
				context.lineTo(-2,2);
				context.strokeStyle = "red";
				context.stroke();
			}

        function convertToRadians(degree) {
            return degree*(Math.PI/180);
        }

        function incrementAngle() {
		      angle += 5;
					if(angle > 360){
						angle = 0;
						}
				}

				function decrementAngle(){
					angle -= 5;
					if(angle > 360){
						angle = 0;
						}
				}

		function xyVelocity(){
			vx += dv * Math.cos(convertToRadians(angle)); //* friction;
			vy += dv * Math.sin(convertToRadians(angle)); //* friction;
			if(vx > maxVel){
				vx = maxVel;
			}
			if(vy > maxVel){
				vy = maxVel;
			}
		}

		function shipMovement(){
			if(38 in keys && keys[38]){
        xyVelocity();
				fire = true;
			}
			if(40 in keys && keys[40]){
                vx = 0;
                vy = 0;
			}

      if(37 in keys && keys[37]){
				decrementAngle();
			};
			if (39 in keys && keys[39]){
				incrementAngle();
			};
			if (32 in keys && keys[32]){
				laser = true;
                lx = x;
                ly = y;
			};
		}

		function xyAndFriction(){

		  x += vx * dt;
			y += vy * dt;

			vx *= frict;
			vy *= frict;

		}

		function outOfBorders(){

            if(x > W){
				x = x - W;
				}
			if(x< 0){
				x = W;
			}

			if(y > H){
				y = y - H;
			}

			if(y < 0){
				y = H;
			}
		}

		function blazeatron420(){
			context.beginPath();
			context.moveTo(0,0);
			context.lineTo(20,10);
			context.lineTo(0,20);
			context.lineTo(7,10);
			context.lineTo(0,0);
			context.strokeStyle = "green";
			context.stroke();
		}

		function space(){
			context.fillStyle = "black";
            context.fillRect(0,0,W,H);
		}

		function drawEverything() {

            shipMovement();
			xyAndFriction();
			outOfBorders();

			//context.save();
			space();
            context.save();
            context.translate(x,y);
            //context.translate(25,25);
            context.rotate(convertToRadians(angle));
            context.translate(-7,-10);

			if(fire){
				ogienZdupy();
			}


			context.fillStyle = "green";
            //context.fillText(vx + " ﻿ｋｍ／ｈ",50,50);
			/*context.fillText("dupa",-30,0);
			context.beginPath();
			context.moveTo(-20,5);
			context.lineTo(-5,10);
			context.strokeStyle = "green"; //KOLOR LINII ;_;
			context.stroke();*/
			blazeatron420();
            context.restore();

            if(laser){
				drawLaser();
				moveLaser();
			}

        }

		setInterval(drawEverything, 20);
