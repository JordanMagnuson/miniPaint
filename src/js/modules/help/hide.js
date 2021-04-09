import config from './../../config.js';
import Dialog_class from './../../libs/popup.js';
import Helper_class from './../../libs/helpers.js';
import Base_gui_class from './../../core/base-gui.js';
import Authentication from './../../auth.js';
import alertify from './../../../../node_modules/alertifyjs/build/alertify.min.js';


class Help_hide_class {

	constructor() {
		this.Helper = new Helper_class();
		this.auth = new Authentication();
		this.Base_gui = new Base_gui_class();
		this.target = document.getElementById("main_menu");
		this.wrapper = document.getElementsByClassName('wrapper')[0];

		this.set_events();
	}

	set_events() {
		document.addEventListener('keydown', (event) => {
			const key = (event.key || '').toLowerCase();
			if (this.Helper.is_input(event.target))
				return;

			if (key == "e" && (event.ctrlKey == true || event.metaKey)) {
				var auth = new Authentication();
				var user = auth.get_logged_user();
				if (!user || (user.uid == 0)) user = auth.login_loop();
				if(user) {
					var premium = auth.check_premium(user);
					console.log(premium);
					if(premium) {
						this.toggle();
						this.Base_gui.prepare_canvas();

					} else {
						alertify.error("must be premium to do this"); //add actual premium dialog here
						auth.prompt_upgrade();
					}

					event.preventDefault();
				}
				event.preventDefault();
			}
		}, false);
	}

	toggle() {

		if (this.target.style['display'] == 'none' || (this.target.offsetHeight == 0 && this.target.offsetWidth == 0)) {

			var projectbar = document.getElementById("projectbar");
			projectbar.style["padding-top"] = "45px";

			this.target.style['display'] = 'inline';
			this.wrapper.style['top'] = '45px';

			var main_menu = document.getElementById("main_menu");
			main_menu.style["top"] = "0px";


			var colors_block = document.getElementById("colors_block");
			colors_block.style.display = "inline";

			var info_block = document.getElementById("info_base");
			info_block.style.display = "inline";
			document.getElementById('details_base').style['display'] = 'inline';


		} else {
			this.target.style['display'] = 'none';
			this.wrapper.style['top'] = '0px'

			var projectbar = document.getElementById("projectbar");
			projectbar.style["padding-top"] = "0px";

			document.getElementById('details_base').style['display'] = 'none';
			var colors_block = document.getElementById("colors_block");
			colors_block.style.display = "none";

			var info_block = document.getElementById("info_base");
			info_block.style.display = "none";


		}
	}

}

export default Help_hide_class;
