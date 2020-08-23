const socket1 = io();

ncommande = (id, code)=>{
	
	const wait = document.getElementById("wait");

	const div = document.createElement("div");
	div.id = id;


	const p = document.createElement("p");
	p.textContent = code;

	const link1 = document.createElement("a");
	link1.href = "/caisse/take/" + id;
	link1.setAttribute("onclick", "prendre("+id+", '"+code+"')");
	const button1 =document.createElement("button");
	button1.className = "make";
	button1.textContent = "Prendre";
	link1.appendChild(button1);

	const link2 = document.createElement("a");
	link2.href = "/caisse/cancel/" + id;
	link2.setAttribute("onclick", "takeOff("+id+")");
	const button2 =document.createElement("button");
	button2.className = "end";
	button2.textContent = "Réfusé";
	link2.appendChild(button2);


	div.appendChild(p);
	div.appendChild(link1);
	div.appendChild(document.createTextNode(" "));
	div.appendChild(link2);

	wait.appendChild(div);

}

socket1.on("new commande", ncommande);