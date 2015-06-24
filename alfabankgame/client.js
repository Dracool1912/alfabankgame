var Client = IgeClass.extend({
	classId: 'Client',
	init: function () {
		ige.showStats(1);

		// Load our textures
		var self = this,
			gameTexture = [];

		this.obj = [];
		ige.input.debug(true);

		ige.addComponent(IgeBox2dComponent)
			.box2d.sleep(true)
			.box2d.gravity(0, 0)
			.box2d.createWorld()
			.box2d.start();

		// Load the fairy texture and store it in the gameTexture array
		gameTexture[0] = new IgeTexture('./assets/bg.jpg');

		ige.on('texturesLoaded', function () {

			// Create the HTML canvas
			ige.createFrontBuffer(true);

			// Start the engine
			ige.start(function (success) {
				// Check if the engine started successfully
				if (success) {
					// Create a parent scene node
					self.mainScene = new IgeScene2d()
						.id('mainScene');

					// Create a background scene node and apply
					// a background pattern to it using an isometric
					// tile so we set the 4th argument to true. If
					// using a 2d tile, we would set it to false.
					// The 3rd argument true means that as we pan
					// around the viewport with the mouse, the pattern
					// will "track" the camera as if it was the "floor".

					self.backgroundScene = new IgeTileMap2d()
						.depth(0)
						.id('backgroundScene')
						.isometricMounts(true)
						.highlightOccupied(true)
						.drawBounds(false)
						.tileWidth(34)
						.tileHeight(34)
						.mount(self.mainScene);

					self.mapScene = new IgeTileMap2d()
						.depth(1)
						.id('mapScene')
						.drawGrid(17)
						.translateTo(-59, -300, 0)
						.gridColor('#ff0000')
						.isometricMounts(true)
						.drawMouse(true)
						.highlightOccupied(true)
						.drawBounds(true)
						.tileWidth(32)
						.tileHeight(32)
						.mount(self.mainScene);

					self.___bg_ent = new IgeEntity()
						.texture(gameTexture[0])
						.drawBounds(true)
						.drawBoundsData(false)
						.dimensionsFromCell()
						.mount(self.backgroundScene);
						// Create the main viewport and set the scene
					// it will "look" at as the new scene1 we just
					// created above
					self.vp1 = new IgeViewport()
						.id('vp1')
						.autoSize(true)
						.scene(self.mainScene)
						.drawBounds(true)
						.mount(ige);
					// Define a function that will be called when the
					// mouse cursor moves over one of our entities
					overFunc = function () {
						this.highlight(true);
						this.drawBounds(true);
						this.drawBoundsData(true);
					};

					// Define a function that will be called when the
					// mouse cursor moves away from one of our entities
					outFunc = function () {
						this.highlight(false);
						this.drawBounds(false);
						this.drawBoundsData(false);
					};

					// Create the 3d container that the player
					// entity will be mounted to
					self.player1 = new Character()
						.addComponent(PlayerComponent)
						.id('player')
						.box2dBody({
							type: 'dynamic',
							linearDamping: 0.0,
							angularDamping: 0.1,
							allowSleep: true,
							bullet: true,
							gravitic: true,
							fixedRotation: true,
							fixtures: [{
								density: 1.0,
								friction: 0.5,
								restitution: 0.2,
								shape: {
									type: 'polygon',
									data: new IgePoly2d()
										.addPoint(-0.5, 0.2)
										.addPoint(0.5, 0.2)
										.addPoint(0.5, 0.8)
										.addPoint(-0.5, 0.8)
								}
							}]
						})
						.isometric(true)
						.mouseOver(overFunc)
						.translateTo(0, 0, 0)
						.mouseOut(outFunc)
						.drawBounds(false)
						.drawBoundsData(false)
						.mount(self.mapScene);

					// Create the room boundaries in box2d
					/*new IgeEntityBox2d()
						.translateTo(420, 130, 0)
						.width(880)
						.height(20)
						.drawBounds(true)
						//.mount(self.scene1)
						.box2dBody({
							type: 'static',
							allowSleep: true,
							fixtures: [{
								shape: {
									type: 'rectangle'
								}
							}]
						});*/

					// Set the camera to track the character with some
					// tracking smoothing turned on (100)
					self.vp1.camera.trackTranslate(self.player, 100);
				}
			});
		});
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Client; }