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
    /** 当前按下的键 */
    const pressKeys = new Set();
    /** 加速度 */
    const acceleration = 0.2;
    /** 最大速度 */
    const maxSpeed = 10;
    /** 小人对象 */
    const person = {
        x: 40,
        y: 0,
        r: 40,
        speedX: 0,
        speedY: 0,
    };

    /**
     * @description: 移动小人
     * @author: Cosy247
     * @param {number} elapesd: 间隔时间
     * @datetime: 2023-05-15 21:18:08
     */
    function movePerson(elapsed) {
        // 获取速度目标方向
        let toSpeedDir = null;
        if (pressKeys.has('d') && !pressKeys.has('a')) {
            if (pressKeys.has('w') && !pressKeys.has('s')) {
                toSpeedDir = Math.PI / 4;
            } else if (!pressKeys.has('w') && pressKeys.has('s')) {
                toSpeedDir = -Math.PI / 4;
            } else {
                toSpeedDir = 0;
            }
        } else if (!pressKeys.has('d') && pressKeys.has('a')) {
            if (pressKeys.has('w') && !pressKeys.has('s')) {
                toSpeedDir = (Math.PI * 3) / 4;
            } else if (!pressKeys.has('w') && pressKeys.has('s')) {
                toSpeedDir = (-Math.PI * 3) / 4;
            } else {
                toSpeedDir = Math.PI;
            }
        } else if (pressKeys.has('w') && !pressKeys.has('s')) {
            toSpeedDir = Math.PI / 2;
        } else if (!pressKeys.has('w') && pressKeys.has('s')) {
            toSpeedDir = -Math.PI / 2;
        }

        // 没有指定方向时将逐渐停止
        if (toSpeedDir === null) {
            const speed = (person.speedX ** 2 + person.speedY ** 2) ** 0.5;
            if (speed !== 0) {
                const newSpeed = speed > acceleration * elapsed ? speed - acceleration * elapsed : 0;
                person.speedY = (person.speedY * newSpeed) / speed;
                person.speedX = (person.speedX * newSpeed) / speed;
            }
        } else {
            const maxSpeedX = maxSpeed * Math.cos(toSpeedDir);
            const maxSpeedY = maxSpeed * Math.sin(toSpeedDir);
            // const disSpeedX = Math.abs(acceleration * elapsed * Math.cos(toSpeedDir));
            // const disSpeedY = Math.abs(acceleration * elapsed * Math.sin(toSpeedDir));
            if (person.speedX < maxSpeedX) {
                person.speedX += acceleration * elapsed;
                if (person.speedX > maxSpeedX) {
                    person.speedX = maxSpeedX;
                }
            } else if (person.speedX > maxSpeedX) {
                person.speedX -= acceleration * elapsed;
                if (person.speedX < maxSpeedX) {
                    person.speedX = maxSpeedX;
                }
            }
            if (person.speedY < maxSpeedY) {
                person.speedY += acceleration * elapsed;
                if (person.speedY > maxSpeedY) {
                    person.speedY = maxSpeedY;
                }
            } else if (person.speedY > maxSpeedY) {
                person.speedY -= acceleration * elapsed;
                if (person.speedY < maxSpeedY) {
                    person.speedY = maxSpeedY;
                }
            }
            // person.speedX += disSpeedX;
            // person.speedY += disSpeedY;
            // if(person.speedX < maxSpeedX && disSpeedX < 0) {
            //     person.speedX = maxSpeedX;
            //     console.log(maxSpeedX);
            // } else if(person.speedX > maxSpeedX && disSpeedX > 0) {
            //     person.speedX = maxSpeedX;
            //     console.log(maxSpeedX);
            // }
            // if(person.speedY < maxSpeedY && disSpeedY < 0) {
            //     person.speedY = maxSpeedY;
            // } else if(person.speedY > maxSpeedY && disSpeedY > 0) {
            //     person.speedY = maxSpeedY;
            // }
        }

        // 修改X方向的位置
        person.x += person.speedX;
        if (person.x <= person.r) {
            person.x = person.r;
            if (person.speedX < 0) {
                person.speedX = 0;
            }
        } else if (person.x >= 1000 - person.r) {
            person.x = 1000 - person.r;
            if (person.speedX > 0) {
                person.speedX = 0;
            }
        }

        // 修改Y方向的位置
        person.y += person.speedY;
        if (person.y <= person.r) {
            person.y = person.r;
            if (person.speedY < 0) {
                person.speedY = 0;
            }
        } else if (person.y >= 1500 - person.r) {
            person.y = 1500 - person.r;
            if (person.speedY > 0) {
                person.speedY = 0;
            }
        }

        // 绘制
        ctx.fillStyle = '#a87';
        ctx.beginPath();
        ctx.arc(person.x, 1500 - person.y, person.r, 0, 2 * Math.PI);
        ctx.fill();
    }

    /**
     * @description: 移动小球
     * @author: Cosy247
     * @param {number} elapesd: 间隔时间
     * @datetime: 2023-05-15 21:18:08
     */
    function moveBall(elapsed) {}

    /**
     * @description: 绘制下一帧，requestAnimationFrame回调函数
     * @author: Cosy247
     * @param {number} timestamp: 执行事件
     * @datetime: 2023-05-15 03:09:48
     */
    function drawNext(timestamp = 0) {
        // 获取时间间隔
        const elapsed = (timestamp - lastTimestamp) / 16;
        lastTimestamp = timestamp;

        // 设置拖影
        ctx.fillStyle = 'rgba(1,1,1,0.1)';
        ctx.fillRect(0, 0, canvasDom.width, canvasDom.height);

        // 移动小人
        movePerson(elapsed);

        // 移动小球
        moveBall(elapsed);

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

    /**
     * @description: 添加目前按下的键
     * @author: Cosy247
     * @datetime: 2023-05-15 21:10:22
     */
    function addPressKey({ key }) {
        pressKeys.add(key);
    }

    /**
     * @description: 移除目前按下的键
     * @author: Cosy247
     * @datetime: 2023-05-15 21:15:27
     */
    function removePressKey({ key }) {
        pressKeys.delete(key);
    }

    // 运行初始化
    {
        canvasDom.width = 1000;
        canvasDom.height = 1500;
        window.addEventListener('keydown', addPressKey);
        window.addEventListener('keyup', removePressKey);
        drawNext();
    }
});
