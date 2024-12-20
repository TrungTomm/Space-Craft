import Phaser from 'phaser';

import mainSceneSC from './scenesSC/mainSceneSC';


import AppController from './controller/AppController';

import WebFontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin.js';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import EaseMovePlugin from 'phaser3-rex-plugins/plugins/easemove-plugin.js';
import PreloaderSC from './scenesSC/PreloaderSC';
import TaskScene from './scenesSC/TaskScene';
import FriendsScene from './scenesSC/FriendsScene';
import WalletScene from './scenesSC/WalletScene';
import connectScene from './scenesSC/connectScene';
import linkedScene from './scenesSC/linkedScene';

// import eruda from 'eruda';

// eruda.init();

// Telegram.WebApp.disableVerticalSwipes();
// Telegram.WebApp.enableClosingConfirmation();

const config = {
	type: Phaser.WEBGL,
	width: window.innerWidth,
	height: window.innerHeight,
	scene: [
		PreloaderSC,
		mainSceneSC,
		TaskScene,
		FriendsScene,
		WalletScene,
		connectScene,
		linkedScene
	],
	scale: {
		// Fit to window
		mode: Phaser.Scale.FIT,
		// Center vertically and horizontally
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	plugins: {
		scene: [
            {
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            } 
		],
		global: [
			{
				key: 'rexWebFontLoader',
				plugin: WebFontLoaderPlugin,
				start: true,
			},
			{
				key: 'rexEaseMove',
				plugin: EaseMovePlugin,
				start: true,
			},
			// ...
		],
	},
};

const game = new Phaser.Game(config);


// AppController.gameObj = game;

// Telegram.WebApp.expand();
// AppController.stopScroll();

