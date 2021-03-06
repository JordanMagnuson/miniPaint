/*
 * miniPaint - https://github.com/viliusle/miniPaint
 * author: Vilius L.
 */

import app from './../../app.js';
import config from './../../config.js';
import menuDefinition from './../../config-menu.js';
import Help_translate_class from './../../modules/help/translate.js';
import Layer_new_class from './../../modules/layer/new.js';
import File_open_class from './../../modules/file/open.js';
import File_new_class from './../../modules/file/new.js';
import File_save_class from './../../modules/file/save.js';
import Media_class from './../../tools/media.js';



/**
 * class responsible for rendering main menu
 */


class GUI_menu_class {

	constructor() {
		this.eventSubscriptions = {};
		this.dropdownMaxHeightMargin = 15;
		this.menuContainer = null;
		this.menuBarNode = null;
		this.lastFocusedMenuBarLink = 0;
		this.dropdownStack = [];
		this.FOC = new File_open_class();
		this.FNC = new File_new_class();
		this.FSC = new File_save_class();
		this.MC = new Media_class();
		this.Help_translate = new Help_translate_class();
	}



	render_main() {


		document.getElementById("ws_body").innerHTML = ' <div class="ws_top"> <body>Welcome to ' + config.app_name +  ' </body> </div> <h3>Welcome to ' + config.app_name +  '!</h3> <h4>The fast, easy and free tool for making digital scrapbooking layouts</h4><body>Need help? Watch this <a href=""> five minute video </a> ' + config.tutorial_link +  ' on how to get started</body> ' ;
		document.getElementById("projectbar_appName").innerHTML = config.app_name;

		document.getElementById("welcome_screen").style.visibility = "visible";
		document.getElementById("projectbar").style.visibility = "visible";
		document.getElementById("the_wrapper").style.visibility = "visible";

		var _this = this;

		document.getElementById("blank_project").addEventListener("click", function() {
			var blur = document.getElementById("bg_blur");
			var welcome_screen = document.getElementById("welcome_screen");
			_this.FNC.new();
			blur.style.visibility = "hidden";
			welcome_screen.style.visibility = "hidden";
		});
		document.getElementById("ws_open").addEventListener("click", function() {
			var blur = document.getElementById("bg_blur");
			var welcome_screen = document.getElementById("welcome_screen");
			_this.FOC.open_file();
			blur.style.visibility = "hidden";
			welcome_screen.style.visibility = "hidden";
		});
		document.getElementById("template").addEventListener("click", function() {
			var blur = document.getElementById("bg_blur");
			var welcome_screen = document.getElementById("welcome_screen");
			_this.MC.search_bundles('', [], 1, "Layout Templates");
			blur.style.visibility = "hidden";
			welcome_screen.style.visibility = "hidden";
		});
		document.getElementById("quick_page").addEventListener("click", function() {
				var blur = document.getElementById("bg_blur");
				var welcome_screen = document.getElementById("welcome_screen");
				_this.MC.search_bundles('', [], 1, "Quick Pages");
				app.State.do_action(
						new app.Actions.Update_config_action({
							quickpage_start: 1
						})
				);
				blur.style.visibility = "hidden";
				welcome_screen.style.visibility = "hidden";
		});
		document.getElementById("upgrade_button").addEventListener("click", function() {
			var blur = document.getElementById("bg_blur");
			var upgrade_dialog = document.getElementById("upgrade_dialog");
			// blur.style.visibility = "hidden";
			// upgrade_dialog.style.visibility = "hidden";
			window.open(
						 config.upgrade_link, "_blank");
		});
		document.getElementById("cancel_upgrade").addEventListener("click", function() {
			var blur = document.getElementById("bg_blur");
			var upgrade_dialog = document.getElementById("upgrade_dialog");
			blur.style.visibility = "hidden";
			upgrade_dialog.style.visibility = "hidden";
		});

		document.getElementById("cancel_new").addEventListener("click", function() {
			var blur = document.getElementById("bg_blur");
			var welcome_screen = document.getElementById("welcome_screen");
			blur.style.visibility = "hidden";
			welcome_screen.style.visibility = "hidden";
		});

		document.getElementById("new_button").addEventListener("click", function() {
			document.getElementById("ws_body").innerHTML = ' <div class="ws_top"> <body> New Project </body> </div> <h3> </h3> <h4> </h4><body>Need help? Watch this <a href=""> five minute video </a> ' + config.tutorial_link +  ' on how to get started</body> ' ;

			document.getElementById("welcome_screen").style.visibility = "visible";
		//	document.getElementById("welcome_screen").style.height = "430px";

			var blur = document.getElementById("bg_blur");
			blur.style.visibility = "visible";


		});
		document.getElementById("open_button").addEventListener("click", function() {
			_this.FOC.open_file();
		});
		document.getElementById("save_button").addEventListener("click", function() {
			_this.FSC.save();
		});

		document.getElementById("search_button").addEventListener("click", function() {
			var query_string = document.getElementById("search_input").value;

			if(query_string) {
				_this.MC.search(query_string, [], 1);
			} else {
				_this.MC.search();
			}

//			_this.MC.search(query_string);
		});

document.getElementById("search_input").addEventListener("keyup", function(event) {
	if (event.keyCode == 13) {
		document.getElementById("search_button").click();
	}
});

		this.menuContainer = document.getElementById('main_menu');

		let menuTemplate = '<ul class="menu_bar" role="menubar" tabindex="0">';
		for (let i = 0; i < menuDefinition.length; i++) {
			const item = menuDefinition[i];
			menuTemplate += this.generate_menu_bar_item_template(item, i);
		}
		menuTemplate += '</ul>';

		this.menuContainer.innerHTML = menuTemplate;
		this.menuBarNode = this.menuContainer.querySelector('[role="menubar"]');

		this.menuContainer.addEventListener('click', (event) => { return this.on_click_menu(event); }, true);
		this.menuContainer.addEventListener('keydown', (event) => { return this.on_key_down_menu(event); }, true);
		this.menuBarNode.addEventListener('focus', (event) => { return this.on_focus_menu_bar(event); });
		this.menuBarNode.addEventListener('blur', (event) => { return this.on_blur_menu_bar(event); });
		this.menuBarNode.querySelectorAll('a').forEach((link) => {
			link.addEventListener('focus', (event) => { return this.on_focus_menu_bar_link(event); });
		});
		document.body.addEventListener('mousedown', (event) => { return this.on_mouse_down_body(event); }, true);
		document.body.addEventListener('touchstart', (event) => { return this.on_mouse_down_body(event); }, true);
		window.addEventListener('resize', (event) => { return this.on_resize_window(event); }, true);

		document.body.classList.add('loaded');
	}

	on(eventName, callback) {
		if (!this.eventSubscriptions[eventName]) {
			this.eventSubscriptions[eventName] = [];
		}
		if (!this.eventSubscriptions[eventName].includes(callback)) {
			this.eventSubscriptions[eventName].push(callback);
		}
	}

	emit(eventName, payload) {
		if (this.eventSubscriptions[eventName]) {
			for (let callback of this.eventSubscriptions[eventName]) {
				callback(payload);
			}
		}
	}

	generate_menu_bar_item_template(definition, index) {
		return `
			<li>
				<a id="main_menu_0_${index}" role="menuitem" tabindex="-1" aria-haspopup="true" aria-expanded="false"
					href="javascript:void(0)" data-level="0" data-index="${ index }"><span class="name trn">${ definition.name }</span></a>
			</li>
		`.trim();
	}

	generate_menu_dropdown_item_template(definition, level, index) {
		if (definition.divider) {
			return `
				<li role="presentation">
					<hr>
				</li>
			`.trim();
		} else {
			return `
				<li>
					<a id="main_menu_${ level }_${ index }" role="menuitem" tabindex="-1" aria-haspopup="${ (!!definition.children) + '' }"
						href="${ definition.href ? definition.href : 'javascript:void(0)' }"
						target="${ definition.href ? '_blank' : '_self' }"
						data-level="${ level }" data-index="${ index }">
						<span class="name"><span class="trn">${ definition.name }</span>${ definition.ellipsis ? ' ...' : '' }</span>
						${ !!definition.shortcut ? `
							<span class="shortcut"><span class="sr_only">Shortcut Key:</span> ${ definition.shortcut }</span>
						` : `` }
					</a>
				</li>
			`.trim();
		}
	}

	on_mouse_down_body(event) {
		const target = event.touches && event.touches.length > 0 ? event.touches[0].target : event.target;

		// Clicked outside of menu; close dropdowns.
		if (target && !this.menuContainer.contains(target)) {
			this.close_child_dropdowns(0);
		}
	}

	on_focus_menu_bar(event) {
		if (document.activeElement === this.menuBarNode) {
			let lastFocusedLink = this.menuBarNode.querySelector(`[data-index="${ this.lastFocusedMenuBarLink }"]`);
			if (!lastFocusedLink) {
				lastFocusedLink = this.menuBarNode.querySelector('a');
			}
			lastFocusedLink.focus();
		}
	}

	on_focus_menu_bar_link(event) {
		this.lastFocusedMenuBarLink = parseInt(event.target.getAttribute('data-index'), 10) || 0;
	}

	on_blur_menu_bar(event) {
		// TODO
	}

	on_key_down_menu(event) {
		const key = event.key;
		const activeElement = document.activeElement;

		if (activeElement && activeElement.tagName === 'A') {
			const linkLevel = parseInt(activeElement.getAttribute('data-level'), 10) || 0;
			const linkIndex = parseInt(activeElement.getAttribute('data-index'), 10) || 0;
			const menuParent = activeElement.closest('ul');
			if (linkLevel === 0) {
				if (['Right', 'ArrowRight'].includes(event.key)) {
					let nextLink = menuParent.querySelector(`[data-index="${ linkIndex + 1 }"]`);
					if (!nextLink) {
						nextLink = menuParent.querySelector(`[data-index="0"]`);
					}
					nextLink.focus();
				}
				else if (['Left', 'ArrowLeft'].includes(event.key)) {
					let previousLink = menuParent.querySelector(`[data-index="${ linkIndex - 1 }"]`);
					if (!previousLink) {
						previousLink = menuParent.querySelector(`[data-index="${ menuParent.querySelectorAll('[data-index]').length - 1 }"]`);
					}
					previousLink.focus();
				}
				else if (['Down', 'ArrowDown'].includes(event.key)) {
					if (activeElement.getAttribute('aria-haspopup') === 'true') {
						event.preventDefault();
						activeElement.click();
					}
				}
				else if (event.key === 'Home') {
					menuParent.querySelector(`[data-index="0"]`).focus();
				}
				else if (event.key === 'End') {
					menuParent.querySelector(`[data-index="${ menuParent.querySelectorAll('[data-index]').length - 1 }"]`).focus();
				}
				else if ([' ', 'Enter'].includes(event.key)) {
					event.preventDefault();
					activeElement.click();
				}
			} else {
				if (['Up', 'ArrowUp'].includes(event.key)) {
					event.preventDefault();
					let previousLink = menuParent.querySelector(`[data-index="${ linkIndex - 1 }"]`);
					if (!previousLink) {
						previousLink = menuParent.querySelector(`[data-index="${ linkIndex - 2 }"]`); // Skip dividers
					}
					if (!previousLink) {
						previousLink = menuParent.querySelector(`[data-index="${ this.dropdownStack[linkLevel - 1].children.length - 1 }"]`);
					}
					previousLink.focus();
				}
				else if (['Down', 'ArrowDown'].includes(event.key)) {
					event.preventDefault();
					let nextLink = menuParent.querySelector(`[data-index="${ linkIndex + 1 }"]`);
					if (!nextLink) {
						nextLink = menuParent.querySelector(`[data-index="${ linkIndex + 2 }"]`); // Skip dividers
					}
					if (!nextLink) {
						nextLink = menuParent.querySelector(`[data-index="0"]`);
					}
					nextLink.focus();
				}
				else if (['Right', 'ArrowRight'].includes(event.key)) {
					if (activeElement.getAttribute('aria-haspopup') === 'true') {
						activeElement.click();
					}
					else if (this.dropdownStack.length > 1) {
						const opener = this.dropdownStack[linkLevel - 1].opener;
						opener.click();
						opener.focus();
					}
					else {
						const menuBarLinkIndex = parseInt(this.dropdownStack[0].opener.getAttribute('data-index'), 10) || 0;
						let nextLink = this.menuBarNode.querySelector(`[data-index="${ menuBarLinkIndex + 1 }"]`);
						if (!nextLink) {
							nextLink = this.menuBarNode.querySelector(`[data-index="0"]`);
						}
						nextLink.click();
					}
				}
				else if (['Left', 'ArrowLeft'].includes(event.key)) {
					if (this.dropdownStack.length > 1) {
						const opener = this.dropdownStack[linkLevel - 1].opener;
						opener.click();
						opener.focus();
					} else {
						const menuBarLinkIndex = parseInt(this.dropdownStack[0].opener.getAttribute('data-index'), 10) || 0;
						let previousLink = this.menuBarNode.querySelector(`[data-index="${ menuBarLinkIndex - 1 }"]`);
						if (!previousLink) {
							previousLink = this.menuBarNode.querySelector(`[data-index="${ this.menuBarNode.querySelectorAll('[data-index]').length - 1 }"]`);
						}
						previousLink.click();
					}
				}
				else if (event.key === 'Home') {
					menuParent.querySelector(`[data-index="0"]`).focus();
				}
				else if (event.key === 'End') {
					menuParent.querySelector(`[data-index="${ this.dropdownStack[linkLevel - 1].children.length - 1 }"]`).focus();
				}
				else if ([' ', 'Enter'].includes(event.key)) {
					event.preventDefault();
					activeElement.click();
				}
				else if (['Esc', 'Escape'].includes(event.key)) {
					const opener = this.dropdownStack[linkLevel - 1].opener;
					opener.click();
					opener.focus();
				}
				else if (event.key === 'Tab') {
					this.close_child_dropdowns(0);
				}
			}
		}
	}

	on_click_menu(event) {
		const target = event.target.closest('a');

		// Any link in the menu is clicked.
		if (target && target.tagName === 'A') {
			const hasPopup = target.getAttribute('aria-haspopup') === 'true';
			if (hasPopup) {
				this.toggle_dropdown(target, event.isTrusted);
			} else {
				this.trigger_link(target);
			}
		} else {
			this.close_child_dropdowns(0);
		}
	}

	on_resize_window(event) {
		if (this.dropdownStack.length > 0) {
			this.position_dropdowns();
		}
	}

	toggle_dropdown(opener, isTrusted) {
		const linkLevel = parseInt(opener.getAttribute('data-level'), 10) || 0;
		const linkIndex = parseInt(opener.getAttribute('data-index'), 10) || 0;
		if (opener.getAttribute('aria-expanded') === 'true') {
			this.close_child_dropdowns(linkLevel);
		} else {
			const parentList = opener.closest('ul');
			parentList.querySelectorAll('a').forEach((item) => {
				item.setAttribute('aria-expanded', 'false');
			});
			opener.setAttribute('aria-expanded', true);
			this.create_dropdown(opener, linkLevel, linkIndex, !isTrusted);
		}
	}

	trigger_link(link) {
		const level = parseInt(link.getAttribute('data-level'), 10) || 0;
		const index = parseInt(link.getAttribute('data-index'), 10) || 0;

		// Find link definition
		let children = menuDefinition;
		for (let i = 0; i < level; i++) {
			const childIndex = this.dropdownStack[i] != null ? this.dropdownStack[i].index : index;
			children = children[childIndex].children;
		}
		let definition = children[index];

		// Close the dropdown
		this.close_child_dropdowns(0);

		// Emit callback events for triggered links
		if (definition.target) {
			this.emit('select_target', definition.target);
		}
		else if (definition.href) {
			this.emit('select_href', definition.href);
		}
	}

	close_child_dropdowns(level) {
		for (let i = this.dropdownStack.length - 1; i >= 0; i--) {
			if (i >= level) {
				this.dropdownStack[i].element.parentNode.removeChild(this.dropdownStack[i].element);
				this.dropdownStack[i].opener.setAttribute('aria-expanded', false);
			}
		}
		this.dropdownStack = this.dropdownStack.slice(0, level);
	}

	create_dropdown(opener, level, index, focusAfterCreation) {
		this.close_child_dropdowns(level);

		// Find child list in the menu definition
		let children = menuDefinition;
		for (let i = 0; i <= level; i++) {
			const childIndex = this.dropdownStack[i] != null ? this.dropdownStack[i].index : index;
			children = children[childIndex].children;
		}

		// Create the dropdown element, place it in DOM & position it
		let dropdownElement = document.createElement('ul');
		dropdownElement.className = 'menu_dropdown';
		dropdownElement.role = 'menu';
		dropdownElement.tabIndex = 0;
		dropdownElement.setAttribute('aria-labelledby', 'main_menu_' + level + '_' + index);
		let dropdownTemplate = '';
		for (let i = 0; i < children.length; i++) {
			dropdownTemplate += this.generate_menu_dropdown_item_template(children[i], level + 1, i);
		}
		dropdownElement.innerHTML = dropdownTemplate;

		this.menuContainer.appendChild(dropdownElement);

		if (config.LANG != 'en') {
			this.Help_translate.translate(config.LANG, this.menuContainer);
		}

		if (focusAfterCreation) {
			dropdownElement.querySelector('a').focus();
		}

		this.dropdownStack.push({
			children,
			opener,
			index,
			element: dropdownElement
		});

		this.position_dropdowns();
	}

	position_dropdowns() {
		const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

		let topNavHeight = 0;
		for (let level = 0; level < this.dropdownStack.length; level++) {
			const dropdownElement = this.dropdownStack[level].element;
			const openerRect = this.dropdownStack[level].opener.getBoundingClientRect();

			topNavHeight = openerRect.height;
			const dropdownMaxHeight = vh - topNavHeight - this.dropdownMaxHeightMargin;
			dropdownElement.style.maxHeight = dropdownMaxHeight + 'px';
			const dropdownRect = dropdownElement.getBoundingClientRect();

			if (level === 0) {
				dropdownElement.style.top = (openerRect.y + openerRect.height) + 'px';

				let left = openerRect.x;
				if (left + dropdownRect.width > vw) {
					left = openerRect.x + openerRect.width - dropdownRect.width;
				}
				if (left + dropdownRect.width > vw) {
					left = vw - dropdownRect.width;
				}
				if (left < 0) {
					left = 0;
				}
				dropdownElement.style.left = left + 'px';
			} else {
				let top = openerRect.y;
				if (top + dropdownRect.height > vh - this.dropdownMaxHeightMargin) {
					top = vh - this.dropdownMaxHeightMargin - dropdownRect.height;
				}
				dropdownElement.style.top = top + 'px';

				let left = openerRect.x + openerRect.width + 1;
				if (left + dropdownRect.width > vw) {
					left = openerRect.x - dropdownRect.width - 1;
				}
				if (left < 0) {
					if (openerRect.x + (openerRect.width / 2) > vw / 2) {
						left = 1;
					} else {
						left = vw - dropdownRect.width - 1;
						if (left < 0) {
							left = 1;
						}
					}
				}
				dropdownElement.style.left = left + 'px';
			}
		}
	}

}

export default GUI_menu_class;
