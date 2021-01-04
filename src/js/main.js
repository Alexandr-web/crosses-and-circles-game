const game = () => {
    const list = document.querySelector('.wrapper__list');
    const btn_reset = document.querySelector('.wrapper__reset');
    const modal_window = document.querySelector('.wrapper__modal-window');
    const modal_window_desc = document.querySelector('.wrapper__modal-window-desc');
    const modal_window_btn = document.querySelector('.wrapper__modal-window-btn');
    const cross = '<svg viewBox="0 0 365.71733 365" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><g fill="#f44336"><path d="m356.339844 296.347656-286.613282-286.613281c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503906-12.5 32.769532 0 45.25l286.613281 286.613282c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082032c12.523438-12.480468 12.523438-32.75.019532-45.25zm0 0"/><path d="m295.988281 9.734375-286.613281 286.613281c-12.5 12.5-12.5 32.769532 0 45.25l15.082031 15.082032c12.503907 12.5 32.769531 12.5 45.25 0l286.632813-286.59375c12.503906-12.5 12.503906-32.765626 0-45.246094l-15.082032-15.082032c-12.5-12.523437-32.765624-12.523437-45.269531-.023437zm0 0"/></g></svg>';
    const circle = `
    <?xml version="1.0" encoding="iso-8859-1"?>
    <svg version="1.1" id="Layer_1" width="32" height="32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <path style="fill:#E21B1B;" d="M255.832,56.037c110.44,0.096,199.891,89.691,199.795,200.131s-89.691,199.891-200.131,199.795 C145.127,455.867,55.701,366.368,55.701,256C55.877,145.568,145.399,56.117,255.832,56.037 M255.832,0 C114.443,0.096-0.096,114.779,0,256.168S114.779,512.096,256.168,512C397.485,511.904,512,397.317,512,256 C511.952,114.571,397.261-0.048,255.832,0z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>    
    `;

    let move = false;
    let step = '';

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
        });
    });

    function setStep(item) {
        step = move ? 'cross' : 'circle';

        if (move) {
            item.innerHTML = cross;
        } else {
            item.innerHTML = circle;
        }
    }

    function win(winner) {
        modal_window.style.top = '50px';
        modal_window_desc.innerHTML = `Выиграл ${winner === 'cross' ? 'крестик' : 'нолик'}.`;

        modal_window_btn.addEventListener('click', () => {
            modal_window.style.top = '-200px';

            items.forEach(item => {
                item.innerHTML = '';
                item.dataset.figure = '';
            });
        });
    }

    btn_reset.addEventListener('click', () => {
        items.forEach(item => {
            item.innerHTML = '';
            item.dataset.figure = '';
        });
    });
}

game();