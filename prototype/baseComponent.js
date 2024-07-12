import fetch from 'node-fetch';

class BaseComponent {
  constructor() {
  }
  async fetch(url = '', data = {}, type = 'GET', resType = 'JSON'){
    type = type.toUpperCase();
    resType = resType.toUpperCase();
    if(type === 'GET'){
      let dataSet = '';
      Object.keys(data).forEach(key => {
        dataSet += key + '=' + data[key] + '&';
      })
      if(dataSet !== ''){
        dataSet = dataSet.substring(0,dataSet.length - 1);
        url = url + '?' + dataSet;
      }
    }

    let requestConfig = {
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }

    if(type === 'POST'){
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }
    let responseJson;
    try{
      const response = await fetch(url, requestConfig);
      responseJson = resType === 'TEXT' ? await response.text() : await response.json();
    }catch (e) {
      console.log('获取http数据失败', e);
      throw new Error(e);
    }
    return responseJson;
  }
}

export default BaseComponent;
