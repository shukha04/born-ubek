import { promises as fs } from 'fs'
import path from 'path'

export type JSONData = {
	categories: {
		title: string
		image: string
		key: string
		products: {
			id: string
			title: string
			image: string
			type: string
			material: string
			description: string
			price: number
			url: string
		}[]
	}[]
}

const handler = async (): Promise<JSONData> => {
	const filePath = path.join(process.cwd(), 'json/data.json')
	const jsonData: Buffer = await fs.readFile(filePath)

	return JSON.parse(jsonData.toString())
}

export default handler
