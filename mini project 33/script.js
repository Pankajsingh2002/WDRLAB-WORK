let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

// --------------------
// BALL PROPERTIES
// --------------------
let x = 200;          // Ball ka starting X position
let y = 150;          // Ball ka starting Y position
let dx = 2;           // X direction movement
let dy = 2;           // Y direction movement
let ballSize = 10;    // Ball ka radius

// --------------------
// PADDLE PROPERTIES
// --------------------
let paddleX = 150;     // Paddle ka starting X position
let paddleWidth = 80;  // Paddle ki width
let paddleHeight = 10; // Paddle ki height

// --------------------
// MOUSE CONTROL FOR PADDLE
// --------------------
document.addEventListener("mousemove", (e) => {
    let rect = canvas.getBoundingClientRect();

    // Mouse jaha hoga waha paddle center me shift hoga
    paddleX = e.clientX - rect.left - paddleWidth / 2;
});

// --------------------
// Draw Ball Function
// --------------------
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballSize, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";  // Ball ka color
    ctx.fill();
    ctx.closePath();
}

// --------------------
// Draw Paddle Function
// --------------------
function drawPaddle() {
    ctx.fillStyle = "cyan"; // Paddle ka color
    ctx.fillRect(
        paddleX,
        canvas.height - paddleHeight - 5,
        paddleWidth,
        paddleHeight
    );
}

// --------------------
// MAIN GAME LOOP
// --------------------
function update() {
    // Canvas ko clean karo
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ball & paddle
    drawBall();
    drawPaddle();

    // Ball wall collisions (Left & Right walls)
    if (x + dx > canvas.width - ballSize || x + dx < ballSize) {
        dx = -dx;  // Reverse direction
    }

    // Top wall bounce
    if (y + dy < ballSize) {
        dy = -dy;  // Reverse direction
    }

    // Paddle collision
    if (
        y + dy > canvas.height - paddleHeight - ballSize &&
        x > paddleX &&
        x < paddleX + paddleWidth
    ) {
        dy = -dy; // Ball ko wapas upar bhejo
    }

    // Game Over (ball bottom se bahar nikal jaye)
    if (y + dy > canvas.height) {
        alert("Game Over!");
        document.location.reload(); // Game restart
    }

    // Ball movement update
    x += dx;
    y += dy;

    // Loop repeat
    requestAnimationFrame(update);
}

// Game Start
update();