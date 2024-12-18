package models

// Conf - web gui config
type Conf struct {
	Host     string
	Port     string
	Theme    string
	Color    string
	Icon     string
	ConfPath string
	DirPath  string
	YamlPath string
	NodePath string
}

// Item - one service or container
type Item struct {
	Group   string `yaml:"group"`
	DName   string `yaml:"display_name"`
	Name    string `yaml:"name"`
	Type    string `yaml:"type"`
	Start   string `yaml:"start,omitempty"`
	Stop    string `yaml:"stop,omitempty"`
	Restart string `yaml:"restart,omitempty"`
}
