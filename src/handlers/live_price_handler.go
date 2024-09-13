package handlers

import (
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"sync"
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
	defer ws.Close()

	log.Println("websocket client connected")

	wg := &sync.WaitGroup{}
	wg.Add(1)
	go func() {
		for {
			newRandomPrice := rand.Intn(100000) + 250000
			err = ws.WriteMessage(websocket.TextMessage, []byte(fmt.Sprintf("%d", newRandomPrice)))
			if err != nil {
				log.Println(err)
				wg.Done()
				break
			}
			time.Sleep(2 * time.Second)
		}
	}()
	wg.Wait()
	log.Println("websocket client disconnected")
}
