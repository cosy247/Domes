window.addEventListener('load', () => {
    /** canvas标签 */
    const canvasDom = document.querySelector('canvas');
    if (!canvasDom) return;
    /** canvas画笔 */
    const ctx = canvasDom.getContext('2d');
    /** 提示语p标签 */
    const tipDom = document.querySelector('p');
    /** 烟花束列表，[{x, y, r, color, speedX, speedY, countdown}] */
    let fireworks = [];
    /** 上一次绘制时间 */
    let lastTimestamp = 0;
    /** 隐藏提示语再现回调id */
    let hiddenTipTimeoutId = null;

    /**
     * @description: 设定画布大小
     * @author: Cosy247
     * @datetime: 2023-05-15 03:10:36
     */
    function resizeCanvas() {
        canvasDom.width = window.innerWidth;
        canvasDom.height = window.innerHeight;
    }

    /**
     * @description: 绘制下一帧，requestAnimationFrame回调函数
     * @author: Cosy247
     * @param {number} timestamp: 执行事件
     * @datetime: 2023-05-15 03:09:48
     */
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

    /**
     * @description: 创建烟花，将每个烟花束添加到fireworks数组中
     * @author: Cosy247
     * @param {event} event: 点击事件
     * @datetime: 2023-05-15 03:08:24
     */
    function createFireworks({ x, y }) {
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

    /**
     * @description: 隐藏提示文字
     * @author: Cosy247
     * @datetime: 2023-05-15 03:13:17
     */
    function hiddenTip() {
        hiddenTipTimeoutId && clearTimeout(hiddenTipTimeoutId);
        tipDom.style.opacity = 0;
        hiddenTipTimeoutId = setTimeout(() => {
            tipDom.style.opacity = 1;
        }, 5000);
    }

    // 运行初始化
    {
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('click', (event) => {
            createFireworks(event), hiddenTip();
        });
        drawNext();
    }
});
