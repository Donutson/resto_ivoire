
const prendreAction = (id, code)=>{


	const make = document.getElementById("make");

	const div = document.createElement("div");
	div.id = id;


	const p = document.createElement("p");
	p.textContent = code;

	const link1 = document.createElement("a");
	link1.href = "/caisse/ready/" + id;
	link1.setAttribute("onclick", "achieve("+id+", '"+code+"')");
	const button1 =document.createElement("button");
	button1.className = "ready";
	button1.textContent = "Prete";
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

	make.appendChild(div);

}

socket.on("commande take", prendreAction);

