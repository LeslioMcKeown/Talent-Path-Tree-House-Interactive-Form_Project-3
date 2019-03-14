/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
Leslio McKeown
Started: 01/30/2019 - Ended: 01/31/2019
******************************************/

// This will method returns the element
// that has the ID attribute with the specified value.

let jobRoles = document.getElementById("title"),
payment = document.getElementById("payment"),
otherInput = document.querySelector("#other-title"),

design = document.getElementById("design"),
colors = document.querySelector("#color"),
selectOption = document.createElement("option"),
nameField = document.getElementById("name"),
email = document.getElementById("mail"),
form = document.getElementsByTagName("form")[0], totalCost = 0,
inputs = document.querySelector(".activities").childNodes,
activitiesArray = [], total = 0,
displayTotal = document.createElement("P"),
fieldsets = document.getElementsByTagName("fieldset"),
divs = fieldsets[fieldsets.length-1].getElementsByTagName("div"),
paypal = divs[4], bitcoin = divs[5],
credit = document.getElementById("credit-card"),
paymentOptions = document.getElementById("payment").options,
paymentOptionsArray = ["placeholder", credit, paypal, bitcoin],
checkboxes = document.querySelectorAll('input[type="checkbox"]'),
cvv = document.getElementById("cvv"), ccNum = document.getElementById("cc-num");
selectOption.textContent = "Select A T-Shirt Color";
selectOption.setAttribute("selected", "selected");

function ValidatingEmail() {
    var txt1 = document.forms[0]['txtEmailAddress'];

    if (txt1.value.length == 0) {
        alert(' Please Enter Email Address ... !!! ');
        txt1.focus();
        return false;
    }

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(txt1.value)) {
        alert('Please provide a valid email address');
        txt1.focus;
        return false;
    }
    return true;
}

window.onload = function(){
	nameField.required = true;
	email.required = true;
	otherInput.style.display = "none";
	jobRoles.setAttribute("onChange", "showInput(event);"); //createAttribute method deprecated
	document.getElementsByTagName("form")[0].children[0].getElementsByTagName("input")[0].focus();
	design.setAttribute("onChange", "matchShirt(event);");
	hideColors();
	colors.appendChild(selectOption);

	for(var i = 3; i < inputs.length; i+=2){
		inputs[i].firstChild.setAttribute("onclick", "selectActivities(event);");
		activitiesArray.push(inputs[i].firstChild);
	}
	inputs[0].parentNode.appendChild(displayTotal);


	showCredit();
	payment.setAttribute("onChange", "selectPaymentOption(event);");
}();

function matchShirt(event){
	let colorsText;
	hideColors();
	for(var x = 0; x < colors.length; x++){
		colorsText = colors.options[x].textContent;
		if(colorsText.includes("JS Puns shirt only") && design.selectedIndex === 1){
			colors.options[x].style.display = "block";
		}else if (colorsText.includes("JS shirt") && design.selectedIndex === 2){
			colors.options[x].style.display = "block";
		}
	}
}

function hideColors(){for (var i = 0; i < colors.length; i++) {
		colors.options[i].style.display = "none";
	}
}

function showInput(event){
	if(jobRoles.options[jobRoles.selectedIndex].value === "other"){

		otherInput.style.display = "block";

	}else{ otherInput.style.display = "none";
	}
}

function selectActivities(event){ let index,

	notification = document.createElement("SPAN");
  notification.style.fontSize = ".8em";


	for(let x = 0; x < activitiesArray.length; x++){
		if(event.target.parentNode.textContent === activitiesArray[x].parentNode.textContent){
			index = x;
			break;
		}
	}
  // this shall be making sure that no events overlap
    // with one another.

	if(event.target.checked === true){
		switch(index){
			case 0:
				total += 200;
				break;
			case 5:
			case 6:
				total += 100;
				break;
			case 1:
			case 2:
				total += 100;
				activitiesArray[index+2].setAttribute("disabled", "true");
				activitiesArray[index+2].parentNode.appendChild(notification);
				break;
			case 3:
			case 4:
				total += 100;
				activitiesArray[index-2].setAttribute("disabled", "true");
				activitiesArray[index-2].parentNode.appendChild(notification);
				break;
		}
	}else{
		switch(index){
			case 0:
				total -= 200;
				break;
			case 5:
			case 6:
				total -= 100;
				break;
			case 1:
			case 2:
				total -= 100;
				activitiesArray[index+2].removeAttribute("disabled");
				activitiesArray[index+2].nextElementSibling.remove();
				break;
			case 3:
			case 4:
				total -= 100;
				activitiesArray[index-2].removeAttribute("disabled");
				activitiesArray[index-2].nextElementSibling.remove();
				break;
		}
	} // this function add all the clicked button and adds
  // it all up together.
	displayTotal.textContent = "Total: $" + total.toString();
}

function selectPaymentOption(event){
	for(let x = 0; x < paymentOptions.length; x++){
		if(x === 0){continue;
		}else if(paymentOptions.selectedIndex === x){
			paymentOptionsArray[x].style.display = "block";

		}else{paymentOptionsArray[x].style.display = "none";
		}
	}
}

// Bars around the "Card Number:" "Zip Code:" "CVV:"
    // will have a red bar if input is invalid
function showCredit(){
	payment.options[1].setAttribute("selected", "selected");

	paypal.style.display = "none";
	bitcoin.style.display = "none";
}

function validateCredit(){ let valid = true;
	if((cvv.value.length !== 3) || isNaN(cvv.value)){
		cvv.style.borderColor = "red";
		event.preventDefault();
	}else{cvv.style.borderColor = "";
	}

	if((ccNum.value.length !== 16) || isNaN(ccNum.value)){
		ccNum.style.borderColor = "red";
		event.preventDefault();
	}else{ccNum.style.borderColor = "";
	}

	if((zip.value.length !== 5) || isNaN(zip.value)){
		zip.style.borderColor = "red";
		event.preventDefault();
	}else{ zip.style.borderColor = "";
	}
}

form.addEventListener("submit", function(event){
	let checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked);

	if(!checkedOne){event.preventDefault();
	}
	if(payment.options[0].selected){
		event.preventDefault();
	}
	if(paymentOptions.selectedIndex === 1)
		validateCredit();
});
///////////////CREDIT///////////////
/*
//https://developer.mozilla.org
//https://learn.jquery.com
//https://www.w3schools.com
*/
