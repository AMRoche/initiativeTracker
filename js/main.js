var generator = {
	"characters" : [],//{id : , element : , initMod : , init: }
	"labels" : ["Dead!","Name:","Alignment:","Init Mod:","Roll:","Init:"],
	"types" : ["button","text","select","number","number","number"],
	"id" : ["","name","alignment","mod","roll","init"],
	"selectBox" : ["Neutral","Good","Bad"],
	"classgiven" : ["btn btn-danger","form-control","form-control","form-control","form-control","form-control"],
	"createSortObject" : function(){
		generator.characters.splice(0, generator.characters.length);
		var els = $("li");
		for(var i = 0; i < els.length; i++){
			var obj = {};
			obj.id = els[i].id;
			obj.element = els[i];
			obj.initMod = parseInt($("#mod"+els[i].id).val(),10);
			obj.init = parseInt($("#init"+els[i].id).val(),10);
			console.log(obj);
			generator.characters.push(obj);
		}
	},
	"objSort" : function(type){
		generator.characters.sort(function(a,b){
			if(type == "desc"){
				if(a.init > b.init){
					return 1;
				}
				if(b.init > a.init){
					return -1;
				}
				if(b.init == a.init){
					if(a.initMod > b.initMod){
						return 1;
					}
					if(b.initMod > a.initMod){
						return -1;
					}
					if(a.initMod == b.initMod){
						return 0;
					}
				}}
			if(type == "asc"){
				if(a.init > b.init){
					return -1;
				}
				if(b.init > a.init){
					return 1;
				}
				if(b.init == a.init){
					if(a.initMod > b.initMod){
						return -1;
					}
					if(b.initMod > a.initMod){
						return 1;
					}
					if(a.initMod == b.initMod){
						return 0;
					}
				}
				
			}
		});
		for(var i = generator.characters.length-1; i >= 0; i--){
			document.getElementById("trackBaddies").appendChild(generator.characters[i].element);
		}
		console.log(generator.characters);
	},
	"returnSafeId" : function(){
		var longs = $("li");
		console.log(longs);
		console.log(longs.length);
		if(longs.length == 0){
			return "0";
		}else{
			var high = 100;
			if(high <= longs.length){
				high = longs.length +5;
			}
				
			for(var i = 0; i < high; i++){
				var isCorr = false;
				for(var j = 0; j < longs.length; j++){
					if(parseInt(longs[j].id,10) == i){
						isCorr = true;
					}
				}		
				if(isCorr == false){
					return i+"";
				}
			}
		}
	},
	"newPerp" : function(){
		var idNum = generator.returnSafeId();
		var li = document.createElement("li");
		li.id = idNum;
		li.class="player well Neutral";
		li.className="player well Neutral";	
		for(var i = 0; i < generator.labels.length; i++){
			console.log(generator.labels[i]);
			if(generator.types[i] == "button"){
				var element = document.createElement("input");
				element.type=generator.types[i];
				element.className=generator.classgiven[i];
				element.class=generator.classgiven[i];
				element.id = generator.id[i]+idNum;
				element.innerHTML = generator.labels[i];
				element.value = generator.labels[i];
				element.addEventListener("click",function(){this.parentNode.parentNode.removeChild(this.parentNode)});
				li.appendChild(element);
			}
			if(generator.types[i] != "button" && generator.types[i] != "select"){
				var label = document.createElement("label");
				label.setAttribute("for",generator.id[i]);
				label.innerHTML = generator.labels[i];
				li.appendChild(label);
				var input = document.createElement("input");
				input.type=generator.types[i];
				input.className = generator.classgiven[i];
				input.class=generator.classgiven[i];
				input.id=generator.id[i]+idNum;
				if(generator.types[i] == "number")
				{
					input.value = 0;
				}
				li.appendChild(input);
			}
			if(generator.types[i] == "select"){
				var label = document.createElement("label");
				label.setAttribute("for",generator.id[i]);
				label.innerHTML = generator.labels[i];
				li.appendChild(label);
				var input = document.createElement("select");
				input.type=generator.types[i];
				input.className = generator.classgiven[i];
				input.class=generator.classgiven[i];
				input.id=generator.id[i]+idNum;
				for(var j = 0; j < generator.selectBox.length; j++){
					var opts = document.createElement("option");
					opts.innerHTML = generator.selectBox[j];
					opts.value = generator.selectBox[j];
					input.appendChild(opts);
				}
				input.addEventListener("change",function(){
					this.parentNode.setAttribute("class","well person "+this.value);
					this.parentNode.setAttribute("className","well person "+this.value);
				});
				li.appendChild(input);
			}
		}
	return li;
	}
	//sort everything first, then re-insert.
	//have insert function take values of how many have been inserted so the last x ammount that have already been inserted can be ignored.
}
window.onload = function(){
document.getElementById("JS-sortLow").addEventListener("click",function(){generator.createSortObject();generator.objSort("asc");});
document.getElementById("JS-sortHigh").addEventListener("click",function(){generator.createSortObject();generator.objSort("desc");});
document.getElementById("JS-addNew").addEventListener("click",function(){document.getElementById("trackBaddies").appendChild(generator.newPerp())});
document.getElementById("trackBaddies").appendChild(generator.newPerp());
}