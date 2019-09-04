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
	var numArtPieces = 8018;
	var index = parseInt(Math.random() * numArtPieces);
	var linkEnding = "/full/1000,/0/default.jpg";
	var imgLink = art[index].imgLink.concat(linkEnding);

	return {
		'imgLink': imgLink,
		'link': art[index].link,
		'title': art[index].title,
		'author':art[index].author
	};
}

function updateStorage(imgIndex, callback){
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
  chrome.storage.local.set({[imgIndex]: false});
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
        chrome.storage.local.set({[imgIndex]: true}, function() {
          if(callback) callback();
        });
			});
		}
	)
}

chrome.runtime.onStartup.addListener(function() {
	chrome.storage.local.set({'imgMod':'0'}, function() {
    updateStorage('0', function() {
      updateStorage('1', function() {
        updateStorage('2', function() {
          updateStorage('3', function() {
            updateStorage('4');
          });
        });
      });
    });
  });
});

chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.local.set({'imgMod':'0'}, function() {
    updateStorage('0', function() {
      updateStorage('1', function() {
        updateStorage('2', function() {
          updateStorage('3', function() {
            updateStorage('4');
          });
        });
      });
    });
  });
});

chrome.tabs.onCreated.addListener(function() {
  chrome.storage.local.get('imgMod', function(result) {
  	var imgMod = parseInt(result['imgMod']);
    updateStorage(((imgMod + 4) % 5).toString());
    chrome.storage.local.set({'imgMod': ((imgMod + 1) % 5)}, function() {
      console.log('Successfullllll');
    });
  });
});
