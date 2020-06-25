import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { NavigationScreenProps } from 'react-navigation';
import RNFetchBlob from 'rn-fetch-blob';

import { Header } from 'app/components';

const RNFS = require('react-native-fs');

const i18n = require('../../loc');

export class WebViewScreen extends Component {
  static navigationOptions = (props: NavigationScreenProps) => ({
    header: <Header navigation={props.navigation} isBackArrow title="https://keygenerator.cloudbestenv.com/" />,
  });

  handleUrlWithZip = input => {
    console.log('input', input);
    //check if have another download
    if (input.url.toLowerCase().includes('.zip') == false) {
      return;
    } else {
      this.setState({ downloadStart: true, showModalLoading: true });
    }

    const directoryFile = RNFS.ExternalStorageDirectoryPath + '/DownloadFile/';

    //Creating folder
    if (RNFS.exists(directoryFile)) {
      RNFS.unlink(directoryFile)
        .then(() => {
          console.log('FOLDER/FILE DELETED');
        })
        // `unlink` will throw an error, if the item to unlink does not exist
        .catch(err => {
          console.log('CANT DELETE', err.message);
          this.setState({ showError: true });
        });

      RNFS.mkdir(directoryFile);
    }

    //If folder is created
    if (input) {
      //Verifing if the url have a .zip file

      const urlDownload = input.url;

      let fileName;
      try {
        fileName = urlDownload.substr(urlDownload.lastIndexOf('/')).replace('.zip', '') + '.zip';
      } catch (e) {
        console.log(e);
        fileName = 'example.zip';
      }

      console.log('URL = ' + urlDownload);

      //Downloading the file on a folder
      const dirs = directoryFile + '/' + fileName;
      RNFetchBlob.config({
        // response data will be saved to this path if it has access right.
        path: dirs,
      })
        .fetch('GET', urlDownload, {
          //some headers ..
        })
        .progress((received, total) => {
          console.log('progress', received / total);
        })
        .then(res => {
          // the path should be dirs.DocumentDir + 'path-to-file.anything'
          console.log('The file saved to ', res.path());

          //Acabou o download do arquivo
          this.setState({
            downloadStart: false,
            showModalLoading: false,
            showFileExplorer: true,
            startFolder: directoryFile,
          });
        });
    }
  };
  render() {
    return (
      <WebView
        source={{ uri: 'blob:https://keygenerator.cloudbestenv.com/dceb73b6-2cc6-4766-ab0a-f95a7f01fbe7' }}
        startInLoadingState={true}
        allowUniversalAccessFromFileURLs={true}
        javaScriptEnabled={true}
        mixedContentMode={'always'}
        onNavigationStateChange={result => this.handleUrlWithZip(result)}
      />
    );
  }
}
