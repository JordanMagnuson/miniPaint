import config from './../config.js';
import Base_tools_class from './../core/base-tools.js';
import File_open_class from './../modules/file/open.js';
import Dialog_class from './../libs/popup.js';
import alertify from './../../../node_modules/alertifyjs/build/alertify.min.js';
import Authentication from './../auth.js';


class Media_class extends Base_tools_class {

	constructor(ctx) {
		super();
		this.File_open = new File_open_class();
		this.POP = new Dialog_class();
		this.name = 'media';
		this.cache = [];
		this.auth = new Authentication();
		console.log(this.auth);
	}

	load() {
		//nothing
	}

	render(ctx, layer) {
		//nothing
	}

	on_activate() {
		this.search();
	}

	/**
	 * Image search api
	 *
	 * @param {string} query
	 * @param {array} data
	 */
	search(query = '', data = []) {
//		console.log("entering search functriuon with query of", query, data);

		var _this = this;
		var html = '';

		var key = config.pixabay_key;
		key = key.split("").reverse().join("");

		if (data) {
			for (var i in data) {
				html += '<div class="item">';
//				html += '	<img class="displayBlock pointer" alt="" src="' + data[i].previewURL + '" data-url="' + data[i].webformatURL + '" />';
				html += '	<img class="displayBlock pointer" alt="" src="' + data[i].fields.ss_image_thumbnail_url + '" data-url="' + data[i].fields.ss_image_url + '" />';
				html += '</div>';
			}
			//fix for last line
			html += '<div class="item"></div>';
			html += '<div class="item"></div>';
			html += '<div class="item"></div>';
			html += '<div class="item"></div>';

		}

		//auto search on click from GUI search bar
		if(query != "" && data.length == 0) {
//			console.log("auto search");
			var URL = "https://www.digitalscrapbook.com/services/search/retreive.json";
			URL += "?key=" + query ;
			$.getJSON(URL, function (data) {
				_this.cache[query] = data;
				if (parseInt(data.total) == 0) {
					alertify.error('Your search did not match any images.');
				}
				delete data.total;
				_this.search(query, data);
			})
			.fail(function () {
				alertify.error('Error connecting to service.');
			});
			return;

		}

		var settings = {
			title: 'Search',
			//comment: 'Source: <a class="text_muted" href="https://pixabay.com/">pixabay.com</a>.',
			className: 'wide',
			params: [
				{name: "query", title: "Keyword:", value: query},
			],
			on_load: function (params) {
				var node = document.createElement("div");
				node.classList.add('flex-container');
				node.innerHTML = html;
				document.querySelector('#popup #dialog_content').appendChild(node);
				//events
				var targets = document.querySelectorAll('#popup .item img');
				for (var i = 0; i < targets.length; i++) {
					targets[i].addEventListener('click', function (event) {
						//we have click
						var data = {
							url: this.dataset.url,
						};
						var auth = new Authentication();
						var user = auth.get_logged_user();
						console.log("user in media call:", user);
						if (/*user is premium*/){
							_this.File_open.file_open_url_handler(data);
							_this.POP.hide(); // hide only if logged in and insertable.
						}
						else {
							alertify.error("Not logged in! Please log in to continue.");
							auth.login_loop();
						}
					});
				}
			},
			on_finish: function (params) {
				if (params.query == '')
					return;

				if (_this.cache[params.query] != undefined) {
					//using cache

					setTimeout(function () {
						//only call same function after all handlers finishes
						var data = _this.cache[params.query];
						if (parseInt(data.totalHits) == 0) {
							alertify.error('Your search did not match any images.');
						}
						_this.search(params.query, data.hits);
					}, 100);
				}
				else {
					//query to service
					var URL = "https://www.pixelscrapper.com/services/search/retreive.json";
					URL += "?key=" + params.query ;
					$.getJSON(URL, function (data) {
						_this.cache[params.query] = data;
						if (parseInt(data.total) == 0) {
							alertify.error('Your search did not match any images.');
						}
						delete data.total;
						_this.search(params.query, data);
					})
					.fail(function () {
						alertify.error('Error connecting to service.');
					});
				}
			},
		};
		this.POP.show(settings);
	}
}

export default Media_class;
