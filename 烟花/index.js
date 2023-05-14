window.addEventListener('load', () => {
    // 元素获取
    const canvasDom = document.querySelector('canvas');
    if (!canvasDom) return;
    const ctx = canvasDom.getContext('2d');
    let fireworks = [];
    let lastTimestamp = 0;
    // 设定画布大小
    function resizeCanvas() {
        canvasDom.width = window.innerWidth;
        canvasDom.height = window.innerHeight;
    }

    // 绘画烟花中的一束
    function drawFireworksItem() {}

    function drawNext(timestamp = 0) {
        // 获取时间间隔
        const elapsed = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        // 设置拖影
        ctx.fillStyle = 'rgba(1,1,1,0.1)';
        ctx.fillRect(0, 0, canvasDom.width, canvasDom.height);

        // 绘制烟花
        fireworks = fireworks.filter((fire) => {
            const { x, y, r, color, speedX, speedY, countdown } = fire;

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.fill();

            fire.speedY += elapsed / 400;
            fire.x += speedX;
            fire.y += speedY;
            fire.countdown--;
            return fire.countdown > 1;
        });

        // 绘制下一帧
        requestAnimationFrame(drawNext);
    }

    // 创建一个烟花
    function createFireworks({ x, y }) {
        ctx.fillStyle = '#8a7';
        let timeCount = 100;
        for (let index = 0; index < 100; index++) {
            const speed = Math.random() * 2;
            const dir = Math.random() * Math.PI * 2;
            fireworks.push({
                x,
                y,
                r: Math.random() * 1 + 1,
                color: `#${((Math.random() * 0xffffff) << 0).toString(16)}`,
                speedX: speed * Math.cos(dir),
                speedY: speed * Math.sin(dir) - 1,
                countdown: Math.floor(Math.random() * 70 + 30),
            });
        }
    }

    function init() {
        // 页面缩放改变画布大小
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('click', createFireworks);
        drawNext();
    }

    init();
});
