//inicio typedscript
const typed= new Typed('.typed',{
    strings:['<i class="typedlead">Diseñadora Web</i>',
    '<i class="typedlead">Frontend Developer</i>',
    '<i class="typedlead">UX/UI developer</i>'],
    stringsElement: '#cadenade-texto',
    typeSpeed: 75,//velocidad en milesegundo para poner una letra.
    startDelay: 300,//tiempo de retraso en iniciar animación. aplica también cuando termina y vuelve a iniciar.
    backSpeed: 75,//velocidad en milesegundo para borrar una letra.
    smartBackspace: true,//elimina solamente la palabras que son nuevas en una cadena de texto.
    shuffle: false,//altera el orden en el que escribe la palabras.
    backDelay: 1500,//tiempo de espera despues de que termina de escribir una palabra.
    loop: true,// repetir el array de strings.
    loopCount: Infinity,//cantidad de veces en repetir el array. false=infinity
    showCursor: true, //mostrar pulsor palpitante.
    cursorChar: '|',//caracter para el cursor.
    contentType: 'html', //html o null para texto sin formato
});
//header menú
$(function(){
    var header = document.getElementById('header');
    var headroom = new Headroom(header);
    headroom.init();
});

