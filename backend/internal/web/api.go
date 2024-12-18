package web

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/aceberg/QuickStart/internal/models"
)

func apiHandler(c *gin.Context) {

	msg := "This is API"
	log.Println(msg)

	c.IndentedJSON(http.StatusOK, msg)
}

func apiGetItems(c *gin.Context) {
	var oneItem models.Item
	var items []models.Item

	oneItem = models.Item{
		Group: "Default",
		DName: "FirstItem",
	}

	items = append(items, oneItem)

	oneItem = models.Item{
		Group: "Default",
		DName: "Item 2",
	}

	items = append(items, oneItem)

	c.IndentedJSON(http.StatusOK, items)
}
