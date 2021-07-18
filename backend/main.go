package main

import (
	"fmt"
	"log"
	"net/http"
	"github.com/gorilla/websocket"
)

var AllowedOrigins = map[string]bool {
	"http://localhost:3000": true,
}

var upgrader = websocket.Upgrader{
	ReadBufferSize: 1024,
	WriteBufferSize: 1024,

	//Checks origin if it is not from my frontend, will throw error
	CheckOrigin: func(r *http.Request) bool { 
		if AllowedOrigins[r.Header.Get("Origin")] {
			return true
		}
		return false
	},
}

func setUpRoutes() {
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		connection, error := upgrader.Upgrade(w,r, nil)

		if error != nil {
			log.Println(error)
			return
		}
		reader(connection)

	})
}

func reader(conn *websocket.Conn) {
	messageType, p, err := conn.ReadMessage()

	if err != nil {
		log.Println(err)
		return
	}

	fmt.Println(string(p))

	if err := conn.WriteMessage(messageType,p); err != nil {
		log.Println(err)
		return
	}
}

func main()  {
	setUpRoutes()
	http.ListenAndServe(":8001", nil)
}