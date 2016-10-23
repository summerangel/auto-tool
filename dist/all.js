/**
 * Created by summer on 16/10/21.
 */
window.onload = function(){
    var circle= document.querySelector('.circle');
    var box = document.querySelector('.tips');
    box.classList.add('rotate');
    var el= document.querySelector('#number');
    var numAnim =new CountUp(el, 960, 0, 2.6);
    numAnim.start();

    document.addEventListener('click',function(e){
        circle.classList.toggle('animated');
        if(circle.classList.toString() === 'circle animated'){
            numAnim.reset();
        } else {
            numAnim.start();
        }
    },false);
};