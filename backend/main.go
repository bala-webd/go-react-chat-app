package main

import (
	websocketcustom "backend/ws"
	"fmt"
	"net/http"
)

var AllowedOrigins = map[string]bool{
	"http://localhost:3000": true,
}

// var upgrader = websocket.Upgrader{
// 	ReadBufferSize: 1024,
// 	WriteBufferSize: 1024,

// 	//Checks origin if it is not from my frontend, will throw error
// 	CheckOrigin: func(r *http.Request) bool {
// 		if AllowedOrigins[r.Header.Get("Origin")] {
// 			return true
// 		}
// 		return false
// 	},
// }

// func setUpRoutes() {
// 	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
// 		connection, error := upgrader.Upgrade(w,r, nil)

// 		if error != nil {
// 			log.Println(error)
// 			return
// 		}
// 		reader(connection)

// 	})
// }

// func reader(conn *websocket.Conn) {
// 	messageType, p, err := conn.ReadMessage()

// 	if err != nil {
// 		log.Println(err)
// 		return
// 	}

// 	fmt.Println(string(p))

// 	if err := conn.WriteMessage(messageType,p); err != nil {
// 		log.Println(err)
// 		return
// 	}
// }

func serveWs(w http.ResponseWriter, r *http.Request) {
	ws, err := websocketcustom.Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+V\n", err)
	}
	go websocketcustom.Writer(ws)
	websocketcustom.Reader(ws)
}

func setUpRoutes() {
	http.HandleFunc("/ws", serveWs)
}

func main() {
	fmt.Println("Distributed Chat App v0.01")
	setUpRoutes()
	http.ListenAndServe(":8001", nil)
}
