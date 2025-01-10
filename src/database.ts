import mongoose from "mongoose"

export async function connectToDatabase() {
	// mongoose connection
	await mongoose.connect(process.env.MONGO_URI!)
	mongoose.connection.on("error", (e: Error) => {
		console.error(e)
	})
}