package web

import (
	"embed"
	"html/template"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/aceberg/QuickStart/internal/check"
	"github.com/aceberg/QuickStart/internal/conf"
	"github.com/aceberg/QuickStart/internal/models"
)

var (
	appConfig models.Conf

	// pubFS - public folder
	//
	//go:embed public/assets/*
	assetsFS embed.FS

	//go:embed public/index.html
	templFS embed.FS
)

// Gui - start web server
func Gui(dirPath, nodePath string) {

	confPath := dirPath + "/config.yaml"
	check.Path(confPath)
	appConfig = conf.Get(confPath)

	appConfig.DirPath = dirPath
	appConfig.ConfPath = confPath

	appConfig.YamlPath = dirPath + "/items.yaml"
	check.Path(appConfig.YamlPath)

	log.Println("INFO: starting web gui with config", appConfig.ConfPath)

	address := appConfig.Host + ":" + appConfig.Port

	log.Println("=================================== ")
	log.Printf("Web GUI at http://%s", address)
	log.Println("=================================== ")

	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()

	templ := template.Must(template.New("").ParseFS(templFS, "public/index.html"))
	router.SetHTMLTemplate(templ) // templates

	router.GET("/", indexHandler) // index.go
	router.StaticFS("/fs", http.FS(assetsFS))

	router.GET("/api", apiHandler)        // api.go
	router.GET("/api/items", apiGetItems) // api.go

	err := router.Run(address)
	check.IfError(err)
}
