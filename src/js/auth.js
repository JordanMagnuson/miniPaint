var instance = null;

class Authentication {

	constructor() {
		if (instance) {
			return instance;
		}
		instance = this;
		this.TOKEN = this.get_token();
		this.USER = null;

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
			return null;
		}
	}

	login(uname, pass) {
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "https://www.digitalscrapbook.com/services/auth/user/login.json", false);
		var token = this.get_token();
		if (token == null) {
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
			return null;
		}
	}

	login_loop(force_relog = false) {
		if (this.USER && this.USER.uid != 0 && !force_relog) return this.USER;

		var uname = "";
		while (uname == ""){
			uname = prompt("Username:");
		}
		if (uname == null) return null;
		var pass = "";
		while (pass == "") {
			pass = prompt("Password:");
		}
		if (pass == null) return null;

		return this.login(uname, pass);
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

	prompt_upgrade() {

	}

}

export default Authentication;
