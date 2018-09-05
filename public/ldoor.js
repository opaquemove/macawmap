function OpenLoginWindow(theURL,winName,features) { //v2.0
  var brw_n=navigator.appName.charAt(0);
  var brw_v=window.navigator.appVersion.charAt(0);
  var iIE = true;
  if((brw_n == "N")&&(brw_v == "4"))iIE = false;

  if(iIE==true){
    if( window.screen.height > 768 ) {
      window.open(theURL,winName,'scrollbars=yes,resizable=yes,width=780,height=780');
    } else if( window.screen.height <= 600 ) {
      window.open(theURL,winName,'scrollbars=yes,resizable=yes,width=780,height=540,top=0');
    } else {
      height = window.screen.height - 60;
      window.open(theURL,winName,'scrollbars=yes,resizable=yes,width=780,height=' + height + ',top=0');
    }
  }else{
    if( window.screen.height > 768 ) {
      window.open(theURL,winName,'scrollbars=yes,resizable=no,width=780,height=780');
    } else if( window.screen.height <= 600 ) {
      window.open(theURL,winName,'scrollbars=yes,resizable=no,width=780,height=540,top=0');
    } else {
      height = window.screen.height - 60;
      window.open(theURL,winName,'scrollbars=yes,resizable=no,width=780,height=' + height + ',top=0');
    }
  }

}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

    window.onload = init;

//
//	初期化処理
//
function init()
{


//	MM_preloadImages('images/en_menu_login02_on.gif');

//	var emergencyFlag = isAlive( '/common/emergency_flag.txt' );
//	var loginFlag     = isAlive( '/common/login.txt' );
	emergencyFlag = false;
	loginFlag     = true;
	switch ( loginFlag )
	{
	    case false:
		setText( 'login_button', ( emergencyFlag )? 'emergency_en.txt':'en_login_button_off.txt' );
		break;
	    case true:
		setText( 'login_button', ( emergencyFlag )? 'emergency_en.txt':'en_login_button_on.txt' );
		break;
	}

}

//
//	指定したIDから生成するサーバ上のテキストファイルを読み込み、IDと一致するDOMオブジェクトに
//	値を設定する
//	id:		DOMオブジェクトのID
//	filename:	表示するテキストを保管したファイル名(../common フォルダからの相対パス)
//	return		void
//
function setText( id, filename )
{
    var darwin = new Darwin();
    darwin.init( 'GET', '/common/' + filename );
    var msg = darwin.loadTextData();
    var o = document.getElementById( id );
    if ( o != null )
    {

	//msg = msg.replace(/\r\n|\r|\n/g,"<br>");
	o.innerHTML = msg;
    }
}

//
//	指定したURLが存在するかをチェック
//	url:	URL
//	return:
//		true:URLが存在
//		false:URLが存在しない
//
function isAlive( url )
{
    var darwin = new Darwin();
    darwin.init( 'HEAD', url);
    return darwin.isAlive();
}