var postMsg = ''

function postText(value){
	console.log('iFrame sender: ' + value) 
	parent.postMessage(value, "*")
}


const scriptsInEvents = {

	async Ev_mainevents_Event2_Act4(runtime, localVars)
	{
		runtime.globalVars.webSocket.onMessage = (event) => {
		    if (event.data.startsWith('s:')) {
		        const score_ = event.data.split(':')[1];
		        console.log("Score received from WebSocket:", score_);
		        
		        // Update the in-game score with the score received from the WebSocket
		        runtime.globalVars.score = parseInt(score_);
				console.log("Score updated from WebSocket:",  runtime.globalVars.score)
		    }
		}
	},

	async Ev_mainevents_Event20_Act5(runtime, localVars)
	{
		runtime.globalVars.webSocket.send("s:1000")
	},

	async Ev_mainevents_Event21_Act5(runtime, localVars)
	{
		runtime.globalVars.webSocket.send("s:100")
	},

	async Ev_mainevents_Event22_Act5(runtime, localVars)
	{
		runtime.globalVars.webSocket.send("s:50")
	},

	async Ev_mainevents_Event23_Act5(runtime, localVars)
	{
		runtime.globalVars.webSocket.send("s:20")
	},

	async Ev_mainevents_Event24_Act5(runtime, localVars)
	{
		runtime.globalVars.webSocket.send("s:10")
	},

	async Ev_gameover_Event1_Act5(runtime, localVars)
	{
		runtime.globalVars.webSocket.close();
	},

	async Ev_gameover_Event1_Act6(runtime, localVars)
	{
		window.parent.postMessage("WebSocketClosed", "*");
	},

	async Ev_menu_Event1_Act2(runtime, localVars)
	{
		const queryParams = new URLSearchParams(window.location.search)
		const token = queryParams.get('token');
		const gameId = queryParams.get('gameId');
		
		try{
			const webSocket = new WebSocket('wss://arcade.stage.legacyarcade.com/ws', [token,gameId]);
			runtime.globalVars.webSocket = webSocket;
			webSocket.onopen = (event) =>{
				runtime.callFunction('startendless');
			};
			runtime.globalVars.playable = 1;
		}catch(e){
			const textInstance = runtime.objects.ErrorText.getFirstInstance()
			textInstance.text = "ERROR CONNECTING"
			console.log("error connecting to server", e)
		}
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

