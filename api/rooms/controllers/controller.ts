import IRoom from '../model/rooms'

class Controller implements IRoom {
	id?: string;
	name = '';
	collection = 'rooms'
	protected database: any;
	protected ISnapshot: any;

	constructor(database: any) {
		this.database = database.collection(this.collection)
	}

	public getAll(req: any, res: any): void {
		this.database
				.get()
				.then((snapshot: any) => {
					const results:any = []
					snapshot.forEach((doc:any) => {
						results.push({
							id: doc.id,
							...doc.data()
						});
					});
					res.send(results)
				})
	}

	public set(req:any, res:any) {
		let room: IRoom = { name: req.body.name }

		this.database
				.doc()
				.set(room)
				.then(() => {
					res.json({
						status: "Data saved successfully.",
						data: room
					});
				})
				.catch(error => {
					res.send("Data could not be saved." + error);
				})
	}
	
	public get(req: any, res: any): void {
		const { roomId } = req.params
		
		this.database.doc(roomId)
				.get()
				.then((snapshot: any) => {
					res.send(snapshot.data())
				})
				.catch(error => {
					res.send("Some error occurred." + error);
				})
	}

	public delete(req: any, res: any): boolean {
		let { roomId } = req.params
		
		this.database
				.doc(roomId)
				.delete()
				.then(()=>{
					res.send("Data deleted successfully.");
				})
				.catch(error => {
					res.send("Data could not be deleted." + error);
				})

		return true
	}
}

export default Controller