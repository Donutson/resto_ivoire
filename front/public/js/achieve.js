const achieveAction = (id, code)=>{

	const ready = document.getElementById("ready");

	const div = document.createElement("div");
	div.id = id;


	const p = document.createElement("p");
	p.textContent = code;

	const link1 = document.createElement("a");
	link1.href = "/caisse/send/" + id;
	link1.setAttribute("onclick", "takeOff("+id+", '"+code+"')");
	const button1 =document.createElement("button");
	button1.className = "end";
	button1.textContent = "Livrer";
	link1.appendChild(button1);

	const link2 = document.createElement("a");
	link2.href = "/caisse/see/" + id;
	const button2 =document.createElement("button");
	button2.className = "end";
	button2.textContent = "Voir";
	link2.appendChild(button2);


	div.appendChild(p);
	div.appendChild(link1);
	div.appendChild(document.createTextNode(" "));
	div.appendChild(link2);

	ready.appendChild(div);

}

socket.on("commande achieve", achieveAction);

