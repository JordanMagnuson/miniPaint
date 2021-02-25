import config from './../../config.js';
import Dialog_class from './../../libs/popup.js';
import Helper_class from './../../libs/helpers.js';

class Help_hide_class {

	constructor() {
		this.Helper = new Helper_class();
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
				this.toggle();
				event.preventDefault();
			}
		}, false);
	}

	toggle() {
		if (this.target.style['display'] == 'none' || (this.target.offsetHeight == 0 && this.target.offsetWidth == 0)) {
			this.target.style['display'] = 'inline';
			this.wrapper.style['top'] = '50px';

			var colors_block = document.getElementById("colors_block");
			colors_block.style.display = "inline";

			var info_block = document.getElementById("info_base");
			info_block.style.display = "inline";
			document.getElementById('details_base').style['display'] = 'inline';


		} else {
			this.target.style['display'] = 'none';
			this.wrapper.style['top'] = '0px'

			document.getElementById('details_base').style['display'] = 'none';
			var colors_block = document.getElementById("colors_block");
			colors_block.style.display = "none";

			var info_block = document.getElementById("info_base");
			info_block.style.display = "none";


		}
	}

}

export default Help_hide_class;
