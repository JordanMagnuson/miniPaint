import config from './../config.js';
import Base_tools_class from './../core/base-tools.js';
import Base_layers_class from './../core/base-layers.js';

class Shadow_class extends Base_tools_class {

	constructor(ctx) {
		super();
		this.Base_layers = new Base_layers_class();
		this.name = 'shadow';
	}

	load() {
		// nothing
	}

	render(ctx, layer) {
		// nothing
	}

	on_activate() {
		var passed_params = {};
		if (config.TOOL.name == "shadow_a") {
			passed_params = {x:6, y:6, value: 15, color:"#000000"};
		} else if (config.TOOL.name == "shadow_b") {
			passed_params = {x:6, y:6, value: 4, color:"#000000"};
		}

		if (passed_params){
			this.Base_layers.add_filter(null, 'drop-shadow', passed_params);
		}
	}

}
;
export default Shadow_class;
