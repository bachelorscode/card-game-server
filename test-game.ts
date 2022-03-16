import axios, { AxiosResponse, ResponseType } from "axios"
import { Response } from "express"

const betLagao = async () => {
	const game_type = ["HIGH_LOW", "ODD_EVEN", "RED_BLACK"]

	const selectedGame = game_type[Math.floor(Math.random() * 3)]

	let side = ""
	const a = (Math.floor(Math.random() * 10))
	if (selectedGame === "HIGH_LOW") {
		if (a % 2 === 0) {
			side = "HIGH"
		} else {
			side = "LOW"
		}
	}
	if (selectedGame === "ODD_EVEN") {
		if (a % 2 === 0) {
			side = "ODD"
		} else
			side = "EVEN"
	}

	if (selectedGame === "RED_BLACK") {
		if (a % 2 === 0)
			side = "RED"
		else
			side = "BLACK"
	}

	console.log(side, selectedGame)


	try {

		const { data } = await axios.post(`http://localhost:5000/bet?game_type=${selectedGame}`, {
			userId: '62078860dd6995c6592e71b1',
			amount: Math.floor(Math.random() * 100) + 100,
			side
		},{
			headers:{
				"authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGE3YjIxYmFhYjlhODZiMGNhNzA4NCIsImlhdCI6MTY0NDg1NDA0OSwiZXhwIjoxNjQ1NDU4ODQ5fQ.kyd61JjJPzREa1X7_Wb6Z3nge3gCWQFtsn9Esn_ttuc"
			}
		})
		console.log("bet done");

	} catch (error: any) {
		if (error.response) {
			console.log(error.response.data)
		} else {
			error.message
		}
	}
}


setInterval(() => {
	betLagao()
}, 1000)
