const compressImg = function (file, quality, callback) {
  if (!window.FileReader || !window.Blob) {
    errorHandler('浏览器不支持压缩')();
    return;
  }
  var Orientation = null;
  var reader = new FileReader();
  var mimeType = file.type || 'image/jpeg';

  getOrientation(file, function(){
    var imageHasData = !!(file.exifdata);
    if (!imageHasData) return;
    Orientation = file.exifdata.Orientation;
  });

  reader.onload = createImage;
  reader.onerror = errorHandler('图片读取失败！');
  reader.readAsDataURL(file);

  function createImage() {
    var dataURL = this.result;
    var image = new Image();
    image.onload = compressImage;
    image.onerror = errorHandler('图片加载失败 请重新上传');
    image.src = dataURL;
  }

  function compressImage() {
    var dataURI;
    var result;
    var imgWidth = this.width,
      imgHeight = this.height;

    if (imgWidth > imgHeight && imgWidth > 840) {
      imgWidth = 840;
      imgHeight = Math.ceil(840 * this.height / this.width);
    } else if (imgWidth < imgHeight && imgHeight > 550) {
      imgWidth = Math.ceil(550 * this.width / this.height);
      imgHeight = 550;
    }
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    console.log('Orientation', Orientation);
    if (Orientation && Orientation != 1) {
      switch (Orientation) {
        case 6:
          canvas.width = imgHeight;
          canvas.height = imgWidth;
          ctx.rotate(Math.PI / 2);
          ctx.drawImage(this, 0, -imgHeight, imgWidth, imgHeight);
          break;
        case 3:
          ctx.rotate(Math.PI);
          ctx.drawImage(this, -imgWidth, -imgHeight, imgWidth, imgHeight);
          break;
        case 8:
          canvas.width = imgHeight;
          canvas.height = imgWidth;
          ctx.rotate(3 * Math.PI / 2);
          ctx.drawImage(this, -imgWidth, 0, imgWidth, imgHeight);
          break;
      }
    } else {
      ctx.drawImage(this, 0, 0, imgWidth, imgHeight);
    }
    dataURI = canvas.toDataURL(mimeType, quality); // 用canvas.toDataURL进行图片压缩得到图片的data uri值
    result = dataURIToBlob(dataURI);
    callback(null, result, dataURI);// 压缩成功返回 blob文件
  }

  function dataURIToBlob(dataURI) {
    var type = dataURI.match(/data:([^;]+)/)[1];
    var base64 = dataURI.replace(/^[^,]+,/, '');
    var byteString = atob(base64);
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob;
    try {
      blob = new Blob([ia], { type: 'image/jpg' });
    } catch (e) {
      window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;// 兼容部分builder
      if (e.name === 'TypeError' && window.BlobBuilder) {
        var blobBuilder = new BlobBuilder();
        blobBuilder.append(ia);
        blob = blobBuilder.getBlob('image/jpg');
      }
    }
    return blob;
  }

  function errorHandler(message) {
    return function () {
      var error = message;
      callback(error, file, {});
    };
  }

};

