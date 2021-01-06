const game = () => {
    const list = document.querySelector('.wrapper__list');
    const results = document.querySelectorAll('.wrapper__results-item-block[data-figure]');
    const result_game = document.querySelector('.wrapper__info span');
    const whose_move = document.querySelector('.wrapper__move span');
    const btn_reset = document.querySelector('.wrapper__btn-reset');
    const block = document.querySelector('.wrapper__main-block');
    const statistics = document.querySelectorAll('.wrapper__main-block-back-statistic-item-block');
    const btn_show_statistic = document.querySelector('.wrapper__show-statistic-btn');
    const ms = 1500;

    let move = false;
    let step = '';
    let points = {
        cross: {
            win: 0,
            lose: 0
        },
        circle: {
            win: 0,
            lose: 0
        },
        draw: 0
    }

    if (localStorage.getItem('points')) {
        points = JSON.parse(localStorage.getItem('points'));

        writeResults();
        setStatistic();
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const item = document.createElement('li');

            item.classList.add('wrapper__list-item');
            item.dataset.num = j;
            item.dataset.column = i;
            item.dataset.figure = '';

            list.appendChild(item);
        }
    }

    const items = document.querySelectorAll('.wrapper__list-item');

    items.forEach(item => {
        item.addEventListener('click', () => {
            const num = item.dataset.num;
            const column = item.dataset.column;

            if (!item.dataset.figure) {
                move = !move;
                setStep(item);

                item.dataset.figure = step;
            }

            const figure = item.dataset.figure;
            const wins = {
                '1': {
                    count: 0,
                    func() {
                        this.count = [...items].filter(el => {
                            if (el.dataset.column === column && el.dataset.figure === figure) {
                                return el;
                            }
                        }).length;

                        if (this.count > 2) {
                            return win(figure);
                        }
                    }
                },
                '2': {
                    count: 0,
                    func() {
                        this.count = [...items].filter(el => {
                            if (el.dataset.num === num && el.dataset.figure === figure) {
                                return el;
                            }
                        }).length;

                        if (this.count > 2) {
                            return win(figure);
                        }
                    }
                },
                '3': {
                    figure,
                    func() {
                        this.figure = items[0].dataset.figure;

                        if (this.figure) {
                            if (items[4].dataset.figure === this.figure && items[8].dataset.figure === this.figure) {
                                return win(figure);
                            }
                        }
                    }
                },
                '4': {
                    figure,
                    func() {
                        this.figure = items[2].dataset.figure;

                        if (this.figure) {
                            if (items[4].dataset.figure === this.figure && items[6].dataset.figure === this.figure) {
                                return win(figure);
                            }
                        }
                    }
                }
            }

            for (let i in wins) {
                wins[i].func();
            }

            if ([...items].every(item => item.dataset.figure)) {
                points.draw++;

                result_game.innerHTML = 'Ничья!';

                setTimeout(() => {
                    result_game.innerHTML = 'Идет игра';
                }, ms);

                items.forEach(item => {
                    item.innerHTML = '';
                    item.dataset.figure = '';
                });

                localStorage.setItem('points', JSON.stringify(points));

                showWinner();
                writeResults();
                setStatistic();
            }
        });
    });

    function setStep(item) {
        const cross = '<span class="cross-big"></span>';
        const circle = '<span class="circle-big"></span>';

        step = move ? 'cross' : 'circle';

        if (move) {
            item.innerHTML = cross;

            whose_move.classList.remove('cross');
            whose_move.classList.add('circle');
        } else {
            item.innerHTML = circle;

            whose_move.classList.add('cross');
            whose_move.classList.remove('circle');
        }
    }

    function win(winner) {
        if (winner) {
            items.forEach(item => {
                item.innerHTML = '';
                item.dataset.figure = '';
            });
        }

        checkWin(winner);
        writeResults();
    }

    function checkWin(winner) {
        if (winner === 'cross') {
            points.cross.win++;
            points.circle.lose++;

            result_game.innerHTML = 'Победил крестик!';

            setTimeout(() => {
                result_game.innerHTML = 'Идет игра';
            }, ms);
        } else if (winner === 'circle') {
            points.circle.win++;
            points.cross.lose++;

            result_game.innerHTML = 'Победил нолик!';

            setTimeout(() => {
                result_game.innerHTML = 'Идет игра';
            }, ms);
        }

        setStatistic();
        showWinner();

        localStorage.setItem('points', JSON.stringify(points));
    }

    function showWinner() {
        const els_results = document.querySelectorAll('.wrapper__results-item');

        if (points.cross.win > points.circle.win) {
            els_results[0].classList.add('win');
            els_results[1].classList.remove('win');

            els_results[0].classList.remove('lose');
            els_results[1].classList.add('lose');
        } else if (points.cross.win < points.circle.win) {
            els_results[0].classList.remove('win');
            els_results[1].classList.add('win');

            els_results[0].classList.add('lose');
            els_results[1].classList.remove('lose');
        } else {
            els_results[0].classList.remove('win');
            els_results[1].classList.remove('win');

            els_results[0].classList.remove('lose');
            els_results[1].classList.remove('lose');
        }
    }
    showWinner();

    function writeResults() {
        results.forEach(res => {
            const figure = res.dataset.figure;

            if (figure === 'cross') {
                res.innerHTML = points.cross.win;
            } else if (figure === 'circle') {
                res.innerHTML = points.circle.win;
            }
        });
    }

    btn_reset.addEventListener('click', () => {
        points = {
            cross: {
                win: 0,
                lose: 0
            },
            circle: {
                win: 0,
                lose: 0
            },
            draw: 0
        }

        writeResults();
        setStatistic();
        showWinner();

        localStorage.setItem('points', JSON.stringify(points));
    });

    btn_show_statistic.addEventListener('click', () => {
        block.classList.toggle('rotate-y');
    });

    function setStatistic() {
        statistics.forEach(item => {
            const data = item.dataset.statistic;

            if (data === 'wins') {
                const wins = Array.from(Object.values(points)).reduce((total, item) => {
                    if (typeof item === 'object') {
                        total += item.win;
                    }

                    return total;
                }, 0);

                item.innerHTML = wins;
            }

            if (data === 'lose') {
                const lose = Array.from(Object.values(points)).reduce((total, item) => {
                    if (typeof item === 'object') {
                        total += item.lose;
                    }

                    return total;
                }, 0);

                item.innerHTML = lose;
            }

            if (data === 'wins-cross') {
                item.innerHTML = points.cross.win;
            }

            if (data === 'lose-cross') {
                item.innerHTML = points.cross.lose;
            }

            if (data === 'wins-circle') {
                item.innerHTML = points.circle.win;
            }

            if (data === 'lose-circle') {
                item.innerHTML = points.circle.lose;
            }

            if (data === 'draw') {
                item.innerHTML = points.draw;
            }
        });
    }

    setStatistic();
}

game();