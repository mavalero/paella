﻿package paella {	import paella.JavascriptTrace;public class JavascriptInterface {	public function JavascriptInterface() {	}		public function sendEvent(eventName:String, eventValues:String):void {		JavascriptTrace.debug("send event: " + eventName + ", values: " + eventValues);	}}	}