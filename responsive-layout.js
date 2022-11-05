const elements = document.querySelectorAll('.letter');

responsive();

window.addEventListener('resize', function() {
    responsive();
});

function responsive() {
    let width = window.getComputedStyle(elements[0]);
    width = width.getPropertyValue('height');
    // console.log(width)
    elements.forEach(element => {
        element.style.setProperty('width', width)
    });
}