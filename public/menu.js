function Menu() {};

Menu.prototype = {
  _name:null,
  _menu:null,
  _opened:false,
  _counter:0,
  _speedlist: new Array ( 1,1,1,1,1,2,2,2,4,5,6,6,10,10,20,20,30,30,50,50,50,70,70,100,100 ),
  init:function( name ) {
    this._name = name;
  },
  show:function() {
    var save = document.createElement( "div" );
    save.style.position = 'absolute';
    save.style.top      = '710px';
    save.style.left     = '0px';
    save.style.width    = '100%';
    save.style.height   = '30px';
    save.align          = "center";
    save.innerHTML      = "Save canvas...";
    save.onmouseover   = function(e) { e.target.style.backgroundColor = 'orange'; }
    save.onmouseout    = function(e) { e.target.style.backgroundColor = 'lightgrey'; }
    save.onmouseup     = saveCanvas;

    var upload = document.createElement( "div" );
    upload.style.position = 'absolute';
    upload.style.top      = '740px';
    upload.style.left     = '0px';
    upload.style.width    = '100%';
    upload.style.height   = '30px';
    upload.align          = "center";
    upload.innerHTML      = "Upload image...";
    upload.onmouseover   = function(e) { e.target.style.backgroundColor = 'orange'; }
    upload.onmouseout    = function(e) { e.target.style.backgroundColor = 'lightgrey'; }
    upload.onmouseup     = frameUpload;

    var m = document.createElement( "div" );
    m.style.position = 'absolute';
    m.style.top      = '770px';
    m.style.left     = '0px';
    m.style.width    = '100%';
    m.style.height   = '30px';
    m.align          = "center";
    m.innerHTML      = "Menu";
    m.menu           = this._name;
    m.onmouseover   = function(e) { e.target.style.backgroundColor = 'orange'; }
    m.onmouseout    = function(e) { e.target.style.backgroundColor = 'lightgrey'; }
    m.onmouseup     = function(e) { setTimeout( e.target.menu + ".open();", 5 ) };

    var f = document.createElement( "div" );
    f.style.position = 'absolute';
    f.style.top      = '-770px';
    f.style.left     = '500px';
    f.style.width    = '250px';
    f.style.height   = '800px';
    f.style.border   = 'solid 2px steelblue';
    f.style.zIndex   = 117;
    f.style.backgroundColor = 'lightgrey';
    f.align          = "center";
//    f.innerHTML      = "Menu";
    f.menu           = this._name;

    f.appendChild( m );
    f.appendChild( upload );
    f.appendChild( save );

    var o2 = document.body.appendChild( f );
    this._menu       = o2;

    

  },
  open:function() {
    this._opened = ! this._opened;
    this._counter = -1;
    this.openHelper( this._name );
  },
  openHelper:function( n ) {
    var top = parseInt( this._menu.style.top );
    this._counter++;
    switch ( this._opened ) {
      case false:
           if ( top > -770 ) top -= this._speedlist[ this._counter ];
              else           top = -770;
           this._menu.style.top = top + 'px';
           if ( top > -770 ) setTimeout( n + ".openHelper( '" + n + "' );", 7 );
   //        this._menu.style.top = '-770px';
           break;
      case true:
           if ( top < 0 ) top += this._speedlist[ this._counter ];
                  else     top = 0;
           if ( top < 0 ) setTimeout( n + ".openHelper( '" + n + "' );", 7 );
           this._menu.style.top = top + 'px';
           break;
    }
  }
};

function frameUpload() {
  menu.open();
//  alert( 'upload...' );

  var o = document.createElement( "div" );
  f  = "<form id='uploadForm' >";
  f += "<input name='File01'  type='file' >";
  f += "</form>";
  f += "<button onclick='execUpload();' >upload... </button>";
  o.style.position  = 'absolute';
  o.style.top       = '0px';
  o.style.left      = '0px';
  o.style.backgroundColor = 'white';
  o.style.zIndex    = 1000;

  o.innerHTML = f;

  document.body.appendChild( o );

}

function execUpload() {
  var oForm = document.getElementById("uploadForm");
      
  var formdata = new FormData( oForm );
//  formdata.append("file", file1);

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      alert(xmlhttp.responseText);
    }
  };
  try {
  xmlhttp.open("POST", "cgi/upload.ashx", true);
  xmlhttp.send(formdata);
  } catch ( e ) { alert( e ); }

}

function getImageFileList() {

  var xmlhttp = new XMLHttpRequest();
/*
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      alert(xmlhttp.responseText);
    }
  };
*/
  try {
    xmlhttp.open("GET", "cgi/filelist.ashx", false);
    xmlhttp.send();
    switch ( xmlhttp.status ) {
      case 200:
        alert(xmlhttp.responseText);
        return xmlhttp.responseText.split( "," );
        break;
    }

  } catch ( e ) { alert( e ); }
  return null;
}

function saveCanvas() {

  var txt = document.getElementById( 'canvas' ).innerHTML;
  var xmlhttp = new XMLHttpRequest();
  var formdata = new FormData();
  formdata.append("canvas", txt );
/*
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      alert(xmlhttp.responseText);
    }
  };
*/
  try {
    xmlhttp.open("POST", "cgi/savecanvas.ashx", false);
    xmlhttp.send( txt );
    switch ( xmlhttp.status ) {
      case 200:
        alert(xmlhttp.responseText);
        break;
    }

  } catch ( e ) { alert( e ); }

}


