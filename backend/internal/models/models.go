package models

// Conf - web gui config
type Conf struct {
	Host     string
	Port     string
	Theme    string
	Color    string
	ConfPath string
	DirPath  string
	YamlPath string
	NodePath string
}

// Item - one service or container
type Item struct {
	Group string `yaml:"group"`
	Name  string `yaml:"name"`
	Type  string `yaml:"type"`
	Exec  string
}
