class CookMessage {
    constructor() {
        this.dom = {
            btnSend: document.querySelector('.send'),
            inpName: document.querySelector('.name'),
            inpMsg: document.querySelector('.msg'),
            output: document.querySelector('.output-block')
        };
        this.dom.btnSend.addEventListener('click', this.send.bind(this));
        this.getCookie();
    }
    getCookie() {
        const cookie = decodeURIComponent(document.cookie).split(';').map(el => el.trim());
        if (cookie != '') {
            cookie.forEach((el) => {
                let name = el.slice(0, el.indexOf('=')),
                    msg = el.slice(el.indexOf('=') + 1, el.indexOf('/time/')),
                    msgDate = el.slice(el.indexOf('/time/') + 6);

                this.renderMsg(name, msg, msgDate);
            });
        }
    };

    send() {
        if (this.dom.inpName.value == '' || this.dom.inpMsg.value == '') {
            alert('Введите имя и сообщение!');
        } else {
            this.renderMsg(this.dom.inpName.value, this.dom.inpMsg.value);
            this.setCookie(this.dom.inpName.value, this.dom.inpMsg.value);
            this.dom.inpName.value = '';
            this.dom.inpMsg.value = '';
        }
    }

    renderMsg(name, msg, msgDate = new Date().toLocaleString()) {
        const outBlock = document.createElement('div'),
            outTitle = document.createElement('h3'),
            outText = document.createElement('p'),
            outDate = document.createElement('small');
        outBlock.classList.add('output-message');
        outTitle.innerText = name;
        outText.innerText = msg;
        outDate.innerHTML = `&nbsp&nbsp<i>${msgDate}</i>`;
        outBlock.append(outTitle, outText, outDate);
        this.dom.output.prepend(outBlock);
    }

    setCookie(name, msg) {
        const d = new Date().toLocaleString();
        document.cookie = `${name}=${msg}/time/${d};`;
    }
}

const cook = new CookMessage();