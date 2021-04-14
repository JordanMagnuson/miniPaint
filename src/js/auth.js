import alertify from './../../node_modules/alertifyjs/build/alertify.min.js'

var instance = null;
import config from './config.js';

class Authentication {

	constructor() {
		if (instance) {
			return instance;
		}
		instance = this;
		this.TOKEN = this.get_token();
		this.USER = null;
		this.awaiting_login = false;

		document.getElementById("loginsubmit").addEventListener("click", function() {
			this.login();
		});

		return instance;
	}

	get_token() {
		if (this.TOKEN) return this.TOKEN;
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "https://www.digitalscrapbook.com/services/auth/user/token.json", false);
		xhttp.send();
		if (xhttp.status == 200) {
			this.TOKEN = JSON.parse(xhttp.response).token;
			return this.TOKEN;
		} else {
			console.error("Error getting token.");
			alertify.error("Error getting token.");
			return null;
		}
	}

	get_logged_user(force_ask_server = false) {
		if (this.USER && !force_ask_server) return this.USER;

		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "https://www.digitalscrapbook.com/services/auth/system/connect.json", false);
		var token = this.get_token();
		if (token == null) {
			return 0;
		}
		// xhttp.setRequestHeader("X-CSRF-Token", token);
		// xhttp.setRequestHeader("Content-Type", "application/json");
		xhttp.send();
		if (xhttp.status == 200) {
			this.USER = JSON.parse(xhttp.response).user;
			return this.USER;
		} else {
			console.error("Error getting current user.");
			alertify.error("Error getting current user.");
			return null;
		}
	}

	cancelLogin() {
		document.getElementById("logindialogue").firstElementChild.reset();
		document.getElementById("logindialogue").style["display"] = "none";
		this.awaiting_login = false;
	}

	login() {
		var loginform = document.getElementById("logindialogue").firstElementChild;
		var uname = loginform.elements.uname.value;
		var pword = loginform.elements.pword.value;

		if (pword == "" || uname == "") {
			alertify.error("Either username or password is missing.");
			return null;
		}
		document.getElementById("logindialogue").style["display"] = "none";
		loginform.reset();
		this.awaiting_login = false;

		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "https://www.digitalscrapbook.com/services/auth/user/login.json", false);
		var token = this.get_token();
		if (token == null) {
			alertify.error("Could not establish a connection.");
			return null;
		}
		xhttp.setRequestHeader("X-CSRF-Token", token);
		xhttp.setRequestHeader("Content-Type", "application/json");
		xhttp.send('{"username":"'+uname+'", "password":"'+pass+'"}');
		if (xhttp.status == 200) {
			this.USER = JSON.parse(xhttp.response).user;
			this.USER.imagesUsed = 0;
			return this.USER;
		} else {
			console.error("Error logging in.");
			alertify.error("Error logging in.");
			return null;
		}
	}

	async login_loop(force_relog = false) {
		if (this.USER && this.USER.uid != 0 && !force_relog) return this.USER;

		document.getElementById("logindialogue").style["display"] = "inline";
		this.awaiting_login = true;

		while (this.awaiting_login) {
			await (new Promise(resolve => setTimeout(resolve, 1000)));
		}

		return this.USER;
	}

	check_premium(user) {
		console.log(user.roles);
		var premium = false;
		for (const elem in user.roles) {
			//elem is the number, user.roles[elem] is the words with it
			if(user.roles[elem] == "subscriber" || user.roles[elem] == "pu subscriber" || user.roles[elem] == "cu subscriber"     ) {
				console.log("user has role " + user.roles[elem]);
				premium = true;
			}
		}
		return premium;
	}

	prompt_upgrade(reason) {
		document.getElementById("upgrade_dialog").style.visibility = "visible";
		var blur = document.getElementById("bg_blur").style.visibility = "visible";
		document.getElementById("upgrade_reason").innerHTML = "<h3>" + reason + " requires " + config.app_name + " Premium</h3>";


	}

}

export default Authentication;
