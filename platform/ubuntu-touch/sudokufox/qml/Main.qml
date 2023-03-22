import QtQuick 2.7
import Ubuntu.Components 1.3
//import QtQuick.Controls 2.2
import QtQuick.Layouts 1.3
import Qt.labs.settings 1.0
import QtQuick.Window 2.2
import Morph.Web 0.1
import QtWebEngine 1.7
import Qt.labs.settings 1.0
import QtSystemInfo 5.5
import io.thp.pyotherside 1.4

MainView {
  id: root
  objectName: 'mainView'
  applicationName: 'sudokufox.lluise'
  automaticOrientation: true

  width: units.gu(45)
  height: units.gu(75)

  Page {
    anchors.fill: parent

    header:  WebView {
      anchors{
	fill: parent
      }

      Timer {
        id: timer
      }

      function delay(delayTime, cb) {
        timer.interval = delayTime;
        timer.repeat = false;
        timer.triggered.connect(cb);
        timer.start();
      }

      id: webview
      anchors{ fill: parent }
      enableSelectOverride: true

      settings.fullScreenSupportEnabled: true
      settings.localContentCanAccessFileUrls: true
      settings.localStorageEnabled: true
      settings.showScrollBars: false

      property var currentWebview: webview
      settings.pluginsEnabled: true

      onFullScreenRequested: function(request) {
	nav.visible = !nav.visible
	request.accept();
      }

      profile:  WebEngineProfile {
        id: webContext
        persistentCookiesPolicy: WebEngineProfile.ForcePersistentCookies
        property alias dataPath: webContext.persistentStoragePath
        dataPath: dataLocation
      }

      onLoadingChanged: {
        console.log("onLoadingChanged:", loadRequest.url);
      }

      /* onLoadingChanged: { */
      /*   console.log("onLoadingChanged:", loadRequest.url); */

      /*   if (loadRequest.url.toString().indexOf("assets/splash.png") >= 0) { */
      /*     console.log("We loaded the splash, lets wait to load the webapp"); */
      /*     delay(300, function() { */
      /*       console.log("Nice! Lets access the localhost server"); */
      /*       url = 'http://127.0.0.1:3169'; */
      /*     }) */
      /*   } */
      /* } */

      /* url: "assets/splash.png"; */

      url: Qt.resolvedUrl("index.html")
    }
  }

  /* Python { */
  /*   id: python */

  /*   Component.onCompleted: { */
  /*     addImportPath('src'); */

  /*     importModule('server', function() { */
  /*       console.log('server module imported'); */
  /*       python.call('server.fire', ["www/index.html"], function(returnValue) { */
  /*         console.log('server.fire returned ' + returnValue); */
  /*       }) */
  /*     }); */
  /*   } */

  /*   onError: { */
  /*     console.log('python error: ' + traceback); */
  /*   } */
  /* } */
}
