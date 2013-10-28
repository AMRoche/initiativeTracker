var generator = {
	"labels" : ["Dead!","Name:","Alignment:","Init Mod:","Roll:","Init:"],
	"types" : ["button","text","select","number","number","number"],
	"id" : ["","name","alignment","mod","roll","init"],
	"selectBox" : ["Neutral","Good","Bad"],
	"classgiven" : ["btn btn-danger","form-control","form-control","form-control","form-control","form-control"],
	"newPerp" : function(){
		var li = document.createElement("li");
		li.class="player well Neutral";
		li.className="player well Neutral";	
		for(var i = 0; i < generator.labels.length; i++){
			console.log(generator.labels[i]);
			if(generator.types[i] == "button"){
				var element = document.createElement("input");
				element.type=generator.types[i];
				element.className=generator.classgiven[i];
				element.class=generator.classgiven[i];
				element.id = generator.id[i];
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
				input.id=generator.id[i];
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
				input.id=generator.id[i];
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
document.getElementById("JS-addNew").addEventListener("click",function(){document.getElementById("trackBaddies").appendChild(generator.newPerp())});
document.getElementById("trackBaddies").appendChild(generator.newPerp());
}