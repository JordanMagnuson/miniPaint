import app from './../app.js';
import config from './../config.js';
import Base_tools_class from './../core/base-tools.js';
import Base_layers_class from './../core/base-layers.js';

class Borders_class extends Base_tools_class {

	constructor(ctx) {
		super();
		this.Base_layers = new Base_layers_class();
		this.ctx = ctx;
		this.name = 'borders';
		this.layer = {};
	}

	load() {
		//nothing
	}

	render(ctx, layer) {
		var params = layer.params;
		var size = 5;

		var x = layer.x;
		var y = layer.y;
		var width = parseInt(layer.width);
		var height = parseInt(layer.height);

		//legcy check
		if(x == null) x = 0;
		if(y == null) y = 0;
		if(!width) width = config.WIDTH;
		if(!height) height = config.HEIGHT;

		ctx.save();

		//set styles
		ctx.strokeStyle = layer.color;
		ctx.lineWidth = size;
		ctx.lineJoin = "miter";

		if (params.shadow === true) {
			//with shadow
			ctx.beginPath();
			ctx.shadowColor = layer.color;
			ctx.shadowBlur = size * config.ZOOM;
			ctx.rect(x - (size / 2), y - (size / 2), width + size, height + size);
			ctx.stroke();
			ctx.stroke();
			ctx.stroke();
		}
		else {
			ctx.beginPath();
			ctx.rect(x, y, width, height);
			ctx.stroke();
		}
		ctx.restore();
	}

	add_borders(params) {
		//create borders layer
		this.layer = {
			name: 'Borders',
			type: 'borders',
			render_function: ['borders', 'render'],
			params: {size: 5, shadow: params.shadow},
			color: params.color,
			x: config.layer ? config.layer.x - 5 / 2 : 0,
			y: config.layer ? config.layer.y - 5 / 2 : 0,
			width: config.layer ? config.layer.width + 5 : config.WIDTH,
			height: config.layer ? config.layer.height + 5  : config.HEIGHT,
			is_vector: true,
		};
		app.State.do_action(
			new app.Actions.Bundle_action('add_borders', 'Add Borders', [
				new app.Actions.Insert_layer_action(this.layer)
			])
		);
	}

	on_activate() {
		var params = this.getParams();
		this.add_borders({size:5, shadow:false, color:config.COLOR});
	}

}
;
export default Borders_class;
