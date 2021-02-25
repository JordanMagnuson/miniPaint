

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

	// promise_request(type, URL, data = null, headers = null) {
	// 	var request = new Promise(function (resolve, reject) {
	// 		var xhttp = new XMLHttpRequest();
	// 		xhttp.open(type, URL, true);
	// 		if (headers) {
	// 			for (k in headers.keys()) {
	// 				xhttp.setRequestHeader(k, headers[k]);
	// 			}
	// 		}
	// 		xhttp.onreadystatechange = function() {
	// 			if (this.readyState == 4) {
	// 				if (this.status == 200) {
	// 					resolve(xhttp);
	// 				} else {
	// 					reject(this.status);
	// 				}
	// 			}
	// 		}
	// 		xhttp.send(data);
	// 	});
	// 	return request;
	// }

	get_token() {
		if (this.TOKEN) return this.TOKEN;
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "https://www.pixelscrapper.com/services/auth/user/token.json", false);
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
		xhttp.open("POST", "https://www.pixelscrapper.com/services/auth/system/connect.json", false);
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
		xhttp.open("POST", "https://www.pixelscrapper.com/services/auth/user/login.json", false);
		var token = this.get_token();
		if (token == null) {
			return null;
		}
		xhttp.setRequestHeader("X-CSRF-Token", token);
		xhttp.setRequestHeader("Content-Type", "application/json");
		xhttp.send('{"username":"'+uname+'", "password":"'+pass+'"}');
		if (xhttp.status == 200) {
			this.USER = JSON.parse(xhttp.response).user;
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

}

export default Authentication;