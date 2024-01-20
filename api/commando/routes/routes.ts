import Controller from '../controllers/controller'

class Routes {
	protected Controller: Controller;
	protected App: any;
	protected Router: any;
	protected MainRoute: string = '/commando'

	constructor (app:any, controller: Controller) {
		this.App = app;
		this.Controller = controller
	}

	init() {
	 	this.App.get(this.MainRoute + '/:commando', (req: any, res: any) => this.Controller.runCommando(req, res))
	}
}

export default Routes