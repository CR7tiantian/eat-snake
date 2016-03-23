(function() {
	var start = document.getElementById("start");
	var timer = null;
	var direction = "right";
	// 创建ground
	var ground = document.getElementById("ground");
	for (var i = 0; i < 50; i++) {
		for (var j = 0; j < 25; j++) {
			var box = document.createElement("div");
			box.className = "block";
			ground.appendChild(box);
		}
	};
	// 创建snake
	var snakeBody = [];
	for (var i = 3; i > 0; i--) {
		var boxs = document.createElement("div");
		boxs.style.left = 20 * i + "px";
		boxs.className = "snakeBody";
		ground.appendChild(boxs);
		snakeBody.push(boxs);
	};
	var food = createfood();
	// 点击开始，蛇向右移动
	var moveflag = false
	start.onclick = function() {
		moveflag = true;
		timer = setInterval(function() {
			move(direction);
		}, 300)
	};
	// 点击暂停
	var pause = document.getElementById("pause");
	pause.onclick = function() {
		clearInterval(timer);
		moveflag = false;
	};
	// 键盘控制上下左右
	document.onkeydown = function(event) {
		var keyCode = event.keyCode;
		if (moveflag === true) {
			if (keyCode == 37) {
				if (direction !== "right") {
					direction = "left";
					move(direction);
				}
			} else if (keyCode == 38) {
				if (direction !== "down") {
					direction = "up";
					move(direction);
				}
			} else if (keyCode == 39) {
				if (direction !== "left") {
					direction = "right";
					move(direction);
				}
			} else if (keyCode == 40) {
				if (direction !== "up") {
					direction = "down";
					move(direction);
				}
			}
		}

	};
	// 蛇移动函数move
	var n = 0; //起始分数
	function move(dir) {
		var snakehead = snakeBody[0];
		for (var i = snakeBody.length - 1; i > 0; i--) {
			snakeBody[i].style.left = snakeBody[i - 1].offsetLeft + "px";
			snakeBody[i].style.top = snakeBody[i - 1].offsetTop + "px";
		};
		switch (dir) {
			case "left":
				snakehead.style.left = snakehead.offsetLeft - 20 + "px";
				break;
			case "right":
				snakehead.style.left = snakehead.offsetLeft + 20 + "px";
				break;
			case "up":
				snakehead.style.top = snakehead.offsetTop - 20 + "px";
				break;
			case "down":
				snakehead.style.top = snakehead.offsetTop + 20 + "px";
				break;
		}
		// 撞到墙
		if (snakehead.offsetLeft === -20 || snakehead.offsetLeft === 1000 || snakehead.offsetTop === -20 || snakehead.offsetTop === 500) {
			alert("游戏结束1");
			clearInterval(timer);
			location.reload();
		};
		// 撞到身体
		for (var i = 1; i < snakeBody.length; i++) {
			// debugger;
			if (snakeBody[i].offsetLeft === snakehead.offsetLeft && snakeBody[i].offsetTop === snakehead.offsetTop) {
				alert("游戏结束2");
				clearInterval(timer);
				location.reload();
			}
		}
		// 吃食物
		if (snakehead.offsetTop === food.offsetTop && snakehead.offsetLeft === food.offsetLeft) {
			food.style.background = "orange";
			food.style.width = "20px";
			food.style.height = "20px";
			food.style.position = "absolute";
			snakeBody.push(food);
			n++;
			var text = document.getElementById("text");
			text.value = n;
			food = createfood();
		};
	};

	// 创建食物
	function createfood() {
		var box = document.createElement("div");
		box.className = "block food";
		do {
			var flag = true;
			foodLeft = Math.floor(Math.random() * 50) * 20 + "px";
			foodTop = Math.floor(Math.random() * 25) * 20 + "px";
			for (var i = 0; i < snakeBody.length; i++) {
				if (snakeBody[i].style.left == foodLeft && snakeBody[i].style.top == foodTop) {
					flag = false;
					break;
				}
			};

		} while (!flag)
		box.style.left = foodLeft;
		box.style.top = foodTop;
		ground.appendChild(box);
		return box;
	};
})()
