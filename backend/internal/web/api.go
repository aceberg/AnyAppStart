package web

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/aceberg/QuickStart/internal/models"
	"github.com/aceberg/QuickStart/internal/service"
	"github.com/aceberg/QuickStart/internal/yaml"
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

	types := yaml.ReadTypes(appConfig.TypePath)
	log.Println("TYPES", types)

	log.Println("EXEC:", oneItem)
	res, out := service.Exec(oneItem, types)
	log.Println("OUT:", out)

	c.IndentedJSON(http.StatusOK, res)
}

func apiGetItems(c *gin.Context) {

	items := yaml.Read(appConfig.ItemPath)
	types := yaml.ReadTypes(appConfig.TypePath)

	res := getStates(items, types)

	c.IndentedJSON(http.StatusOK, res)
}
