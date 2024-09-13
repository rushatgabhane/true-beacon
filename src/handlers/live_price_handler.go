package handlers

import (
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

type LivePriceHandler struct{}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func (h *LivePriceHandler) GetLivePrice(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}

	log.Println("websocket client connected")

	go func() {
		for {
			newRandomPrice := rand.Intn(5000) + 25000
			err = ws.WriteMessage(websocket.TextMessage, []byte(fmt.Sprintf("%d", newRandomPrice)))
			if err != nil {
				log.Println(err)
				break
			}
			log.Println("New price sent")
			time.Sleep(5 * time.Second)
		}
	}()

	defer ws.Close()

}
