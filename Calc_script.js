document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.neon');
    const onBtn = document.getElementById('on');
    const offBtn = document.getElementById('off');
    const clearBtn = document.getElementById('clear');
    const deleteBtn = document.getElementById('delete');
    const operators = document.querySelectorAll('.neon-skyblue');
    
    let calculatorOn = true;

    onBtn.addEventListener('click', function() {
        calculatorOn = true;
        display.value = '0';
        display.classList.remove('fade-out');
    });

    offBtn.addEventListener('click', function() {
        calculatorOn = false;
        display.value = '';
        display.classList.remove('fade-out');
    });

    clearBtn.addEventListener('click', function() {
        if (calculatorOn) {
            display.value = '0';
        }
    });

    deleteBtn.addEventListener('click', function() {
        if (calculatorOn) {
            display.value = display.value.slice(0, -1);
        }
    });

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = button.innerText;

            if (!calculatorOn) {
                return;
            }

            if (buttonText === '=') {
                try {
                    display.value = safeEval(display.value);
                } catch (error) {
                    display.value = 'Error';
                }
            } else if (buttonText === 'DEL') {
                display.value = display.value.slice(0, -1);
            } else {
                if (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/') {
                    if (display.value.slice(-1) === '+' || display.value.slice(-1) === '-' || 
                        display.value.slice(-1) === '*' || display.value.slice(-1) === '/') {
                        display.value = display.value.slice(0, -1);
                    }
                }
                
                if (display.value === '0') {
                    display.value = '';
                }
                display.value += buttonText;
            }
        });
    });

    operators.forEach(operator => {
        operator.addEventListener('click', function() {
            const operatorText = operator.innerText;

            if (display.value.slice(-1) === operatorText) {
                return;
            }

            if (calculatorOn) {
                display.value += operatorText;
            }
        });
    });

    display.addEventListener('input', function() {
        if (display.value !== '') {
            display.classList.add('fade-out');
        }
    });

    function safeEval(expression) {
        return new Function('return ' + expression)();
    }
});
