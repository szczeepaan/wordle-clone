const elements = document.querySelectorAll('.letter');
const keyboardKeys = document.querySelectorAll('.key');

responsive();

window.addEventListener('resize', function() {
    responsive();
});

function responsive() {
    let height = window.getComputedStyle(elements[0]);
    let keyWidth = window.getComputedStyle(keyboardKeys[0]);
    height = height.getPropertyValue('height');
    keyWidth = keyWidth.getPropertyValue('width')
    // console.log(width)
    elements.forEach(element => {
        element.style.setProperty('width', height);
    });
    keyboardKeys.forEach(key => {
        if (key.classList.contains('long')) {
            key.style.setProperty('min-width', String(Number(parseInt(keyWidth) * 1.5) + 'px'))
        }
        key.style.setProperty('height', keyWidth);
    });
    console.log(Number(parseInt(keyWidth)) * 1.5)
}