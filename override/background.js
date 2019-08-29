function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

function randomArtwork(){
	var numArtPieces = 8020;
	var index = parseInt(Math.random() * numArtPieces);
	var height = parseInt(window.innerHeight * 1.25).toString();
	var linkEnding = "/full/".concat(height, ",/0/default.jpg");
	var imgLink = art[index].imgLink.concat(linkEnding);

	return {
		'imgLink': imgLink,
		'link': art[index].link,
		'title': art[index].title,
		'author':art[index].author
	};
}

function updateStorage(imgIndex){
	var newArt = randomArtwork();
	var [
		imgLinkInd,
		linkInd,
		titleInd,
		authorInd
	] = [
		'imgLink' + imgIndex,
		'link' + imgIndex,
		'title' + imgIndex,
		'author' + imgIndex
	];
	toDataURL(
	  newArt.imgLink,
	  function(dataUrl) {
			var toStore = {
				[imgLinkInd]: dataUrl,
				[linkInd]: newArt.link,
				[titleInd]: newArt.title,
				[authorInd]: newArt.author
			};
			chrome.storage.local.set(toStore, function() {
				console.log('Set!');
			});
		}
	)
}

chrome.runtime.onStartup.addListener(function() {
	chrome.storage.local.set({'imgMod':0});

	updateStorage('0');
	updateStorage('1');
	updateStorage('2');
	updateStorage('3');
	updateStorage('4');
});
