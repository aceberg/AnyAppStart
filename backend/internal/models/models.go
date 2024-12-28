package models

// Conf - web gui config
type Conf struct {
	Host     string
	Port     string
	Theme    string
	Color    string
	ConfPath string
	DirPath  string
	ItemPath string
	TypePath string
	NodePath string
}

// Item - one service or container
type Item struct {
	Group string `yaml:"group"`
	Name  string `yaml:"name"`
	Type  string `yaml:"type"`
	Exec  string `yaml:"-"`
	State string `yaml:"-"`
}

// OneType - one type and its execs
type OneType struct {
	ExecMap map[string]string `yaml:"exec"`
}

// TypeStruct - one type struct
type TypeStruct struct {
	Name    string
	Start   string
	Restart string
	Stop    string
	Logs    string
	State   string
}
