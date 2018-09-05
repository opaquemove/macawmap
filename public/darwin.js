//Copyright 2003-2008. MASATO.NAKANISHI. All rights reserved.
//**Start Encode**


//-----------------------------------------------------------------------
//	darwin Objects ( async type )
//-----------------------------------------------------------------------

function Darwin() {};

//
//	以下のファンクションを持つ
//	.init
//	.load
//	.abort
//	.loadTextData
//	.isAlive
//	.defaultHandler(N/A)
//

Darwin.prototype = {
	url:null,               //  送信先URL
	httpmethod:"get",       //  HTTPメソッド名
	xmlhttp:null,           //  XMLHTTPオブジェクト
	
	//
	//	初期化
	//
	//  httpmethod:         メソッド[GET|POST|HEAD|...]を指定する
	//  url:                送信先アドレス
	//
	//  return  		void
	//
	init:function( httpmethod, url )
	{
	    this.httpmethod = httpmethod.toUpperCase();
		this.url        = url;
		if ( window.ActiveXObject )
		{
			//	xmlhttp for IE
			this.xmlhttp = new ActiveXObject( "Microsoft.XMLHTTP" );
		}
		else
		{
			//	xmlhttp for Mozilla
			this.xmlhttp = new XMLHttpRequest();
		}

	},


	//
	//	通信をアボートする
	//
	abort:function()
	{
		try { this.xmlhttp.abort(); } catch(e) {;}	
	},
	
	//
	//	指定したURLからXMLオブジェクトを取得する(同期モード）
	//
	load:function()
	{
		this.xmlhttp.open( this.httpmethod, this.url, false );
		this.xmlhttp.send( null );
		
		if ( this.xmlhttp.status < 400 )
		    return this.xmlhttp.responseXML;
		    else
		    return null;

	},

	//
	//	指定したURLからTEXTを取得する(同期モード）
	//
	loadTextData:function()
	{
		var today = new Date();
		this.xmlhttp.open( this.httpmethod, this.url + '?cache=' + today.getTime(), false );
		this.xmlhttp.send(null);
		
		if ( this.xmlhttp.status < 400 )
		    return this.xmlhttp.responseText;
		    else
		    return '';

	},

	//
	//	指定したURLにHEADメソッドでアクセス
	//	return
	//		true:存在
	//		false:存在しない
	//
	isAlive:function()
	{
		var today = new Date();
		this.xmlhttp.open( 'HEAD', this.url + '?cache=' + today.getTime(), false );
		this.xmlhttp.send(null);
		
		return ( this.xmlhttp.status < 400 );

	},
	
	//
	//      既定値用ハンドラー
	//
	defaultHandler: {
		oninit:function ( uObject ) {
		},
		onerror:function ( status, statusText ) {
		},
		onsuccess:function ( status, statusText ) {
		},
		onprogress:function ( responseXML, length ) {
		},
		onload:function ( uObject, resultXML, status ) {
		}
	}


}

