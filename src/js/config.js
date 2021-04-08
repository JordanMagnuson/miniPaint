//main config file

var config = {};

config.TRANSPARENCY = false;
config.TRANSPARENCY_TYPE = 'squares'; //squares, green, grey
config.LANG = 'en';
config.WIDTH = null;
config.HEIGHT = null;
config.visible_width = null;
config.visible_height = null;
config.COLOR = '#008000';
config.ALPHA = 255;
config.ZOOM = 1;
config.SNAP = true;
config.pixabay_key = '3ca2cd8af3fde33af218bea02-9021417';
config.layers = [];
config.layer = null;
config.need_render = false;
config.need_render_changed_params = false; // Set specifically when param change in layer details triggered render
config.mouse = {};
config.upgrade_cost = "$Dollars.cents";
config.app_name = "App Name TBD";
config.free_image_limit = 5;
config.tutorial_link = "link in config";
config.swatches = {
	default: [] // Only default used right now, object format for swatch swapping in future.
};

//requires styles in reset.css
config.themes = [
	'dark',
	'light',
	'green',
];

config.FONTS = [
	"Arial",
	"Courier",
	"Impact",
	"Helvetica",
	"Monospace",
	"Tahoma",
	"Times New Roman",
	"Verdana",
	"Amatic SC",
	"Arimo",
	"Codystar",
	"Creepster",
	"Indie Flower",
	"Lato",
	"Lora",
	"Merriweather",
	"Monoton",
	"Montserrat",
	"Mukta",
	"Muli",
	"Nosifer",
	"Nunito",
	"Oswald",
	"Orbitron",
	"Pacifico",
	"PT Sans",
	"PT Serif",
	"Playfair Display",
	"Poppins",
	"Raleway",
	"Roboto",
	"Rubik",
	"Special Elite",
	"Tangerine",
	"Titillium Web",
	"Ubuntu"
];

config.TOOLS = [
	{
		name: 'select',
		title: 'Select object tool',
		attributes: {
			no_show: true,
			auto_select: true,
		},
	},
	{
		name: 'file_import',
		title: 'Open File',
		on_activate: 'on_activate',
	},
	{
		name: 'mask',
		title: 'Clipping Mask',
		on_activate: 'on_activate',
	},
	{
		name: 'rotate',
		title: 'Rotate',
		on_activate: 'on_activate',
	},
	{
		name: 'text',
		on_update: 'on_params_update',
		attributes: {
			font: {
				value: 'Arial',
				values: ['', ...config.FONTS.sort()],
			},
			size: 40,
			bold: {
				value: false,
				icon: `bold.svg`
			},
			italic: {
				value: false,
				icon: `italic.svg`
			},
			underline: {
				value: false,
				icon: `underline.svg`
			},
			strikethrough: {
				value: false,
				icon: `strikethrough.svg`
			},
			fill: '#008800',
			stroke: '#000000',
			stroke_size: {
				value: 0,
				min: 0,
				step: 0.1
			},
			kerning: {
				value: 0,
				min: -999,
				max: 999,
				step: 1
			},
			leading: {
				value: 0,
				min: -999,
				max: 999,
				step: 1
			}
		},
	},
	{
		name: 'selection',
		title: 'Selection',
		attributes: {},
	},
	{
		name: 'erase',
		title: 'Erase',
		on_update: 'on_params_update',
		attributes: {
			no_show:true,
			size:12
		}
	},
	{
		name: 'shadow_a',
		title: 'Shadow A',
		on_activate: 'on_activate',
	},
	{
		name: 'shadow_b',
		title: 'Shadow B',
		on_activate: 'on_activate',
	},
	{
		name: 'borders',
		title: 'Border',
		on_activate: 'on_activate',
		attributes: {
			size: 12,
			no_show: true,
		},
	},
	{
		name: 'undo',
		title: 'Undo',
		on_activate: 'on_activate',
  },
//   {
// 		name: 'bulge_pinch',
// 		title: 'Bulge/Pinch Tool',
// 		attributes: {
// 			radius: 80,
// 			power: 50,
// 			bulge: true,
// 		},
// 	},
	{
		name: 'redo',
		title: 'Redo',
		on_activate: 'on_activate',
	}
	// {
	// 	name: 'brush',
	// 	title: 'Brush',
	// 	attributes: {
	// 		size: 4,
	// 		pressure: false,
	// 	},
	// },
	// {
	// 	name: 'pencil',
	// 	title: 'Pencil',
	// 	on_update: 'on_params_update',
	// 	attributes: {
	// 		antialiasing: true,
	// 		size: 2,
	// 	},
	// },
	// {
	// 	name: 'pick_color',
	// 	title: 'Pick Color',
	// 	attributes: {
	// 		global: false,
	// 	},
	// },
	// {
	// 	name: 'magic_wand',
	// 	title: 'Magic Wand Tool',
	// 	attributes: {
	// 		power: 15,
	// 		anti_aliasing: true,
	// 		contiguous: false,
	// 	},
	// },
	// {
	// 	name: 'fill',
	// 	title: 'Fill',
	// 	attributes: {
	// 		power: 5,
	// 		anti_aliasing: false,
	// 		contiguous: false,
	// 	},
	// },
	// {
	// 	name: 'line',
	// 	title: 'Line',
	// 	attributes: {
	// 		size: 1,
	// 		type: {
	// 			value: 'Simple',
	// 			values: ['Simple', 'Arrow'],
	// 		},
	// 	},
	// },
	// {
	// 	name: 'rectangle',
	// 	title: 'Rectangle',
	// 	attributes: {
	// 		size: 1,
	// 		radius: 0,
	// 		fill: true,
	// 		square: false,
	// 	},
	// },
	// {
	// 	name: 'circle',
	// 	title: 'Circle',
	// 	attributes: {
	// 		size: 1,
	// 		fill: true,
	// 		circle: false,
	// 	},
	// },
	// {
	// 	name: 'media',
	// 	title: 'Search Images',
	// 	on_activate: 'on_activate',
	// 	attributes: {
	// 		size: 30,
	// 	},
	// },
	// {
	// 	name: 'gradient',
	// 	title: 'Gradient',
	// 	attributes: {
	// 		color_1: '#008000',
	// 		color_2: '#ffffff',
	// 		alpha: 0,
	// 		radial: false,
	// 		radial_power: 50,
	// 	},
	// },
	// {
	// 	name: 'clone',
	// 	title: 'Clone tool',
	// 	attributes: {
	// 		size: 30,
	// 		anti_aliasing: true,
	// 		source_layer: {
	// 			value: 'Current',
	// 			values: ['Current', 'Previous'],
	// 		},
	// 	},
	// },
	// {
	// 	name: 'crop',
	// 	title: 'Crop',
	// 	on_update: 'on_params_update',
	// 	on_leave: 'on_leave',
	// 	attributes: {
	// 		crop: true,
	// 	},
	// },
	// {
	// 	name: 'blur',
	// 	title: 'Blur tool',
	// 	attributes: {
	// 		size: 30,
	// 		strength: 1,
	// 	},
	// },
	// {
	// 	name: 'sharpen',
	// 	title: 'Sharpen tool',
	// 	attributes: {
	// 		size: 30,
	// 	},
	// },
	// {
	// 	name: 'desaturate',
	// 	title: 'Desaturate',
	// 	attributes: {
	// 		size: 50,
	// 		anti_aliasing: true,
	// 	},
	// },
	// {
	// 	name: 'bulge_pinch',
	// 	title: 'Bulge/Pinch tool',
	// 	attributes: {
	// 		radius: 80,
	// 		power: 50,
	// 		bulge: true,
	// 	},
	// },
	// {
	// 	name: 'animation',
	// 	title: 'Play animation',
	// 	on_update: 'on_params_update',
	// 	on_leave: 'on_leave',
	// 	attributes: {
	// 		play: false,
	// 		delay: 400,
	// 	},
	// },
];

//link to active tool
config.TOOL = config.TOOLS[0];

// =======
// 		name: 'animation',
// 		on_activate: 'on_activate',
// 		on_update: 'on_params_update',
// 		on_leave: 'on_leave',
// 		attributes: {
// 			play: false,
// 			delay: 400,
// 		},
// 	},
// ];

// //link to active tool
// config.TOOL = config.TOOLS[2];
// >>>>>>> master

export default config;
