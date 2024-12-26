package yaml

import (
	"log"
	"os"

	"gopkg.in/yaml.v3"

	"github.com/aceberg/QuickStart/internal/check"
	"github.com/aceberg/QuickStart/internal/models"
)

// Read - read .yaml file to struct
func Read(path string) []models.Item {

	file, err := os.ReadFile(path)
	check.IfError(err)

	var items []models.Item
	err = yaml.Unmarshal(file, &items)
	check.IfError(err)

	return items
}

// Write - write struct to  .yaml file
func Write(path string, items []models.Item) {

	yamlData, err := yaml.Marshal(&items)
	check.IfError(err)

	err = os.WriteFile(path, yamlData, 0644)
	check.IfError(err)

	log.Println("INFO: writing new items file to", path)
}

// ReadTypes - read .yaml file to struct
func ReadTypes(path string) map[string]models.OneType {

	file, err := os.ReadFile(path)
	check.IfError(err)

	var items map[string]models.OneType
	err = yaml.Unmarshal(file, &items)
	check.IfError(err)

	return items
}

// WriteTypes - write struct to  .yaml file
func WriteTypes(path string, items map[string]models.OneType) {

	yamlData, err := yaml.Marshal(&items)
	check.IfError(err)

	err = os.WriteFile(path, yamlData, 0644)
	check.IfError(err)

	log.Println("INFO: writing new types to", path)
}
