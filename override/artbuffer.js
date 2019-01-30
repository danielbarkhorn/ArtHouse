function artbuffer(){
	
	var url_base = "https://www.artic.edu/artworks/";
	var base = 1000;
	var max = 1000;
	var rand_id = base + Math.random() * Math.floor(max);
	url_base += rand_id;
	
	document.innerHTML = "";
	document.write(url_base);
	
}

artbuffer();
