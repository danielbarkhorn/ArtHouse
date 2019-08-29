var imgMod;

function newTab() {
	imgInd = imgMod.toString();
	newData = ['imgLink' + imgInd, 'link' + imgInd, 'title' + imgInd, 'author' + imgInd];

  console.log(imgInd);

	chrome.storage.local.get(newData, function(result) {
		document.getElementsByClassName('artwork-container__artwork')[0].src = result[newData[0]];
		document.getElementsByClassName('artwork-container__title')[0].href = result[newData[1]];
		document.getElementsByClassName('artwork-container__title')[0].innerHTML = result[newData[2]];
		document.getElementsByClassName('artwork-container__subtitle')[0].innerHTML = result[newData[3]];
    chrome.storage.local.set({'imgMod': ((imgMod + 1) % 5)}, function() {
      updateStorage(imgMod.toString());
    });
	});
}

chrome.storage.local.get('imgMod', function(result) {
  imgMod = result['imgMod'];
  newTab();
});
