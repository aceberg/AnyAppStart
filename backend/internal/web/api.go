package web

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/aceberg/QuickStart/internal/models"
	"github.com/aceberg/QuickStart/internal/service"
)

func apiHandler(c *gin.Context) {

	msg := "This is API"
	log.Println(msg)

	c.IndentedJSON(http.StatusOK, msg)
}

func apiGetConfig(c *gin.Context) {

	c.IndentedJSON(http.StatusOK, appConfig)
}

func apiExec(c *gin.Context) {
	var oneItem models.Item

	oneItem.Name = c.Query("name")
	oneItem.Type = c.Query("type")
	oneItem.Exec = c.Query("exec")

	log.Println("EXEC:", oneItem)
	res, out := service.Exec(oneItem)
	log.Println("OUT:", out)

	c.IndentedJSON(http.StatusOK, res)
}

func apiGetItems(c *gin.Context) {
	var oneItem models.Item
	var items []models.Item

	oneItem = models.Item{
		Group: "Default",
		Name:  "adminer",
		Type:  "Docker",
	}

	items = append(items, oneItem)

	oneItem = models.Item{
		Group: "Default",
		Name:  "gotify",
		Type:  "Docker",
	}

	items = append(items, oneItem)

	c.IndentedJSON(http.StatusOK, items)
}
