window.onload = function() {
    setFullSize($(window).width(), $(window).height());
};

window.onresize = function() {
    setFullSize($(window).width(), $(window).height());
};

function setFullSize(width, height) {    
    //$("#customer_dialog_area").width(width);
    //$("#customer_dialog_area").height(height);
    
};


/* Array.shuffle( deep ) - перемешать элементы массива случайным образом

deep - необязательный аргумент логического типа, указывающий на то, 
       нужно ли рекурсивно обрабатывать вложенные массивы;
       по умолчанию false (не обрабатывать)
*/
Array.prototype.shuffle = function( b )
{
 var i = this.length, j, t;
 while( i ) 
 {
  j = Math.floor( ( i-- ) * Math.random() );
  t = b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
  this[i] = this[j];
  this[j] = t;
 }

 return this;
};